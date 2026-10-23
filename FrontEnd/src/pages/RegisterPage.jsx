import './Styles/RegisterStyles.css';

function App() {
  return (
    <div className="container">
      <h1>Login</h1>
      <p>Área da equipe da Expand Jr.</p>
      <div className="form-box">
        

        <div className="input-group">
          <h2><label>Senha</label></h2>
          
          <input type="password" />
        </div>

        <button className="btn-primary">Entrar</button>
      </div>
    </div>
  );
}
export default App;
