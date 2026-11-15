
import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Styles/GeralPostStyles.css';

import Sidebar from '../components/Sidebar/Sidebar';

import {
  listarPosts,
  excluirPost,
} from '../services/PostsService.js';

import {
  obterTokenBlog,
  logoutBlog,
} from '../services/BlogAuthService.js';

const tabs = [
  { label: 'Todos', status: 'Todos' },
  { label: 'Publicado', status: 'Publicado' },
  { label: 'Agendado', status: 'Agendado' },
  { label: 'Rascunho', status: 'Rascunho' },
];

function normalizarStatus(status) {
  const valor = String(status || '').trim().toLowerCase();

  const statusMap = {
    publicado: 'Publicado',
    published: 'Publicado',
    agendado: 'Agendado',
    scheduled: 'Agendado',
    rascunho: 'Rascunho',
    draft: 'Rascunho',
  };

  return statusMap[valor] || status || 'Rascunho';
}

function formatarPost(post) {
  const data = post.dataEdicao || post.dataPublicacao;
  const dataFormatada = data ? new Date(data) : null;

  const dataValida =
    dataFormatada && !Number.isNaN(dataFormatada.getTime());

  const categorias = (post.POST_CATEGORIA ?? [])
    .map((relacao) => relacao.CATEGORIA?.nome)
    .filter(Boolean);

  const categoriaFormatada =
    categorias.length > 0
      ? categorias.join(', ')
      : 'Sem categoria';

  return {
    id: post.id,
    title: post.titulo,
    author: post.autor || 'Não informado',
    category: categoriaFormatada,
    status: normalizarStatus(post.status),
    date: {
      label: post.dataEdicao ? 'Modificado' : 'Publicado',
      day: dataValida
        ? dataFormatada.toLocaleDateString('pt-BR')
        : '-',
      time: dataValida
        ? dataFormatada.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit',
          })
        : '-',
    },
  };
}

