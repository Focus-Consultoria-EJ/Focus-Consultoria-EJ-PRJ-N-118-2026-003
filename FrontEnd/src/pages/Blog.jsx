import './Styles/BlogStyles.css';
import { useState } from "react";
import blogFeatured from "../assets/imagens/blog-featured.jpg";

const artigos = [
  {
    id: 1,
    categoria: 'Comércio Exterior',
    titulo: 'O futuro do comércio exterior: Inteligência artificial e Comércio digital',
    resumo: 'Como a inteligência artificial e as plataformas digitais estão redesenhando as cadeias globais de valor e o que isso',
    data: 'set. de 2026',
    dataISO: '2026-09-15',
    imagem: blogFeatured,
    link: '#',
  },
  {
    id: 2,
    categoria: 'Cultura e RI',
    titulo: 'Negociação intercultural: como fechar negócios com parceiros do Oriente Médio',
    resumo: 'Do ritmo das reuniões à construção de confiança, conheça práticas culturais que fazem diferença nas negociações com países do Golfo.',
    data: 'ago. de 2026',
    dataISO: '2026-08-15',
    imagem: blogFeatured,
    link: '#',
  },
  {
    id: 3,
    categoria: 'Geopolítica',
    titulo: 'Negociação intercultural: como fechar negócios com parceiros do Oriente Médio',
    resumo: 'Do ritmo das reuniões à construção de confiança, conheça práticas culturais que fazem diferença nas negociações com países do Golfo.',
    data: 'ago. de 2026',
    dataISO: '2026-08-16',
    imagem: blogFeatured,
    link: '#',
  },
  {
    id: 4,
    categoria: 'Comércio Exterior',
    titulo: 'O futuro do comércio exterior: Inteligência artificial e Comércio digital',
    resumo: 'Como a inteligência artificial e as plataformas digitais estão redesenhando as cadeias globais de valor e o que isso',
    data: 'set. de 2026',
    dataISO: '2026-09-16',
    imagem: blogFeatured,
    link: '#',
  },
];

function Blog() {
  const [filtro, setFiltro] = useState('Todos');

  const ordPorDataDesc = (a, b) => new Date(b.dataISO) - new Date(a.dataISO);

  const maisRecente = [...artigos].sort(ordPorDataDesc)[0];

  const categorias = [
    'Todos', ...new Set(['Comércio Exterior','Cultura e RI','Geopolítica','Notícias',
    ...artigos.map((a) => a.categoria),]),
  ];

  const artigosFiltrados = artigos
    .filter((artigo) => filtro === 'Todos' || artigo.categoria === filtro)
    .sort(ordPorDataDesc);

  return (
    <div className="container">
      <div className="main_container">

        <h1>Veja mais sobre nosso Blog!</h1>
        
        <div className='caixas'>
          <div className="resumo">
            <p>Nosso blog reúne artigos que exploram temas relevantes das <span className='texto-colorido'>Relações Internacionais,
              Geopolítica e Comércio Exterior</span>, como <span className='texto-colorido'>tendências de mercado</span>, conceitos fundamentais e 
              análises de conjuntura. Além de oferecer <span className='texto-colorido'>insights valiosos</span>, como desafios da internacionalização
              e novidades do setor, o conteúdo busca <span className='texto-colorido'>informar, educar e aproximar leads</span> do universo estratégico
              em que atuamos.</p>
          </div>

          {maisRecente && (
            <a href={maisRecente.link} className="mais_recente">
              <h2>Artigo mais recente</h2>
              <img className="img-recentes" src={maisRecente.imagem} alt={maisRecente.titulo} />
              <h2>{maisRecente.titulo}</h2>
              <div className="categ_ler">
                <p className="categoria">{maisRecente.categoria.toUpperCase()}</p>
                <p>Ler mais</p>
              </div>
            </a>
          )}
          
        </div>

      </div>

      <h1>Artigos</h1>

      <div className='select-buttons'>
        {categorias.map((cat) => (
          <button key={cat} className={`selected-button ${filtro === cat ? 'active' : ''}`} onClick={() => setFiltro(cat)}>
            {cat}
          </button>
        ))}
      </div> 

      <div className="artigos_container">
        {artigosFiltrados.length >0 ? (
          artigosFiltrados.map((artigo)=>(
            <a href={artigo.link} className="artigo">
                <img className='img-recentes' src={artigo.imagem} alt={artigo.titulo} />
                <div className='texto-artigo'>
                  <p className='categoria'>{artigo.categoria}</p>
                  <h2>{artigo.titulo}</h2>
                  <p>{artigo.resumo}</p>
                  <p>{artigo.data}</p>
                </div>
                
            </a>
          ))
          ): (
            <p className='sem-artigo'>Ainda não publicamos nenhum artigo por aqui</p>
          ) 
        }

      </div>

    </div>
 
  );
}


export default Blog;