import './Styles/RegisterStyles.css';
import './Styles/index.css';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../assets/ExpandBranco.png';

function App() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="container">
      <div
        className="logo"
        role="img"
        aria-label="Logo da Expand Jr."
        style={{ maskImage: `url(${logo})`, WebkitMaskImage: `url(${logo})` }}
      />
      <h1>Login</h1>
      <p>Área da equipe da Expand Jr.</p>
      <div className="form-box">
        <div className="input-group">
          <label htmlFor="senha">Senha</label>

          <div className="password-wrapper">
            <input
              id="senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite a senha"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button className="btn-primary">Entrar</button>
      </div>
    </div>
  );
}
export default App;
