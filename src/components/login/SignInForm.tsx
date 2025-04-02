'use client'; // Adicione esta linha no topo se estiver usando Next.js

import PageHeader from "../PageHeader";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Definindo o schema de validação
const loginSchema = z.object({
  email: z.string()
    .min(1, { message: 'E-mail é obrigatório' })
    .email({ message: 'E-mail inválido' }),
  password: z.string()
    .min(1, { message: 'Senha é obrigatória' })
    .min(6, { message: 'Senha deve ter no mínimo 6 caracteres' }),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function SignInForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { // Adicionando valores padrão
      email: '',
      password: ''
    }
  });

  const onSubmit = (data: LoginFormData) => {
    console.log('Dados do login:', data);
    // Aqui você faria a chamada à API de login
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen bg">
      <PageHeader />
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center w-full">
        <div className="w-1/2">
          <Input 
            placeholder="Email" 
            className="w-full mt-3 mb-1" 
            {...register('email')} 
          />
          {errors.email && (
            <span className="text-red-500 text-sm mb-3 block">{errors.email.message}</span>
          )}
        </div>

        <div className="w-1/2">
          <Input 
            placeholder="Senha" 
            type="password" 
            className="w-full mt-3 mb-1"
            {...register('password')}
          />
          {errors.password && (
            <span className="text-red-500 text-sm mb-3 block">{errors.password.message}</span>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-1/2 mt-4" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Entrando...' : 'Cadastrar-se'}
        </Button>
      </form>
    </div>
  );
}