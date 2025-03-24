<<<<<<< HEAD
import { useState } from 'react';
import './Css/App.css';
import ContactForm from './Components/ContactForm';
import Logo from './Imagenes/fondo-final.png'


const videoList = [
  '/fondo-video.mp4',
  '/fondo-video2.mp4',
  '/fondo-video3.mp4',
  '/fondo-video6.mp4',
];

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleEnded = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % videoList.length);
  };

  return (
    <div className="video-fullscreen-container">
      <video
        key={videoList[currentIndex]}
        className="video-fullscreen"
        autoPlay
        muted
        playsInline
        onEnded={handleEnded}
      >
        <source src={videoList[currentIndex]} type="video/mp4" />
      </video>

      {/* CONTENEDOR QUE CENTRA */}
      <div className="form-center-wrapper">
        <img
          src={Logo} // ⚠️ asegúrate de que esté en la carpeta `public/`
          alt="Logo"
          className="logo-img"
        />
        <ContactForm />
      </div>
    </div>
  );
}

export default App;




=======
//import { useState } from 'react'
import reactLogo from './assets/react.svg';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/react';
//import viteLogo from '/web.jpg'
import './App.css'
import './estilos/fondo.css'
import './estilos/estilos.css'

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
    <div>
        <div className='background'>
          <h1 className="animated zoomInDown" color='blue'>Página en construcción</h1>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <Analytics/>
        <SpeedInsights/>
      </div>                           
      </>
      
  )
}

export default App
>>>>>>> 549bbef2c67276e01338c55e4665aab4e8120aac
