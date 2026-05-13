import { trpc } from '@/shared/api';
import type { TLoginInput, TRegisteredUser, TRegisterInput } from '@repo/schemas';
import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  isAuth: boolean;
  isLoading: boolean;
  user: TRegisteredUser | null;
  login: (data: TLoginInput) => void;
  isLoggingIn: boolean;
  loginError: string | null;
  register: (data: TRegisterInput) => void;
  isRegisterIn: boolean;
  registerError: string | null;
  logout: () => void;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const utils = trpc.useUtils();
  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    isError,
  } = trpc.auth.me.useQuery(undefined, {
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      utils.auth.me.setData(undefined, data.user);
      navigate('/', { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      utils.auth.me.setData(undefined, data.user);
      navigate('/', { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const logoutMutation = trpc.auth.logout.useMutation({
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      utils.auth.me.setData(undefined, () => null);
      navigate('/login', { replace: true });
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const value = useMemo(
    () => ({
      user: isError ? null : (user ?? null),
      isAuth: !!user,
      isLoading: isLoading,
      login: loginMutation.mutate,
      isLoggingIn: loginMutation.isPending,
      loginError: loginMutation.error ? loginMutation.error.message : null,
      register: registerMutation.mutate,
      isRegisterIn: registerMutation.isPending,
      registerError: registerMutation.error ? registerMutation.error.message : null,
      logout: logoutMutation.mutate,
      isLoggingOut: logoutMutation.isPending,
    }),
    [user, isLoading, loginMutation, logoutMutation, isError, registerMutation],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
//eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
