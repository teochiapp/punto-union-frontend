import AboutView from './AboutView';
import { MapPin, ShoppingBag, Award, Heart } from 'lucide-react';

const AboutContainer = () => {
  const locations = [
    {
      id: 2,
      name: 'RETIRO',
      address: '15 Carlos H. Perette',
      icon: <MapPin size={32} />,
    },
    {
      id: 3,
      name: 'EZEIZA',
      address: 'Los Molinos 910',
      icon: <Heart size={32} />,
    },
    {
      id: 4,
      name: 'LUZURIAGA',
      address: 'Miguel Cané 1969',
      icon: <ShoppingBag size={32} />,
    },
  ];

  const aboutContent = {
    title: 'PASIÓN POR LA CARNE',
    paragraphs: [
      'En JAVI BLENDS, no solo vendemos carne; celebramos una tradición de excelencia. Somos una carnicería premium dedicada a ofrecer los cortes más selectos, elegidos cuidadosamente para garantizar una calidad superior en cada bocado.',
      'Nuestra pasión por el oficio se refleja en cada detalle, desde la selección de nuestros proveedores hasta la atención personalizada que brindamos en nuestros locales.',
      'Con un compromiso inquebrantable con la calidad y el servicio, combinamos la tradición carnicera con la innovación para ofrecerte una experiencia única de compra. Bienvenido a JAVI BLENDS.',
    ],
    imageUrl: '/fotospasojavi/herojavi.jpeg',
  };

  return <AboutView locations={locations} aboutContent={aboutContent} />;
};

export default AboutContainer;
