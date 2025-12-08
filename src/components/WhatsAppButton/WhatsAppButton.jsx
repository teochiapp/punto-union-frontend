import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { IconBrandWhatsapp } from '@tabler/icons-react';

const ButtonContainer = styled(motion.a)`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, #25D366 0%, #128C7E 100%);
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  z-index: 1000;
  cursor: pointer;
  text-decoration: none;
  pointer-events: auto;

  @media (max-width: 768px) {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 55px;
    height: 55px;
  }
`;

const Tooltip = styled(motion.span)`
  position: absolute;
  right: 70px;
  background: white;
  color: #1B1A18;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-family: 'Josefin Sans', sans-serif;
  font-weight: 600;
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  pointer-events: none;
  
  /* Triangle arrow */
  &::after {
    content: '';
    position: absolute;
    right: -6px;
    top: 50%;
    transform: translateY(-50%);
    border-style: solid;
    border-width: 6px 0 6px 6px;
    border-color: transparent transparent transparent white;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const buttonVariants = {
    initial: { opacity: 0, scale: 0, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 }
};

const tooltipVariants = {
    initial: { opacity: 0, x: 10, pointerEvents: "none" },
    hover: { opacity: 1, x: 0, pointerEvents: "none" }
};

const WhatsAppButton = () => {
    const phoneNumber = '5491163644401';
    const whatsappUrl = `https://wa.me/${phoneNumber}`;

    return (
        <ButtonContainer
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            variants={buttonVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
            transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 1
            }}
        >
            <Tooltip
                variants={tooltipVariants}
                transition={{ duration: 0.2 }}
            >
                ¡Contactanos!
            </Tooltip>
            <IconBrandWhatsapp size={32} stroke={2} />
        </ButtonContainer>
    );
};

export default WhatsAppButton;
