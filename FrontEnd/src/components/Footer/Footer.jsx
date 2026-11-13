import './Footer.css';

import iconInstagram from '../../assets/icons/instagram.svg';
import iconLinkedin from '../../assets/icons/linkedin.svg';
import iconMail from '../../assets/icons/mail.svg';
import logoExpand from '../../assets/ExpandBranco.png';

export function Footer() {
  return (
    <footer className="footer">
      
      <div className="footer-content">
        <div className="footer-brand">
          <a className="footer-logo" href="#inicio" aria-label="Expand Jr. - início">
            <img src={logoExpand} alt="Expand Jr." />
          </a>
          <p>
            Empresa Júnior de Relações Internacionais da
            UFRJ. <br />Consultoria internacional de alto impacto.
          </p>
        </div>

        <nav className="footer-nav">
          <a href="/quem-somos">Quem Somos</a>
          <a href="/solucoes">Soluções</a>
          <a href="/blog">Blog</a>
          <a href="/contato">Contato</a>
        </nav>

        <div className="footer-social">
          <a href="https://www.instagram.com/expandjr?srtk=MWhzc3ozazEzNXVyZA==" target="_blank" rel="noreferrer">
            <img src={iconInstagram} alt="Instagram" />
          </a>
          <a href="https://www.linkedin.com/company/expandjr" target="_blank" rel="noreferrer">
            <img src={iconLinkedin} alt="LinkedIn" />
          </a>
          <a href="mailto:comercial.expandjr.ufrj@gmail.com" target="_blank" rel="noreferrer">
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