import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main>
      <section className="hero">
        <h1>Apuesta con <span>Inteligencia</span></h1>
        <p className="hero-sub">Desarrollo Web — <b>Miguel Cortés</b> y <b>Anton Olguín</b></p>
        <div className="hero-actions">
          <Link to="/juegos" className="btn-main">Probar suerte</Link>
          <Link to="/soporte" className="btn-outline">Contacto</Link>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">¿Por qué elegirnos?</h2>
        <div className="features-grid">
          <article className="feature-card">
            <div className="feature-icon">🏗️</div>
            <h3>Arquitectura HTML5</h3>
            <p>Uso de etiquetas semánticas para una estructura profesional y accesible.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">📐</div>
            <h3>Layout Moderno</h3>
            <p>CSS Grid y Flexbox para un diseño responsivo que se adapta a cualquier pantalla.</p>
          </article>
          <article className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Multi-Página</h3>
            <p>Navegación fluida entre páginas independientes con experiencia consistente.</p>
          </article>
        </div>
      </section>

      <section className="stats-section">
        <div className="stat-card">
          <span className="stat-number">6</span>
          <span className="stat-label">Símbolos únicos</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">100</span>
          <span className="stat-label">Créditos iniciales</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">∞</span>
          <span className="stat-label">Diversión garantizada</span>
        </div>
      </section>
    </main>
  )
}
