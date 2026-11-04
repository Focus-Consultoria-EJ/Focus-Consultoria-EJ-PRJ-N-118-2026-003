import './Styles/AdminStyles.css';
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

function Admin() {
    const [showAdminForm, setShowAdminForm] = useState(true);
    const [showAdminPasswordForm, setShowAdminPasswordForm] = useState(false);
    const [showAccessForm, setShowAccessForm] = useState(false);

    const [buttonActive, setButtonActive] = useState('admin');

    const [showAccessPassword1, setShowAccessPassword1] = useState(false);
    const [showAccessPassword2, setShowAccessPassword2] = useState(false);
    const [showAccessPassword3, setShowAccessPassword3] = useState(false);

    const [showAdminPassword1, setShowAdminPassword1] = useState(false);
    const [showAdminPassword2, setShowAdminPassword2] = useState(false);
    const [showAdminPassword3, setShowAdminPassword3] = useState(false);
  return (
    <div className='container'>
        <div className='logo'>
            <img src="./src/assets/expandJRLogoAzul.png" alt="Logo azul da ExpandJR" />
        </div>
        <h1>Página Admin</h1>
        <div className='form-box'>

            <div className='select-buttons'>
                <button  className={`selected-button ${buttonActive === 'admin' ? 'active' : ''}`} 
                onClick={() => {
                        
                        setShowAdminForm(true);
                        setShowAccessForm(false);
                        setShowAdminPasswordForm(false);
                        setButtonActive('admin');
                        }}
                        
                >Admin</button>
                
               <button className={`selected-button ${buttonActive === 'senhaGeral' ? 'active' : ''}`}
                                onClick={() => {
                                    setShowAdminForm(false);
                                    setShowAccessForm(true);
                                    setShowAdminPasswordForm(false);
                                    setButtonActive('senhaGeral');
                }}>Senha Geral</button>

                <button className={`selected-button ${buttonActive === 'senhaAdmin' ? 'active' : ''}`}
                                onClick={() => {
                                    setShowAdminForm(false);
                                    setShowAccessForm(false);
                                    setShowAdminPasswordForm(true);
                                    setButtonActive('senhaAdmin');
                }}>Senha Admin</button>
            </div>
               

                {showAdminForm && (
                    <form className='input-group'>
                        <label className='labels'>Admin Atual</label>
                        <input type='email' placeholder='Digite seu email' required />

                        <label>Novo Admin</label>
                        <input type='email' placeholder='Digite seu email' required/>

                        <label>Confirmar Novo Admin</label>
                        <input type='email' placeholder='Digite seu email' required />

                        <button>Confirmar</button>
                    </form>
                    )}  
                {showAccessForm && (
                    <form className='input-group'>
                        <label>Senha Geral Atual</label>
                        <div className="password-wrapper">
                            <input type={showAccessPassword1 ? 'text' : 'password'} placeholder="Digite a senha" required/>
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowAccessPassword1(!showAccessPassword1)}
                                aria-label={showAccessPassword1 ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                            {showAccessPassword1 ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <label>Nova Senha Geral</label>
                        <div className="password-wrapper">
                            <input type={showAccessPassword2 ? 'text' : 'password'} placeholder="Digite a senha" required/>
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowAccessPassword2(!showAccessPassword2)}
                                aria-label={showAccessPassword2 ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                            {showAccessPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <label>Confirmar Nova Senha Geral</label>
                        <div className="password-wrapper">
                            <input type={showAccessPassword3 ? 'text' : 'password'} placeholder="Digite a senha" required/>
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowAccessPassword3(!showAccessPassword3)}
                                aria-label={showAccessPassword3 ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                            {showAccessPassword3 ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <button>Confirmar</button>
                    </form>
                    )} 
                    
                {showAdminPasswordForm && (
                    <form className='input-group'>
                        <label>Senha Admin Atual</label>
                        <div className="password-wrapper">
                            <input type={showAdminPassword1 ? 'text' : 'password'} placeholder="Digite a senha" required/>
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowAdminPassword1(!showAdminPassword1)}
                                aria-label={showAdminPassword1 ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                            {showAdminPassword1 ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <label>Nova Senha Admin</label>
                        <div className="password-wrapper">
                            <input type={showAdminPassword2 ? 'text' : 'password'} placeholder="Digite a senha" required/>
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowAdminPassword2(!showAdminPassword2)}
                                aria-label={showAdminPassword2 ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                            {showAdminPassword2 ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <label>Confirmar Nova Senha Admin</label>
                        <div className="password-wrapper">
                            <input type={showAdminPassword3 ? 'text' : 'password'} placeholder="Digite a senha" required/>
                            <button
                                type="button"
                                className="toggle-password"
                                onClick={() => setShowAdminPassword3(!showAdminPassword3)}
                                aria-label={showAdminPassword3 ? 'Ocultar senha' : 'Mostrar senha'}
                            >
                            {showAdminPassword3 ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>

                        <button className='confirm'>Confirmar</button>
                    </form>
                    )}  
            
        </div>
        
    </div>
  );
}
export default Admin;
