import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCategorias } from '../../../services/api';

// Styled Components
const CategoriesSection = styled.section`
  padding: 4rem 0;
  background: var(--color-background);
`;

const CategoriesContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CategoriesGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
  justify-content: center;
  margin: 0;

  & > * {
    flex: 0 0 calc(33.333% - 15px);
    max-width: calc(33.333% - 15px);
  }

  @media (max-width: 1024px) {
    & > * {
      flex: 0 0 calc(50% - 11px);
      max-width: calc(50% - 11px);
    }
  }

  @media (max-width: 768px) {
    gap: 16px;
    
    & > * {
      flex: 0 0 calc(50% - 8px);
      max-width: calc(50% - 8px);
    }
  }

  @media (max-width: 480px) {
    & > * {
      flex: 0 0 100%;
      max-width: 100%;
    }
    gap: 16px;
  }
`;

const CategoryCard = styled.article`
  position: relative;
  width: 100%;
  min-height: 1px;
  background: var(--card-bg);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  height: 400px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  border-radius: 12px;

  &:hover {
    transform: translateY(-8px);
  }

  @media (max-width: 1024px) {
    height: 350px;
  }

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 280px;
  }
`;

const CategoryBackground = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${CategoryCard}:hover & {
    transform: scale(1.05);
  }
`;

const CategoryBackgroundPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
`;

const CategoryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.7) 100%);
  transition: background 0.3s ease;

  ${CategoryCard}:hover & {
    background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.8) 100%);
  }
`;

const CategoryTitle = styled.h3`
  position: relative !important;
  z-index: 2 !important;
  font-family: var(--font-header) !important;
  letter-spacing: 2px !important;
  font-size: 1.5rem !important;
  font-weight: 800 !important;
  line-height: 1.2 !important;
  text-transform: uppercase !important;
  color: #ffffff !important;
  margin: 0 !important;
  padding: 2rem 1.5rem !important;
  text-align: left !important;
  width: 100% !important;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5) !important;
  transition: transform 0.3s ease !important;

  ${CategoryCard}:hover & {
    transform: translateY(-4px) !important;
  }

  @media (max-width: 768px) {
    font-size: 1.1rem !important;
    padding: 1.5rem 1rem !important;
  }

  @media (max-width: 480px) {
    font-size: 1rem !important;
    padding: 1.25rem 1rem !important;
  }
`;

const CategoryCardLoading = styled.div`
  position: relative;
  width: 100%;
  min-height: 1px;
  background: var(--card-bg);
  overflow: hidden;
  height: 400px;
  pointer-events: none;

  @media (max-width: 1024px) {
    height: 350px;
  }

  @media (max-width: 768px) {
    height: 300px;
  }

  @media (max-width: 480px) {
    height: 280px;
  }
`;

const CategorySkeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    var(--bg-secondary) 0%,
    var(--bg-primary) 50%,
    var(--bg-secondary) 100%
  );
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s ease-in-out infinite;

  @keyframes skeleton-loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
`;

const ErrorMessage = styled.p`
  text-align: center;
  color: #e74c3c;
  font-size: 1.1rem;
  padding: 2rem;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 8px;
  margin-top: 2rem;
`;

// Component
const Categories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategorias();
        setCategories(data.data || []);
        setError(null);
      } catch (err) {
        setError('No se pudieron cargar las categorías');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const getImageUrl = (portada) => {
    if (!portada) return null;

    // Strapi returns the image URL directly or in nested structure
    if (portada.url) {
      const url = portada.url;
      return url.startsWith('http') ? url : `http://localhost:1337${url}`;
    }

    // Handle nested data structure
    if (portada.data?.attributes?.url) {
      const url = portada.data.attributes.url;
      return url.startsWith('http') ? url : `http://localhost:1337${url}`;
    }

    return null;
  };

  if (loading) {
    return (
      <CategoriesSection>
        <CategoriesContainer>
          <CategoriesGrid>
            {[...Array(9)].map((_, index) => (
              <CategoryCardLoading key={index}>
                <CategorySkeleton />
              </CategoryCardLoading>
            ))}
          </CategoriesGrid>
        </CategoriesContainer>
      </CategoriesSection>
    );
  }

  if (error) {
    return (
      <CategoriesSection>
        <CategoriesContainer>
          <ErrorMessage>{error}</ErrorMessage>
        </CategoriesContainer>
      </CategoriesSection>
    );
  }

  return (
    <CategoriesSection>
      <CategoriesContainer>
        <CategoriesGrid>
          {categories.map((categoria) => {
            const imageUrl = getImageUrl(categoria.Portada);

            return (
              <CategoryCard
                key={categoria.id}
                onClick={() => navigate(`/catalogo/${encodeURIComponent(categoria.Nombre)}`)}
              >
                {imageUrl ? (
                  <CategoryBackground
                    src={imageUrl}
                    alt={categoria.Nombre || 'Categoría'}
                  />
                ) : (
                  <CategoryBackgroundPlaceholder>
                    <span>📦</span>
                  </CategoryBackgroundPlaceholder>
                )}
                <CategoryOverlay />
                <CategoryTitle>
                  {categoria.Nombre || 'Sin nombre'}
                </CategoryTitle>
              </CategoryCard>
            );
          })}
        </CategoriesGrid>
      </CategoriesContainer>
    </CategoriesSection>
  );
};

export default Categories;
