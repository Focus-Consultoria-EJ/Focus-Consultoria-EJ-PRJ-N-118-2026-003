import './RegisterStyles.css';

function App() {
  return (
    <div className="container">
      <h1>CRIAR CONTA</h1>
      <p>Área da equipe da Expand Jr.</p>
      <div className="form-box">
        <div className="input-group">
          <label>E-mail</label>
          <input type="email" />
        </div>

        <div className="input-group">
          <label>Senha</label>
          <input type="password" />
        </div>

        <button className="btn-primary">Cadastrar</button>
        <button className="btn-google">Continuar com Google</button>

        <a href="#" className="login-link">
          Já tem conta? Entrar
        </a>
      </div>
    </div>
  );
}
export default App;
