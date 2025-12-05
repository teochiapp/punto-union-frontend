const CartView = ({ items, total }) => {
  return (
    <section className="page page--cart">
      <h2>Carrito</h2>
      {items.length === 0 ? (
        <p>Tu carrito está vacío. Agregá productos desde el catálogo para continuar.</p>
      ) : (
        <>
          <ul className="cart__list">
            {items.map((item) => (
              <li key={item.id} className="cart__item">
                <span>{item.name}</span>
                <span>Cantidad: {item.quantity}</span>
                <span>${(item.price * item.quantity).toLocaleString('es-AR')}</span>
              </li>
            ))}
          </ul>
          <div className="cart__total">
            <span>Total</span>
            <strong>${total.toLocaleString('es-AR')}</strong>
          </div>
        </>
      )}
    </section>
  );
};

export default CartView;
