import './Styles/LoginStyles.css';
import './Styles/index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../assets/ExpandBranco.png';
import { loginAdmin } from '../services/AdminAuthService.js';

function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState('');

  async function handleLogin(event) {
    event.preventDefault();

    setErro('');
    setCarregando(true);

    try {
      await loginAdmin(email.trim(), senha);
      navigate('/admin-page', { replace: true });
    } catch (error) {
      setErro(error.message || 'Erro ao realizar login.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="container login-page">
      <div
        className="logo"
        role="img"
        aria-label="Logo da Expand Jr."
        style={{
          maskImage: `url(${logo})`,
          WebkitMaskImage: `url(${logo})`
        }}
      />

      <h1>Login Admin</h1>
      <p>Área do Admin da Expand Jr.</p>

      <form className="form-box" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="username"
            required
          />

          <label htmlFor="senha">Senha</label>

          <div className="password-wrapper">
            <input
              id="senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite a senha"
              value={senha}
              onChange={(event) => setSenha(event.target.value)}
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={
                showPassword ? 'Ocultar senha' : 'Mostrar senha'
              }
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {erro && (
          <p role="alert" style={{ color: '#dc2626' }}>
            {erro}
          </p>
        )}

        <button
          type="submit"
          className="btn-primary"
          disabled={carregando}
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
