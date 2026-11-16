import { supabase } from '../lib/supabase.js';

const TOKEN_KEY = 'blog_manager_token';

export async function loginBlog(senha) {
  const { data, error } = await supabase.functions.invoke('login-blog', {
    body: { senha },
  });

  if (error) {
    throw new Error(
      data?.error || error.message || 'Erro ao realizar login'
    );
  }

  if (!data?.token) {
    throw new Error('O servidor não retornou um token');
  }

  sessionStorage.setItem(TOKEN_KEY, data.token);

  return data;
}

export function obterTokenBlog() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function logoutBlog() {
  sessionStorage.removeItem(TOKEN_KEY);
}
