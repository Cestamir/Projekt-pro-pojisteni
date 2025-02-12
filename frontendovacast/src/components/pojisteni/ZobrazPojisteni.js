import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/api';

const ZobrazPojisteni = () => {
    const { id } = useParams();
    const [pojisteni, setPojisteni] = useState(null);
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    useEffect(() => {
        axios.get(`${API_URL}pojisteni/${id}`).then(res => {
            setPojisteni(res.data);
        });
    }, [id]);

    if (!pojisteni) return <p>Načítám...</p>;

    return (
        <div className='container'>
            <h2 className='display-3 my-2'>Detail pojištění</h2>
            <p><strong>Typ pojištění:</strong> {pojisteni.typ}</p>
            <p><strong>Předmět pojištění:</strong> {pojisteni.predmet}</p>
            <p><strong>Pojištěná částka:</strong> {pojisteni.castka} Kč</p>
            <p><strong>Platnost od:</strong> {pojisteni.od_data}</p>
            <p><strong>Platnost do:</strong> {pojisteni.do_data}</p>
            <button className='btn btn-primary my-2' variant="secondary" onClick={handleBack}>Zpět</button>
        </div>
    );
};

export default ZobrazPojisteni;