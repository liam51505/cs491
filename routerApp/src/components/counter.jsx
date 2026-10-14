import React, { useState } from 'react';
import '../App.css';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Counter = () => {
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const decrease = () => setCount(count => count - 1);
  const increase = () => setCount(count => count + 1);

  const goHome = () => {
    navigate('/', { state: count });
  };

  return (
    <Container>
      <div><h3>Counter</h3></div>
      <div><em>Look at the url</em></div>
      <Button size="sm" variant="danger" onClick={decrease}>-</Button>
      {' '}{count}{' '}
      <Button size="sm" variant="success" onClick={increase}>+</Button>
      <br /><br />
      <Button onClick={goHome}>Click me!</Button>
      <div>
        Click the button to go Home with a state count of {count}
      </div>
    </Container>
  );
};

export default Counter;