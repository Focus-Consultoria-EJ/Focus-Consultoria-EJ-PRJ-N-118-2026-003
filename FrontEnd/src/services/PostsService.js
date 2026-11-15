
import { supabase } from '../lib/supabase.js';
import { obterTokenBlog } from './BlogAuthService.js';

async function executarAcaoBlog(acao, dados = {}) {
  const token = obterTokenBlog();

  if (!token) {
    throw new Error('Sessão do blog expirada. Faça login novamente.');
  }

  const { data, error } = await supabase.functions.invoke('gerenciar-posts', {
    body: { acao, ...dados },
    headers: { Authorization: `Bearer ${token}` },
  });

  if (error) {
    const resposta = error.context;
    let mensagem;

    if (resposta && typeof resposta.json === 'function') {
      try {
        const json = await resposta.json();
        mensagem = json?.error || json?.message;
      } catch {}
    }

    throw new Error(
      mensagem || error.message || 'Erro ao executar operação.'
    );
  }

  if (data?.error) {
    throw new Error(data.error);
  }

  return data;
}

export async function listarPosts() {
  const resposta = await executarAcaoBlog('listar');
  return resposta.posts ?? [];
}

export async function buscarPost(id) {
  const resposta = await executarAcaoBlog('buscar', { id });
  return resposta.post;
}

export async function criarPost(dados) {
  return executarAcaoBlog('criar', dados);
}

export async function editarPost(id, dados) {
  return executarAcaoBlog('editar', { id, ...dados });
}

export async function excluirPost(id) {
  return executarAcaoBlog('excluir', { id });
}

export async function listarCategorias() {
  const { data, error } = await supabase
    .from('CATEGORIA')
    .select('id, nome')
    .order('nome');

  if (error) {
    throw new Error('Não foi possível carregar as categorias.');
  }

  return data ?? [];
}

export function obterUrlCapa(caminho) {
  if (!caminho) return null;

  if (/^https?:\/\//i.test(caminho)) {
    return caminho;
  }

  const { data } = supabase.storage
    .from('capas-posts')
    .getPublicUrl(caminho);

  return data.publicUrl;
}

export async function uploadCapa(arquivo) {
  const tipos = [
    'image/jpeg',
    'image/png',
    'image/webp',
  ];

  if (
    !(arquivo instanceof File) ||
    !tipos.includes(arquivo.type)
  ) {
    throw new Error('Escolha uma imagem JPG, PNG ou WebP.');
  }

  if (
    !arquivo.size ||
    arquivo.size > 5 * 1024 * 1024
  ) {
    throw new Error('A imagem deve ter no máximo 5 MB.');
  }

  const base64 = await new Promise((resolve, reject) => {
    const leitor = new FileReader();

    leitor.onload = () => {
      resolve(String(leitor.result).split(',')[1]);
    };

    leitor.onerror = () => {
      reject(new Error('Não foi possível ler a imagem.'));
    };

    leitor.readAsDataURL(arquivo);
  });

  return executarAcaoBlog('upload-capa', {
    imagem: {
      base64,
      tipo: arquivo.type,
    },
  });
}
