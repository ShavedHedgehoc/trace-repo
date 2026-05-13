import { LoginForm } from '@/features/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui';
import { useState } from 'react';

export function AuthCard() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const isRegister = mode === 'register';
  const toggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  return (
    <Card className="w-full h-screen sm:h-auto sm:max-w-[450px] border-0 sm:border rounded-none sm:rounded-xl shadow-none sm:shadow-sm flex flex-col justify-center sm:justify-start">
      <CardHeader className="pt-12 sm:pt-6">
        <CardTitle className="text-2xl sm:text-xl">
          {isRegister ? 'Регистрация' : 'Вход в приложение'}
        </CardTitle>
        <CardDescription>Войдите в аккаунт или зарегистрируйтесь</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 sm:flex-initial flex flex-col justify-center sm:justify-start pb-12 sm:pb-6">
        <LoginForm isRegister={isRegister} toggleMode={toggleMode} />
      </CardContent>
    </Card>
  );
}
