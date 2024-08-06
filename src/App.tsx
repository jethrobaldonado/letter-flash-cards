import {useEffect, useRef, useState} from 'react'
import './App.css'
import {JackInTheBox} from "react-awesome-reveal";

function App() {
  const [currentLetter, setCurrentLetter] = useState(null);
  const [trigger, setTrigger] = useState(false);
  const keyDownHandler = (event) => {
    if (event.keyCode === 32) {
      const randNumber = Math.floor(Math.random() * 26) + 65;
      setCurrentLetter(randNumber);
      setTrigger(!trigger);
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    }
  }, [trigger]);

  return (
    <JackInTheBox key={trigger} duration={2000}>
      <div style={{
        border: '12px solid #000000',
        borderRadius: '20px',
        height: '80vh',
        width: '40vw',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#EEEEEE',
      }}>
        <h1>{String.fromCharCode(currentLetter)}</h1>
      </div>
    </JackInTheBox>
  )
}

export default App
