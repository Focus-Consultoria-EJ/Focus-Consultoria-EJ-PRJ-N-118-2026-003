import './QuemSomos.css';
import ExpandAzul from "../../assets/logos/ExpandAzul.png";
import calendarIcon from "../../assets/icons/calendar.svg";
import clockIcon from "../../assets/icons/clock.svg";
import graduationIcon from "../../assets/icons/graduationCap.svg"; 
import inspectionIcon from "../../assets/icons/inspection.svg";
import groupIcon from "../../assets/icons/group.svg";
import clipBoardIcon from "../../assets/icons/clipboard.svg";

export const QuemSomos = () => {
  return (
    <section className="quem-somos-section">
      <div className="quem-somos-content">
        <h1>QUEM SOMOS</h1>
        <p>
          Somos a Empresa Júnior de Relações Internacionais da UFRJ. Há mais de 10 anos ajudamos
          empresas brasileiras a expandir seus horizontes com estudos de mercado, planejamento
          logístico e análise burocrática — sempre com rigor técnico e preços acessíveis.
        </p>
      </div>

      <div className="porque-titulo-container">
        <h2 className="texto-pergunta">Por que escolher a</h2>
        <img src={ExpandAzul} alt="Por que escolher a Expand Jr?" width="220" />
        <h2 className="interrogacao">?</h2>
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

      <div className="resultados-section">
        <h2 className="resultados-titulo">RESULTADOS</h2>

        <div className="resultados-grid">
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
    </section>
  );
};