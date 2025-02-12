import React from 'react'

function OAplikaci() {
  return (
    <div className='container d-flex flex-column justify-content-center align-items-center'>
    <div className="card w-75 my-5">
        <div className="card-header">
            Moje jméno je Čestmír Pavlásek a jsem student IT rekvalifikace
        </div>
        <div class="card-body">
            <h5 className="card-title">Vytvořeno pro závěrečný projekt rekvalifikace www aplikací Javascriptu</h5>
            <p className='card-text'>V projektu používám React, Nodejs, Javascript, Css, Html, Express, MySQL </p>
            <p className="card-text">Všechny znalosti, které jsem mohl zde využít jsou díky <a href='https://www.itnetwork.cz/'>ITnetwork.cz</a></p>
        </div>
    </div>
    </div>
  )
}

export default OAplikaci