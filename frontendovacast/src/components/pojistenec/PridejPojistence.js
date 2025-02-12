import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/api';

const PridejPojistence = () => {
    const [pojistenec, setPojistenec] = useState({ jmeno: '', prijmeni: '', vek: '', email: '', telefon: '', ulice: '', mesto: '' });
    const navigate = useNavigate();

    const handleChange = e => setPojistenec({ ...pojistenec, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        axios.post(`${API_URL}pojistenci`, pojistenec,).then(() => navigate('/pojistenci'));
    };

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center'>
        <h2 className='display-3'>Přidat nového pojištěnce</h2>
        <form className='w-50' onSubmit={handleSubmit}>
            <div className='mb-3'>
                    <label className="form-label">Jméno</label>
                    <input className='form-control' name="jmeno" minLength={3} placeholder="Hugo" onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Přijmení</label>
                    <input className='form-control' name="prijmeni" placeholder="Novák" onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Věk</label>
                    <input className='form-control' name="vek" type="number" min={18} placeholder="55" onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Email</label>
                    <input className='form-control' name="email" placeholder="a@b.cz" onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Telefon</label>
                    <input className='form-control' minLength={9} maxLength={9} type="text" name="telefon" placeholder="777555666" onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Ulice a číslo popisné</label>
                    <input className='form-control' type="text" name="ulice" placeholder="U vody 2" onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Město</label>
                    <input className='form-control' type="text" name="mesto" placeholder="Praha" onChange={handleChange} required />
                </div>
                <button className='btn btn-success my-2' type="submit">Přidat</button>
                <Link to="/pojistenci"><button className='btn btn-primary mx-3'>Zpět na seznam pojištěnců</button></Link>
        </form>
        </div>
    );
};

export default PridejPojistence;