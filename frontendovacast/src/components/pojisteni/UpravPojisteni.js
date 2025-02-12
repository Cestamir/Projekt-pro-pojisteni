import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/api';

const UpravPojisteni = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pojisteni, setPojisteni] = useState({
        typ: '',
        predmet: '',
        castka: '',
        od_data: '',
        do_data: ''
    });

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return dateString.split("T")[0];
    };

    useEffect(() => {
        axios.get(`${API_URL}${id}`).then((res) => {
            const data = res.data;
            setPojisteni({...data, od_data: formatDate(data.od_data), do_data: formatDate(data.do_data),});
        })
        .catch((err) => console.error("Error ziskani dat pojisteni:", err));
    }, [id]);

    const handleChange = (e) => {
        setPojisteni({ ...pojisteni, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.put(`${API_URL}pojisteni/${id}`, pojisteni).then(() => {
            alert("pojištění úspěšně změněno")
        });
        navigate(-1);
    };

    return (
        <div className='container'>
            <h2 className='display-3'>Upravit pojištění</h2>
            <form className='w-75' onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label className='form-label'>Typ</label>
                    <select className='form-select' name="typ" value={pojisteni.typ} onChange={handleChange}>
                        <option value="Pojisteni majetku">Pojištění majetku</option>
                        <option value="Pojisteni osob">Pojištění osob</option>
                        <option value="Pojisteni udalosti">Pojištění události</option>
                    </select>
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Předmět pojištění</label>
                    <input className='form-control' type="text" name="predmet" value={pojisteni.predmet} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Částka k pojištění</label>
                    <input className='form-control' type="number" name="castka" value={pojisteni.castka} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Platnost od data</label>
                    <input className='form-control' type="date" name="od_data" value={pojisteni.od_data} onChange={handleChange} required />
                </div>
                <div className='mb-3'>
                    <label className='form-label'>Platnost do data</label>
                    <input className='form-control' type="date" name="do_data" value={pojisteni.do_data} onChange={handleChange} required />
                </div>
                <button className='btn btn-primary' type="submit">Uložit změny</button>
                <button className='btn btn-danger mx-3' variant="secondary" onClick={() => navigate(-1)}>Zrušit</button>
            </form>
        </div>
    );
};

export default UpravPojisteni;