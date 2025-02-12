import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/api';

const ZobrazPojistence = () => {
    const { id } = useParams(); 
    const [pojistenec, setPojistenec] = useState(null);
    const [pojisteni, setPojisteni] = useState([]);


    useEffect(() => {
        axios.get(`${API_URL}pojistenci/${id}`).then((res) => {
            setPojistenec(res.data);
        });

        axios.get(`${API_URL}pojisteni`, { params: {pojistenciId: id}}).then((res) => {
            setPojisteni(res.data || []);
        });
    }, [id]);

    if (!pojistenec) return <p>Načítám...</p>;

    return (
        <div className='container'>
            <h2 className='display-2'>{pojistenec.jmeno} {pojistenec.prijmeni}</h2>
            <div>
                <p><strong>Věk:</strong> {pojistenec.vek}</p>
                <p><strong>Email:</strong> {pojistenec.email}</p>
                <p><strong>Telefon:</strong> +420 {pojistenec.telefon}</p>
                <p><strong>Ulice:</strong> {pojistenec.ulice}</p>
                <p><strong>Město:</strong> {pojistenec.mesto}</p>
            </div>
            <h3 className='display-4'>Seznam pojištění</h3>
                <Link to={`/pojisteni/add/${id}`}><button className='btn btn-success btn-lg my-3'>Přidat nové pojištění</button></Link>
            <table className='table table-hovered table-bordered w-50'>
                <thead>
                    <tr>
                        <th>Předmět</th>
                        <th>Částka</th>
                        <th>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(pojisteni) && pojisteni.length > 0 ? (pojisteni.map((zaznam) => (
                        <tr key={zaznam.id}>
                            <td>{zaznam.predmet}</td>
                            <td>{zaznam.castka} Kč</td>
                            <td>
                                <Link to={`/pojisteni/${zaznam.id}`}><button className='btn btn-primary mx-3'>Zobrazit</button></Link>
                                <Link to={`/pojisteni/edit/${zaznam.id}`}><button className='btn btn-warning mx-3 my-2'>Upravit</button></Link>
                                <Link to={`/pojisteni/delete/${zaznam.id}`}><button className='btn btn-danger mx-3'>Smazat</button></Link>
                            </td>
                        </tr>
                        ))
                    ) : (
                        <tr>
                            <td>Žádné pojištění</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <Link to="/pojistenci"><button className='btn btn-primary my-3'>Zpět na seznam pojištěnců</button></Link>
        </div>
    );
};

export default ZobrazPojistence;