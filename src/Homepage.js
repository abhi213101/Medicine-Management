import React from 'react';
import './App.css';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { Route , Link} from 'react-router-dom';
import RFCMSEI from './RFCMSEI';
import RFCMSBI from './RFCMSBI';
import RFOD from './RFOD';
import LP from './LP';
import PMJAK from './PMJAK';
import Transfer from './Transfer';
import Consumption from './Consumption';
import EmergencyIndent from './EmergencyIndent';
import BiMonthlyIndent from './BiMonthlyIndent';
import TC from './TC';
import TR from './TR';
import CS from './CS';
import StoreAccount from './StoreAccount';
import NewMedicine from './NewMedicine';
import Home from "./Home";
import OB from './OB';
import EIPDF from './EIPDF';
import BIPDF from './BIPDF';
import SAPDF from './SAPDF';
import NewDB from './NewDB';
import './dropdown.css'


function HomePage() {
  return (
    
    <div className="App">

      <div className="boxex">

      
   
        <div>
          <Link to='/' className="linked"><button className="dropbtn">Home</button></Link>
        </div>
      

        <div class="dropdown">
            <button class="dropbtn">Data Entry</button>
            <div class="dropdown-content">
            <Link to='/OB'>Opening Balance</Link>
            <Link to='/RFCMSBI'>Received From CMS(Bi-Monthly)</Link>
            <Link to='/RFCMSEI'>Received From CMS(Emergency)</Link>
            <Link to='/RFOD'>Received From Other Disp.</Link>
            <Link to="/LP">Local Purchase</Link>
            <Link to='/PMJAK'>PMJAK</Link>
            <Link to='/Consumption'>OPD Consumption</Link>
            <Link to='/Transfer'>Transfer To Other Dispensary</Link>
            </div>
        </div>


          <div class="dropdown">
            <button class="dropbtn">Indents</button>
            <div class="dropdown-content">
              <Link to='/EI' >Emergency Indent</Link>
              <Link to='/BI' >Emergency Indent</Link>
            </div>
        </div>

        <div class="dropdown">
            <button class="dropbtn">Other Details</button>
            <div class="dropdown-content">
              <Link to='/EIPDF' >Emergency Indent PDF</Link>
              <Link to='/BIPDF' >Bi-Monthly Indent PDF</Link>
              <Link to='/SAPDF' >Store Account PDF</Link>
              <Link to='/TC'>Total Consumption PDF</Link>
              <Link to='/TR'>Total Received PDF</Link>
              <Link to='/CS' >Current Stock PDF</Link>
            </div>
        </div>

        <div>
        <Link to='/SA' className="linked"><button className="dropbtn">Store Account</button></Link>
        </div>
        
        <div>
        <Link to='/NM' className="linked"><button className="dropbtn">New Medicine</button></Link>
        </div>

        
        <div>
        <Link to='/NDB' className="linked"><button className="dropbtn">New Data-Base</button></Link>
        </div>

      </div>
        

      <hr/>

      
      <Route exact path="/" component={Home} />
      <Route exact path="/RFCMSEI" component={RFCMSEI} />
      <Route exact path="/RFCMSBI" component={RFCMSBI} />
      <Route exact path="/EIPDF" component={EIPDF} />
      <Route exact path="/BIPDF" component={BIPDF} />
      <Route exact path="/SAPDF" component={SAPDF} />
      <Route exact path="/OB" component={OB} />
      <Route exact path="/RFOD" component={RFOD} />
      <Route exact path="/LP" component={LP} />
      <Route exact path="/PMJAK" component={PMJAK} />
      <Route exact path="/Transfer" component={Transfer} />
      <Route exact path="/Consumption" component={Consumption} />
      <Route exact path="/EI" component={EmergencyIndent} />
      <Route exact path="/BI" component={BiMonthlyIndent} />
      <Route exact path="/TC" component={TC} />
      <Route exact path="/TR" component={TR} />
      <Route exact path="/CS" component={CS} />
      <Route exact path="/SA" component={StoreAccount} />
      <Route exact path="/NM" component={NewMedicine} />
      <Route exact path="/NDB" component={NewDB} />
      

    </div>
  );
}

export default HomePage;