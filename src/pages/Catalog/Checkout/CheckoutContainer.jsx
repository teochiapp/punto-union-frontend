import CheckoutView from './CheckoutView';

const CheckoutContainer = () => {
  const steps = [
    { id: 'shipping', label: 'Datos de entrega' },
    { id: 'payment', label: 'Método de pago' },
    { id: 'summary', label: 'Resumen y confirmación' },
  ];

  const onSubmit = (formData) => {
    // TODO: conectar con API de órdenes cuando esté disponible
    console.log('Checkout form submitted', formData);
  };

  return <CheckoutView steps={steps} onSubmit={onSubmit} />;
};

export default CheckoutContainer;
