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




