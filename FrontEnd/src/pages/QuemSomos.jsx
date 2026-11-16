import './Styles/QuemSomos.css';
import ExpandAzul from "../assets/logos/ExpandAzul.png";
import LogoNova from "../assets/logos/LogoNova.png";
import calendarIcon from "../assets/icons/calendar.svg";
import clockIcon from "../assets/icons/clock.svg";
import graduationIcon from "../assets/icons/graduationCap.svg"; 
import inspectionIcon from "../assets/icons/inspection.svg";
import groupIcon from "../assets/icons/group.svg";
import clipBoardIcon from "../assets/icons/clipboard.svg";
import caseSucesso1 from "../assets/imagens/17transp.png";
import caseSucesso2 from "../assets/imagens/18transp.png";
import caseSucesso3 from "../assets/imagens/19transp.png";

import { useRef, useState } from 'react';

export const QuemSomos = () => {
  const resultadosRef = useRef(null);
  const casesRef = useRef(null);
  const parceirosRef = useRef(null);
  const [ordemParceiros, setOrdemParceiros] = useState(0);

  const moverResultados = (direcao) => {
    if (!resultadosRef.current) return;

    resultadosRef.current.scrollBy({
      left: resultadosRef.current.clientWidth * 0.8 * direcao,
      behavior: 'smooth',
    });
  };
  const moverCases = (direcao) => {
    const trilho = casesRef.current;

    if (!trilho) return;

    const primeiroCard = trilho.querySelector('.cases-sucesso-item');

    if (!primeiroCard) return;

    const larguraCard = primeiroCard.getBoundingClientRect().width;
    const espacamento = 24;

    trilho.scrollBy({
      left: (larguraCard + espacamento) * direcao,
      behavior: 'smooth',
    });
  };
  const moverParceiros = (direcao) => {
    const trilho = parceirosRef.current;

    if (!trilho) return;

    if (trilho.scrollWidth <= trilho.clientWidth) {
      setOrdemParceiros((atual) => (atual + direcao + 3) % 3);
      return;
    }

    trilho.scrollTo({
      left: trilho.scrollLeft + trilho.clientWidth * 0.8 * direcao,
      behavior: 'instant',
    });
  };

  return (
    <section className="quem-somos-section">
      <div className="quem-somos-content">
        <div className="quem-somos-texto">
          <span className="quem-somos-selo">
            EXPAND JR. · UFRJ
          </span>
          <h1>QUEM SOMOS</h1>
          <p>
            Somos a Empresa Júnior de Relações Internacionais da UFRJ. Há mais de 10 anos ajudamos
            empresas brasileiras a expandir seus horizontes com estudos de mercado, planejamento
            logístico e análise burocrática — sempre com rigor técnico e preços acessíveis.
          </p>
          </div>
          <div className="quem-somos-foto">
            <img src={LogoNova} alt="Equipe da Expand Jr." className="quem-somos-imagem">
            </img>
          </div>
        
      </div>

      <section className="porque-section" aria-labelledby="porque-titulo">
        <div className="porque-titulo-container">
          <h2 className="texto-pergunta" id="porque-titulo">Por que escolher a</h2>
          <img src={ExpandAzul} alt="Expand Jr." width="220" />
          <h2 className="interrogacao" aria-hidden="true">?</h2>
        </div>

        <div className="porque-escolher-content">
          <div className="cards-grid">
            <div className="card-item">
              <h3>Formação em Relações Internacionais aplicada</h3>
              <p>Equipe formada por estudantes de RI da UFRJ, unindo teoria sólida à execução prática de consultoria.</p>
            </div>

            <div className="card-item">
              <h3>Análise estratégica com visão internacional</h3>
              <p>Pesquisa, conjuntura e cenários globais transformados em estratégia alinhada à realidade do cliente.</p>
            </div>

            <div className="card-item">
              <h3>Transparência e compromisso técnico</h3>
              <p>Atuação ética, processos claros e entregas responsáveis garantem confiança e segurança.</p>
            </div>

            <div className="card-item">
              <h3>Soluções acessíveis e abaixo do mercado</h3>
              <p>Consultoria estratégica com preços mais acessíveis do que o mercado tradicional.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="resultados-section">
        <h2 className="resultados-titulo">RESULTADOS</h2>
        <div className="resultados-carrossel">
          <div className="resultados-controles resultados-carrossel-controles">
            <button type="button" className="controle prev" onClick={() => moverResultados(-1)} aria-label="Ver resultados anteriores">
              <span aria-hidden="true" />
            </button>

            <button type="button" className="controle next" onClick={() => moverResultados(1)} aria-label="Ver próximos resultados">
              <span aria-hidden="true" />
            </button>
          </div>

          <div className="resultados-grid" ref={resultadosRef}>
            <div className="resultado-item">
              <img src={calendarIcon} alt="Anos no mercado" />
              <h3>+ 10</h3>
              <p>Anos no mercado</p>
            </div>

            <div className="resultado-item">
              <img src={clipBoardIcon} alt="Projetos realizados" />
              <h3>+ 80</h3>
              <p>Projetos realizados</p>
            </div>

            <div className="resultado-item">
              <img src={clockIcon} alt="Horas de pesquisa" />
              <h3>+ 1000</h3>
              <p>Horas de pesquisa</p>
            </div>

            <div className="resultado-item">
              <img src={inspectionIcon} alt="Satisfação dos clientes" />
              <h3>+ 90%</h3>
              <p>Satisfação dos clientes</p>
            </div>

            <div className="resultado-item">
              <img src={groupIcon} alt="Capacitações oferecidas para equipe" />
              <h3>+ 30</h3>
              <p>Capacitações oferecidas para equipe</p>
            </div>

            <div className="resultado-item">
              <img src={graduationIcon} alt="Estudantes impactados" />
              <h3>+ 300</h3>
              <p>Estudantes impactados</p>
            </div>
          </div>
        </div>
      </div>

      <div className="cases-sucesso-section">
        <div className="cases-sucesso-titulo">
          <h2>Cases de sucesso!</h2>
        </div>
        <div className="cases-sucesso-area">
          <div className= "cases-sucesso-controles">
            <div className="resultados-controles">
              <button type="button" className="controle prev" onClick={() => moverCases(-1)} aria-label="Ver cases anteriores">
                <span aria-hidden="true" />
              </button>

              <button type="button" className="controle next" onClick={() => moverCases(1)} aria-label="Ver próximos cases">
                <span aria-hidden="true" />
              </button>
            </div>
          </div>
          <div className="cases-sucesso-grid" ref={casesRef}>
            <div className="cases-sucesso-item">
              <img src={caseSucesso1} alt="Case de Sucesso 1" />
            </div>
            <div className="cases-sucesso-item">
              <img src={caseSucesso2} alt="Case de Sucesso 1" />
            </div>
            <div className="cases-sucesso-item">
              <img src={caseSucesso3} alt="Case de Sucesso 1" />
            </div>
          </div>

        </div>
        

      </div>

      
    </section>
  );
};