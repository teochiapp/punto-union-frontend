import React, { useState, useEffect } from 'react';
import { fetchPromociones } from '../../../services/api';
import './Promotions.css';

// Helper function to extract text from Strapi Rich Text Blocks
const extractTextFromBlocks = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return '';

    return blocks
        .map(block => {
            if (block.type === 'paragraph' && block.children) {
                return block.children
                    .map(child => child.text || '')
                    .join('');
            }
            return '';
        })
        .filter(text => text.length > 0)
        .join(' ');
};

const Promotions = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [promociones, setPromociones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch promotions from Strapi
    useEffect(() => {
        const loadPromociones = async () => {
            try {
                setLoading(true);
                const response = await fetchPromociones();

                // Map Strapi data to component format
                const mappedPromociones = response.data.map((promo) => ({
                    id: promo.id,
                    title: promo.Titulo,
                    subtitle: promo.Subtitulo,
                    description: extractTextFromBlocks(promo.Descripcion),
                    image: promo.Portada?.url
                        ? `${process.env.REACT_APP_API_URL.replace('/api', '')}${promo.Portada.url}`
                        : 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80'
                }));

                setPromociones(mappedPromociones);
                setError(null);
            } catch (err) {
                console.error('Error loading promociones:', err);
                setError('No se pudieron cargar las promociones');
            } finally {
                setLoading(false);
            }
        };

        loadPromociones();
    }, []);

    // Auto-slide effect
    useEffect(() => {
        if (promociones.length === 0) return;

        const timer = setInterval(() => {
            handleNext();
        }, 5000); // Auto slide every 5 seconds

        return () => clearInterval(timer);
    }, [currentIndex, promociones.length]);

    const handleNext = () => {
        if (isAnimating || promociones.length === 0) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % promociones.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handlePrev = () => {
        if (isAnimating || promociones.length === 0) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + promociones.length) % promociones.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    // Loading state
    if (loading) {
        return (
            <div className="promotions-section">
                <div className="promotions-container">
                    <div className="promotion-card">
                        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
                            Cargando promociones...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="promotions-section">
                <div className="promotions-container">
                    <div className="promotion-card">
                        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-error, #ff4444)' }}>
                            {error}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    // Empty state
    if (promociones.length === 0) {
        return (
            <div className="promotions-section">
                <div className="promotions-container">
                    <div className="promotion-card">
                        <p style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)' }}>
                            No hay promociones disponibles en este momento.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const currentPromo = promociones[currentIndex];

    return (
        <div className="promotions-section">
            <div className="promotions-container">
                <div className="promotion-card">
                    <div className="promotion-content">
                        <h2 className="promotion-title">{currentPromo.title}</h2>
                        <p className="promotion-subtitle">{currentPromo.subtitle}</p>
                        {currentPromo.description && (
                            <p className="promotion-description">{currentPromo.description}</p>
                        )}
                    </div>

                    <div className="promotion-image-container">
                        <img
                            src={currentPromo.image}
                            alt={currentPromo.title}
                            className="promotion-image"
                        />
                    </div>
                </div>
            </div>

            <div className="promotions-controls">
                <button className="control-btn" onClick={handlePrev} aria-label="Previous slide">
                    &#10094;
                </button>

                <div className="pagination-dots">
                    {promociones.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => {
                                if (!isAnimating) {
                                    setCurrentIndex(index);
                                }
                            }}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button className="control-btn" onClick={handleNext} aria-label="Next slide">
                    &#10095;
                </button>
            </div>
        </div>
    );
};

export default Promotions;
