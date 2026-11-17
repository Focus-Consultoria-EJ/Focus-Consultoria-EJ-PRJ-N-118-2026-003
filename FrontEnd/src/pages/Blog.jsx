import './Styles/BlogStyles.css';
import blogFeatured from "../assets/imagens/blog-featured.jpg";

function Blog() {
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

          <a href="#" className="mais_recente">
              <h2>Artigo mais recente</h2>
              <img className='img-recentes' src={blogFeatured} alt="imagem-artigo" />
              <h2>O futuro do comércio exterior: Inteligência artificial e Comércio digital</h2>
              <div className='categ_ler'>
                  <p className='categoria'>COMÉRCIO EXTERIOR</p>
                  <p>Ler mais</p>
              </div>
                
          </a>
          
        </div>

      </div>

      <h1>Artigos</h1>
      <div className="artigos_container">
        
        <a href='#' className="artigo">
            <img className='img-recentes' src={blogFeatured} alt="imagem-artigo" />
            <div className='texto-artigo'>
              <p className='categoria'>COMÉRCIO EXTERIOR</p>
              <h2>O futuro do comércio exterior: Inteligência artificial e Comércio digital</h2>
              <p>Como a inteligência artificial e as plataformas digitais estão redesenhando as cadeias globais de valor e o que isso</p>
              <p>set. de 2026</p>
            </div>
            
        </a>

        <a href="#" className="artigo">
            <img className='img-recentes' src={blogFeatured} alt="imagem-artigo" />
            <div className='texto-artigo'>
              <p className='categoria'>CULTURA E RI</p>
              <h2>Negociação intercultural: como fechar negócios com parceiros do Oriente Médio</h2>
              <p>Do ritmo das reuniões à construção de confiança, conheça práticas culturais que fazem diferença nas negociações com países do Golfo.</p>
              <p>ago. de 2026</p>
            </div>
            
        </a>

        <a href="#" className="artigo">
            <img className='img-recentes' src={blogFeatured} alt="imagem-artigo" />
            <div className='texto-artigo'>
              <p className='categoria'>COMÉRCIO EXTERIOR</p>
              <h2>Negociação intercultural: como fechar negócios com parceiros do Oriente Médio</h2>
              <p>Do ritmo das reuniões à construção de confiança, conheça práticas culturais que fazem diferença nas negociações com países do Golfo.</p>
              <p>ago. de 2026</p>
            </div>
            
        </a>

        <a href="#" className="artigo">
            <img className='img-recentes' src={blogFeatured} alt="imagem-artigo" />
            <div className='texto-artigo'>
              <p className='categoria'>COMÉRCIO EXTERIOR</p>
              <h2>Negociação intercultural: como fechar negócios com parceiros do Oriente Médio</h2>
              <p>Do ritmo das reuniões à construção de confiança, conheça práticas culturais que fazem diferença nas negociações com países do Golfo.</p>
              <p>ago. de 2026</p>
            </div>
            
        </a>

        <a href="#" className="artigo">
            <img className='img-recentes' src={blogFeatured} alt="imagem-artigo" />
            <div className='texto-artigo'>
              <p className='categoria'>COMÉRCIO EXTERIOR</p>
              <h2>Negociação intercultural: como fechar negócios com parceiros do Oriente Médio</h2>
              <p>Do ritmo das reuniões à construção de confiança, conheça práticas culturais que fazem diferença nas negociações com países do Golfo.</p>
              <p>ago. de 2026</p>
            </div>
            
        </a>

      </div>

    </div>
 
  );
}


export default Blog;