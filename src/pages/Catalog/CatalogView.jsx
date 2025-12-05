import { Outlet, NavLink } from 'react-router-dom';

const CatalogView = ({ categories, featuredProducts }) => {
  return (
    <section className="page page--catalog">
      <header className="page__header">
        <h1>Catálogo</h1>
        <p>Descubrí productores y emprendimientos de la economía social y solidaria.</p>
      </header>

      <section className="catalog__categories">
        {categories.map((category) => (
          <article key={category.id} className="catalog__category-card">
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <NavLink to={`/catalog?category=${category.id}`} className="catalog__link">
              Ver más
            </NavLink>
          </article>
        ))}
      </section>

      <section className="catalog__products">
        <h2>Productos destacados</h2>
        <ul className="catalog__product-grid">
          {featuredProducts.map((product) => (
            <li key={product.id} className="catalog__product-card">
              <span className="catalog__product-name">{product.name}</span>
              <span className="catalog__product-price">
                ${product.price.toLocaleString('es-AR')}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="catalog__actions">
        <NavLink to="cart" className="btn">
          Ir al carrito
        </NavLink>
        <NavLink to="checkout" className="btn btn--primary">
          Finalizar compra
        </NavLink>
      </section>

      <Outlet />
    </section>
  );
};

export default CatalogView;
