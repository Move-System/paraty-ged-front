'use client'; // Adicione esta linha no topo se estiver usando Next.js

import PageHeader from "../PageHeader";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/Context/Auth/AuthContext";
import { useState } from "react";
import { AxiosError } from "axios";



interface ApiErrorResponse {
  message: string;
}

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

export default function LoginPageForm() {

  const [errorMessage, setErrorMessage] = useState('');

  const { login } = useAuth();
  
  


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

  const onSubmit = async (data: LoginFormData) => {
    setErrorMessage('');
    console.log('Dados do login:', data);
  
    // Aqui você faria a chamada à API de login
   try {
  await login(data.email, data.password);
} catch (error: unknown) {
  const err = error as AxiosError<ApiErrorResponse>;

  const message = err.response?.data?.message || "Erro ao fazer login";
  setErrorMessage(message);
  console.error(message);
}
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center w-full h-screen bg">
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

        <div className="w-1/2 mt-4">
          <a href="/auth/reset-password" className="text-sm text-gray-500 hover:underline hover:text-gray-600">Esqueceu sua senha?</a>
        </div>
        {errorMessage && (
  <div className="w-1/2 mt-4 text-left text-sm text-red-500">
    {errorMessage}
  </div>
)}

        <Button 
          type="submit" 
          className="w-1/2 mt-4" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>
    </div>
  );
}