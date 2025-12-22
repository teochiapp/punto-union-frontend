
import styled from 'styled-components';


const FooterContainer = styled.footer`
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
    text-align: center;
    padding: 3rem 1.5rem;
    gap: 60px;

  }
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 900px) {
    align-items: center;
  }
`;

const ColumnCenter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
`;

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-end;

  @media (max-width: 900px) {
    align-items: center;
    gap: 1.2rem;
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

const FooterLink = styled.a`
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

const AccessibilityIcon = styled.div`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  width: 40px;
  height: 40px;
  background: #000;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  cursor: pointer;
  z-index: 50;
  
  @media (max-width: 900px) {
    display: none; /* Often hidden on mobile or adjusted */
  }
`;

const Footer = () => {
  return (
    <>
      <FooterContainer>
        {/* Left Column: Addresses */}
        <ColumnLeft>
          <SectionTitle>Visita nuestros locales</SectionTitle>

          <AddressGrid>
            <AddressBlock>
              <strong>Belgrano</strong>
              <span>(718) 609-9300</span>
            </AddressBlock>

            <AddressBlock>
              <strong>Villa 31</strong>
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
          <LogoCircle>
            Punto Union Market

          </LogoCircle>
          <Socials>
            <span>instagram</span> — <span>Whatsapp</span> — <span>email</span>
          </Socials>
        </ColumnCenter>

        {/* Right Column: Navigation */}
        <ColumnRight>
          <FooterLink href="#nosotros">Nosotros</FooterLink>
          <FooterLink href="#reservas">Reservas</FooterLink>
          <FooterLink href="#sucursales">Sucursales</FooterLink>
          <FooterLink href="#contacto">Contacto</FooterLink>
          <FooterLink href="#promociones">Promociones</FooterLink>
        </ColumnRight>
      </FooterContainer>
    </>
  );
};

export default Footer;
