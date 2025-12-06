import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { User, ShoppingCart, Menu, X } from 'lucide-react';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 2rem 3rem;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  z-index: 50;
  transition: all 0.3s ease;
  background-color: ${({ $isScrolled }) => ($isScrolled ? '#fdf7e9' : 'transparent')};
  color: ${({ $isScrolled }) => ($isScrolled ? '#1B1A18' : '#fff')};
  box-shadow: ${({ $isScrolled }) => ($isScrolled ? '0 2px 10px rgba(0,0,0,0.1)' : 'none')};
  padding: ${({ $isScrolled }) => ($isScrolled ? '0.5rem 3rem' : '2rem 3rem')};

  font-family: 'Josefin Sans', sans-serif;

  @media (max-width: 768px) {
    padding: 1.5rem;
    gap: 1rem;
    grid-template-columns: 1fr auto 1fr;
    padding: ${({ $isScrolled }) => ($isScrolled ? '1rem 1.5rem' : '1.5rem')};
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

const NavLink = styled.a`
  text-decoration: none;
  color: inherit;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 2px;
  position: relative;
  transition: opacity 0.3s ease;

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

const Logo = styled.div`
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.8rem;
  font-weight: 700;
  text-transform: capitalize;
  letter-spacing: -0.5px;
  text-align: center;
  white-space: nowrap;
  display: flex;
  flex-direction: column;

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

  &:hover {
    transform: scale(1.1);
  }

  &:focus {
    outline: none;
  }
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

const Header = () => {
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
        <HeaderContainer $isScrolled={isScrolled}>
            {/* Mobile Menu Button - Left on Mobile */}
            <MobileMenuBtn onClick={toggleMenu} aria-label="Toggle menu">
                <Menu size={24} />
            </MobileMenuBtn>

            {/* Center Group: Nav Left + Logo + Nav Right */}
            <CenterGroup>
                <Nav>
                    <NavLink href="#Nosotros">Nosotros</NavLink>
                    <NavLink href="#Reservas">Reservas</NavLink>
                </Nav>

                <Logo>Punto Union <span>Market</span></Logo>

                <Nav>
                    <NavLink href="#Sucursales">Sucursales</NavLink>
                    <NavLink href="#Contacto">Contacto</NavLink>
                </Nav>
            </CenterGroup>

            <Actions>
                <ActionButton aria-label="User account">
                    <User size={20} strokeWidth={1.5} />
                </ActionButton>
                <ActionButton aria-label="Shopping cart">
                    <ShoppingCart size={20} strokeWidth={1.5} />
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
                <Logo style={{ display: 'flex', color: '#fff' }}>Punto Union <span>Market</span></Logo>

                <MobileLink href="#Nosotros" onClick={toggleMenu}>Nosotros</MobileLink>
                <MobileLink href="#Reservas" onClick={toggleMenu}>Reservas</MobileLink>
                <MobileLink href="#Sucursales" onClick={toggleMenu}>Sucursales</MobileLink>
                <MobileLink href="#Contacto" onClick={toggleMenu}>Contacto</MobileLink>
            </MobileNav>
        </HeaderContainer>
    );
};

export default Header;
