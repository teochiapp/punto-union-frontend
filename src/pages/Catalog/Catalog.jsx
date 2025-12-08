import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCategorias, fetchProductos, fetchProductosPorCategoria } from '../../services/api';

// Styled Components
const CatalogSection = styled.section`
  min-height: 60vh;
  padding: 2rem 0;
`;

const CatalogContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CatalogHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  font-family: var(--font-header);
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-bottom: 2rem;

  &:hover {
    background: var(--primary-color);
    color: white;
  }
`;

const CategoryTitle = styled.h1`
  font-family: var(--font-header) !important;
  font-size: 3rem !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 2px !important;
  color: var(--text-primary) !important;
  margin: 0 0 1rem 0 !important;

  @media (max-width: 768px) {
    font-size: 2rem !important;
  }
`;

const CategoryDescription = styled.p`
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ProductCard = styled.article`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 250px;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  background-color: #f0f0f0;
`;

const ProductImagePlaceholder = styled.div`
  width: 100%;
  height: 250px;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductName = styled.h3`
  font-family: var(--font-header) !important;
  font-size: 1.25rem !important;
  font-weight: 600 !important;
  color: var(--text-primary) !important;
  margin: 0 0 0.5rem 0 !important;
`;

const ProductPrice = styled.p`
  font-family: var(--font-body);
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin: 0.5rem 0;
`;

const ProductDescription = styled.p`
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: var(--text-secondary);
  margin: 0.5rem 0 0 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const LoadingState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const ErrorState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 12px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

// Component
const Catalog = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Decode the category name from URL
        const decodedCategoryName = decodeURIComponent(categoryName);

        // Fetch all categories to find the one with matching name
        const categoriesData = await fetchCategorias(100);
        const matchedCategory = categoriesData.data?.find(
          cat => cat.Nombre?.toLowerCase() === decodedCategoryName.toLowerCase()
        );

        if (!matchedCategory) {
          setError('Categoría no encontrada');
          setLoading(false);
          return;
        }

        setCategory(matchedCategory);

        // Fetch products by specific category
        const productsData = await fetchProductosPorCategoria(matchedCategory.id);
        const products = productsData.data || [];

        setProducts(products);
      } catch (err) {
        console.error('Error loading catalog:', err);
        setError('No se pudieron cargar los productos');
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      loadData();
    }
  }, [categoryName]);

  const getImageUrl = (imagen) => {
    if (!imagen) return null;

    if (imagen.url) {
      const url = imagen.url;
      return url.startsWith('http') ? url : `http://localhost:1337${url}`;
    }

    if (imagen.data?.attributes?.url) {
      const url = imagen.data.attributes.url;
      return url.startsWith('http') ? url : `http://localhost:1337${url}`;
    }

    return null;
  };

  if (loading) {
    return (
      <CatalogSection>
        <CatalogContainer>
          <LoadingState>Cargando productos...</LoadingState>
        </CatalogContainer>
      </CatalogSection>
    );
  }

  if (error) {
    return (
      <CatalogSection>
        <CatalogContainer>
          <BackButton onClick={() => navigate('/')}>
            ← Volver al inicio
          </BackButton>
          <ErrorState>{error}</ErrorState>
        </CatalogContainer>
      </CatalogSection>
    );
  }

  const renderDescription = (descripcion) => {
    if (!descripcion) return null;

    // Check if it's an array (Strapi blocks format)
    if (Array.isArray(descripcion)) {
      // Extract text from the first paragraph that has text
      for (const block of descripcion) {
        if (block.type === 'paragraph' && block.children) {
          const text = block.children
            .map(child => child.text)
            .join(' ')
            .trim();

          if (text) return text;
        }
      }
      return null;
    }

    // If it's a string, just return it
    if (typeof descripcion === 'string') {
      return descripcion;
    }

    return null;
  };

  return (
    <CatalogSection>
      <CatalogContainer>
        <BackButton onClick={() => navigate('/')}>
          ← Volver al inicio
        </BackButton>

        <CatalogHeader>
          <CategoryTitle>
            {category?.Nombre || 'Categoría'}
          </CategoryTitle>
          {category?.Descripcion && (
            <CategoryDescription>{renderDescription(category.Descripcion)}</CategoryDescription>
          )}
        </CatalogHeader>

        {products.length === 0 ? (
          <EmptyState>
            No hay productos disponibles en esta categoría
          </EmptyState>
        ) : (
          <ProductsGrid>
            {products.map((product) => {
              const imageUrl = getImageUrl(product.Portada);
              const descriptionText = renderDescription(product.Descripcion);

              return (
                <ProductCard key={product.id} onClick={() => console.log('Product clicked:', product.id)}>
                  {imageUrl ? (
                    <ProductImage $image={imageUrl} />
                  ) : (
                    <ProductImagePlaceholder>
                      <span>📦</span>
                    </ProductImagePlaceholder>
                  )}
                  <ProductInfo>
                    <ProductName>{product.Nombre || 'Producto'}</ProductName>
                    {product.Precio && (
                      <ProductPrice>${product.Precio}</ProductPrice>
                    )}
                    {descriptionText && (
                      <ProductDescription>{descriptionText}</ProductDescription>
                    )}
                  </ProductInfo>
                </ProductCard>
              );
            })}
          </ProductsGrid>
        )}
      </CatalogContainer>
    </CatalogSection>
  );
};

export default Catalog;
