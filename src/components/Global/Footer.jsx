import { Link } from 'react-router-dom';
import styled from 'styled-components';

const LogoWrapper = styled(Link)`
  width: 170px;
  height: 170px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 15px rgba(255, 255, 255, 0.3);
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;


const FooterContainer = styled.footer`
 display:flex;
 flex-direction: column;
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    align-items: center;
    width: 100%;
  }
`;

const ColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  
  @media (max-width: 900px) {
    margin-bottom: 1rem;
  }
`;

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;

  @media (max-width: 900px) {
    align-items: center;
    gap: 1.5rem;
    margin-bottom: 1rem;
    width: 100%;
  }
`;

const SectionTitle = styled.h4`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0 0 0.5rem 0;
  border-bottom: 2px solid rgba(255,255,255, 0.3);
  padding-bottom: 0.2rem;
  display: inline-block;
`;

const AddressBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  font-size: 0.9rem;
  
  strong {
    font-weight: 700;
    text-transform: uppercase;
    font-family: 'Josefin Sans', sans-serif;
    letter-spacing: 1px;
  }
`;

const AddressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  width: 100%;
  
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    text-align: center;
  }
`;

const FooterLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.9rem;
  letter-spacing: 1px;
  position: relative;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.7;
  }
`;

const LogoCircle = styled.div`
  width: 150px;
  height: 150px;
  border: 2px solid var(--color-background-overlay); /* Placeholder for the circular text effect or actual logo */
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 1rem;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 700;
  font-size: 1.2rem;
  line-height: 1.1;
  text-transform: uppercase;
  background: var(--color-dark-background);
`;

const Socials = styled.div`
  display: flex;
  gap: 1rem;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 0.85rem;
  font-style: italic;
  opacity: 0.9;

  span {
    cursor: pointer;
    &:hover { text-decoration: underline; }
  }
`;


const FooterDerechosReservados = styled.div`
   position: relative;
  display: flex;
  justify-content: space-evenly;
  font-size: 0.9rem;
  background-color: var(--color-secondary);
  color: white;
  font-family: 'Space Grotesk', sans-serif;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 90%;
    height: 1px;
    background: rgba(255, 255, 255, 0.3);
  }

`;

const TopSection = styled.div`
 background-color: var(--color-secondary);
  color: #fff;
  padding: 4rem 3rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 2rem;
  font-family: 'Space Grotesk', sans-serif;
  justify-items: center;
  
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    text-align: center;
    padding: 3rem 1.5rem;
    gap: 3rem;
  }
`;

const Footer = () => {
  return (
    <>
      <FooterContainer>
        <TopSection>


          {/* Left Column: Addresses */}
          <ColumnLeft>
            <SectionTitle>Visita nuestros locales</SectionTitle>

            <AddressGrid>
              <AddressBlock>
                <strong>Belgrano</strong>
                <span>(718) 609-9300</span>
              </AddressBlock>

              <AddressBlock>
                <strong>Barrio 31</strong>
                <span>(516) 283-2349</span>
              </AddressBlock>

              <AddressBlock>
                <strong>Ezeiza</strong>
                <span>(518) 249-4757</span>
              </AddressBlock>

              <AddressBlock>
                <strong>Ramos Mejia</strong>
                <span>(518) 249-4757</span>
              </AddressBlock>
            </AddressGrid>
          </ColumnLeft>

          {/* Center Column: Logo */}
          <ColumnCenter>
            <LogoWrapper to="/">
              <Logo src="/javiblends.png" alt="JaviBlends" />
            </LogoWrapper>
            <Socials>
              <a href="https://www.instagram.com/javiblends/?hl=es" target="_blank" rel="noopener noreferrer">instagram</a> — <a href="https://wa.me/5491163644401" target="_blank" rel="noopener noreferrer">Whatsapp</a> — <a href="mailto:contacto@javiblends.com">email</a>
            </Socials>
          </ColumnCenter>

          {/* Right Column: Navigation */}
          <ColumnRight>
            <FooterLink to="/nosotros">Nosotros</FooterLink>
            <FooterLink to="/reservas">Reservas</FooterLink>
            <FooterLink to="/sucursales">Sucursales</FooterLink>
            <FooterLink to="/contacto">Contacto</FooterLink>
            <FooterLink to="/catalogo/all">Catálogo</FooterLink>
          </ColumnRight>
        </TopSection>

        <FooterDerechosReservados>
          <p>Diseñado y creado por SurCodes</p>
          <p>© 2025 — Copyright, Todos los derechos reservados.</p>
        </FooterDerechosReservados>
      </FooterContainer>
    </>
  );
};

export default Footer;
