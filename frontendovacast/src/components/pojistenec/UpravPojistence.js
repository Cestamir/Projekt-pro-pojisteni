import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/api';

const UpravPojistence = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pojistenec, setPojistenec] = useState({
        jmeno: '',
        prijmeni: '',
        vek: '',
        email: '',
        telefon: '',
        ulice: '',
        mesto: ''
    });

    // Fetch existing data for this person
    useEffect(() => {
        axios.get(`${API_URL}pojistenci/${id}`).then((res) => {
            setPojistenec(res.data);
        });
    }, [id]);

    const handleChange = (e) => {
        setPojistenec({ ...pojistenec, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`${API_URL}pojistenci/${id}`, pojistenec);
            navigate('/pojistenci');
        } catch (error) {
            console.error('Error při uprávě pojištěnce:', error);
        }
    };

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center'>
            <h2 className='display-3'>Uprav pojištěnce</h2>
            <form className='w-50' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className="form-label">Jméno</label>
                    <input className='form-control' type="text" name="jmeno" value={pojistenec.jmeno} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Přijmení</label>
                    <input className='form-control' type="text" name="prijmeni" value={pojistenec.prijmeni} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Věk</label>
                    <input className='form-control' type="number" name="vek" value={pojistenec.vek} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Email</label>
                    <input className='form-control' type="email" name="email" value={pojistenec.email} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Telefon</label>
                    <input className='form-control' type="text" name="telefon" value={pojistenec.telefon} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Ulice a číslo popisné</label>
                    <input className='form-control' type="text" name="ulice" value={pojistenec.ulice} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className="form-label">Město</label>
                    <input className='form-control' type="text" name="mesto" value={pojistenec.mesto} onChange={handleChange} required />
                </div>
                <button className='btn btn-warning' type="submit">Ulož změny</button>
                <button className='btn btn-danger mx-3' onClick={() => navigate('/pojistenci')}>Zrušit</button>
            </form>
        </div>
    );
};

export default UpravPojistence;