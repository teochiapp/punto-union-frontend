import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeContainer from './pages/Home/HomeContainer';
import Catalog from './pages/Catalog/Catalog';
import CatalogContainer from './pages/Catalog/CatalogContainer';
import CartContainer from './pages/Catalog/Cart/CartContainer';
import CheckoutContainer from './pages/Catalog/Checkout/CheckoutContainer';
import AboutContainer from './pages/About/AboutContainer';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index element={<HomeContainer />} />
          <Route path="catalogo/:categoryName" element={<Catalog />} />
          <Route path="catalog" element={<CatalogContainer />}>
            <Route path="cart" element={<CartContainer />} />
            <Route path="checkout" element={<CheckoutContainer />} />
          </Route>
          <Route path="about" element={<AboutContainer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
