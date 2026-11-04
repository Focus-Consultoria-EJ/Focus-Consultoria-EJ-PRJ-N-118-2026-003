import './Footer.css';

import iconInstagram from '../../assets/icons/instagram.svg';
import iconLinkedin from '../../assets/icons/linkedin.svg';
import iconMail from '../../assets/icons/mail.svg';

export function Footer() {
  return (
    <footer className="footer">
      
      <div className="footer-content">
        
        <div className="footer-left">
          <p>
            Empresa Júnior de Relações Internacionais da<br />
            UFRJ. Consultoria internacional de alto impacto.
          </p>
        </div>

        <nav className="footer-nav">
          <a href="#quem-somos">Quem Somos</a>
          <a href="#solucoes">Soluções</a>
          <a href="#cases">Cases</a>
          <a href="#blog">Blog</a>
          <a href="#contato">Contato</a>
        </nav>

        <div className="footer-social">
          <a href="#" target="_blank" rel="noreferrer">
            <img src={iconInstagram} alt="Instagram" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <img src={iconLinkedin} alt="LinkedIn" />
          </a>
          <a href="#" target="_blank" rel="noreferrer">
            <img src={iconMail} alt="E-mail" />
          </a>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Expand Jr. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}