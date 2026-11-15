
import './Styles/LoginStyles.css';
import './Styles/index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import logo from '../assets/ExpandBranco.png';
import { loginBlog } from '../services/BlogAuthService.js';

function LoginPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    if (!senha.trim()) {
      setErro('Digite a senha para continuar.');
      return;
    }

    setErro('');
    setCarregando(true);

    try {
      await loginBlog(senha);

      navigate('/geral-posts', { replace: true });
    } catch (error) {
      setErro('Senha incorreta ou erro ao realizar login.');
      console.error('Erro no login:', error);
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
          WebkitMaskImage: `url(${logo})`,
        }}
      />

      <h1>Login</h1>
      <p>Área da equipe Expand Jr.</p>

      <form className="form-box" onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="senha">Senha</label>

          <div className="password-wrapper">
            <input
              id="senha"
              type={showPassword ? 'text' : 'password'}
              placeholder="Digite a senha"
              value={senha}
              onChange={(event) => {
                setSenha(event.target.value);
                setErro('');
              }}
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
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>
        </div>

        {erro && (
          <p role="alert" style={{ color: '#dc2626' }}>
            {erro}
          </p>
        )}

        <button
          className="btn-primary"
          type="submit"
          disabled={carregando}
        >
          {carregando ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
