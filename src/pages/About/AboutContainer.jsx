import AboutView from './AboutView';

const AboutContainer = () => {
  const milestones = [
    { year: 2018, description: 'Nace Punto Unión para conectar cooperativas con nuevos mercados.' },
    { year: 2020, description: 'Se suman productores de toda la región centro y litoral.' },
    { year: 2023, description: 'Presentamos la plataforma digital para llegar a más hogares.' },
  ];

  const values = ['Trabajo colaborativo', 'Comercio justo', 'Sustentabilidad', 'Transparencia'];

  return <AboutView milestones={milestones} values={values} />;
};

export default AboutContainer;
