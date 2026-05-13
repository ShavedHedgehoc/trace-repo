import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { loginSchema, registerSchema, type TAuthInput } from '@repo/schemas';
import { useAuth } from '@/app/providers';

export const useAuthForm = (isRegister: boolean) => {
  const { login, register } = useAuth();
  const form = useForm<TAuthInput>({
    resolver: zodResolver(isRegister ? registerSchema : loginSchema),
    defaultValues: isRegister ? { email: '', password: '', name: '' } : { email: '', password: '' },
  });

  const isPending = form.formState.isSubmitting; //|| isSuccess;

  async function onSubmit(data: TAuthInput) {
    try {
      if (isRegister) {
        await register({
          email: data.email,
          password: data.password,
          name: data.name!,
        });
      } else {
        await login(data);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return {
    form,
    onSubmit: onSubmit,
    isSubmitting: isPending,
  };
};
