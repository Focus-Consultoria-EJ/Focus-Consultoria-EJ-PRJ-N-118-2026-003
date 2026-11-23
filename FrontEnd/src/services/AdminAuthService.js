import { supabase } from '../lib/supabase.js';

export async function loginAdmin(email, senha) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: senha,
  });

  if (error) {
    throw new Error('Email ou senha inválidos.');
  }

  const { data: admin, error: adminError } = await supabase
    .from('ADMIN')
    .select('id')
    .eq('id', data.user.id)
    .maybeSingle();

  if (adminError || !admin) {
    await supabase.auth.signOut();
    throw new Error('Este usuário não possui permissão de administrador.');
  }

  return data.user;
}

export async function verificarAdmin() {
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    return false;
  }

  const { data: admin, error: adminError } = await supabase
    .from('ADMIN')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (adminError || !admin) {
    return false;
  }

  return true;
}

export async function logoutAdmin() {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw error;
  }
}


export async function alterarEmailAdmin(emailAtual, novoEmail) {
  const { data: { user }, error: userError } =
    await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  const { data: admin, error: adminError } = await supabase
    .from('ADMIN')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (adminError || !admin) {
    throw new Error('Usuário sem permissão de administrador.');
  }

  if (user.email?.toLowerCase() !== emailAtual.trim().toLowerCase()) {
    throw new Error('O e-mail atual informado está incorreto.');
  }

  if (emailAtual.trim().toLowerCase() === novoEmail.trim().toLowerCase()) {
    throw new Error('O novo e-mail deve ser diferente do atual.');
  }

  const { error } = await supabase.auth.updateUser({
    email: novoEmail.trim()
  });

  if (error) {
    throw new Error(error.message);
  }

  return 'Solicitação enviada. Verifique os e-mails de confirmação.';
}


export async function alterarSenhaAdmin(senhaAtual, novaSenha) {
  const { data: { user }, error: userError } =
    await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('Sessão expirada. Faça login novamente.');
  }

  const { data: admin, error: adminError } = await supabase
    .from('ADMIN')
    .select('id')
    .eq('id', user.id)
    .maybeSingle();

  if (adminError || !admin) {
    throw new Error('Usuário sem permissão de administrador.');
  }

  if (senhaAtual === novaSenha) {
    throw new Error('A nova senha deve ser diferente da atual.');
  }

  if (novaSenha.length < 8) {
    throw new Error('A nova senha deve ter pelo menos 8 caracteres.');
  }

  const { error: loginError } = await supabase.auth
    .signInWithPassword({
      email: user.email,
      password: senhaAtual,
    });

  if (loginError) {
    throw new Error('A senha administrativa atual está incorreta.');
  }

  const { error: updateError } = await supabase.auth.updateUser({
    password: novaSenha,
  });

  if (updateError) {
    throw new Error(updateError.message);
  }

  return 'Senha administrativa alterada com sucesso!';
}

