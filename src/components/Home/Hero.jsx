import React from 'react';
import styled from 'styled-components';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import BlurText from "../Global/BlurText";

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
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: 1rem;
  font-weight: 500;
  text-shadow: 0 2px 4px rgba(0,0,0,0.3);

   /* Apply gradient and inherit all styles to BlurText paragraph */
  p {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-transform: inherit;
    letter-spacing: inherit;
    text-align: center;
    justify-content: center;
    
  }
`;

const MainTitle = styled.div`
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  margin: 0 0 2.5rem 0;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: 1px;
  max-width: 900px;
  position: relative;
  
  p {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
    line-height: inherit;
    text-transform: inherit;
    letter-spacing: inherit;
    text-align: center;
    justify-content: center;
    
    /* Apply gradient to each animated span with stronger shadows */
    span {
      background: linear-gradient(to right, var(--color-secondary), #DDA448, var(--color-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 2px 2px rgba(256, 256, 256, 0.10);
      
      /* Fallback for browsers that don't support text-shadow with gradient text */
      position: relative;
      
      &::before {
        content: attr(data-text);
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
        background: linear-gradient(to right, var(--color-secondary), #DDA448, var(--color-secondary));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        filter: blur(12px) brightness(1.5);
        opacity: 0.4;
      }
    }
  }
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
  border-radius: 5px;

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
  const navigate = useNavigate();

  return (
    <HeroSection>
      <ArrowButton $left aria-label="Previous slide">
        <ChevronLeft size={48} strokeWidth={1} />
      </ArrowButton>

      <ArrowButton aria-label="Next slide">
        <ChevronRight size={48} strokeWidth={1} />
      </ArrowButton>

      <ContentWrapper>
        <PreHeader><BlurText
          text="Hacé tus reservas y probá nuestros cortes"
          delay={150}
          animateBy="words"
          direction="top"
        /></PreHeader>
        <MainTitle><BlurText
          text="Javi Blends"
          delay={150}
          animateBy="words"
          direction="top"
        /></MainTitle>

        <ButtonGroup>
          <HeroButton onClick={() => navigate('/catalogo')}>Mirá nuestros cortes</HeroButton>
        </ButtonGroup>
      </ContentWrapper>
    </HeroSection>
  );
};

export default Hero;
