import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Loader2, AlertCircle } from 'lucide-react';
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';
import CarritoModal from '../../components/Global/CarritoModal';
import { useCarrito } from '../../context/CarritoContext';

import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';
import { fetchCategorias, fetchProductosPorCategoria } from '../../services/api';

// --- Styled Components ---

const PageWrapper = styled.div`
  background-color: #FEFCF0; /* Cream background like the image */
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 100px; /* Space for fixed header */
`;

const HeroSection = styled(motion.section)`
  text-align: left;
  padding: 0rem 0 1.5rem 0;
  max-width: 1200px;
  margin: 0;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  background: transparent;
  border: none;
  color: #666;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
  margin-top: 1rem; /* Reduced margin */

  &:hover {
    color: #8B2E2E; /* Reddish brown hover */
  }
`;

const CategoryTitle = styled(motion.h1)`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 2.5rem; 
  font-weight: 700;
  color: #8B2E2E;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  line-height: 1.1;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const CategoryDescription = styled(motion.p)`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #4A4A4A;
  line-height: 1.6;
  max-width: 600px;
  margin: 0;
`;

const GridContainer = styled.div`
  max-width: 1200px; /* Constrained width like the card layout in image */
  margin: 0 auto;
  padding: 0 2rem 4rem;

  @media (max-width: 768px) {
    padding: 0 1rem 3rem;
  }
`;

const ProductsGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  
  @media (min-width: 1024px) {
     /* Try to match the 2-column feel if there are few items, or standard grid */
     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
     gap: 3rem;
  }
`;

const Card = styled(motion.article)`
  background: white;
  border-radius: 20px; /* More rounded as per image */
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 240px; /* Fixed height for consistent look */
  position: relative;
  background: #f4f4f4;
  overflow: hidden;
  margin: 0.75rem 0.75rem 0 0.75rem; /* Margins to show rounded top separate from card edge */
  border-radius: 16px;
  width: calc(100% - 1.5rem);
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;

  ${Card}:hover & {
    transform: scale(1.1);
  }
`;

const NoImage = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ccc;
  font-size: 3rem;
  background-color: #eee;
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

const ProductName = styled.h3`
  font-family: 'Josefin Sans', sans-serif; /* Should ideally be Serif */
  font-size: 1.5rem;
  font-weight: 700;
  color: #8B2E2E; /* Reddish product title */
  margin-bottom: 0.5rem;
  line-height: 1.2;
`;

const ProductPrice = styled.div`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #8B2E2E; /* Reddish price */
  
  span {
    font-size: 1rem;
    font-weight: 600;
    color: #8B2E2E;
    opacity: 0.8;
  }
`;

const ProductDescShort = styled.p`
  font-family: 'Space Grotesk', sans-serif;
  font-size: 1rem;
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  margin-bottom: 1.5rem;
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
  background: #fdf7e9;
  padding: 0.5rem;
  border-radius: 8px;
`;

const QuantityBtn = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border: 1px solid #8B2E2E;
  color: #8B2E2E;
  border-radius: 50%;
  cursor: pointer;
  font-weight: bold;
  font-size: 1.2rem;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #8B2E2E;
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    border-color: #ccc;
    color: #ccc;
  }
`;

const QuantityDisplay = styled.span`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1B1A18;
  min-width: 60px;
  text-align: center;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 0.875rem;
  background-color: transparent; /* Changed to match potential ghost style or keep simple */
  color: #8B2E2E;
  border: 2px solid #8B2E2E;
  border-radius: 12px;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #8B2E2E;
    color: white;
  }
`;



const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  color: #8B2E2E;
  gap: 1rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem;
  color: #666;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.2rem;
`;

// --- Animations ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12
    }
  }
};

// --- Helper Functions ---

const getImageUrl = (imagen) => {
  if (!imagen) return null;
  if (imagen.url) return imagen.url.startsWith('http') ? imagen.url : `http://localhost:1337${imagen.url}`;
  if (imagen.data?.attributes?.url) {
    const url = imagen.data.attributes.url;
    return url.startsWith('http') ? url : `http://localhost:1337${url}`;
  }
  return null;
};

const renderDescription = (descripcion) => {
  if (!descripcion) return '';
  if (Array.isArray(descripcion)) {
    for (const block of descripcion) {
      if (block.type === 'paragraph' && block.children) {
        return block.children.map(child => child.text).join(' ').trim();
      }
    }
    return '';
  }
  return typeof descripcion === 'string' ? descripcion : '';
};

