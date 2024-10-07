import {Route , BrowserRouter as Router ,  Routes} from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import EscrowPage from './pages/EscrowPage';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <main>
      <Router>
        <Navbar></Navbar>
        <Routes>
          <Route path='/' element={<LandingPage></LandingPage>}></Route>
          <Route path='/escrow' element={<EscrowPage></EscrowPage>}></Route>       
        </Routes>
      </Router>
    </main>
  )
}

export default App