import React, { useState, useEffect } from 'react';
import './Promotions.css';

const MOCK_PROMOTIONS = [
    {
        id: 1,
        date: 'Válido hasta fin de mes',
        title: '2x1 en Asado de Tira',
        subtitle: 'Llevá el doble de carne premium',
        tag: 'Cortes Premium',
        image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' // Grilled meat image
    },
    {
        id: 2,
        date: 'Todos los fines de semana',
        title: '30% OFF en Achuras',
        subtitle: 'Chinchulines, mollejas y más',
        tag: 'Parrilla',
        image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' // BBQ/Grill image
    },
    {
        id: 3,
        date: 'Martes y Jueves',
        title: 'Milanesas Caseras',
        subtitle: '15% de descuento en todas las variedades',
        tag: 'Elaborados',
        image: 'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' // Food preparation image
    }
];

const Promotions = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000); // Auto slide every 5 seconds

        return () => clearInterval(timer);
    }, [currentIndex]);

    const handleNext = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % MOCK_PROMOTIONS.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const handlePrev = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + MOCK_PROMOTIONS.length) % MOCK_PROMOTIONS.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const currentPromo = MOCK_PROMOTIONS[currentIndex];

    return (
        <div className="promotions-section">
            <div className="promotions-container">
                <div className="promotion-card">
                    <div className="promotion-content">
                        <span className="promotion-date">{currentPromo.date}</span>
                        <h2 className="promotion-title">{currentPromo.title}</h2>
                        <p className="promotion-subtitle">{currentPromo.subtitle}</p>

                        <div className="promotion-tag">
                            <span className="tag-icon">NX</span>
                            {currentPromo.tag}
                        </div>
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
                    {MOCK_PROMOTIONS.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentIndex ? 'active' : ''}`}
                            onClick={() => {
                                setCurrentIndex(index);
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
