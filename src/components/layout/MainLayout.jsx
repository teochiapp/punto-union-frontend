import { NavLink, Outlet } from 'react-router-dom';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="layout">
      <header className="layout__header">
        <span className="layout__brand">Punto Unión Market</span>
        <nav className="layout__nav">
          <NavLink to="/" end>
            Inicio
          </NavLink>
          <NavLink to="/catalog">Catálogo</NavLink>
          <NavLink to="/catalog/cart">Carrito</NavLink>
          <NavLink to="/catalog/checkout">Checkout</NavLink>
          <NavLink to="/about">Sobre Nosotros</NavLink>
        </nav>
      </header>
      <main className="layout__main">
        <Outlet />
      </main>
      <footer className="layout__footer">© {new Date().getFullYear()} Punto Unión Market</footer>
    </div>
  );
};

export default MainLayout;
