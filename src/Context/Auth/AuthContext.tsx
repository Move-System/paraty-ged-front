
"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getApiClient } from "@/services/apiClient";
import { useRouter } from "next/navigation";

const api = getApiClient();


interface User{
    id: number;
    name: string;
    email: string;
    role: string;
}

interface AuthContextProps {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    SignIn: (email: string, password: string, name: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
}


const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
        const user = userData ? JSON.parse(userData) : null;
             setUser(user);
        }
    }, []);

    async function login(email: string, password: string) {
      try{
          const response = await api.post('/auth/login', {
            email,
            password
        });

        console.log(response.data);

        const { token, user } = response.data;
        console.log(response.data);
        router.push('/admin');


        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        setUser(user);
      }catch(error : unknown){
        throw error
      }
    }

    async function SignIn(email: string, password: string, name: string) {
        try{
            const response = await api.post('/user', {
                email,
                password,
                name: name

            });
            console.log(response.data);
            router.push('/auth/login');
        }catch(error : unknown){
            throw error
        }
    }

 

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        router.push('/auth/login');
    }

    return (
        <AuthContext.Provider value={{ user, login, SignIn, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );

}

export function useAuth() {
    return useContext(AuthContext);
}