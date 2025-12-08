import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Construction } from 'lucide-react';
import Header from '../../components/Global/Header';
import Footer from '../../components/Global/Footer';

const ComingSoon = () => {
    const navigate = useNavigate();

    return (
        <>
            <Header />
            <PageContainer>
                <ContentWrapper>
                    <IconWrapper>
                        <Construction size={80} strokeWidth={1.5} />
                    </IconWrapper>

                    <Title>Próximamente</Title>
                    <Subtitle>Estamos trabajando en esta sección</Subtitle>

                    <Description>
                        Esta funcionalidad estará disponible muy pronto.
                        Estamos trabajando para ofrecerte la mejor experiencia.
                    </Description>

                    <BackButton onClick={() => navigate('/')}>
                        Volver al inicio
                    </BackButton>
                </ContentWrapper>
            </PageContainer>
            <Footer />
        </>
    );
};

export default ComingSoon;

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: var(--color-background);
  padding: 5rem 0 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 3rem 2rem;
  text-align: center;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
`;

const IconWrapper = styled.div`
  color: var(--primary-color);
  margin-bottom: 2rem;
  display: inline-flex;
  padding: 1.5rem;
  background: var(--color-background-overlay);
  border-radius: 50%;
`;

const Title = styled.h1`
  font-family: var(--font-header);
  font-size: 3rem;
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 1rem 0;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const Subtitle = styled.h2`
  font-family: var(--font-body);
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0 0 2rem 0;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }
`;

const Description = styled.p`
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0 0 3rem 0;
`;

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: var(--primary-color);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: var(--font-header);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: var(--color-secondary);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(221, 164, 72, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;
