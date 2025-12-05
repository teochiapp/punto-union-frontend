const AboutView = ({ milestones, values }) => {
  return (
    <section className="page page--about">
      <h1>Sobre Nosotros</h1>
      <p>
        Punto Unión Market es una iniciativa cooperativa que impulsa la economía social y
        solidaria. Promovemos el consumo responsable y el comercio justo para fortalecer a
        los productores locales.
      </p>

      <section className="about__milestones">
        <h2>Nuestro recorrido</h2>
        <ul>
          {milestones.map((milestone) => (
            <li key={milestone.year}>
              <strong>{milestone.year}</strong>
              <span>{milestone.description}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="about__values">
        <h2>Nuestros valores</h2>
        <ul>
          {values.map((value) => (
            <li key={value}>{value}</li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default AboutView;
