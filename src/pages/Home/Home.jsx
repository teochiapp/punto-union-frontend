import Header from '../../components/Global/Header';
import Hero from '../../components/Home/Hero';
import Footer from '../../components/Global/Footer';
import Categories from '../../components/Home/Categories/Categories';
import Sucursales from '../../components/Home/Sucursales/Sucursales';
import CategoriesMarquee from '../../components/Home/CategoriesMarquee/CategoriesMarquee';
import Promotions from '../../components/Home/Promotions/Promotions';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';

const Home = () => {
  return (
    <>
      <Header transparent />
      <Hero />
      <Categories />
      <Sucursales />
      <CategoriesMarquee />
      <WhatsAppButton />
      <Promotions />
      <Footer />
    </>
  );
};

export default Home;