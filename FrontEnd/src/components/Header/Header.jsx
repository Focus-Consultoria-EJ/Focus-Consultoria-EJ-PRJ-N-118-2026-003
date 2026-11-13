import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import './Header.css';

import expandBrancoLogo from "../../assets/logos/ExpandBranco.png";
import loginIcon from "../../assets/icons/log-in.svg";
import menuIcon from "../../assets/icons/menu.svg";
import closeIcon from "../../assets/icons/x.svg";

export const Header = () => {
  const location = useLocation();
  const isTransparent = location.pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={`header ${isTransparent ? 'header-transparent' : 'header-solid'}`}>
      
      <div className="header-container">
        
        <div className="header-left">
          <Link to="/" className="logo-link" onClick={closeMenu}>
            <img src={expandBrancoLogo} alt="ExpandBranco" width="130" />
          </Link>
          <Link to="/login" className="btn-login desktop-only">
            <img src={loginIcon} alt="login" width="16" />
            Entrar
          </Link>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <img src={isMenuOpen ? closeIcon : menuIcon} alt="Menu"/>
        </button>

        <nav className={`header-nav ${isMenuOpen ? "open" : ""}`}>
          <NavLink to="/" onClick={closeMenu}>Início</NavLink>
          <NavLink to="/quem-somos" onClick={closeMenu}>Quem Somos</NavLink>
          <NavLink to="/solucoes" onClick={closeMenu}>Soluções</NavLink>
          <NavLink to="/cases" onClick={closeMenu}>Cases</NavLink>
          <NavLink to="/blog" onClick={closeMenu}>Blog</NavLink>
          <NavLink to="/contato" onClick={closeMenu}>Contato</NavLink>

          <Link to="/login" className="btn-login mobile-only" onClick={closeMenu}>
            <img src={loginIcon} alt="login" width="16" />
            Entrar
          </Link>
        </nav>
      </div>
      <div className="header-line" />
    </header>
  );
}