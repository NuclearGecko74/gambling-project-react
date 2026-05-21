import { useState, useEffect } from 'react'

const DRAFT_KEY = 'gambling_draft'

export default function Support() {
  const [formData, setFormData] = useState({ username: '', subject: '', message: '' })
  const [showDraft, setShowDraft] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  useEffect(() => {
    try {
      const draft = JSON.parse(localStorage.getItem(DRAFT_KEY))
      if (draft) {
        setFormData(draft)
        setShowDraft(true)
      }
    } catch {}
  }, [])

  const handleChange = (e) => {
    const newData = { ...formData, [e.target.name]: e.target.value }
    setFormData(newData)
    localStorage.setItem(DRAFT_KEY, JSON.stringify(newData))
    setShowDraft(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.removeItem(DRAFT_KEY)
    setFormData({ username: '', subject: '', message: '' })
    setShowDraft(false)
    setShowSuccess(true)
  }

  return (
    <>
      <div className="page-banner">
        <h1>Soporte</h1>
        <p>Estamos aquí para ayudarte</p>
      </div>

      <main>
        <section className="support-section">
          <div className="contact-form">
            <h2>Envíanos un mensaje</h2>
            <p className="form-subtitle">Responderemos a la brevedad posible.</p>

            {showDraft && (
              <div className="draft-indicator">
                <span>📝 Borrador guardado automáticamente</span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="username">Usuario</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Tu nombre de usuario"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="subject">Asunto</label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Selecciona un asunto</option>
                  <option value="cuenta">Problema con mi cuenta</option>
                  <option value="creditos">Problema con créditos</option>
                  <option value="tecnico">Problema técnico</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div className="input-group">
                <label htmlFor="message">Mensaje</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Describe tu problema o consulta..."
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn-main btn-full">Enviar mensaje</button>
              {showSuccess && (
                <p className="form-success">✅ ¡Mensaje enviado con éxito! Te contactaremos pronto.</p>
              )}
            </form>
          </div>

          <div className="faq">
            <h2>Preguntas frecuentes</h2>
            <div className="faq-list">
              <details className="faq-item">
                <summary>¿Cómo obtengo más créditos?</summary>
                <p>Al reiniciar el juego recibes 100 créditos nuevamente. Es un juego de práctica sin dinero real.</p>
              </details>
              <details className="faq-item">
                <summary>¿Cómo funciona el tragamonedas?</summary>
                <p>Cada tirada cuesta 10 créditos. Si los tres carretes muestran el mismo símbolo, ganas según la tabla de premios.</p>
              </details>
              <details className="faq-item">
                <summary>¿Mi progreso se guarda?</summary>
                <p>Sí. Tus créditos y estadísticas se guardan automáticamente en tu navegador mediante LocalStorage, por lo que persisten entre visitas.</p>
              </details>
              <details className="faq-item">
                <summary>¿Hay dinero real involucrado?</summary>
                <p>No. Este es un proyecto universitario de Desarrollo Web. Todos los créditos son virtuales y sin valor monetario.</p>
              </details>
              <details className="faq-item">
                <summary>¿Quiénes desarrollaron este sitio?</summary>
                <p>Miguel Cortés y Anton Olguín, estudiantes de la Universidad Autónoma de Guadalajara.</p>
              </details>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
