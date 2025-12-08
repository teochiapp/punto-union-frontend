import Header from '../../components/Global/Header';
import Hero from '../../components/Home/Hero';
import Footer from '../../components/Global/Footer';
import Categories from '../../components/Home/Categories/Categories';
import Sucursales from '../../components/Home/Sucursales/Sucursales';
import CategoriesMarquee from '../../components/Home/CategoriesMarquee/CategoriesMarquee';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <Sucursales />
      <CategoriesMarquee />
      <WhatsAppButton />
      <Footer />
    </>
  );
};

export default Home;