import './Styles/Solucoes.css';
import { useState } from "react";
import imagemTime from "../assets/solucoes_foto.jpg";
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

const icones = {
  CNPJ: cnpjIcon,
  CPF: cpfIcon,
  BR: brIcon,
  Internacional: globoIcon,
};

const servicos = [
  {
    id: 1,
    categoria: 'CNPJ',
    alcance: 'Internacional',
    titulo: 'Análise Burocrática',
    resumo: 'Pesquisa sobre o setor e a viabilidade de atuação da empresa em mercados estrangeiros.',
    imagem: imagem1,
    link: '#',
  },
  {
    id: 2,
    categoria: 'CPF',
    alcance: 'Internacional',
    titulo: 'Análise Burocrática',
    resumo: 'Pesquisa sobre o setor e a viabilidade de atuação da empresa em mercados estrangeiros.',
    imagem: imagem2,
    link: '#',
  },
  {
    id: 3,
    categoria: 'CNPJ',
    alcance: 'BR',
    titulo: 'Análise Burocrática',
    resumo: 'Pesquisa sobre o setor e a viabilidade de atuação da empresa em mercados estrangeiros.',
    imagem: imagem3,
    link: '#',
  },
  {
    id: 4,
    categoria: 'CNPJ',
    alcance: 'Internacional',
    titulo: 'Análise Burocrática',
    resumo: 'Pesquisa sobre o setor e a viabilidade de atuação da empresa em mercados estrangeiros.',
    imagem: imagem4,
    link: '#',
  },
  {
    id: 5,
    categoria: 'CPF',
    alcance: 'BR',
    titulo: 'Análise Burocrática',
    resumo: 'Pesquisa sobre o setor e a viabilidade de atuação da empresa em mercados estrangeiros.',
    imagem: imagem5,
    link: '#',
  },
];

function Solucoes () {
  const [filtro, setFiltro] = useState('Todos');

  const categorias = [
    'Todos', 'CNPJ', 'CPF'
  ];

  const servicosFiltrados = servicos
    .filter((servico) => filtro === 'Todos' || servico.categoria === filtro)

  return (
    <section className="solucoes-page">

      <div className="solucoes-content">
          <div className="solucoes-texto">

            <h1>NOSSOS SERVIÇOS</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci corporis laudantium eligendi asperiores quaerat ipsa aspernatur, aliquid maiores accusamus iure ratione officia veritatis quas! Accusamus earum tenetur temporibus eligendi totam.
            </p>
          </div>

          <div className="solucoes-foto">
              <img src={imagemTime} alt="Equipe da Expand Jr." className="solucoes-imagem">
              </img>
          </div>
              
      </div>

      <div className="solucoes-lista-area">

        <div className='select-buttons'>
          {categorias.map((cat) => (
            <button key={cat} className={`selected-button ${filtro === cat ? 'active' : ''}`} onClick={() => setFiltro(cat)}>
              {cat}
            </button>
          ))}
        </div>

        <div className="solucoes-grid">
          {servicosFiltrados.map((servico)=>(

          <a key={servico.id} href={servico.link} className="solucoes-card">
            <img src= {servico.imagem} alt={servico.titulo} className="solucoes-imagem"/>

            <div className="solucoes-informacoes">
              <div className="solucoes-card-cabecalho">
                  <h2>{servico.titulo}</h2>
                  <div className="solucoes-icones">
                    <img src={icones[servico.categoria]} alt={servico.categoria} />
                    <img src={icones[servico.alcance]} alt={servico.alcance} />
                  </div>
                </div>
              <h3>{servico.resumo}</h3>
            </div>
          </a>
          ))
        }
        </div>
      </div>

    </section>
  );
};

export default Solucoes;