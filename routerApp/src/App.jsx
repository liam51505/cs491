import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Counter from './components/counter.jsx';
import About from './components/about.jsx';
import Contact from './components/contact.jsx';
import Home from './components/home.jsx';

function DefaultContact() {
  return <h3>Contact us</h3>;
}

function App() {
  const name = "John";
  const city = "NYC";
  return (
    <Container>
      <Router>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to={`/about/${name}`}>About</Link></li>
          <li><Link to="/counter">Counter</Link></li>
          <li><Link to={`/contact/${name}/${city}`}>Contact</Link></li>
        </ul>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about/:name" element={<About />} />
          <Route path="/contact" element={<DefaultContact />} />
          <Route path="/contact/:name/:city" element={<Contact />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="*" element={<h3>404: Page not found</h3>} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;