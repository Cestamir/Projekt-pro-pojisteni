import React, { useEffect, useState } from 'react'
import { API_URL } from '../utils/api';
import axios from 'axios';


function HlavniStranka() {
  const [pojistenci, setPojistenci] = useState([]);

  useEffect(() => {
      axios.get(`${API_URL}pojistenci`).then(res => setPojistenci(res.data));
  }, []);

  return (
    <div className='bck container d-flex flex-column justify-content-center align-items-center'>
      <div>
        <h1 className='display-1 my-3'>Vítejte v pojišťovací aplikaci!</h1>
        <h3><em>Počet pojištěnců v databázi: {pojistenci.length}</em></h3>
      </div>
    </div>
  )
}

export default HlavniStranka