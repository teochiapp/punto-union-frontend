import Header from '../../components/Global/Header';
import Hero from '../../components/Home/Hero';
import Footer from '../../components/Global/Footer';
import Categories from '../../components/Home/Categories/Categories';
import Sucursales from '../../components/Home/Sucursales/Sucursales';
import CategoriesMarquee from '../../components/Home/CategoriesMarquee/CategoriesMarquee';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <Categories />
      <Sucursales />
      <CategoriesMarquee />
      <Footer />
    </>
  );
};

export default Home;