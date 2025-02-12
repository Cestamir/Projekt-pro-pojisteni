import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navigace from './components/Navigace.js';
import HlavniStranka from './components/HlavniStranka';
import PojistenciList from './components/PojistenciList.js';
import PridejPojistence from './components/pojistenec/PridejPojistence.js';
import ZobrazPojistence from './components/pojistenec/ZobrazPojistence.js';
import UpravPojistence from './components/pojistenec/UpravPojistence.js';
import SmazejPojistence from './components/pojistenec/SmazejPojistence.js';
import PridejPojisteni from './components/pojisteni/PridejPojisteni.js';
import ZobrazPojisteni from './components/pojisteni/ZobrazPojisteni.js';
import UpravPojisteni from './components/pojisteni/UpravPojisteni.js';
import SmazejPojisteni from './components/pojisteni/SmazejPojisteni.js';
import OAplikaci from './components/OAplikaci.js';
/*import Registrace from './components/login/Registrace.js';*/
import 'bootstrap/dist/css/bootstrap.min.css';
import './Styly.css';

function App() {

  return (
      <Router>
          <Navigace />
          <Routes>
              <Route path="/" element={<HlavniStranka />} />
              <Route path="/pojistenci" element={<PojistenciList />} />
              <Route path="/pojistenci/add" element={<PridejPojistence />}/>
              <Route path="/pojistenci/:id" element={<ZobrazPojistence />} />
              <Route path="/pojistenci/edit/:id" element={<UpravPojistence />} />
              <Route path="/pojistenci/delete/:id" element={<SmazejPojistence />} />
              <Route path="/pojisteni/add/:id" element={<PridejPojisteni />} />
              <Route path="/pojisteni/:id" element={<ZobrazPojisteni />} />
              <Route path="/pojisteni/edit/:id" element={<UpravPojisteni />} />
              <Route path="/pojisteni/delete/:id" element={<SmazejPojisteni />} />
              <Route path='/oaplikaci' element={<OAplikaci/>} />
              {/*<Route path='/registrace' element={<Registrace/>} />*/}
          </Routes>
      </Router>
  );
}

export default App;
