import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/api';

const PojistenciList = () => {
    const [pojistenci, setPojistenci] = useState([]);

    useEffect(() => {
        axios.get(`${API_URL}pojistenci`).then(res => setPojistenci(res.data));
    }, []);

    return (
        <div className='container d-flex flex-column justify-content-center align-items-center'>
            <h2 className='display-2'>Pojištěnci</h2>
            <div className='d-flex justify-content-center align-items-center'>
                <Link to="/pojistenci/add"><button className='btn btn-success btn-lg my-3'>Nový pojištěnec</button></Link>
            </div>
            <table className='table table-hover table-bordered w-50'>
                <thead>
                    <tr>
                        <th>Jméno</th>
                        <th>Bydliště</th>
                        <th>Akce</th>
                    </tr>
                </thead>
                <tbody>
                    {pojistenci.map(pojistenec => (
                        <tr key={pojistenec.id}>
                            <td>{pojistenec.jmeno} {pojistenec.prijmeni}</td>
                            <td>{pojistenec.ulice}</td>
                            <td>
                                <Link to={`/pojistenci/${pojistenec.id}`}><button className='btn btn-primary'>Zobrazit</button></Link>
                                <Link to={`/pojistenci/edit/${pojistenec.id}`}><button className='btn btn-warning mx-3'>Upravit</button></Link>
                                <Link to={`/pojistenci/delete/${pojistenec.id}`}><button className='btn btn-danger'>Smazat</button></Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PojistenciList;