// --- Product Card Component with Local State ---
const ProductCardComponent = ({ product, variants, onProductClick, addItem, setShowModal, setModalProduct, setModalQuantity }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = (e) => {
    e.stopPropagation();
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    const imageUrl = getImageUrl(product.Portada);

    addItem({
      id: product.id,
      nombre: product.Nombre,
      precio: product.Precio,
      imagen: imageUrl,
      quantity: quantity
    });

    setModalProduct({
      nombre: product.Nombre,
      precio: product.Precio,
      imagen: imageUrl
    });

    setModalQuantity(quantity);
    setShowModal(true);
    // Reset quantity after adding to cart
    setQuantity(1);
  };

  const imageUrl = getImageUrl(product.Portada);
  const descriptionText = renderDescription(product.Descripcion);

  return (
    <Card
      variants={variants}
      layoutId={`product-${product.id}`}
    >
      <ImageContainer onClick={() => onProductClick(product)} style={{ cursor: 'pointer' }}>
        {imageUrl ? (
          <ProductImage src={imageUrl} alt={product.Nombre} />
        ) : (
          <NoImage>📦</NoImage>
        )}
      </ImageContainer>

      <CardContent>
        <ProductName>{product.Nombre}</ProductName>
        <ProductDescShort>
          {descriptionText || 'Delicioso producto fresco y de calidad.'}
        </ProductDescShort>

        <PriceRow>
          <ProductPrice>
            ${product.Precio?.toLocaleString('es-AR')} <span>/kg</span>
          </ProductPrice>
        </PriceRow>

        <QuantitySelector onClick={(e) => e.stopPropagation()}>
          <QuantityBtn onClick={handleDecrement} disabled={quantity <= 1}>-</QuantityBtn>
          <QuantityDisplay>{quantity} kg</QuantityDisplay>
          <QuantityBtn onClick={handleIncrement}>+</QuantityBtn>
        </QuantitySelector>

        <AddToCartButton onClick={handleAddToCart}>
          <ShoppingCart size={18} /> Agregar
        </AddToCartButton>
      </CardContent>
    </Card>
  );
};

// --- Main Component ---

const Catalog = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCarrito();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalProduct, setModalProduct] = useState(null);
  const [modalQuantity, setModalQuantity] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        window.scrollTo(0, 0);

        const decodedCategoryName = decodeURIComponent(categoryName);

        // Fetch Category Info
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

        // Fetch Products
        const productsData = await fetchProductosPorCategoria(matchedCategory.id);
        setProducts(productsData.data || []);
      } catch (err) {
        console.error('Error loading catalog:', err);
        setError('Hubo un problema al cargar el catálogo.');
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      loadData();
    }
  }, [categoryName]);

  const handleProductClick = (product) => {
    const descriptionText = renderDescription(product.Descripcion);
    const imageUrl = getImageUrl(product.Portada);

    const productSlug = product.Nombre
      ? product.Nombre.toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
      : `producto-${product.id}`;

    navigate(`/producto/${productSlug}`, {
      state: {
        producto: {
          id: product.id,
          nombre: product.Nombre,
          descripcion: descriptionText,
          precio: product.Precio,
          imagen: imageUrl
        }
      }
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <PageWrapper>
      <Header />

      <MainContent>
        <GridContainer>
          <BackButton onClick={() => navigate('/')}>
            <ArrowLeft size={18} /> Volver al Inicio
          </BackButton>

          <AnimatePresence mode="wait">
            {loading ? (
              <LoadingContainer key="loading" as={motion.div} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Loader2 size={48} className="animate-spin" />
                <motion.p animate={{ opacity: [0.5, 1, 0.5] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  Cargando productos...
                </motion.p>
              </LoadingContainer>
            ) : error ? (
              <LoadingContainer key="error">
                <AlertCircle size={48} color="#e74c3c" />
                <p>{error}</p>
              </LoadingContainer>
            ) : (
              <>
                <HeroSection
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                >
                  <CategoryTitle>{category?.Nombre}</CategoryTitle>
                  {category?.Descripcion && (
                    <CategoryDescription>
                      {renderDescription(category.Descripcion)}
                    </CategoryDescription>
                  )}
                </HeroSection>

                {products.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#666', padding: '4rem' }}>
                    No hay productos disponibles por el momento.
                  </div>
                ) : (
                  <ProductsGrid
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    {products.map((product) => (
                      <ProductCardComponent
                        key={product.id}
                        product={product}
                        variants={itemVariants}
                        onProductClick={handleProductClick}
                        addItem={addItem}
                        setShowModal={setShowModal}
                        setModalProduct={setModalProduct}
                        setModalQuantity={setModalQuantity}
                      />
                    ))}
                  </ProductsGrid>
                )}
              </>
            )}
          </AnimatePresence>
        </GridContainer>
      </MainContent>



      <WhatsAppButton />
      <Footer />

      <CarritoModal
        isOpen={showModal}
        onClose={handleCloseModal}
        producto={modalProduct}
        cantidad={modalQuantity}
      />
    </PageWrapper>
  );
};

export default Catalog;
