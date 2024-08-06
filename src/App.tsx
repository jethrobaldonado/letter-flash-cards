import {useCallback, useEffect, useState} from 'react'
import './App.css'
import {JackInTheBox} from "react-awesome-reveal";

function App() {
  const [currentLetter, setCurrentLetter] = useState(Math.floor(Math.random() * 26) + 65);
  const [trigger, setTrigger] = useState(false);
  const { innerWidth: width, innerHeight: height } = window;
  const isMobile = width < height;
  const handler = useCallback(() => {
    const randNumber = Math.floor(Math.random() * 26) + 65;
    setCurrentLetter(randNumber);
    setTrigger(!trigger);
  }, [trigger]);

  const keyDownHandler = useCallback((event: KeyboardEvent) => {
    if (event.keyCode === 32) {
      handler();
    }
  }, [trigger]);
  const handleClick = () => {
    handler();
  }

  useEffect(() => {
    document.addEventListener('keydown', keyDownHandler);

    return () => {
      document.removeEventListener('keydown', keyDownHandler);
    }
  }, [keyDownHandler, trigger]);

  return (
    <JackInTheBox key={trigger ? 'open' : 'close'} duration={2000}>
      <div
        onClick={handleClick}
        style={{
          border: '12px solid #000000',
          borderRadius: '20px',
          height: '80vh',
          width: isMobile ? '80vw' : '40vw',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          background: '#EEEEEE',
        }}
      >
        <h1>{String.fromCharCode(currentLetter)}</h1>
      </div>
    </JackInTheBox>
  )
}

export default App