function GeralPost() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Todos');

  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');

  const [excluindoId, setExcluindoId] = useState(null);
  const [postParaExcluir, setPostParaExcluir] = useState(null);

  useEffect(() => {
    let ativo = true;

    async function carregarPosts() {
      const token = obterTokenBlog();

      if (!token) {
        navigate('/login', { replace: true });
        return;
      }

      try {
        const dados = await listarPosts();

        if (!ativo) return;

        setPosts(dados.map(formatarPost));
      } catch (error) {
        if (!ativo) return;

        const mensagem =
          error.message || 'Erro ao carregar posts.';

        if (
          mensagem.includes('Sessão inválida') ||
          mensagem.includes('Sessão não encontrada') ||
          mensagem.includes('expirada')
        ) {
          logoutBlog();
          navigate('/login', { replace: true });
          return;
        }

        setErro(mensagem);
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    carregarPosts();

    return () => {
      ativo = false;
    };
  }, [navigate]);

  function abrirModalExcluir(post) {
    if (excluindoId !== null) return;

    setPostParaExcluir(post);
  }

  function fecharModalExcluir() {
    if (excluindoId !== null) return;

    setPostParaExcluir(null);
  }

  async function handleExcluir() {
    if (!postParaExcluir || excluindoId !== null) return;

    const post = postParaExcluir;

    setErro('');
    setExcluindoId(post.id);

    try {
      await excluirPost(post.id);

      setPosts((postsAtuais) =>
        postsAtuais.filter(
          (item) => item.id !== post.id
        )
      );

      setPostParaExcluir(null);
    } catch (error) {
      console.error('Erro ao excluir post:', error);

      const mensagem =
        error.message || 'Não foi possível excluir o post.';

      if (
        mensagem.includes('Sessão inválida') ||
        mensagem.includes('Sessão não encontrada') ||
        mensagem.includes('expirada')
      ) {
        logoutBlog();
        navigate('/login', { replace: true });
        return;
      }

      setErro(mensagem);
    } finally {
      setExcluindoId(null);
    }
  }

  useEffect(() => {
    if (!postParaExcluir) return;

    function handleKeyDown(event) {
      if (
        event.key === 'Escape' &&
        excluindoId === null
      ) {
        setPostParaExcluir(null);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [postParaExcluir, excluindoId]);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query
      .trim()
      .toLocaleLowerCase('pt-BR');

    return posts.filter((post) => {
      const matchesTab =
        activeTab === 'Todos' ||
        post.status === activeTab;

      const matchesQuery =
        !normalizedQuery ||
        `${post.title} ${post.author} ${post.category} ${post.status}`
          .toLocaleLowerCase('pt-BR')
          .includes(normalizedQuery);

      return matchesTab && matchesQuery;
    });
  }, [activeTab, posts, query]);

  const countByStatus = (status) =>
    status === 'Todos'
      ? posts.length
      : posts.filter(
          (post) => post.status === status
        ).length;

  return (
    <div className="posts-page">
      <Sidebar />

      <main className="content">
        <section
          className="posts-section"
          aria-labelledby="posts-title"
        >
          <h1 id="posts-title">Posts</h1>

          <div className="post-tools">
            <label className="search-field">
              <span className="sr-only">
                Pesquisar posts
              </span>

              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                fill="none"
                className="search-icon"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />

                <path
                  d="M16.5 16.5L21 21"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              <input
                type="search"
                placeholder="Pesquisar posts"
                value={query}
                onChange={(event) =>
                  setQuery(event.target.value)
                }
              />
            </label>

            <button
              className="add-button"
              type="button"
              onClick={() => navigate('/criar-post')}
            >
              Adicionar post
            </button>
          </div>

          <div
            className="tabs"
            role="tablist"
            aria-label="Filtrar posts por status"
          >
            {tabs.map((tab) => (
              <button
                key={tab.status}
                type="button"
                role="tab"
                aria-selected={
                  activeTab === tab.status
                }
                className={
                  activeTab === tab.status
                    ? 'tab tab-active'
                    : 'tab'
                }
                onClick={() =>
                  setActiveTab(tab.status)
                }
              >
                {tab.label} ({countByStatus(tab.status)})
              </button>
            ))}
          </div>

          {carregando && (
            <p>Carregando posts...</p>
          )}

          {erro && (
            <p
              role="alert"
              style={{
                color: '#dc2626',
                marginBottom: '16px',
              }}
            >
              {erro}
            </p>
          )}

          <div className="table-card">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Categoria</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th aria-label="Ações" />
                  </tr>
                </thead>

                <tbody>
                  {filteredPosts.map((post) => (
                    <tr key={post.id}>
                      <td data-label="Título">
                        <button
                          className="post-title"
                          type="button"
                          onClick={() =>
                            navigate(
                              `/editar-post/${post.id}`
                            )
                          }
                          disabled={
                            excluindoId === post.id
                          }
                        >
                          {post.title}
                        </button>
                      </td>

                      <td data-label="Autor">
                        {post.author}
                      </td>

                      <td data-label="Categoria">
                        <span className="category">
                          {post.category}
                        </span>
                      </td>

                      <td data-label="Status">
                        <span
                          className={`status status-${post.status.toLocaleLowerCase('pt-BR')}`}
                        >
                          {post.status}
                        </span>
                      </td>

                      <td
                        data-label="Data"
                        className="date-cell"
                      >
                        <div className="date-cell-details">
                          <div className="date-cell-label">
                            {post.date.label}
                          </div>

                          <div className="date-cell-day">
                            {post.date.day}
                          </div>

                          <div className="date-cell-time">
                            {post.date.time}
                          </div>
                        </div>
                      </td>

                      <td className="actions-cell">
                        <button
                          className="delete-button"
                          type="button"
                          onClick={() =>
                            abrirModalExcluir(post)
                          }
                          disabled={
                            excluindoId !== null
                          }
                          title={`Excluir ${post.title}`}
                        >
                          {excluindoId === post.id
                            ? 'Excluindo...'
                            : 'Excluir'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {!carregando &&
                !erro &&
                filteredPosts.length === 0 && (
                  <p className="empty-state">
                    Nenhum post encontrado.
                  </p>
                )}
            </div>
          </div>
        </section>
      </main>

      {postParaExcluir && (
        <div
          className="posts-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              excluindoId === null
            ) {
              fecharModalExcluir();
            }
          }}
        >
          <div
            className="posts-modal"
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="posts-modal-title"
            aria-describedby="posts-modal-description"
          >
            <div className="posts-modal-icon">
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M3 6h18M8 6V4h8v2M5 6l1 14h12l1-14M10 10v7M14 10v7" />
              </svg>
            </div>

            <h2 id="posts-modal-title">
              Excluir post?
            </h2>

            <p id="posts-modal-description">
              Tem certeza que deseja excluir o post
              <strong>
                {' '}"{postParaExcluir.title}"
              </strong>
              ?
            </p>

            <p className="posts-modal-warning">
              Esta ação é permanente e não poderá ser desfeita.
            </p>

            <div className="posts-modal-actions">
              <button
                type="button"
                className="posts-modal-cancel"
                onClick={fecharModalExcluir}
                disabled={excluindoId !== null}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="posts-modal-confirm"
                onClick={handleExcluir}
                disabled={excluindoId !== null}
              >
                {excluindoId !== null
                  ? 'Excluindo...'
                  : 'Sim, excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GeralPost;
