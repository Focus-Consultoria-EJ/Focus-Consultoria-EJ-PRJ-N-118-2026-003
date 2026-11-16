import './Header.css';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logoExpand from '../../assets/ExpandBranco.png';

export function Header({ transparente = false }) {
  const [menuAberto, setMenuAberto] = useState(false);

  const fecharMenu = () => setMenuAberto(false);

  return (
    <header className={`header ${transparente ? 'header-transparente' : 'header-solido'}`}>
      <div className="header-container">
        <Link
          className="header-logo"
          to="/"
          aria-label="Expand Jr. - início"
          onClick={fecharMenu}
        >
          <img src={logoExpand} alt="Expand Jr." />
        </Link>
        <button
          className="header-menu-toggle"
          type="button"
          aria-label={menuAberto ? 'Fechar menu' : 'Abrir menu'}
          aria-expanded={menuAberto}
          aria-controls="header-navigation"
          onClick={() => setMenuAberto((aberto) => !aberto)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav
          id="header-navigation"
          className={`header-nav${menuAberto ? ' header-nav-open' : ''}`}
          aria-label="Navegação principal"
        >
          <NavLink to="/" end onClick={fecharMenu}>Início</NavLink>
          <NavLink to="/quem-somos" onClick={fecharMenu}>Quem Somos</NavLink>
          <NavLink to="/solucoes" onClick={fecharMenu}>Soluções</NavLink>
          <NavLink to="/blog" onClick={fecharMenu}>Blog</NavLink>
          <NavLink to="/contato" onClick={fecharMenu}>Contato</NavLink>
        </nav>
      </div>

      <div className="header-line" />
    </header>
  );
}
