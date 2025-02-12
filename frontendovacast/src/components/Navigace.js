import { Link } from "react-router-dom";

const Navigace = () => (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
        <h1 className="navbar-brand" >Pojištění app</h1>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            <Link className="nav-link" to="/">Domů</Link>
            <Link className="nav-link" to="/pojistenci">Pojištěnci</Link>
            <Link className="nav-link" to="/oaplikaci">O aplikaci</Link>
            {/*<Link className="nav-link" to="/registrace">Registrovat se</Link> */}
            </div>
        </div>
        </div>
    </nav>
);

export default Navigace;
