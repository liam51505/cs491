import { Container } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';

function About() {
  const { name } = useParams();

  return (
    <Container>
      <h3>About {name}</h3>
      <p>
        Hi, I'm {name}. I'm a student at Pace University studying computer science!! #sidenbergsquad
      </p>
    </Container>
  );
}

export default About;