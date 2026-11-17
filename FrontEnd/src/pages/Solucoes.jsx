import './Styles/Solucoes.css';
import { useRef } from 'react';
import cnpjIcon from "../assets/icons/cnpj.svg";
import cpfIcon from '../assets/icons/cpf.svg';
import brIcon from "../assets/icons/br.svg";
import globoIcon from "../assets/icons/globo.svg";
import imagem1 from '../assets/imagens/img1.jpg';
import imagem2 from '../assets/imagens/img2.jpg';
import imagem3 from '../assets/imagens/img3.jpg';
import imagem4 from '../assets/imagens/img4.jpg';
import imagem5 from '../assets/imagens/img5.jpg';
import imagem6 from '../assets/imagens/img6.png';
import imagem7 from '../assets/imagens/img7.png';
import imagem8 from '../assets/imagens/img8.png';
import imagem9 from '../assets/imagens/img9.jpg';


export const Solucoes = () => {
  const topoRef = useRef(null);
  const servicosRef = useRef(null);

  const moverCarrossel = (ref, direcao) => {
    const carrossel = ref.current;

    if (!carrossel) return;

    const card = carrossel.querySelector('.solucoes-card');

    if (!card) return;

    const gap = parseFloat(getComputedStyle(carrossel).gap) || 0;

    carrossel.scrollBy({
      left: (card.getBoundingClientRect().width + gap) * direcao,
      behavior: 'smooth'
    });
  };

  return (
    <section className="solucoes-page">
      <h1>NOSSOS SERVIÇOS</h1>

      <div className="solucoes-topo-area">
        <div className="solucoes-controles">
          <button type="button" className="controle prev" onClick={() => moverCarrossel(topoRef, -1)} aria-label="Serviço anterior">
            ←
          </button>

          <button type="button" className="controle next" onClick={() => moverCarrossel(topoRef, 1)} aria-label="Próximo serviço">
            →
          </button>
        </div>

        <div className="solucoes-carrossel-topo" ref={topoRef}>
          <div className="solucoes-card">
              <img src={imagem2} alt="Análise Burocrática" className="solucoes-imagem"/>

              <div className="solucoes-informacoes">
                <div className="solucoes-card-cabecalho">
                  <h2>Análise Burocrática</h2>
                  <div className="solucoes-icones">
                    <img src={cnpjIcon} alt="CNPJ" />
                    <img src={brIcon} alt="Serviço nacional" />
                  </div>
                </div>
                <h3>Mapeamento e organização da documentação necessária para operações de importação e exportação, reduzindo riscos e erros no processo de internacionalização.</h3>
              </div>
            </div>

            <div className="solucoes-card">
              <img src={imagem4} alt="Estudo e Análise de Mercado Internacional" className="solucoes-imagem"/>

              <div className="solucoes-informacoes">
                <div className="solucoes-card-cabecalho">
                  <h2>Estudo e Análise de Mercado Internacional</h2>
                  <div className="solucoes-icones">
                    <img src={cnpjIcon} alt="CNPJ"/>
                    <img src={globoIcon} alt="Serviço internacional"/>
                  </div>
                </div>
                <h3>Pesquisa sobre o setor e a viabilidade de atuação da empresa em mercados estrangeiros.</h3>
              </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem3} alt="Planejamento Logístico Nacional" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Planejamento Logístico Nacional</h2>
                  <div className="solucoes-icones">
                    <img src={cnpjIcon} alt="CNPJ"/>
                    <img src={brIcon} alt="Serviço nacional"/>
                  </div>
              </div>
              <h3>Planejamento do transporte e distribuição de produtos dentro do território brasileiro.</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="solucoes-lista-area">
        <div className="solucoes-controles">
          <button type="button" className="controle prev" onClick={() => moverCarrossel(servicosRef, -1)} aria-label="Ver serviços anteriores">
            ←
          </button>

          <button type="button" className="controle next" onClick={() => moverCarrossel(servicosRef, 1)} aria-label="Ver próximos serviços">
            →
          </button>
        </div>

        <div className="solucoes-carrossel" ref={servicosRef}>
          <div className="solucoes-card">
            <img src={imagem2} alt="Análise Burocrática" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Análise Burocrática</h2>
                  <div className="solucoes-icones">
                    <img src={cnpjIcon} alt="CNPJ" />
                    <img src={brIcon} alt="Serviço nacional" />
                  </div>
                </div>
              <h3>Mapeamento e organização da documentação necessária para operações de importação e exportação, reduzindo riscos e erros no processo de internacionalização.</h3>
            </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem4} alt="Estudo e Análise de Mercado Internacional" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Estudo e análise de mercado internacional</h2>
                  <div className="solucoes-icones">
                    <img src={cnpjIcon} alt="CNPJ" />
                    <img src={globoIcon} alt="Serviço internacional" />
                  </div>
                </div>
              <h3>Pesquisa sobre o setor e a viabilidade de atuação da empresa em mercados estrangeiros.</h3>
            </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem3}alt="Planejamento Logístico Nacional" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Planejamento Logístico Nacional</h2>
                  <div className="solucoes-icones">
                    <img src={cnpjIcon} alt="CNPJ" />
                    <img src={brIcon} alt="Serviço nacional" />
                  </div>
                </div>
              <h3>Planejamento do transporte e distribuição de produtos dentro do território brasileiro.</h3>
            </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem1} alt="Estudo e Análise de Mercado Nacional" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Estudo e Análise de Mercado Nacional</h2>
                  <div className="solucoes-icones">
                    <img src={cnpjIcon} alt="CNPJ" />
                    <img src={brIcon} alt="Serviço nacional" />
                  </div>
                </div>
              <h3>Análise sobre o setor e o potencial de expansão da empresa dentro do mercado brasileiro.</h3>
            </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem3} alt="Planejamento Logístico Internacional" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Planejamento Logístico Internacional</h2>
                  <div className="solucoes-icones">
                    <img src={cnpjIcon} alt="CNPJ" />
                    <img src={globoIcon} alt="Serviço internacional" />
                  </div>
                </div>
              <h3>Estudo do fluxo de mercadorias para exportar ou importar produtos com eficiência e segurança.</h3>
            </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem5} alt="Análise de Mercado Alvo Internacional" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Análise de Mercado Alvo Internacional</h2>
                  <div className="solucoes-icones">
                    <img src={cnpjIcon} alt="CNPJ" />
                    <img src={globoIcon} alt="Serviço internacional" />
                  </div>
                </div>
              <h3>identificação dos países mais promissores para inserção ou expansão do produtos no exterior.</h3>
            </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem4} alt="Análise de Mercado Alvo Nacional" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Análise de Mercado Alvo Nacional</h2>
                  <div className="solucoes-icones">
                    <img src={cnpjIcon} alt="CNPJ" />
                    <img src={brIcon} alt="Serviço nacional" />
                  </div>
                </div>
              <h3>Identificação dos Estados mais estratégicos para o crescimento da empresa no Brasil.</h3>
            </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem7} alt="Dupla Nacionalidade Portuguesa" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Dupla Nacionalidade Portuguesa</h2>
                  <div className="solucoes-icones">
                    <img src={cpfIcon} alt="CPF" />
                    <img src={brIcon} alt="Serviço nacional" />
                  </div>
                </div>
              <h3>Orientação completa para reconhecimento da cidadania portuguesa conforme a legislação vigente.</h3>
            </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem6} alt="Dupla Nacionalidade Italiana" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Dupla Nacionalidade Italiana</h2>
                  <div className="solucoes-icones">
                    <img src={cpfIcon} alt="CPF" />
                    <img src={brIcon} alt="Serviço nacional" />
                  </div>
                </div>
              <h3>Consultoria para organização e orientação no processo de obtenção da cidadania italiana.</h3>
            </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem8} alt="Acessoria de Visto Americano" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Acessoria de Visto Americano</h2>
                  <div className="solucoes-icones">
                    <img src={cpfIcon} alt="CPF" />
                    <img src={brIcon} alt="Serviço internacional" />
                  </div>
                </div>
              <h3>Acompanhamento no processo de solicitação do visto de turismo e negócios para os EUA.</h3>
            </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem9} alt="Acessoria de Passaporte Brasileiro" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Acessoria de Passaporte Brasileiro</h2>
                  <div className="solucoes-icones">
                    <img src={cpfIcon} alt="CPF" />
                    <img src={brIcon} alt="Serviço nacional" />
                  </div>
                </div>
              <h3>Suporte nas etapas da emissão do passaporte junto à Polícia Federal.</h3>
            </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem5} alt="Prospecção Nacional" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Prospecção Nacional</h2>
                  <div className="solucoes-icones">
                    <img src={cnpjIcon} alt="CNPJ" />
                    <img src={brIcon} alt="Serviço nacional" />
                  </div>
                </div>
              <h3>Identificação e contato com potenciais compradores e parceiros no Brasil, para gerar novas oportunidades de negócio e fortalecer sua atuação no mercado nacional.</h3>
            </div>
          </div>

          <div className="solucoes-card">
            <img src={imagem4} alt="Prospecção Internacional" className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>Prospecção Internacional</h2>
                  <div className="solucoes-icones">
                    <img src={cnpjIcon} alt="CNPJ" />
                    <img src={globoIcon} alt="Serviço internacional" />
                  </div>
                </div>
              <h3>Identificação e contato com potenciais compradores e parceiros no exterior, para gerar oportunidades reais de negócio e expandir a atuação internacional.</h3>
            </div>
          </div>
        </div>
      </div>


      
    </section>
  );
};

export default Solucoes;