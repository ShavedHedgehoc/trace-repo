import { useState, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink, TRPCClientError, createTRPCUntypedClient } from '@trpc/client';
import { trpc } from '@/shared/api';
import superjson from 'superjson';

interface RefreshResponse {
  accessToken: string;
}

let refreshPromise: Promise<RefreshResponse> | null = null;

export function DataProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: (count, err) => {
              if (
                err instanceof TRPCClientError &&
                (err.data?.httpStatus === 401 || err.data?.httpStatus === 403)
              ) {
                return false;
              }
              return count < 2;
            },
          },
        },
      }),
  );

  const [trpcClient] = useState(() => {
    // Базовый vanilla-клиент для внутренних вызовов процедур
    const vanillaClient = createTRPCUntypedClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: '/trpc_api',
          fetch(url, options) {
            return fetch(url, { ...options, credentials: 'include' });
          },
        }),
      ],
    });

    return trpc.createClient({
      transformer: superjson,
      links: [
        httpBatchLink({
          url: '/trpc_api',
          // 1. Нативно подставляем актуальный токен непосредственно перед формированием пакета
          headers() {
            const token = localStorage.getItem('accessToken');
            return token ? { Authorization: `Bearer ${token}` } : {};
          },
          // 2. ПЕРЕХВАТ НА УРОВНЕ СЕТИ (Идеально для httpBatchLink)
          async fetch(url, options) {
            const fetchOptions = { ...options, credentials: 'include' as const };
            const currentUrl = url.toString().toLowerCase();

            // Если запрос идет к роутам авторизации — не трогаем его
            if (
              currentUrl.includes('refresh') ||
              currentUrl.includes('login') ||
              window.location.pathname.includes('/login')
            ) {
              return fetch(url, fetchOptions);
            }

            // Выполняем оригинальный батч-запрос (auth.me, boil.list и т.д.)
            const response = await fetch(url, fetchOptions);

            // Если сервер ответил 401 Unauthorized — запускаем процесс обновления токенов
            if (response.status === 401) {
              // Если токена изначально не было в localStorage, значит сессии нет — уводим на логин
              if (!localStorage.getItem('accessToken')) {
                queryClient.clear();
                window.location.href = '/login';
                return response;
              }

              if (!refreshPromise) {
                // Вызываем мутацию рефреша через подготовленный vanillaClient
                refreshPromise = vanillaClient.mutation('auth.refresh') as Promise<RefreshResponse>;

                refreshPromise
                  .then((res) => {
                    localStorage.setItem('accessToken', res.accessToken);

                    // Мягко уведомляем React Query о необходимости обновить кэш
                    setTimeout(() => {
                      queryClient.invalidateQueries();
                    }, 0);
                  })
                  .catch((refreshErr) => {
                    refreshPromise = null;
                    localStorage.removeItem('accessToken');
                    queryClient.clear();
                    window.location.href = '/login';
                    throw refreshErr;
                  })
                  .finally(() => {
                    refreshPromise = null;
                  });
              }

              try {
                // Дожидаемся успешного выполнения обновления токена
                const refreshResult = await refreshPromise;

                // Формируем новые опции запроса со СВЕЖИМ токеном доступа
                const retryOptions = {
                  ...fetchOptions,
                  headers: {
                    ...fetchOptions.headers,
                    Authorization: `Bearer ${refreshResult.accessToken}`,
                  },
                };

                // Повторяем ОРИГИНАЛЬНЫЙ батч-запрос на чистом сетевом уровне и возвращаем его в tRPC
                return await fetch(url, retryOptions);
              } catch (_e) {
                // Если рефреш провалился, возвращаем исходный 401 ответ
                return response;
              }
            }

            return response;
          },
        }),
      ],
    });
  });

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}
