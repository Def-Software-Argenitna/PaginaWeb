import { useEffect } from 'react';

export default function EliminacionDatosApp() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Eliminacion de Datos | MeatManager Mobile';

    let robots = document.querySelector('meta[name="robots"]');
    const hadRobots = Boolean(robots);

    if (!robots) {
      robots = document.createElement('meta');
      robots.setAttribute('name', 'robots');
      document.head.appendChild(robots);
    }

    robots.setAttribute('content', 'noindex, nofollow, noarchive');

    return () => {
      document.title = previousTitle;
      if (!hadRobots && robots?.parentNode) {
        robots.parentNode.removeChild(robots);
      }
    };
  }, []);

  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '4rem 1.5rem',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <section
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '920px',
          padding: '2.5rem',
          lineHeight: 1.75,
        }}
      >
        <p
          style={{
            display: 'inline-flex',
            padding: '0.4rem 0.9rem',
            borderRadius: '999px',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: '#fff',
            fontSize: '0.85rem',
            fontWeight: 700,
            marginBottom: '1.25rem',
          }}
        >
          Uso exclusivo para ficha de app
        </p>

        <h1
          style={{
            margin: '0 0 1rem',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            lineHeight: 1.1,
          }}
        >
          Solicitud de eliminación de datos de MeatManager Mobile
        </h1>

        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
          Última actualización: 8 de abril de 2026
        </p>

        <p>
          Si usás <strong>MeatManager Mobile</strong> y querés solicitar la eliminación de tus datos,
          podés hacerlo escribiendo a <a href="mailto:def.software.argentina@gmail.com">def.software.argentina@gmail.com</a>
          {' '}o a través del administrador responsable de tu cuenta cliente.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>Cómo solicitar la eliminación</h2>
        <ol>
          <li>Enviar un email con el asunto <strong>Eliminación de datos - MeatManager Mobile</strong>.</li>
          <li>Indicar el email del usuario afectado y, si corresponde, el nombre del cliente o sucursal.</li>
          <li>Describir si querés eliminar solo tu acceso móvil o también otros datos operativos vinculados a tu usuario.</li>
        </ol>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>Qué datos se pueden eliminar</h2>
        <ul>
          <li>Datos de acceso e identificación del usuario, como email, identificadores de sesión y asociación con Firebase.</li>
          <li>Datos de perfil operativo del usuario dentro del entorno del cliente.</li>
          <li>Datos de tracking y ubicación asociados al uso logístico de la app, cuando ya no exista obligación operativa o legal de conservarlos.</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>Qué datos pueden conservarse</h2>
        <p>
          Algunos datos pueden mantenerse durante un período adicional cuando exista una necesidad legal,
          administrativa, contable, de seguridad o de trazabilidad operativa. Esto puede incluir:
        </p>
        <ul>
          <li>registros vinculados a ventas, caja, pedidos o entregas ya realizadas,</li>
          <li>evidencia mínima de auditoría y seguridad,</li>
          <li>registros necesarios para cumplir obligaciones fiscales o contractuales.</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>Plazos de conservación</h2>
        <p>
          Cuando no exista una obligación de conservación adicional, la solicitud será tratada en un plazo razonable.
          Si ciertos datos deben conservarse por motivos legales o de auditoría, se conservarán solo durante el tiempo necesario
          para cumplir esa finalidad.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>Contacto</h2>
        <ul>
          <li>Email: <a href="mailto:def.software.argentina@gmail.com">def.software.argentina@gmail.com</a></li>
          <li>Sitio web: <a href="https://www.def-software.com">https://www.def-software.com</a></li>
        </ul>
      </section>
    </main>
  );
}
