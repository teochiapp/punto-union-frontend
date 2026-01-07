import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Fetch categories from Strapi
export const fetchCategorias = async (limit = 9) => {
  try {
    const response = await api.get('/categorias', {
      params: {
        'pagination[limit]': limit,
        'populate': '*', // This will populate the Portada (cover image)
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categorias:', error);
    throw error;
  }
};

// Fetch all products
export const fetchProductos = async () => {
  try {
    const response = await api.get('/productos', {
      params: {
        'populate': '*',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching productos:', error);
    throw error;
  }
};

// Fetch products by category
export const fetchProductosPorCategoria = async (categoriaId) => {
  try {
    const response = await api.get('/productos', {
      params: {
        'filters[categorias][id][$eq]': categoriaId,
        'populate': '*',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching productos por categoria:', error);
    throw error;
  }
};

// Fetch single category by ID
export const fetchCategoria = async (categoriaId) => {
  try {
    const response = await api.get(`/categorias/${categoriaId}`, {
      params: {
        'populate': '*',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categoria:', error);
    throw error;
  }
};

// Fetch all animals
export const fetchAnimales = async () => {
  try {
    const response = await api.get('/animals', {
      params: {
        'populate': '*',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching animals:', error);
    throw error;
  }
};

// Fetch single animal by ID
// Note: Strapi v5 requires using filters for numeric IDs, not direct endpoint access
export const fetchAnimal = async (animalId) => {
  try {
    const response = await api.get('/animals', {
      params: {
        'filters[id][$eq]': animalId,
        'populate': '*',
      },
    });
    // Return the first result in the same format as before (with data wrapper)
    return { data: response.data.data?.[0] || null };
  } catch (error) {
    console.error('Error fetching animal:', error);
    throw error;
  }
};

// Fetch all promotions
export const fetchPromociones = async () => {
  try {
    const response = await api.get('/promociones', {
      params: {
        'populate': '*',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching promociones:', error);
    throw error;
  }
};

// Fetch categories by animal
export const fetchCategoriasPorAnimal = async (animalId) => {
  try {
    const response = await api.get('/categorias', {
      params: {
        'filters[animal][id][$eq]': animalId,
        'populate': '*',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categorias por animal:', error);
    throw error;
  }
};

export default api;

