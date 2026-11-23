import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { verificarAdmin } from '../../services/AdminAuthService.js';

export default function AdminProtectedRoute() {
  const [carregando, setCarregando] = useState(true);
  const [autorizado, setAutorizado] = useState(false);

  useEffect(() => {
    let ativo = true;

    async function validarAcesso() {
      try {
        const resultado = await verificarAdmin();

        if (ativo) {
          setAutorizado(resultado);
        }
      } catch {
        if (ativo) {
          setAutorizado(false);
        }
      } finally {
        if (ativo) {
          setCarregando(false);
        }
      }
    }

    validarAcesso();

    return () => {
      ativo = false;
    };
  }, []);

  if (carregando) {
    return <p>Verificando acesso...</p>;
  }

  if (!autorizado) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
}
