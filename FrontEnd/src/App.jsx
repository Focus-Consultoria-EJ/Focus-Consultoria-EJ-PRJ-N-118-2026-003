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
