import React from 'react';
import styled from 'styled-components';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const HeroSection = styled.section`
  position: relative;
  height: 100vh;
  min-height: 700px;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url('/img-hero/img-hero.webp');
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  padding: 0 1rem;
  font-family: 'Space Grotesk', sans-serif;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%);
    pointer-events: none;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px; /* Offset for header roughly */
`;

const PreHeader = styled.p`
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: 1rem;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);
`;

const MainTitle = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  margin: 0 0 2.5rem 0;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 1px;
  text-shadow: 0 2px 10px rgba(0,0,0,0.3);
  max-width: 900px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const HeroButton = styled.button`
  background-color: rgba(60, 40, 30, 0.85); /* Dark brownish matching reference buttons */
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  font-family: 'Space Grotesk', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px);
  position: relative;
  overflow: hidden;

  &:hover {
    background-color: #BB342F; /* Secondary color from index.css */
    border-color: #BB342F;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  color: white;
  opacity: 0.7;
  cursor: pointer;
  transition: opacity 0.3s ease;
  padding: 1rem;
  z-index: 5;

  &:hover {
    opacity: 1;
  }

  ${props => props.$left ? 'left: 1rem;' : 'right: 1rem;'}

  @media (max-width: 768px) {
    display: none;
  }
`;

const Hero = () => {
    return (
        <HeroSection>
            <ArrowButton $left aria-label="Previous slide">
                <ChevronLeft size={48} strokeWidth={1} />
            </ArrowButton>

            <ArrowButton aria-label="Next slide">
                <ChevronRight size={48} strokeWidth={1} />
            </ArrowButton>

            <ContentWrapper>
                <PreHeader>Hace tu reserva antes del 25 de diciembre</PreHeader>
                <MainTitle>Navidad en Punto Union Market</MainTitle>

                <ButtonGroup>
                    <HeroButton>Mira nuestros cortes</HeroButton>
                </ButtonGroup>
            </ContentWrapper>
        </HeroSection>
    );
};

export default Hero;
