import LoginPage from './pages/LoginPage.jsx'
import AdminLogin from './pages/AdminLogin.jsx'
import AdminPage from './pages/AdminPage.jsx'
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
    element: <PublicLayout />,
    children: [
      { index: true, element: <PaginaInicial /> },
      { path: 'quem-somos', element: <QuemSomos /> },
      { path: 'solucoes', element: <Solucoes /> },
      { path: 'blog', element: <Blog /> },
      { path: 'contato', element: <Contato /> },
    ],
  },
  { path: '/login', element: <LoginPage /> },
  { path: '/admin-login', element: <AdminLogin /> },
  { path: '/admin-page', element: <AdminPage /> },
  { path: '/geral-posts', element: <GeralPosts /> },
  { path: '/criar-post', element: <CriarPost /> },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;