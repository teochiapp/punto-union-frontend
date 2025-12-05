import { useState } from 'react';

const CheckoutView = ({ steps, onSubmit }) => {
  const [activeStep, setActiveStep] = useState(steps[0]?.id ?? 'shipping');
  const [formState, setFormState] = useState({ shipping: {}, payment: {}, summary: {} });

  const handleInputChange = (section, field, value) => {
    setFormState((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(formState);
  };

  return (
    <section className="page page--checkout">
      <h2>Checkout</h2>
      <nav className="checkout__steps">
        {steps.map((step) => (
          <button
            key={step.id}
            type="button"
            className={`checkout__step ${step.id === activeStep ? 'is-active' : ''}`}
            onClick={() => setActiveStep(step.id)}
          >
            {step.label}
          </button>
        ))}
      </nav>

      <form className="checkout__form" onSubmit={handleSubmit}>
        {activeStep === 'shipping' && (
          <div className="checkout__section">
            <label>
              Nombre y Apellido
              <input
                type="text"
                value={formState.shipping.fullName ?? ''}
                onChange={(event) => handleInputChange('shipping', 'fullName', event.target.value)}
                required
              />
            </label>
            <label>
              Dirección
              <input
                type="text"
                value={formState.shipping.address ?? ''}
                onChange={(event) => handleInputChange('shipping', 'address', event.target.value)}
                required
              />
            </label>
          </div>
        )}

        {activeStep === 'payment' && (
          <div className="checkout__section">
            <label>
              Método de pago
              <select
                value={formState.payment.method ?? ''}
                onChange={(event) => handleInputChange('payment', 'method', event.target.value)}
                required
              >
                <option value="">Seleccionar...</option>
                <option value="credit-card">Tarjeta de crédito</option>
                <option value="debit-card">Tarjeta de débito</option>
                <option value="transfer">Transferencia bancaria</option>
              </select>
            </label>
          </div>
        )}

        {activeStep === 'summary' && (
          <div className="checkout__section">
            <p>Revisá la información cargada antes de confirmar tu compra.</p>
            <button type="submit" className="btn btn--primary">
              Confirmar compra
            </button>
          </div>
        )}
      </form>
    </section>
  );
};

export default CheckoutView;
