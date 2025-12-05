const HomeView = ({ featuredSections }) => {
  return (
    <section className="page page--home">
      <h1>Bienvenido a Punto Unión Market</h1>
      <p>
        Somos el puente entre productores locales y consumidores conscientes. Descubrí
        alimentos frescos, artesanías únicas y productos sustentables elaborados con pasión.
      </p>
      <div className="home__sections">
        {featuredSections.map((section) => (
          <article key={section.title} className="home__section-card">
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default HomeView;
