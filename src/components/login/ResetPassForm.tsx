'use client'; // Adicione esta linha no topo se estiver usando Next.js

import PageHeader from "../PageHeader";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import  {PasswordResetData,resetPassSchema} from   "@/lib/Validations/resetPassSchema"



export default function ResetPassForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PasswordResetData>({
    resolver: zodResolver(resetPassSchema),
    defaultValues: { // Adicionando valores padrão
      email: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: PasswordResetData) => {
    console.log('Dados do login:', data);
    // Aqui você faria a chamada à API de login[

    // window.location.href = '/auth/login'

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
            placeholder="Nova Senha" 
            type="password" 
            className="w-full mt-3 mb-1"
            {...register('newPassword')}
          />
          {errors.newPassword && (
            <span className="text-red-500 text-sm mb-3 block">{errors.newPassword.message}</span>
          )}
        </div>
         <div className="w-1/2">
          <Input 
            placeholder="Confirmar Senha" 
            type="password" 
            className="w-full mt-3 mb-1"
            {...register('confirmPassword')}
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm mb-3 block">{errors.confirmPassword.message}</span>
          )}
        </div>

      

        <Button 
          type="submit" 
          className="w-1/2 mt-4" 
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Recuperando...' : 'Recuperar senha'}
        </Button>
      </form>
    </div>
  );
}