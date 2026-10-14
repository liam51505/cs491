import { Container } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const { state: count } = useLocation();
  const message =
    count === null || count === undefined
      ? <div>Value not yet defined</div>
      : <div>{count}</div>;

  return (
    <Container>
      <h3>Home is here</h3>
      <div>Counter value is: {message}</div>
    </Container>
  );
};

export default Home;