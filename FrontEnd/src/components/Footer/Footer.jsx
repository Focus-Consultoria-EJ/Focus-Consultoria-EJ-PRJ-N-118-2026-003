import { Link } from "react-router-dom";
import './Footer.css';

import instagramIcon from '../../assets/icons/instagram.svg';
import linkedinIcon from '../../assets/icons/linkedin.svg';
import mailIcon from '../../assets/icons/mail.svg';

import expandBrancoLogo from '../../assets/logos/ExpandBranco.png';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      
      <div className="footer-content">
        
        <div className="footer-left">
          <img src={expandBrancoLogo} alt="ExpandBranco" width="130" className="footer-logo" />
          <p>
            Empresa Júnior de Relações Internacionais da
            <br />
            UFRJ. Consultoria internacional de alto impacto.
          </p>
        </div>

        <nav className="footer-nav">
          <Link to="/quem-somos">Quem Somos</Link>
          <Link to="/solucoes">Soluções</Link>
          <Link to="/cases">Cases</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/contato">Contato</Link>
        </nav>

        <div className="footer-social">
          <a href="https://www.instagram.com/expandjr" target="_blank" rel="noreferrer">
            <img src={instagramIcon} alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com/company/expandjr/" target="_blank" rel="noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" />
          </a>
          <a href="mailto:comercial.expandjr.ufrj@gmail.com">
            <img src={mailIcon} alt="E-mail" />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {currentYear} Expand Jr. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}