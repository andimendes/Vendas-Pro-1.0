// src/app/page.jsx

"use client";

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation'; // Hook para redirecionamento
import { supabase } from '@/lib/supabase/client'; // Importa nosso cliente Supabase

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Inicializa o roteador

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Tenta fazer o login com o Supabase
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError('Email ou senha inválidos. Tente novamente.');
      console.error('Erro no login:', error.message);
    } else {
      // Se o login for bem-sucedido, redireciona para o dashboard
      router.push('/dashboard');
    }

    setLoading(false);
  };

  // O JSX (visual) continua o mesmo da etapa anterior...
  return (
    <div className="flex min-h-screen bg-slate-50">
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url('https://f005.backblazeb2.com/file/Mister-Ottani/24-1365_OTTANI_MENSAL_DEZEMBRO_MOMENTOS_POST_V1.jpg')" }}
      ></div>
      <div className="flex w-full lg:w-1/2 items-center justify-center p-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <Image
              className="mx-auto h-28 w-auto"
              src="https://f005.backblazeb2.com/file/Mister-Ottani/Logo-Mister-Ottani.png"
              alt="Logo Mister Ottani"
              width={200} height={112} priority
            />
            <h2 className="mt-6 text-center text-3xl font-bold text-slate-900">
              Bem-vindo ao Vendas PRO
            </h2>
            <p className="mt-2 text-center text-sm text-slate-600">
              Acesse sua conta para continuar
            </p>
          </div>
          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="email-address" className="block text-sm font-medium text-slate-700">Usuário:</label>
                <input
                  id="email-address" name="email" type="email"
                  autoComplete="email" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Seu e-mail"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700">Senha:</label>
                <input
                  id="password" name="password" type="password"
                  autoComplete="current-password" required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="Sua senha"
                />
              </div>
            </div>
            {error && (
              <div className="text-sm text-red-600 text-center font-medium p-3 bg-red-50 rounded-lg">
                {error}
              </div>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-red-600 focus:ring-red-500 border-slate-300 rounded" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                  Lembrar-me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-red-600 hover:text-red-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit" disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400"
              >
                {loading ? (
                  <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></span>
                ) : (
                  'Entrar'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}