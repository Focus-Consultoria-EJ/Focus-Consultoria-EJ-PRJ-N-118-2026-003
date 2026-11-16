import RegisterPage from './pages/RegisterPage.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import GeralPosts from './pages/GeralPosts.jsx'
import { QuemSomos } from './pages/QuemSomos.jsx'
import Contato from './pages/Contato.jsx'
import Solucoes from './pages/Solucoes.jsx'
import Blog from './pages/Blog.jsx'
import PaginaInicial from './pages/PaginaInicial.jsx'
import CriarPost from './pages/CriarPost.jsx'
import { Header } from './components/Header/Header.jsx'
import { Footer } from './components/Footer/Footer.jsx'

import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

function PublicLayout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <PaginaInicial/>,
      },

{
  path: '/login',
  element: <RegisterPage />,
},
{
  path: '/admin-login',
  element: <AdminLogin />,
},
{
  path: '/geral-posts',
  element: <GeralPosts />,
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