import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { fetchCategorias } from '../../../services/api';

// Keyframe animation for infinite scroll
const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
`;

// Styled Components
const MarqueeSection = styled.section`
  padding: 3rem 0;
  background: var(--color-background);
  overflow: hidden;
  width: 100%;
  max-width: 90vw;
  position: relative;
`;

const MarqueeContainer = styled.div`
  position: relative;
  overflow: hidden;
  white-space: nowrap;
  width: 100%;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    width: 100px;
    height: 100%;
    z-index: 2;
    pointer-events: none;
  }
  
  &::before {
    left: 0;
    background: linear-gradient(to right, var(--color-background) 0%, transparent 100%);
  }
  
  &::after {
    right: 0;
    background: linear-gradient(to left, var(--color-background) 0%, transparent 100%);
  }
`;

const MarqueeTrack = styled.div`
  display: inline-flex;
  animation: ${scroll} 40s linear infinite;
  
  &:hover {
    animation-play-state: paused;
  }
`;

const CategoryItem = styled.span`
  display: inline-flex;
  align-items: center;
  font-family: var(--font-header) !important;
  font-size: 2rem !important;
  font-weight: 700 !important;
  text-transform: uppercase !important;
  letter-spacing: 2px !important;
  color: var(--text-primary) !important;
  padding: 0 2rem !important;
  white-space: nowrap !important;
  cursor: pointer !important;
  transition: color 0.3s ease !important;
  
  &:hover {
    color: var(--primary-color) !important;
  }
  
  &::after {
    content: '•';
    margin-left: 2rem;
    color: var(--primary-color);
    font-size: 1.5rem;
  }
  
  @media (max-width: 768px) {
    font-size: 1.5rem !important;
    padding: 0 1.5rem !important;
    
    &::after {
      margin-left: 1.5rem;
      font-size: 1.2rem;
    }
  }
`;

// Component
const CategoriesMarquee = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        const data = await fetchCategorias(20); // Fetch more for variety
        setCategories(data.data || []);
      } catch (err) {
        console.error('Error loading categories for marquee:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading || categories.length === 0) {
    return null; // Don't render until categories are loaded
  }

  // Duplicate categories for seamless infinite scroll
  const duplicatedCategories = [...categories, ...categories];

  return (
    <MarqueeSection>
      <MarqueeContainer>
        <MarqueeTrack>
          {duplicatedCategories.map((category, index) => (
            <CategoryItem
              key={`${category.id}-${index}`}
              onClick={() => navigate(`/catalogo/${encodeURIComponent(category.Nombre)}`)}
            >
              {category.Nombre || 'Categoría'}
            </CategoryItem>
          ))}
        </MarqueeTrack>
      </MarqueeContainer>
    </MarqueeSection>
  );
};

export default CategoriesMarquee;
