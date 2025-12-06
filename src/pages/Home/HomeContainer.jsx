import HomeView from './Home';

const HomeContainer = () => {
  const featuredSections = [
    {
      title: 'Productos Destacados',
      description: 'Explorá nuestra selección curada de productos de productores locales.',
    },
    {
      title: 'Entrega Rápida',
      description: 'Enviamos a todo el país con logística eficiente y segura.',
    },
    {
      title: 'Productores Asociados',
      description: 'Conectamos a cooperativas y emprendimientos con clientes comprometidos.',
    },
  ];

  return <HomeView featuredSections={featuredSections} />;
};

export default HomeContainer;
