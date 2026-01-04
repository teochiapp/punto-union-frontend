import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';

const Header = ({ transparent = false }) => {
  const navigate = useNavigate();
  const { totalItems } = useCarrito();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <HeaderContainer $isScrolled={isScrolled} $transparent={transparent}>
      {/* Mobile Menu Button - Left on Mobile */}
      <MobileMenuBtn onClick={toggleMenu} aria-label="Toggle menu">
        <Menu size={24} />
      </MobileMenuBtn>

      {/* Center Group: Nav Left + Logo + Nav Right */}
      <CenterGroup>
        <Nav>
          <NavLink onClick={() => navigate('/nosotros')}>Nosotros</NavLink>
          <NavLink onClick={() => navigate('/catalogo')}>Catálogo</NavLink>
        </Nav>

        <Logo onClick={() => navigate('/')}>Punto Union <span>Market</span></Logo>

        <Nav>
          <NavLink onClick={() => navigate('/sucursales')}>Sucursales</NavLink>
          <NavLink onClick={() => navigate('/contacto')}>Contacto</NavLink>
        </Nav>
      </CenterGroup>

      <Actions>
        <ActionButton onClick={() => navigate('/carrito')} aria-label="Shopping cart">
          <ShoppingCart size={20} strokeWidth={1.5} />
          {totalItems > 0 && (
            <CartBadge $isScrolled={isScrolled} $transparent={transparent}>
              {totalItems}
            </CartBadge>
          )}
        </ActionButton>
      </Actions>

      {/* Mobile Navigation Overlay */}
      <MobileNav $isOpen={isMobileMenuOpen}>
        <MobileMenuBtn
          onClick={toggleMenu}
          style={{ position: 'absolute', top: '2rem', right: '2rem', color: '#fff' }}
        >
          <X size={32} />
        </MobileMenuBtn>

        {/* Mobile Logo copy is optional but good for branding */}
        <Logo onClick={() => { navigate('/'); toggleMenu(); }} style={{ display: 'flex', color: '#fff' }}>Punto Union <span>Market</span></Logo>

        <MobileLink onClick={() => { navigate('/nosotros'); toggleMenu(); }}>Nosotros</MobileLink>
        <MobileLink onClick={() => { navigate('/reservas'); toggleMenu(); }}>Reservas</MobileLink>
        <MobileLink onClick={() => { navigate('/sucursales'); toggleMenu(); }}>Sucursales</MobileLink>
        <MobileLink onClick={() => { navigate('/contacto'); toggleMenu(); }}>Contacto</MobileLink>
      </MobileNav>
    </HeaderContainer>
  );
};

export default Header;


const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  z-index: 50;
  transition: all 0.3s ease;
  background-color: ${({ $isScrolled, $transparent }) =>
    ($transparent && !$isScrolled) ? 'transparent' : '#fdf7e9'};
  color: ${({ $isScrolled, $transparent }) =>
    ($transparent && !$isScrolled) ? '#fff' : '#1B1A18'};
  box-shadow: ${({ $isScrolled, $transparent }) =>
    ($transparent && !$isScrolled) ? 'none' : '0 2px 10px rgba(0,0,0,0.1)'};
  padding: ${({ $transparent }) =>
    $transparent ? '0.5rem 3rem' : '0.75rem 3rem'};

  font-family: 'Josefin Sans', sans-serif;

  @media (max-width: 768px) {
    gap: 1rem;
    grid-template-columns: 1fr auto 1fr;
    padding: ${({ $transparent }) =>
    $transparent ? '1rem 1.5rem' : '0.75rem 1.5rem'};
  }
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 3rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const NavLink = styled.button`
  text-decoration: none;
  color: inherit;
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  transition: opacity 0.3s ease;
  cursor: pointer;
  padding: 0;

  &:hover {
    opacity: 0.8;
  }

  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 1px;
    background: currentColor;
    transition: width 0.3s ease;
  }

  &:hover::after {
    width: 100%;
  }
`;

const CenterGroup = styled.div`
  grid-column: 2;
  display: flex;
  align-items: center;
  gap: 4rem;
  justify-content: center;
  
  @media (max-width: 1024px) {
    gap: 0;
  }
`;

const Logo = styled.button`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: -0.5px;
  text-align: center;
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0;
  transition: opacity 0.3s ease;

  &:hover {
    opacity: 0.8;
  }

  span {
    font-size: 0.7em;
    font-weight: 400;
  }

  @media (max-width: 540px) {
    display: none;
  }
`;

const Actions = styled.div`
  grid-column: 3;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  justify-self: end;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  position: relative;

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  background: #8B2E2E;
  color: white;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  font-weight: 700;
  font-family: 'Josefin Sans', sans-serif;
  border: 2px solid ${({ $isScrolled, $transparent }) =>
    ($transparent && !$isScrolled) ? 'transparent' : '#fdf7e9'};
  transition: border-color 0.3s ease;
`;

const MobileMenuBtn = styled(ActionButton)`
  grid-column: 1;
  display: none;
  justify-self: start;
  @media (max-width: 1024px) {
    display: flex;
  }
`;

const MobileNav = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #1B1A18;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  z-index: 20;
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(-100%)')};
  transition: transform 0.4s ease-in-out;
  color: #fff; /* Always white text on dark mobile menu */
`;

const MobileLink = styled(NavLink)`
  font-size: 1.5rem;
  color: #fff; /* Force white in mobile menu */
`;