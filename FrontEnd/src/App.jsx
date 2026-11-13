<<<<<<< HEAD
//CODIGO Q O GPT DEU PRA EU RODAR

import { Routes, Route, Navigate } from 'react-router-dom';
import { QuemSomos } from './pages/QuemSomos/QuemSomos.jsx';
import { Header } from './components/Header/Header.jsx';
import { Footer } from './components/Footer/Footer.jsx';

function App() {
  return (
    <>
    <Header />
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/quem-somos" replace />}
      />
      <Route
        path="/quem-somos"
        element={<QuemSomos />}
      />
    </Routes>
    <Footer />
    </>
  );
}

export default App;
=======
import LoginPage from './pages/LoginPage.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminPage from './pages/AdminPage.jsx'
import GeralPosts from './pages/GeralPosts.jsx'
import QuemSomos from './pages/QuemSomos.jsx'
import Contato from './pages/Contato.jsx'
import Solucoes from './pages/Solucoes.jsx'
import Blog from './pages/Blog.jsx'
import PaginaInicial from './pages/PaginaInicial.jsx'
import CriarPost from './pages/CriarPost.jsx'




import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element: <PaginaInicial/>,
      },

{
  path: '/login',
  element: <LoginPage />,
},
{
  path: '/admin-login',
  element: <AdminLogin />,
},
{
  path: '/admin-page',
  element: <AdminPage />,
},

{
  path: '/geral-posts',
  element: <GeralPosts />,
},

{
  path: '/criar-post',
  element: <CriarPost />,
},

{
  path: '/quem-somos',
  element: <QuemSomos />,
},
{
  path: '/contato',
  element: <Contato />,
},
{
  path: '/solucoes',
  element: <Solucoes />,
},
{
  path: '/blog',
  element: <Blog />,
}
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
>>>>>>> fix/FRONT-ajustes-gerais
