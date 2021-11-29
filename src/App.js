
import './App.css';
import { Routes, Route } from 'react-router';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer'
import AllPictures from './pages/AllPictures';

function App() {
  return (
    <>
    <Header/>
    <Routes>
      <Route path="/all-images" element={<AllPictures/>} />
      
  
    </Routes>
    <Footer/>
    </>
  );
}

export default App;
