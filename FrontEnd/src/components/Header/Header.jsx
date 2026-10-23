import './Header.css';

export function Header({ transparente = false, mudarPagina }) {
  return (
    <header className={`header ${transparente ? 'header-transparente' : 'header-solido'}`}>
      <div className="header-container">
        
        <nav className="header-nav">
          <a href="#inicio" onClick={() => mudarPagina('inicio')}>Início</a>
          <a href="#quem-somos" onClick={() => mudarPagina('quem-somos')}>Quem Somos</a>
          <a href="#solucoes" onClick={() => mudarPagina('solucoes')}>Soluções</a>
          <a href="#cases" onClick={() => mudarPagina('cases')}>Cases</a>
          <a href="#blog" onClick={() => mudarPagina('blog')}>Blog</a>
          <a href="#contato" onClick={() => mudarPagina('contato')}>Contato</a>
        </nav>
        
      </div>

      <div className="header-line" />
    </header>
  );
}
