import { Link } from 'react-router-dom';
import ExpandBranco from '../../../assets/ExpandBranco.png';
import heroImage from '../../../assets/home/hero.jpg';
import './HeroSection.css';

const ROTAS = { contato: '/contato', solucoes: '/solucoes' };

export default function HeroSection() {
  return (
    <section className="home-hero" aria-labelledby="home-hero-title">
      <img className="home-hero-bg" src={heroImage} alt="" />
      <div className="home-hero-overlay" aria-hidden="true" />

      <div className="home-hero-content">
        <h1 id="home-hero-title" className="home-hero-title">Consultoria Internacional</h1>
        <p className="home-hero-text">
          Expanda seus horizontes através das nossas soluções internacionais de alto impacto.
        </p>
        <div className="home-hero-actions">
          <Link className="home-hero-btn" to={ROTAS.contato}>Entre em contato</Link>
          <Link className="home-hero-btn" to={ROTAS.solucoes}>Nossos serviços</Link>
        </div>
      </div>

    </section>
  );
}