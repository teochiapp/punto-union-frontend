import AboutView from './AboutView';
import javiStoreImg from '../../assets/images/javi_blends_store.png';
import { MapPin, ShoppingBag, Award, Heart } from 'lucide-react';

const AboutContainer = () => {
  const locations = [
    {
      id: 1,
      name: 'BELGRANO',
      address: '(718) 609-9300',
      icon: <Award size={32} />,
    },
    {
      id: 2,
      name: 'BARRIO 31',
      address: '(516) 283-2349',
      icon: <MapPin size={32} />,
    },
    {
      id: 3,
      name: 'EZEIZA',
      address: '(518) 249-4757',
      icon: <Heart size={32} />,
    },
    {
      id: 4,
      name: 'RAMOS MEJIA',
      address: '(518) 249-4757',
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
    imageUrl: javiStoreImg,
  };

  return <AboutView locations={locations} aboutContent={aboutContent} />;
};

export default AboutContainer;
