import {useCallback, useEffect, useState} from 'react'
import './App.css'
import {JackInTheBox} from "react-awesome-reveal";

function App() {
  const [currentLetter, setCurrentLetter] = useState(Math.floor(Math.random() * 26) + 65);
  const [previousLetters, setPreviousLetters] = useState<number[]>([]);
  const [trigger, setTrigger] = useState(false);
  const {innerWidth: width, innerHeight: height} = window;
  const isMobile = width < height;
  const validateNumber = (currentNumber: number) => {
    let newNumber = currentNumber;
    if (previousLetters.indexOf(currentNumber) > -1) {
      newNumber = validateNumber(Math.floor(Math.random() * 26) + 65);
    } else {
      const newNumbers: number[] = previousLetters;
      if (previousLetters.length >= 3) {
        newNumbers.unshift(currentNumber);
         setPreviousLetters(newNumbers.slice(0, 8));
      } else {
        setPreviousLetters([...previousLetters, currentNumber]);
      }
    }
    return newNumber;
  }
  const handler = useCallback(() => {
    const randNumber = () => Math.floor(Math.random() * 26) + 65;
    const currentNumber = validateNumber(randNumber());
    setCurrentLetter(currentNumber);
    console.log()
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
