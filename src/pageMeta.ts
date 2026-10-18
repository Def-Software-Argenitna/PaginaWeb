/* Titulo, descripcion y URL canonica de cada pagina. Al ser una SPA, index.html solo trae los de la home:
   esto los actualiza al navegar para que cada pagina tenga los suyos en la pestaña, Google y al compartir. */

const SITE = 'https://www.def-software.com';
const BRAND = 'DEF Software';

interface PageMeta { title: string; description: string }

const DEFAULT: PageMeta = {
  title: `${BRAND} | Software de gestión para comercios`,
  description:
    'Software de gestión para comercios: ventas, stock, caja y cuentas corrientes. KioskManager para kioscos y minimercados, MeatManager para carnicerías. Hecho en Argentina.',
};

const PAGES: Record<string, PageMeta> = {
  '/': DEFAULT,
  '/plataforma': {
    title: `Plataforma de punto de venta | ${BRAND}`,
    description: 'Conocé las capacidades de la plataforma: punto de venta, stock, cobros, cuentas corrientes y reportes para tu comercio.',
  },
  '/catalogo-licencias': {
    title: `Catálogo de licencias | ${BRAND}`,
    description: 'Módulos y licencias disponibles para ampliar tu sistema de gestión según lo que necesita cada sucursal.',
  },
  '/sobre-nosotros': {
    title: `Sobre nosotros | ${BRAND}`,
    description: 'Quiénes somos y cómo desarrollamos software de gestión para comercios en Argentina.',
  },
  '/casos-exito': {
    title: `Casos de éxito | ${BRAND}`,
    description: 'Comercios que ordenaron su operación y venden mejor con DEF Software.',
  },
  '/contacto': {
    title: `Contacto | ${BRAND}`,
    description: 'Coordiná una demo y recibí una propuesta para tu comercio.',
  },
  '/centro-ayuda': {
    title: `Centro de ayuda | ${BRAND}`,
    description: 'Respuestas a las preguntas frecuentes sobre nuestros sistemas de gestión.',
  },
  '/estado-sistema': {
    title: `Estado del sistema | ${BRAND}`,
    description: 'Estado de los servicios de DEF Software.',
  },
  '/documentacion': {
    title: `Documentación API | ${BRAND}`,
    description: 'Documentación para integrar DEF Software con tus propias plataformas.',
  },
  '/soporte-tecnico': {
    title: `Soporte técnico | ${BRAND}`,
    description: 'Abrí un ticket de soporte y seguí su estado.',
  },
  '/login': {
    title: `Ingresar | ${BRAND}`,
    description: 'Accedé a tu cuenta de DEF Software.',
  },
};

const setMeta = (selector: string, attr: 'content' | 'href', value: string) => {
  const el = document.head.querySelector(selector);
  if (el) el.setAttribute(attr, value);
};

export function applyPageMeta(pathname: string) {
  const meta = PAGES[pathname] ?? DEFAULT;
  const url = `${SITE}${pathname === '/' ? '/' : pathname}`;
  document.title = meta.title;
  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('link[rel="canonical"]', 'href', url);
  setMeta('meta[property="og:url"]', 'content', url);
  setMeta('meta[property="og:title"]', 'content', meta.title);
  setMeta('meta[property="og:description"]', 'content', meta.description);
}
