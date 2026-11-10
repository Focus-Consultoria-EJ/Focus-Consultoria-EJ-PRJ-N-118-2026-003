import { NavLink } from 'react-router-dom';
import ExpandBranco from '../../assets/ExpandBranco.png';
import './Sidebar.css';

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

function LogoutIcon() {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
        <path
          d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
}

const linkClass = ({isActive}) =>
    isActive ? 'app-sidebar-item app-sidebar-item-active' : 'app-sidebar-item';

export default function Sidebar({ userEmail, onLogout}) {
    return (
        <aside className="app-sidebar">
            <div className="app-sidebar-logo">
                <img src={ExpandBranco} alt="Expand Jr" />
            </div>

            <nav className="app-sidebar-nav" aria-label="Navegação de posts">
                <NavLink to="/geral-posts" className={linkClass}>
                    <ListIcon />
                    <span>Todos os posts</span>
                </NavLink>
                <NavLink to="/criar-post" className={linkClass}>
                    <DocumentPlusIcon />
                    <span>Adicionar post</span>
                </NavLink>
            </nav>

            <div className="app-sidebar-footer">
                <span className="app-sidebar-email">{userEmail}</span>
                <button type="button" className="app-sidebar-logout" onClick={onLogout}>
                    <LogoutIcon />
                    <span>Sair</span>
                </button>
            </div>
        </aside>
    )
}