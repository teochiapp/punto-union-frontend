import React, { useState, useEffect } from 'react';
import './Promotions.css';

const MOCK_PROMOTIONS = [
    {
        id: 1,
        date: 'Del 27 al 30 de noviembre',
        title: '6 cuotas cero interés',
        subtitle: 'En Despegar',
        tag: 'NX Crédito',
        image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80' // Beach/Travel image
    },
    {
        id: 2,
        date: 'Solo por hoy',
        title: '50% OFF en Tecnología',
        subtitle: 'En productos seleccionados',
        tag: 'Cyber Monday',
        image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80' // Tech image
    },
    {
        id: 3,
        date: 'Todo el mes',
        title: 'Envío Gratis',
        subtitle: 'En compras superiores a $50.000',
        tag: 'Envíos',
        image: 'https://images.unsplash.com/photo-1586880244406-556ebe35f282?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80' // Delivery/Box image
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
