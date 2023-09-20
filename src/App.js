import logo from './logo.svg';
import './App.css';
import AppRouter from './Routes/AppRouter';

import Navbar from './components/Navbar';
import Footer from './components/Footer';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <AppRouter/>
      <Footer/>
    </div>
  );
}

export default App;
