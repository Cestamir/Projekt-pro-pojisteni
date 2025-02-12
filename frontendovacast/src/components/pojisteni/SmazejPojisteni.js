import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../utils/api';

const SmazejPojisteni = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        await axios.delete(`${API_URL}pojisteni/${id}`);
        handleBack();
    };

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className='container'>
            <h2>Opravdu chcete smazat toto pojištění?</h2>
            <button className="btn btn-primary" onClick={handleDelete}>Ano, smazat</button>
            <button className="btn btn-danger mx-3" onClick={handleBack}>Zrušit</button>
        </div>
    );
};

export default SmazejPojisteni;
