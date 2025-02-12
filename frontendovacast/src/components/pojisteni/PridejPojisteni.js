import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/api';

const PridejPojisteni = () => {
    const { id } = useParams();
    const { pojistenciId } = useParams();
    const navigate = useNavigate();
    const [pojistenec,setPojistenec] = useState(null);
    const [pojisteni, setPojisteni] = useState({
        pojistenciId: pojistenciId, 
        typ: 'Pojisteni majetku',
        predmet: '',
        castka: '',
        od_data: '',
        do_data: ''
    });

    useEffect(() => {
        axios.get(`${API_URL}pojistenci/${id}`).then((res) => {
            setPojistenec(res.data);
        });
    }, [id]);

    const handleChange = (e) => {
        setPojisteni({ ...pojisteni, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const novePojisteni = {
            pojistenciId: id,
            typ: pojisteni.typ,
            predmet: pojisteni.predmet,
            castka: pojisteni.castka,
            od_data: pojisteni.od_data,
            do_data: pojisteni.do_data
        };

        try {
            await axios.post('http://localhost:5002/pojisteni', novePojisteni);
            alert("Pojištění přidáno");
            navigate(`/pojistenci/${id}`); //misto id pojistenciId
            window.location.reload();
        } catch (error) {
            console.error("Error při přidání pojištění:", error);
        }

    };

    if (!pojistenec) return <p>Načítám...</p>;

    return (
        <div className='container'>
        <form onSubmit={handleSubmit}>
            <h2 className='display-2'>Nové pojištění pro {pojistenec.jmeno} {pojistenec.prijmeni}</h2>
            <div className="mb-3">
                <select className='form-select' name="typ" value={pojisteni.typ} onChange={handleChange}>
                    <option value="Pojisteni majetku">Pojištění majetku</option>
                    <option value="Pojisteni osob">Pojištění osob</option>
                    <option value="Pojisteni udalosti">Pojištění události</option>
                </select>
            </div>
            <div className="mb-3">
                <label className="form-label">Předmět pojištění</label>
                <input className='form-control' type="text" name="predmet" placeholder="Byt" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Částka pojištění</label>
                <input className='form-control' type="number" name="castka" placeholder="100000" onChange={handleChange} required />
            </div>
            <div className="mb-3">
                <label className="form-label">Platnost pojištění od</label>
                <input className='form-control' type="date" name="od_data" onChange={handleChange} required />
            </div>
            <div class="mb-3">
                <label className="form-label">Platnost pojištění do</label>
                <input className='form-control' type="date" name="do_data" onChange={handleChange} required />
            </div>
            <button type="submit" className="btn btn-success">Přidat pojištění</button>
        </form>
        <button className="btn btn-danger my-3" onClick={() => navigate(`/pojistenci/${id}`)}>Zrušit</button>
        </div>
    );
};

export default PridejPojisteni;
