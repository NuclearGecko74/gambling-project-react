# GAMBLINGGGGG React

Sitio web de entretenimiento con tragamonedas virtual, migrado de HTML/CSS/JS vanilla a React + Vite como parte del examen práctico de la materia Programación Web.

**Demo:** https://NuclearGecko74.github.io/gambling-project-react

**Repo original (vanilla JS):** https://github.com/NuclearGecko74/gambling-project

---

## Tecnologías

- React + Vite
- React Router DOM
- Axios
- LocalStorage
- GitHub Pages

---

## Cómo ejecutar el proyecto

```bash
# Clonar el repositorio
git clone https://github.com/NuclearGecko74/gambling-project-react.git
cd gambling-project-react/gambling-react

# Instalar dependencias
npm install

# Correr en desarrollo
npm run dev

# Generar build de producción
npm run build

# Deploy a GitHub Pages
npm run deploy
```

---

## Estructura del proyecto

```
gambling-react/
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    ├── components/
    │   ├── Navbar.jsx
    │   └── Footer.jsx
    └── pages/
        ├── Home.jsx
        ├── Games.jsx
        └── Support.jsx
```

---

## Funcionalidades implementadas

### Hooks utilizados
- `useState` — manejo de estado en todos los componentes interactivos
- `useEffect` — carga de datos con axios, persistencia en localStorage, atajo de teclado

### Conexión con API externa
- Los símbolos y configuración del juego se cargan con `axios` desde el JSON del repo original en GitHub Raw

### Tragamonedas (Games.jsx)
- Estado completo del juego: créditos, victorias, tiradas
- Animación de carretes con `setInterval`
- Detección de victoria cuando los 3 carretes coinciden
- Persistencia automática en `localStorage`
- Banner al regresar con datos de la sesión anterior
- Atajo de teclado: barra espaciadora para girar

### Formulario de Soporte (Support.jsx)
- Formulario controlado con `useState`
- Guardado automático de borrador en `localStorage` mientras el usuario escribe
- Limpieza del formulario y mensaje de éxito al enviar

### Navegación
- React Router DOM con `Routes`, `Route`, `Link` y `NavLink`
- 3 rutas: `/`, `/juegos`, `/soporte`

---

## Reflexión

### Retos enfrentados

El mayor reto fue migrar la lógica del tragamonedas. En vanilla JS el estado se manejaba con variables globales y mutación directa del DOM, mientras que en React todo debe pasar por `useState` y el renderizado es declarativo. Entender que no se puede mutar el estado directamente y que los efectos secundarios van en `useEffect` fue clave para que el `setInterval` de la animación funcionara correctamente sin bugs.

### Soluciones implementadas

- Se usó `useEffect` con cleanup para el event listener del teclado, evitando memory leaks
- El borrador del formulario se sincroniza con `localStorage` en cada cambio via el handler `onChange`
- Se implementó un fallback local en `Games.jsx` para cuando axios no puede cargar el JSON externo
- Se configuró `gh-pages` para automatizar el deploy directamente desde la carpeta `dist`

---

## Autores

Miguel Cortés & Anton Olguín — Universidad Autónoma de Guadalajara, 2026