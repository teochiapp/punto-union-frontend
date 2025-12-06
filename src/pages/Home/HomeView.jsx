import Categories from '../../components/Home/Categories/Categories';
import Sucursales from '../../components/Home/Sucursales/Sucursales';
import CategoriesMarquee from '../../components/Home/CategoriesMarquee/CategoriesMarquee';

const HomeView = () => {
  return (
    <>
      <section className="page page--home">
        {/* Categories Section */}
        <Categories />

        {/* Sucursales Section */}
        <Sucursales />
      </section>

      {/* Categories Marquee - Outside page container to prevent overflow */}
      <CategoriesMarquee />
    </>
  );
};

export default HomeView;
