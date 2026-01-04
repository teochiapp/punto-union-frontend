import styled, { keyframes } from 'styled-components';
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';

import aboutHero from '../../assets/images/about_hero.png';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  background-color: var(--color-background);
  color: var(--text-primary);
  font-family: var(--font-body);
  min-height: 100vh;
`;

const HeroSection = styled.div`
  height: 60vh;
  min-height: 400px;
  background-image: url(${aboutHero});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;
  margin-bottom: 3rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); 
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  animation: ${fadeIn} 1s ease-out;
  padding: 0 1rem;

  h1 {
    font-family: var(--font-header);
    font-size: clamp(3rem, 5vw, 5rem);
    margin: 0;
    letter-spacing: 5px;
    font-weight: 700;
    text-shadow: 0 2px 4px rgba(0,0,0,0.3);
  }

  p {
    font-size: clamp(1rem, 2vw, 1.25rem);
    max-width: 600px;
    margin: 1rem auto 0;
    line-height: 1.6;
    font-weight: 300;
  }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  font-family: var(--font-header);
  margin-bottom: 3rem;
  color: var(--color-secondary);
  text-transform: uppercase;
  letter-spacing: 2px;
  animation: ${fadeIn} 0.8s ease-out;

  &::after {
    content: '';
    display: block;
    width: 60px;
    height: 4px;
    background: var(--color-primary);
    margin: 1rem auto 0;
    border-radius: 2px;
  }
`;

const LocationsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 5rem;
  animation: ${fadeIn} 1s ease-out;
`;

const LocationCard = styled.div`
  background: var(--card-bg);
  padding: 2.5rem 2rem;
  border-radius: 16px;
  text-align: center;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  border: 1px solid rgba(23, 57, 42, 0.08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(221, 164, 72, 0.05) 0%, rgba(187, 52, 47, 0.05) 100%);
    opacity: 0;
    transition: opacity 0.4s ease;
    z-index: 0;
  }

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.12);
    border-color: var(--color-primary);
  }

  &:hover ::before {
    opacity: 1;
  }

  .icon {
    color: var(--color-secondary);
    margin-bottom: 0.5rem;
    z-index: 1;
    transition: transform 0.4s ease;
  }

  &:hover .icon {
    transform: scale(1.1) rotate(5deg);
  }

  h3 {
    font-size: 1.35rem;
    font-weight: 700;
    font-family: var(--font-header);
    margin: 0;
    color: var(--text-primary);
    z-index: 1;
  }

  p {
    font-size: 1.1rem;
    color: var(--text-secondary);
    margin: 0;
    font-weight: 500;
    letter-spacing: 0.5px;
    z-index: 1;
  }
`;

const MainContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  animation: ${fadeIn} 1.2s ease-out;
  background:var(--card-bg);
  border-radius: 16px;
  padding: 2rem; 
  border: 1px solid transparent; 
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);


  &:hover {
    box-shadow: 0 20px 30px rgba(0, 0, 0, 0.12);
    border-color: var(--color-primary);
  }
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const ImageWrapper = styled.div`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  
  img {
    width: 100%;
    height: auto;
    display: block;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

const TextContent = styled.div`

  h3 {
    font-size: 2rem;
    font-family: var(--font-header);
    margin-bottom: 1.5rem;
    color: var(--color-secondary);
    line-height: 1.2;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.8;
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
  }
`;

const AboutView = ({ locations, aboutContent }) => {
  return (
    <Section>
      <Header />
      <HeroSection>
        <HeroContent>
          <h1>Nosotros</h1>
          <p>La mejor calidad, mejor servicio y mejor sabor</p>
        </HeroContent>
      </HeroSection>
      <Container>

        <MainContent>
          <ImageWrapper>
            <img src={aboutContent.imageUrl} alt="Javi Blends Store" />
          </ImageWrapper>
          <TextContent>
            <h3>{aboutContent.title}</h3>
            {aboutContent.paragraphs.map((para, index) => (
              <p key={index}>{para}</p>
            ))}
          </TextContent>
        </MainContent>
        <Title>Nuestros Locales</Title>
        <LocationsGrid>
          {locations.map((loc) => (
            <LocationCard key={loc.id}>
              <div className="icon">{loc.icon}</div>
              <h3>{loc.name}</h3>
              <p>{loc.address}</p>
            </LocationCard>
          ))}
        </LocationsGrid>
      </Container>
      <WhatsAppButton />
      <Footer />
    </Section>
  );
};

export default AboutView;
