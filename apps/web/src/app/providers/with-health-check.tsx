import { useState, type ReactNode } from 'react';
// import { trpc } from '@/shared/api';
// import { FallbackScreen } from '@/shared/ui/fallback-screen';

export const HealthCheckProvider = ({ children }: { children: ReactNode }) => {
  const [isApiDown, setIsApiDown] = useState(false);
  // const _healthQuery = trpc.employee.app.list.useQuery(
  //   { filter: { name: '' }, limit: 1 },
  //   {
  //     retry: 2,

  //     onError: (err) => {
  //       if (!err.shape || err.message.includes('INTERNAL_SERVER_ERROR')) {
  //         setIsApiDown(true);
  //       }
  //     },
  //   },
  // );

  if (isApiDown) {
    // return <FallbackScreen />;
    return <h1>server down</h1>;
  }

  return <>{children}</>;
};
