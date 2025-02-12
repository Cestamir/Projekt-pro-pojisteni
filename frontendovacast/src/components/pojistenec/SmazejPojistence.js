import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/api';

const SmazejPojistence = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await axios.delete(`${API_URL}pojistenci/${id}`);
        navigate('/pojistenci');
    };

    return (
        <div className='container'>
            <h2>Opravdu chcete smazat tohoto pojištěnce?</h2>
            <button className='btn btn-primary' onClick={handleDelete}>Ano, smazat</button>
            <button className='btn btn-danger mx-3' onClick={() => navigate('/pojistenci')}>Zrušit</button>
        </div>
    );
};

export default SmazejPojistence;