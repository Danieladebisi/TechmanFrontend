import { Container } from 'react-bootstrap';
import Carousel from '../components/Carousel';
import Footer from '../components/Footer';
import Section from './Section';
import NavbarMenu from './NavbarMenu';

function Home() {
  return (
  <>
  <NavbarMenu />
    <Container className="mt-5">
      <Carousel />
      <h1 className='pt-5 text-center'>Welcome to Techmansion</h1>
      <p className='text-center text-2xl'>Choosing the right mobile device can be overwhelming with so many options available. Whether you need a phone for gaming, photography, business, or everyday use, comparing features like battery life, camera quality, performance, and price is essential. High-end flagships offer cutting-edge technology, while mid-range devices balance performance and affordability. Budget-friendly smartphones provide great value for essential tasks without breaking the bank. Consider factors like display quality, storage capacity, and software updates to ensure long-term satisfaction. Comparing brands and models helps you find the best fit for your needs. Make an informed decision and invest in a device that enhances your lifestyle.</p>
     <Section />
     <Footer /> 
    </Container>
   </>
  );
}

export default Home;