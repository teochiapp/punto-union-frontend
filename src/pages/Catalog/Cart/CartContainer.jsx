import CartView from './CartView';

const CartContainer = () => {
  const cartItems = [];

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return <CartView items={cartItems} total={total} />;
};

export default CartContainer;
