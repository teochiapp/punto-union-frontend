import React, { useState, useEffect } from 'react';
import CatalogView from './CatalogView';
import { fetchProductos, fetchCategorias } from '../../services/api';

const CatalogContainer = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    selectedCategories: [],
    priceRange: { min: 0, max: 100000 }
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        window.scrollTo(0, 0);

        // Fetch products and categories in parallel
        const [productsData, categoriesData] = await Promise.all([
          fetchProductos(),
          fetchCategorias(100)
        ]);

        setProducts(productsData.data || []);
        setCategories(categoriesData.data || []);
      } catch (err) {
        console.error('Error loading catalog data:', err);
        setError('Hubo un problema al cargar el catálogo.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <CatalogView
      products={products}
      categories={categories}
      loading={loading}
      error={error}
      filters={filters}
      onFilterChange={handleFilterChange}
    />
  );
};

export default CatalogContainer;
