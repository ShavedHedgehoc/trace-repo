import { cn } from '@/lib/utils';

import { Button, Field, FieldDescription, FieldGroup, FieldLabel, Input } from '@/shared/ui';
import { FormProvider } from 'react-hook-form';
import { useAuthForm } from '../model/use-form';

interface LoginFormProps extends React.ComponentProps<'div'> {
  isRegister: boolean;
  toggleMode: () => void;
}

export function LoginForm({ className, isRegister, toggleMode, ...props }: LoginFormProps) {
  const { form, onSubmit } = useAuthForm(isRegister);
  const toggle = () => {
    toggleMode();
    form.reset();
  };
  return (
    <div className={cn('w-full', className)} {...props}>
      <FormProvider {...form}>
        <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
            {isRegister && (
              <Field>
                <FieldLabel htmlFor="name">ФИО</FieldLabel>
                <Input
                  id="name"
                  type="name"
                  placeholder="m@example.com"
                  required
                  {...form.register('name')}
                />
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="email">Электропочта</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                {...form.register('email')}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input id="password" type="password" required {...form.register('password')} />
            </Field>
            <Field>
              <Button type="submit" className="w-full">
                {isRegister ? 'Зарегистрироваться' : 'Войти'}
              </Button>
              <FieldDescription className="text-end mt-4">
                {isRegister ? 'Уже зарегистрированы? ' : 'Нет аккаунта? '}
                <span
                  onClick={toggle}
                  className="text-primary font-bold cursor-pointer transition-colors hover:underline"
                >
                  {isRegister ? 'Войти' : 'Создать'}
                </span>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </FormProvider>
    </div>
  );
}
