
import './Styles/AdminStyles.css';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { supabase } from '../lib/supabase.js';

import {
  alterarEmailAdmin,
  alterarSenhaAdmin,
} from '../services/AdminAuthService.js';

function Admin() {
  const [buttonActive, setButtonActive] = useState('admin');

  // Visibilidade das senhas gerais
  const [showAccessPassword1, setShowAccessPassword1] = useState(false);
  const [showAccessPassword2, setShowAccessPassword2] = useState(false);
  const [showAccessPassword3, setShowAccessPassword3] = useState(false);

  // Visibilidade das senhas administrativas
  const [showAdminPassword1, setShowAdminPassword1] = useState(false);
  const [showAdminPassword2, setShowAdminPassword2] = useState(false);
  const [showAdminPassword3, setShowAdminPassword3] = useState(false);

  // Alteração de e-mail
  const [emailAtual, setEmailAtual] = useState('');
  const [novoEmail, setNovoEmail] = useState('');
  const [confirmarEmail, setConfirmarEmail] = useState('');

  const [carregandoEmail, setCarregandoEmail] = useState(false);
  const [mensagemEmail, setMensagemEmail] = useState('');
  const [erroEmail, setErroEmail] = useState('');

  // Alteração da senha geral
  const [senhaGeralAtual, setSenhaGeralAtual] = useState('');
  const [novaSenhaGeral, setNovaSenhaGeral] = useState('');
  const [confirmarSenhaGeral, setConfirmarSenhaGeral] = useState('');

  const [carregandoSenhaGeral, setCarregandoSenhaGeral] = useState(false);
  const [mensagemSenhaGeral, setMensagemSenhaGeral] = useState('');
  const [erroSenhaGeral, setErroSenhaGeral] = useState('');

  // Alteração da senha administrativa
  const [senhaAdminAtual, setSenhaAdminAtual] = useState('');
  const [novaSenhaAdmin, setNovaSenhaAdmin] = useState('');
  const [confirmarSenhaAdmin, setConfirmarSenhaAdmin] = useState('');

  const [carregandoSenhaAdmin, setCarregandoSenhaAdmin] =
    useState(false);

  const [mensagemSenhaAdmin, setMensagemSenhaAdmin] = useState('');
  const [erroSenhaAdmin, setErroSenhaAdmin] = useState('');

  // ALTERAÇÃO DE E-MAIL
  async function handleAlterarEmail(event) {
    event.preventDefault();

    setMensagemEmail('');
    setErroEmail('');

    if (
      novoEmail.trim().toLowerCase() !==
      confirmarEmail.trim().toLowerCase()
    ) {
      setErroEmail('Os novos e-mails não coincidem.');
      return;
    }

    setCarregandoEmail(true);

    try {
      const mensagem = await alterarEmailAdmin(
        emailAtual,
        novoEmail
      );

      setMensagemEmail(mensagem);
      setEmailAtual('');
      setNovoEmail('');
      setConfirmarEmail('');
    } catch (error) {
      setErroEmail(
        error.message || 'Erro ao solicitar alteração de e-mail.'
      );
    } finally {
      setCarregandoEmail(false);
    }
  }

  // ALTERAÇÃO DA SENHA GERAL
  async function handleAlterarSenhaGeral(event) {
    event.preventDefault();

    setMensagemSenhaGeral('');
    setErroSenhaGeral('');

    if (novaSenhaGeral !== confirmarSenhaGeral) {
      setErroSenhaGeral('As novas senhas não coincidem.');
      return;
    }

    if (senhaGeralAtual === novaSenhaGeral) {
      setErroSenhaGeral(
        'A nova senha deve ser diferente da senha atual.'
      );
      return;
    }

    if (novaSenhaGeral.length < 8 || novaSenhaGeral.length > 72) {
      setErroSenhaGeral(
        'A nova senha deve ter entre 8 e 72 caracteres.'
      );
      return;
    }

    setCarregandoSenhaGeral(true);

    try {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        throw new Error(
          'Sessão expirada. Faça login como administrador.'
        );
      }

      const { data, error } = await supabase.functions.invoke(
        'alterar-senha-geral',
        {
          headers: {
            Authorization: `Bearer ${session.access_token}`,
          },
          body: {
            senhaAtual: senhaGeralAtual,
            novaSenha: novaSenhaGeral,
          },
        }
      );

      if (error) {
        let mensagem = 'Não foi possível alterar a senha geral.';

        if (error.context) {
          try {
            const resposta = await error.context.json();
            mensagem = resposta.error || mensagem;
          } catch {
            // Mantém a mensagem padrão.
          }
        }

        throw new Error(mensagem);
      }

      if (!data?.success) {
        throw new Error(
          data?.error || 'A alteração não foi confirmada.'
        );
      }

      setMensagemSenhaGeral(
        data.mensagem || 'Senha geral alterada com sucesso!'
      );

      setSenhaGeralAtual('');
      setNovaSenhaGeral('');
      setConfirmarSenhaGeral('');

      setShowAccessPassword1(false);
      setShowAccessPassword2(false);
      setShowAccessPassword3(false);

    } catch (error) {
      console.error('Erro ao alterar senha geral:', error);

      setErroSenhaGeral(
        error.message || 'Erro inesperado ao alterar senha geral.'
      );
    } finally {
      setCarregandoSenhaGeral(false);
    }
  }

  // ALTERAÇÃO DA SENHA ADMINISTRATIVA
  async function handleAlterarSenhaAdmin(event) {
    event.preventDefault();

    setMensagemSenhaAdmin('');
    setErroSenhaAdmin('');

    if (novaSenhaAdmin !== confirmarSenhaAdmin) {
      setErroSenhaAdmin('As novas senhas não coincidem.');
      return;
    }

    if (senhaAdminAtual === novaSenhaAdmin) {
      setErroSenhaAdmin(
        'A nova senha deve ser diferente da senha atual.'
      );
      return;
    }

    if (novaSenhaAdmin.length < 8) {
      setErroSenhaAdmin(
        'A nova senha deve ter pelo menos 8 caracteres.'
      );
      return;
    }

    setCarregandoSenhaAdmin(true);

    try {
      const mensagem = await alterarSenhaAdmin(
        senhaAdminAtual,
        novaSenhaAdmin
      );

      setMensagemSenhaAdmin(mensagem);
      setSenhaAdminAtual('');
      setNovaSenhaAdmin('');
      setConfirmarSenhaAdmin('');
    } catch (error) {
      setErroSenhaAdmin(
        error.message || 'Erro ao alterar a senha administrativa.'
      );
    } finally {
      setCarregandoSenhaAdmin(false);
    }
  }

  return (
    <div className="container admin-page">
      <div className="logo">
        <img
          src="./src/assets/expandJRLogoAzul.png"
          alt="Logo azul da ExpandJR"
        />
      </div>

      <h1>Página Admin</h1>

      <div className="form-box">
        <div className="select-buttons">
          <button
            type="button"
            className={`selected-button ${
              buttonActive === 'admin' ? 'active' : ''
            }`}
            onClick={() => setButtonActive('admin')}
          >
            Admin
          </button>

          <button
            type="button"
            className={`selected-button ${
              buttonActive === 'senhaGeral' ? 'active' : ''
            }`}
            onClick={() => setButtonActive('senhaGeral')}
          >
            Senha Geral
          </button>

          <button
            type="button"
            className={`selected-button ${
              buttonActive === 'senhaAdmin' ? 'active' : ''
            }`}
            onClick={() => setButtonActive('senhaAdmin')}
          >
            Senha Admin
          </button>
        </div>

        {/* ALTERAÇÃO DE E-MAIL */}
        {buttonActive === 'admin' && (
          <form
            className="input-group"
            onSubmit={handleAlterarEmail}
          >
            <label htmlFor="emailAtual">
              Admin Atual
            </label>

            <input
              id="emailAtual"
              type="email"
              placeholder="Digite seu e-mail atual"
              value={emailAtual}
              onChange={(event) =>
                setEmailAtual(event.target.value)
              }
              autoComplete="email"
              required
            />

            <label htmlFor="novoEmail">
              Novo Admin
            </label>

            <input
              id="novoEmail"
              type="email"
              placeholder="Digite o novo e-mail"
              value={novoEmail}
              onChange={(event) =>
                setNovoEmail(event.target.value)
              }
              required
            />

            <label htmlFor="confirmarEmail">
              Confirmar Novo Admin
            </label>

            <input
              id="confirmarEmail"
              type="email"
              placeholder="Confirme o novo e-mail"
              value={confirmarEmail}
              onChange={(event) =>
                setConfirmarEmail(event.target.value)
              }
              required
            />

            {erroEmail && (
              <p
                role="alert"
                style={{ color: '#dc2626' }}
              >
                {erroEmail}
              </p>
            )}

            {mensagemEmail && (
              <p
                role="status"
                style={{ color: '#16a34a' }}
              >
                {mensagemEmail}
              </p>
            )}

            <button
              type="submit"
              disabled={carregandoEmail}
            >
              {carregandoEmail ? 'Enviando...' : 'Confirmar'}
            </button>
          </form>
        )}

        {/* ALTERAÇÃO DA SENHA GERAL */}
        {buttonActive === 'senhaGeral' && (
          <form
            className="input-group"
            onSubmit={handleAlterarSenhaGeral}
          >
            <label htmlFor="senhaGeralAtual">
              Senha Geral Atual
            </label>

            <div className="password-wrapper">
              <input
                id="senhaGeralAtual"
                type={showAccessPassword1 ? 'text' : 'password'}
                placeholder="Digite a senha geral atual"
                value={senhaGeralAtual}
                onChange={(event) =>
                  setSenhaGeralAtual(event.target.value)
                }
                autoComplete="off"
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() =>
                  setShowAccessPassword1(!showAccessPassword1)
                }
                aria-label={
                  showAccessPassword1
                    ? 'Ocultar senha'
                    : 'Mostrar senha'
                }
              >
                {showAccessPassword1
                  ? <EyeOff size={20} />
                  : <Eye size={20} />}
              </button>
            </div>

            <label htmlFor="novaSenhaGeral">
              Nova Senha Geral
            </label>

            <div className="password-wrapper">
              <input
                id="novaSenhaGeral"
                type={showAccessPassword2 ? 'text' : 'password'}
                placeholder="Digite a nova senha geral"
                value={novaSenhaGeral}
                onChange={(event) =>
                  setNovaSenhaGeral(event.target.value)
                }
                autoComplete="new-password"
                minLength={8}
                maxLength={72}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() =>
                  setShowAccessPassword2(!showAccessPassword2)
                }
                aria-label={
                  showAccessPassword2
                    ? 'Ocultar senha'
                    : 'Mostrar senha'
                }
              >
                {showAccessPassword2
                  ? <EyeOff size={20} />
                  : <Eye size={20} />}
              </button>
            </div>

            <label htmlFor="confirmarSenhaGeral">
              Confirmar Nova Senha Geral
            </label>

            <div className="password-wrapper">
              <input
                id="confirmarSenhaGeral"
                type={showAccessPassword3 ? 'text' : 'password'}
                placeholder="Confirme a nova senha geral"
                value={confirmarSenhaGeral}
                onChange={(event) =>
                  setConfirmarSenhaGeral(event.target.value)
                }
                autoComplete="new-password"
                minLength={8}
                maxLength={72}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() =>
                  setShowAccessPassword3(!showAccessPassword3)
                }
                aria-label={
                  showAccessPassword3
                    ? 'Ocultar senha'
                    : 'Mostrar senha'
                }
              >
                {showAccessPassword3
                  ? <EyeOff size={20} />
                  : <Eye size={20} />}
              </button>
            </div>

            {erroSenhaGeral && (
              <p
                role="alert"
                style={{ color: '#dc2626' }}
              >
                {erroSenhaGeral}
              </p>
            )}

            {mensagemSenhaGeral && (
              <p
                role="status"
                style={{ color: '#16a34a' }}
              >
                {mensagemSenhaGeral}
              </p>
            )}

            <button
              type="submit"
              disabled={carregandoSenhaGeral}
            >
              {carregandoSenhaGeral
                ? 'Alterando...'
                : 'Confirmar'}
            </button>
          </form>
        )}

        {/* ALTERAÇÃO DA SENHA ADMINISTRATIVA */}
        {buttonActive === 'senhaAdmin' && (
          <form
            className="input-group"
            onSubmit={handleAlterarSenhaAdmin}
          >
            <label htmlFor="senhaAdminAtual">
              Senha Admin Atual
            </label>

            <div className="password-wrapper">
              <input
                id="senhaAdminAtual"
                type={showAdminPassword1 ? 'text' : 'password'}
                placeholder="Digite a senha atual"
                value={senhaAdminAtual}
                onChange={(event) =>
                  setSenhaAdminAtual(event.target.value)
                }
                autoComplete="current-password"
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() =>
                  setShowAdminPassword1(!showAdminPassword1)
                }
                aria-label={
                  showAdminPassword1
                    ? 'Ocultar senha'
                    : 'Mostrar senha'
                }
              >
                {showAdminPassword1
                  ? <EyeOff size={20} />
                  : <Eye size={20} />}
              </button>
            </div>

            <label htmlFor="novaSenhaAdmin">
              Nova Senha Admin
            </label>

            <div className="password-wrapper">
              <input
                id="novaSenhaAdmin"
                type={showAdminPassword2 ? 'text' : 'password'}
                placeholder="Digite a nova senha"
                value={novaSenhaAdmin}
                onChange={(event) =>
                  setNovaSenhaAdmin(event.target.value)
                }
                autoComplete="new-password"
                minLength={8}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() =>
                  setShowAdminPassword2(!showAdminPassword2)
                }
                aria-label={
                  showAdminPassword2
                    ? 'Ocultar senha'
                    : 'Mostrar senha'
                }
              >
                {showAdminPassword2
                  ? <EyeOff size={20} />
                  : <Eye size={20} />}
              </button>
            </div>

            <label htmlFor="confirmarSenhaAdmin">
              Confirmar Nova Senha Admin
            </label>

            <div className="password-wrapper">
              <input
                id="confirmarSenhaAdmin"
                type={showAdminPassword3 ? 'text' : 'password'}
                placeholder="Confirme a nova senha"
                value={confirmarSenhaAdmin}
                onChange={(event) =>
                  setConfirmarSenhaAdmin(event.target.value)
                }
                autoComplete="new-password"
                minLength={8}
                required
              />

              <button
                type="button"
                className="toggle-password"
                onClick={() =>
                  setShowAdminPassword3(!showAdminPassword3)
                }
                aria-label={
                  showAdminPassword3
                    ? 'Ocultar senha'
                    : 'Mostrar senha'
                }
              >
                {showAdminPassword3
                  ? <EyeOff size={20} />
                  : <Eye size={20} />}
              </button>
            </div>

            {erroSenhaAdmin && (
              <p
                role="alert"
                style={{ color: '#dc2626' }}
              >
                {erroSenhaAdmin}
              </p>
            )}

            {mensagemSenhaAdmin && (
              <p
                role="status"
                style={{ color: '#16a34a' }}
              >
                {mensagemSenhaAdmin}
              </p>
            )}

            <button
              type="submit"
              className="confirm"
              disabled={carregandoSenhaAdmin}
            >
              {carregandoSenhaAdmin
                ? 'Alterando...'
                : 'Confirmar'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Admin;
