import CatalogView from './CatalogView';

const CatalogContainer = () => {
  const categories = [
    { id: 'fresh', name: 'Frescos', description: 'Frutas, verduras y productos recién cosechados.' },
    { id: 'artisan', name: 'Artesanales', description: 'Elaboraciones únicas de productores regionales.' },
    { id: 'pantry', name: 'Almacén', description: 'Ingredientes e infusiones para tu día a día.' },
  ];

  const featuredProducts = [
    { id: 1, name: 'Mermelada de frutos rojos', price: 3500 },
    { id: 2, name: 'Yerba orgánica', price: 4200 },
    { id: 3, name: 'Queso de cabra artesanal', price: 8900 },
  ];

  return <CatalogView categories={categories} featuredProducts={featuredProducts} />;
};

export default CatalogContainer;
