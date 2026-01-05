import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import { IconBrandWhatsapp } from '@tabler/icons-react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import sucursalesHero from '../../assets/images/contact_hero.png';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const SucursalesView = ({ sucursales }) => {
  const navigate = useNavigate();

  return (
    <PageSection>
      <HeroSection>
        <HeroContent>
          <h1>SUCURSALES</h1>
          <p>Visitá nuestras sucursales para conocer todos nuestros productos frescos y de calidad. Te esperamos con la mejor atención.</p>
        </HeroContent>
      </HeroSection>

      <SucursalesList>
        {sucursales.map((sucursal, index) => (
          <motion.div
            key={sucursal.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut"
            }}
          >
            <FullWidthBackground $hasBackground={index % 2 === 0}>
              <SucursalRow $reverse={index % 2 !== 0}>
                <ImageSection>
                  <SucursalImage src={sucursal.image} alt={sucursal.nombre} />
                  <ImageOverlay />
                  <YearBadge>{sucursal.year}</YearBadge>
                </ImageSection>

                <ContentSection>
                  <SucursalName>{sucursal.nombre}</SucursalName>
                  <SucursalDescription>{sucursal.descripcion}</SucursalDescription>
                  <SucursalInfo>
                    <InfoItem>
                      <InfoLabel><MapPin size={22} /> Dirección:</InfoLabel>
                      <AddressContainer>
                        <InfoText>{sucursal.direccion}</InfoText>
                        <MapsLink
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(sucursal.direccion)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Ver en Google Maps"
                        >
                          <MapPin size={20} />
                        </MapsLink>
                      </AddressContainer>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel><Phone size={22} /> Teléfono:</InfoLabel>
                      <PhoneContainer>
                        <InfoText>{sucursal.telefono}</InfoText>
                        <WhatsAppLink
                          href={`https://wa.me/${sucursal.telefono.replace(/[^0-9]/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Contactar por WhatsApp"
                        >
                          <IconBrandWhatsapp size={24} stroke={2} />
                        </WhatsAppLink>
                      </PhoneContainer>
                    </InfoItem>
                    <InfoItem>
                      <InfoLabel><Clock size={22} /> Horario:</InfoLabel>
                      <InfoText>{sucursal.horario}</InfoText>
                    </InfoItem>
                  </SucursalInfo>
                </ContentSection>
              </SucursalRow>
            </FullWidthBackground>
          </motion.div>
        ))}
      </SucursalesList>
    </PageSection>
  );
};

// Styled Components
const PageSection = styled.section`
  width: 100%;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  background-color: var(--color-background);
`;

const HeroSection = styled.div`
  height: 60vh;
  min-height: 400px;
  background-image: url(${sucursalesHero});
  background-size: cover;
  background-position: center;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4);
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

const SucursalesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const FullWidthBackground = styled.div`
  width: 100%;
  background-color: ${props => props.$hasBackground ? 'rgba(210, 164, 120, 0.18)' : 'transparent'};
  padding: 3rem 1.5rem;
  transition: background-color 0.3s ease;

  @media (max-width: 968px) {
    padding: 2rem 1rem;
  }
`;

const SucursalRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
  
  ${props => props.$reverse && `
    direction: rtl;
    > * {
      direction: ltr;
    }
  `}

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    direction: ltr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const SucursalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;

  ${SucursalRow}:hover & {
    transform: scale(1.05);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.3) 100%);
`;

const YearBadge = styled.div`
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: var(--primary-color);
  color: white;
  font-family: var(--font-header);
  font-size: 1.1rem;
  font-weight: 700;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
`;

const SucursalName = styled.h2`
  font-family: var(--font-header);
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--secondary-color);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const SucursalDescription = styled.p`
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
`;

const SucursalInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const InfoLabel = styled.span`
  font-family: var(--font-body);
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-secondary);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  svg {
    flex-shrink: 0;
  }
`;

const InfoText = styled.span`
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--text-primary);
  padding-left: 1.5rem;
`;

const PhoneContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AddressContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const MapsLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #4285F4;
  color: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: #1a73e8;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(66, 133, 244, 0.4);
  }

  svg {
    stroke-width: 2;
  }
`;

const WhatsAppLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #25D366;
  color: white;
  border-radius: 50%;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: #128C7E;
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
  }

  svg {
    stroke-width: 2;
  }
`;

export default SucursalesView;
