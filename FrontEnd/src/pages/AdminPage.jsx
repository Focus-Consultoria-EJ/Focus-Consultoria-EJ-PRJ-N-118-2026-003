import './Styles/AdminStyles.css';
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

function InputPassword(){
    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="password-wrapper">
            <input type={showPassword ? 'text' : 'password'} placeholder="Digite a senha" required/>
            <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
            >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
        </div>
    )
}

function Admin() {
    const [showAdminForm, setShowAdminForm] = useState(true);
    const [showAdminPasswordForm, setShowAdminPasswordForm] = useState(false);
    const [showAccessForm, setShowAccessForm] = useState(false);

    const [buttonActive, setButtonActive] = useState('admin');
  return (
    <div className='container'>
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
                        <InputPassword />

                        <label>Nova Senha Geral</label>
                        <InputPassword />

                        <label>Confirmar Nova Senha Geral</label>
                        <InputPassword />

                        <button>Confirmar</button>
                    </form>
                    )} 
                    
                {showAdminPasswordForm && (
                    <form className='input-group'>
                        <label>Senha Admin Atual</label>
                        <InputPassword />

                        <label>Nova Senha Admin</label>
                        <InputPassword />

                        <label>Confirmar Nova Senha Admin</label>
                        <InputPassword />

                        <button className='confirm'>Confirmar</button>
                    </form>
                    )}  
            
        </div>
        
    </div>
  );
}
export default Admin;
