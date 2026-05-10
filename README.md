# 🌐 DEF Software - Plataforma Web Oficial

Bienvenido al repositorio oficial de la página web de **DEF Software Argentina**. Esta plataforma sirve como carta de presentación comercial, catálogo de productos y portal de acceso / contacto para nuestros desarrollos de software de gestión, incluyendo nuestras soluciones insignia **KioskManager** y **MeatManager**.

## 🚀 Arquitectura y Tecnologías

Este proyecto está construido con un stack de desarrollo moderno y altamente optimizado:

- **Frontend Core:** React 18
- **Lenguaje:** TypeScript (Tipado estricto para seguridad de código)
- **Bundler:** Vite (Empaquetador y servidor de desarrollo ultrarrápido)
- **Navegación:** React Router DOM (Gestión de navegación estilo SPA)
- **Diseño/Estilos:** CSS3 Vanilla (Diseño Dark Mode, Glassmorphism y animaciones modernas nativas)
- **Integraciones:** Firebase Authentication (Dashboard de clientes) y Vercel Analytics

## 🏢 Nuestros Productos Destacados

La web incluye la presentación interactiva de nuestras aplicaciones comerciales:

*   📱 **KioskManager**: Aplicación móvil multiplataforma destinada a la gestión integral de kioscos y minimercados, operando directamente desde tu celular con lectura nativa de códigos de barras.
*   🥩 **MeatManager**: Software híbrido (Local + Nube) para carnicerías. Soporta terminales táctiles (POS) e integración robusta con balanzas electrónicas corporativas, contando con un ecosistema completo para repartidores (App Mobile) y un panel administrativo web.
*   🍻 **BarManager**: Plataforma web de agilización operativa para bares y restaurantes gastronómicos, especializada en pagos QR, control de salones e inteligencia artificial para planificación espacial.

## ⚙️ Requisitos

- Node.js 20+
- Gestor de paquetes: `npm`

## 🛠️ Instalación y Arranque Rápido

Si deseas clonar y correr este repositorio en tu entorno local, sigue estos pasos:

1. Instala las dependencias:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en tu navegador en `http://localhost:5173`. Todos los cambios que realices se reflejarán instantáneamente gracias al Hot Module Replacement (HMR).

## 📦 Scripts Disponibles

En el directorio del proyecto puedes ejecutar:

- `npm run dev`: Ejecuta la app en modo desarrollo.
- `npm run build`: Compila la app para producción de forma optimizada en la carpeta `dist`.
- `npm run lint`: Ejecuta el linter (ESLint) para asegurar las buenas prácticas en el código fuente.
- `npm run preview`: Levanta un servidor con la versión compilada local para comprobar su funcionalidad antes del despliegue.

## 🎨 Diseño y UI/UX

La interfaz ha sido cuidadosamente diseñada teniendo en mente:
- **Estética premium**: Una paleta enfocada en tonos oscuros elegantes, acentos color cian (`--accent-cyan`) y efectos de vidrio esmerilado (Glassmorphism).
- **Interacciones enriquecidas**: Uso de Intersection Observers para revelar suavemente componentes (fade-ins) al hacer scroll.
- **Rendimiento**: Animaciones livianas hechas en CSS nativo y componentes funcionales puramente en React para reducir el tiempo visual de carga.

---
© **DEF Software Argentina.** Todos los derechos reservados.
