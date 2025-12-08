import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { fetchProductos, fetchProductosPorCategoria } from '../../services/api';
import { useCarrito } from '../../context/CarritoContext';
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';
import CarritoModal from '../../components/Global/CarritoModal';


const ProductDetail = () => {
  const { nombre } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCarrito();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch all products and find the one matching our slug
        const productsData = await fetchProductos(100);
        const allProducts = productsData.data || [];

        // Convert slug back to comparable name
        const searchName = nombre
          .split('-')
          .map(word => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ');

        const foundProduct = allProducts.find(p => {
          const productName = p.Nombre || '';
          const normalizedProductName = productName
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim();

          const normalizedSearchName = searchName
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9\s-]/g, '')
            .trim();

          return normalizedProductName === normalizedSearchName;
        });

        if (foundProduct) {
          setProduct(foundProduct);

          // Load similar products from the same category
          const categoryId = foundProduct.categorias?.data?.id || foundProduct.categorias?.id;
          if (categoryId) {
            try {
              const similarData = await fetchProductosPorCategoria(categoryId);
              const similar = (similarData.data || [])
                .filter(p => p.id !== foundProduct.id)
                .slice(0, 4);
              setSimilarProducts(similar);
            } catch (err) {
              console.error('Error loading similar products:', err);
            }
          }
        } else {
          setError('Producto no encontrado');
        }
      } catch (err) {
        console.error('Error loading product:', err);
        setError('Error al cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [nombre]);

  const getImageUrl = (portada) => {
    if (!portada) return null;
    if (portada.url) {
      const url = portada.url;
      return url.startsWith('http') ? url : `http://localhost:1337${url}`;
    }
    if (portada.data?.attributes?.url) {
      const url = portada.data.attributes.url;
      return url.startsWith('http') ? url : `http://localhost:1337${url}`;
    }
    return null;
  };

  const renderDescription = (descripcion) => {
    if (!descripcion) return 'Sin descripción disponible';

    if (Array.isArray(descripcion)) {
      for (const block of descripcion) {
        if (block.type === 'paragraph' && block.children) {
          const text = block.children.map(child => child.text).join(' ').trim();
          if (text) return text;
        }
      }
      return 'Sin descripción disponible';
    }

    if (typeof descripcion === 'string') {
      return descripcion;
    }

    return 'Sin descripción disponible';
  };

  const createProductSlug = (productName) => {
    return productName
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-');
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      nombre: product.Nombre,
      precio: product.Precio,
      imagen: imageUrl,
      quantity: quantity
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSimilarProductClick = (product) => {
    const slug = createProductSlug(product.Nombre);
    navigate(`/producto/${slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <>
        <Header />
        <PageContainer>
          <ContentWrapper>
            <LoadingMessage>Cargando producto...</LoadingMessage>
          </ContentWrapper>
        </PageContainer>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Header />
        <PageContainer>
          <ContentWrapper>
            <BackButton onClick={() => navigate('/')}>
              <ArrowLeft size={18} /> Volver al Inicio
            </BackButton>
            <ErrorMessage>{error || 'Producto no encontrado'}</ErrorMessage>
          </ContentWrapper>
        </PageContainer>
        <Footer />
      </>
    );
  }

  const imageUrl = getImageUrl(product.Portada);
  const description = renderDescription(product.Descripcion);

  return (
    <>
      <Header />
      <PageContainer>
        <ContentWrapper>
          <BackButton onClick={() => navigate('/')}>
            <ArrowLeft size={18} /> Volver al Inicio
          </BackButton>

          <ProductContainer>
            <ImageSection>
              {imageUrl ? (
                <ProductImage src={imageUrl} alt={product.Nombre} />
              ) : (
                <ImagePlaceholder>
                  <span>📦</span>
                </ImagePlaceholder>
              )}
            </ImageSection>

            <InfoSection>
              <ProductTitle>{product.Nombre}</ProductTitle>
              <ProductPrice>${product.Precio}</ProductPrice>
              <ProductDescription>{description}</ProductDescription>

              <QuantitySection>
                <QuantityLabel>Cantidad:</QuantityLabel>
                <QuantityControls>
                  <QuantityButton onClick={decrementQuantity}>-</QuantityButton>
                  <QuantityDisplay>{quantity}</QuantityDisplay>
                  <QuantityButton onClick={incrementQuantity}>+</QuantityButton>
                </QuantityControls>
              </QuantitySection>

              <AddToCartButton onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                Añadir al carrito
              </AddToCartButton>
            </InfoSection>
          </ProductContainer>

          {/* Similar Products Section */}
          {similarProducts.length > 0 && (
            <SimilarProductsSection>
              <SectionTitle>Productos Similares</SectionTitle>
              <SimilarProductsGrid>
                {similarProducts.map((similarProduct) => {
                  const similarImageUrl = getImageUrl(similarProduct.Portada);
                  const similarDescription = renderDescription(similarProduct.Descripcion);

                  return (
                    <SimilarProductCard
                      key={similarProduct.id}
                      onClick={() => handleSimilarProductClick(similarProduct)}
                    >
                      {similarImageUrl ? (
                        <SimilarProductImage src={similarImageUrl} alt={similarProduct.Nombre} />
                      ) : (
                        <SimilarImagePlaceholder>
                          <span>📦</span>
                        </SimilarImagePlaceholder>
                      )}
                      <SimilarProductInfo>
                        <SimilarProductName>{similarProduct.Nombre}</SimilarProductName>
                        <SimilarProductPrice>${similarProduct.Precio}</SimilarProductPrice>
                        {similarDescription && (
                          <SimilarProductDesc>{similarDescription.substring(0, 80)}...</SimilarProductDesc>
                        )}
                      </SimilarProductInfo>
                    </SimilarProductCard>
                  );
                })}
              </SimilarProductsGrid>
            </SimilarProductsSection>
          )}
        </ContentWrapper>
      </PageContainer>
      <Footer />

      <CarritoModal
        isOpen={showModal}
        onClose={handleCloseModal}
        producto={{
          nombre: product?.Nombre,
          precio: product?.Precio,
          imagen: imageUrl
        }}
        cantidad={quantity}
      />
    </>
  );
};

export default ProductDetail;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-background);
  padding: 5rem 0 2rem 0;
`;

const ContentWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
  margin-top: 2rem;

  &:hover {
    color: #8B2E2E;
  }
`;

const ProductContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 4rem;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 2rem;
  }
`;

const ImageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  border-radius: 12px;

  @media (max-width: 968px) {
    max-height: 350px;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 500px;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-size: 4rem;

  @media (max-width: 968px) {
    height: 350px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductTitle = styled.h1`
  font-family: var(--font-header);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductPrice = styled.p`
  font-family: var(--font-body);
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-secondary-accent);
  margin: 0 0 1.5rem 0;
`;

const ProductDescription = styled.p`
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 2rem 0;
`;

const QuantitySection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const QuantityLabel = styled.span`
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--color-background-overlay);
  border-radius: 8px;
  padding: 0.5rem;
`;

const QuantityButton = styled.button`
  width: 36px;
  height: 36px;
  border: 2px solid var(--color-secondary-accent);
  background: transparent;
  color: var(--color-secondary-accent);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.25rem;
  font-weight: 600;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: var(--color-secondary-accent);
    color: white;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  min-width: 40px;
  text-align: center;
`;

const AddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--color-secondary-accent);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: var(--font-header);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-secondary);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 46, 46, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

// Similar Products Styles
const SimilarProductsSection = styled.div`
  margin-top: 3rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-header);
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 2rem;
  text-align: center;
`;

const SimilarProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SimilarProductCard = styled.div`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }
`;

const SimilarProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const SimilarImagePlaceholder = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f0f0f0 0%, #e0e0e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
`;

const SimilarProductInfo = styled.div`
  padding: 1.5rem;
`;

const SimilarProductName = styled.h3`
  font-family: var(--font-header);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin: 0 0 0.5rem 0;
`;

const SimilarProductPrice = styled.p`
  font-family: var(--font-body);
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--color-secondary-accent);
  margin: 0 0 0.5rem 0;
`;

const SimilarProductDesc = styled.p`
  font-family: var(--font-body);
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.4;
  margin: 0;
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: var(--text-secondary);
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  font-family: var(--font-body);
  font-size: 1.2rem;
  color: #e74c3c;
  background: rgba(231, 76, 60, 0.1);
  border-radius: 12px;
`;
