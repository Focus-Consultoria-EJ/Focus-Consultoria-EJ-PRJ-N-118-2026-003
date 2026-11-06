import { useMemo, useState } from 'react';
import './Styles/GeralPostStyles.css';
import ExpandBranco from '../assets/ExpandBranco.png';

const initialPosts = [
  {
    id: 1,
    title:
      'Tensões no Mar do Sul da China e os impactos nas rotas marítimas globais',
    category: 'Geopolítica',
    status: 'Rascunho',
    date: 'Modificado 09/09/2026, 00:01',
  },
  {
    id: 2,
    title:
      'O futuro do comércio exterior: Inteligência artificial e Comércio digital',
    category: 'Comércio Exterior',
    status: 'Agendado',
    date: 'Agendado 10/09/2026, 19:41',
  },
  {
    id: 3,
    title:
      'Negociação intercultural: como fechar negócios com parceiros do Oriente Médio',
    category: 'Cultura e RI',
    status: 'Publicado',
    date: 'Publicado 12/08/2026, 19:41',
  },
];

const tabs = [
  { label: 'Todos', status: 'Todos' },
  { label: 'Publicado', status: 'Publicado' },
  { label: 'Agendado', status: 'Agendado' },
  { label: 'Rascunho', status: 'Rascunho' },
];

function ListIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M9 6h11M9 12h11M9 18h11"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M4.5 6h.01M4.5 12h.01M4.5 18h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function DocumentPlusIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
      <path
        d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M14 3v5h5M18 13v7M14.5 16.5h7"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Logo() {
  return (
    <div
      className="logo"
      aria-label="Expand Jr"
    >
      <img
        src={ExpandBranco}
        alt="Expand Jr"
        style={{ width: '100%', maxWidth: '160px', height: 'auto' }}
      />
    </div>
  );
}

 function GeralPost() {
  const [posts, setPosts] = useState(initialPosts);
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState('Todos');

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');
    return posts.filter((post) => {
      const matchesTab = activeTab === 'Todos' || post.status === activeTab;
      const matchesQuery =
        !normalizedQuery ||
        `${post.title} ${post.category} ${post.status}`
          .toLocaleLowerCase('pt-BR')
          .includes(normalizedQuery);
      return matchesTab && matchesQuery;
    });
  }, [activeTab, posts, query]);

  const countByStatus = (status) =>
    status === 'Todos'
      ? posts.length
      : posts.filter((post) => post.status === status).length;

  return (
    <div className="posts-page">
      <aside className="sidebar">
        <Logo />
        <nav aria-label="Navegação de posts">
          <button
            className="nav-item nav-item-active"
            type="button"
            onClick={() => setActiveTab('Todos')}
          >
            <ListIcon />
            <span>Todos os posts</span>
          </button>
          <button className="nav-item" type="button">
            <DocumentPlusIcon />
            <span>Adicionar post</span>
          </button>
        </nav>
      </aside>

      <main className="content">
        <section className="posts-section" aria-labelledby="posts-title">
          <h1 id="posts-title">Posts</h1>

          <div className="post-tools">
            <label className="search-field">
              <span className="sr-only">Pesquisar posts</span>
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
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
            <button className="add-button" type="button">
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
                aria-selected={activeTab === tab.status}
                className={activeTab === tab.status ? 'tab tab-active' : 'tab'}
                onClick={() => setActiveTab(tab.status)}
              >
                {tab.label} ({countByStatus(tab.status)})
              </button>
            ))}
          </div>

          <div className="table-card">
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Título</th>
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
                        <button className="post-title" type="button">
                          {post.title}
                        </button>
                      </td>
                      <td data-label="Categoria">
                        <span className="category">{post.category}</span>
                      </td>
                      <td data-label="Status">
                        <span
                          className={`status status-${post.status.toLocaleLowerCase('pt-BR')}`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td data-label="Data" className="date-cell">
                        {post.date}
                      </td>
                      <td className="actions-cell">
                        <button
                          className="delete-button"
                          type="button"
                          onClick={() =>
                            setPosts((current) =>
                              current.filter((item) => item.id !== post.id),
                            )
                          }
                        >
                          Excluir
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredPosts.length === 0 && (
                <p className="empty-state">Nenhum post encontrado.</p>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
export default GeralPost;