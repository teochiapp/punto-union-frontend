import styled from 'styled-components';

// Styled Components
const SucursalesSection = styled.section`
  padding: 4rem 0;
  background: var(--color-background);
`;

const SucursalesContainer = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const SectionTitle = styled.h2`
  font-family: var(--font-header);
  font-size: 2.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 3rem;
  color: var(--text-primary);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const SucursalesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin: 0;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const BranchCard = styled.article`
  position: relative;
  width: 100%;
  height: 50vh;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.02);
    z-index: 2;
  }

  @media (max-width: 768px) {
    height: 40vh;
  }
`;

const BranchBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.$image});
  background-size: cover;
  background-position: center;
  filter: grayscale(100%);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  ${BranchCard}:hover & {
    filter: grayscale(80%);
    transform: scale(1.05);
  }
`;

const BranchOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 100%);
  transition: background 0.3s ease;

  ${BranchCard}:hover & {
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.6) 100%);
  }
`;

const BranchContent = styled.div`
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 2rem;
`;

const BranchYear = styled.div`
  font-family: var(--font-header);
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--color-primary);
  line-height: 1;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease;

  ${BranchCard}:hover & {
    transform: translateY(-4px);
  }

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const BranchTitle = styled.h3`
  font-family: var(--font-header) !important;
  font-size: 1.25rem !important;
  font-weight: 700 !important;
  color: #ffffff !important;
  margin: 0 0 0.75rem 0 !important;
  text-transform: uppercase !important;
  letter-spacing: 1px !important;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5) !important;
  line-height: 1.2 !important;

  @media (max-width: 768px) {
    font-size: 1.1rem !important;
  }
`;

const BranchDescription = styled.p`
  font-family: var(--font-body);
  font-size: 0.95rem;
  color: #ffffff;
  margin: 0;
  line-height: 1.4;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.5);
  max-width: 90%;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

// Component
const Sucursales = () => {
  const branches = [
    {
      id: 1,
      year: '2020',
      title: 'BELGRANO',
      description: 'James Churchill opens Churchill\'s Butcher Shop at 132',
      image: '/sucursales/belgrano.jpg'
    },
    {
      id: 2,
      year: '2022',
      title: 'RETIRO',
      description: 'Jack Wallace, an employee, purchases the shop for £2,800',
      image: '/sucursales/retiro.jpeg'
    },
    {
      id: 3,
      year: '2024',
      title: 'EZEIZA',
      description: 'Gary Stokes, Jack\'s nephew, becomes the shop\'s third owner',
      image: '/sucursales/ezeiza.jpg'
    },
    {
      id: 4,
      year: '2025',
      title: 'RAMOS MEJÍA',
      description: 'Gary Stokes, Jack\'s nephew, becomes the shop\'s third owner',
      image: '/sucursales/ramos-mejia.jpg'
    }
  ];

  return (
    <SucursalesSection>
      <SucursalesContainer>
        <SucursalesGrid>
          {branches.map((branch) => (
            <BranchCard key={branch.id}>
              <BranchBackground $image={branch.image} />
              <BranchOverlay />
              <BranchContent>
                <BranchYear>{branch.year}</BranchYear>
                <BranchTitle>{branch.title}</BranchTitle>
                <BranchDescription>{branch.description}</BranchDescription>
              </BranchContent>
            </BranchCard>
          ))}
        </SucursalesGrid>
      </SucursalesContainer>
    </SucursalesSection>
  );
};

export default Sucursales;
