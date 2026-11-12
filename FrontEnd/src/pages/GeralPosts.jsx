import { useMemo, useState } from 'react';
import './Styles/GeralPostStyles.css';
import Sidebar from '../components/Sidebar/Sidebar';

const initialPosts = [
  {
    id: 1,
    title:
      'Tensões no Mar do Sul da China e os impactos nas rotas marítimas globais',
    category: 'Geopolítica',
    status: 'Rascunho',
    date: {
      label: 'Modificado',
      day: '09/09/2026',
      time: '00:01',
    },
  },
  {
    id: 2,
    title:
      'O futuro do comércio exterior: Inteligência artificial e Comércio digital',
    category: 'Comércio Exterior',
    status: 'Agendado',
    date: {
      label: 'Agendado',
      day: '10/09/2026',
      time: '19:41',
    },
  },
  {
    id: 3,
    title:
      'Negociação intercultural: como fechar negócios com parceiros do Oriente Médio',
    category: 'Cultura e RI',
    status: 'Publicado',
    date: {
      label: 'Publicado',
      day: '12/08/2026',
      time: '19:41',
    },
  },
];

const tabs = [
  { label: 'Todos', status: 'Todos' },
  { label: 'Publicado', status: 'Publicado' },
  { label: 'Agendado', status: 'Agendado' },
  { label: 'Rascunho', status: 'Rascunho' },
];

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
      <Sidebar />

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
                        <div className="date-cell-details">
                          <div className="date-cell-label">{post.date.label}</div>
                          <div className="date-cell-day">{post.date.day}</div>
                          <div className="date-cell-time">{post.date.time}</div>
                        </div>
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