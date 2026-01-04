import styled, { keyframes } from 'styled-components';
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';
import contactHero from '../../assets/images/contact_hero.png';
import WhatsAppButton from '../../components/WhatsAppButton/WhatsAppButton';
import { Mail, Phone, MapPin, Instagram, Facebook } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  background-color: var(--color-background);
  font-family: var(--font-body);
  color: var(--text-primary);
`;

const HeroSection = styled.div`
  height: 60vh;
  min-height: 400px;
  background-image: url(${contactHero});
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
    background: rgba(0, 0, 0, 0.4); /* Dark overlay for readability */
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

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 5rem 2rem;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 6rem;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
`;

const FormSection = styled.div`
  animation: ${fadeIn} 1s ease-out 0.2s backwards;
  background-color: #ffffff;
  padding: 3rem;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid rgba(23, 57, 42, 0.05);
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 0.9rem;
    color: var(--text-primary);
    
    span {
      color: var(--color-secondary);
    }
  }

  input, textarea {
    width: 100%;
    padding: 1rem;
    background-color: #f7f5f2; /* Lighter input bg to match theme */
    border: 1px solid transparent;
    border-radius: 12px;
    font-family: inherit;
    font-size: 1rem;
    color: #333;
    transition: all 0.3s ease;

    &:focus {
      outline: none;
      background-color: #fff;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 4px rgba(221, 164, 72, 0.1);
    }
  }

  textarea {
    resize: vertical;
    min-height: 150px;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, var(--color-primary) 0%, #c9933d 100%);
  color: #fff;
  border: none;
  padding: 1.2rem 2.5rem;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: var(--font-header);
  border-radius: 50px;
  width: 100%;
  margin-top: 1rem;
  box-shadow: 0 10px 20px rgba(221, 164, 72, 0.25);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 30px rgba(221, 164, 72, 0.35);
  }
  
  &:active {
    transform: translateY(-1px);
  }
`;

const InfoSection = styled.div`
  animation: ${fadeIn} 1s ease-out 0.4s backwards;
`;

const InfoBlock = styled.div`
  margin-bottom: 3rem;

  h3 {
    font-family: var(--font-header);
    font-size: 1.7rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
    font-weight: 700;
    color: var(--color-secondary);
  }

  p {
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
    line-height: 1.6;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const SocialIcons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    background-color: #e5e5e5;
    border-radius: 50%;
    color: var(--text-secondary);
    transition: all 0.3s ease;

    &:hover {
      background-color: var(--color-primary);
      color: #fff;
    }
  }
`;

const ContactView = () => {
    return (
        <PageWrapper>
            <Header />
            <HeroSection>
                <HeroContent>
                    <h1>CONTACTO</h1>
                    <p>No hay nada que nos guste más que interactuar con nuestros clientes. Empecemos algo grandioso juntos.</p>
                </HeroContent>
            </HeroSection>

            <MainContent>
                <FormSection>
                    <form onSubmit={(e) => e.preventDefault()}>
                        <FormGroup>
                            <label>Nombre <span>*</span></label>
                            <input type="text" required />
                        </FormGroup>
                        <FormGroup>
                            <label>Email <span>*</span></label>
                            <input type="email" required />
                        </FormGroup>
                        <FormGroup>
                            <label>Asunto</label>
                            <input type="text" />
                        </FormGroup>
                        <FormGroup>
                            <label>Mensaje <span>*</span></label>
                            <textarea required></textarea>
                        </FormGroup>
                        <SubmitButton type="submit">ENVIAR</SubmitButton>
                    </form>
                </FormSection>

                <InfoSection>
                    <InfoBlock>
                        <h3>Javi Blends</h3>
                        <p>Somos apasionados por la carne de calidad. Contactanos para consultas sobre nuestros productos, eventos o franquicias.</p>
                    </InfoBlock>

                    <InfoBlock>
                        <h3>Carniceria Principal</h3>
                        <p><MapPin size={18} /> Belgrano, CABA</p>
                    </InfoBlock>

                    <InfoBlock>
                        <h3>Contacto</h3>
                        <p><Phone size={18} /> (011) 4567-8901</p>
                        <p><Mail size={18} /> contacto@javiblends.com</p>
                    </InfoBlock>

                    <SocialIcons>
                        <a href="#"><Instagram size={20} /></a>
                        <a href="#"><Facebook size={20} /></a>
                    </SocialIcons>
                </InfoSection>
            </MainContent>
            <WhatsAppButton />
            <Footer />
        </PageWrapper>
    );
};

export default ContactView;
