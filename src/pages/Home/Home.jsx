import { motion } from 'framer-motion';
import Header from '../../components/Global/Header';
import Hero from '../../components/Home/Hero';
import Footer from '../../components/Global/Footer';
import Categories from '../../components/Home/Categories/Categories';
import Sucursales from '../../components/Home/Sucursales/Sucursales';
import CategoriesMarquee from '../../components/Home/CategoriesMarquee/CategoriesMarquee';
import Promotions from '../../components/Home/Promotions/Promotions';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';

// Animation variants for sections
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" }
};

const fadeIn = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.8, ease: "easeOut" }
};

const Home = () => {
  return (
    <>
      <Header transparent />
      <Hero />

      {/* Categories with fade-in from bottom */}
      <motion.div {...fadeInUp}>
        <Categories />
      </motion.div>

      {/* Sucursales with fade-in from bottom */}
      <motion.div {...fadeInUp}>
        <Sucursales />
      </motion.div>

      {/* Categories Marquee with simple fade-in */}
      <motion.div {...fadeIn}>
        <CategoriesMarquee />
      </motion.div>

      <WhatsAppButton />

      {/* Promotions with fade-in from bottom */}
      <motion.div {...fadeInUp}>
        <Promotions />
      </motion.div>

      <Footer />
    </>
  );
};

export default Home;