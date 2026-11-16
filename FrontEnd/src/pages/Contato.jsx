import './Styles/ContatoStyles.css';
function Contato() {
  return (
    <div className="container">
      <h1>ENTRE EM CONTATO</h1>
      <p>Conte um pouco sobre o seu desafio e retornaremos o mais breve possível.</p>
      <form className="form-box">
        <div className="input-group">
          <label>Nome</label>
          <input type="text" placeholder='Digite seu nome completo' required />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input type="email" placeholder='nome@empresa.com' required />
        </div>

        <div className="input-group">
          <label>Empresa</label>
          <input type="text" placeholder='Digite o nome da sua empresa' required />
        </div>

        <div className="input-group">
          <label>Telefone</label>
          <input type="tel" placeholder='(00) 00000-0000' required />
        </div>

        <div className="input-group full">
          <label>Mensagem</label>
          <textarea rows={5} placeholder='Descreva brevemente o que você precisa' required />
        </div>
        <button className="btn-primary full">Enviar mensagem</button>

      </form>
    </div>
  );
}


export default Contato;