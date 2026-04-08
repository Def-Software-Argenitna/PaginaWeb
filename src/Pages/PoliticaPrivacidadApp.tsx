import { useEffect } from 'react';

export default function PoliticaPrivacidadApp() {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Politica de Privacidad | MeatManager Mobile';

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
          Política de Privacidad de MeatManager Mobile
        </h1>

        <p style={{ color: 'var(--text-dim)', marginBottom: '2rem' }}>
          Última actualización: 8 de abril de 2026
        </p>

        <p>
          DEF Software desarrolla y opera la aplicación <strong>MeatManager Mobile</strong>.
          Esta política describe qué información se utiliza, con qué finalidad y cómo se protege
          cuando una persona usa la app.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>1. Datos que podemos tratar</h2>
        <p>La aplicación puede tratar las siguientes categorías de datos:</p>
        <ul>
          <li>Datos de identificación y acceso, como email y credenciales de autenticación.</li>
          <li>Datos operativos del negocio, como pedidos, ventas, caja, sucursales y usuarios habilitados.</li>
          <li>Datos de ubicación del dispositivo cuando el usuario tiene funciones logísticas habilitadas.</li>
          <li>Datos técnicos mínimos necesarios para mantener la sesión, sincronizar información y diagnosticar errores.</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>2. Finalidad del tratamiento</h2>
        <p>Los datos se utilizan únicamente para:</p>
        <ul>
          <li>Permitir el acceso seguro a la aplicación.</li>
          <li>Validar permisos, roles y licencias asociadas al usuario.</li>
          <li>Mostrar y sincronizar información comercial y operativa del cliente.</li>
          <li>Registrar y visualizar el seguimiento de repartidores cuando esa función está habilitada.</li>
          <li>Mejorar la estabilidad, seguridad y soporte técnico del servicio.</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>3. Uso de ubicación</h2>
        <p>
          Si el usuario utiliza funciones de reparto o seguimiento logístico, MeatManager Mobile
          puede acceder a la ubicación del dispositivo en primer plano y, cuando corresponde,
          también en segundo plano. Esa información se usa exclusivamente para:
        </p>
        <ul>
          <li>informar la última ubicación del repartidor en tiempo real,</li>
          <li>coordinar entregas, asignaciones y monitoreo logístico,</li>
          <li>mostrar la trazabilidad operativa dentro del entorno autorizado del cliente.</li>
        </ul>
        <p>
          La ubicación no se utiliza para publicidad ni para vender datos a terceros.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>4. Servicios y almacenamiento</h2>
        <p>
          Para operar, la app puede apoyarse en servicios de autenticación, bases de datos,
          infraestructura de sincronización y almacenamiento temporal de eventos en tiempo real.
          DEF Software aplica medidas razonables para proteger la confidencialidad e integridad de la información.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>5. Compartición de datos</h2>
        <p>
          DEF Software no vende datos personales. La información sólo puede compartirse con:
        </p>
        <ul>
          <li>el cliente titular de la cuenta y sus usuarios autorizados,</li>
          <li>proveedores de infraestructura tecnológica necesarios para operar el servicio,</li>
          <li>autoridades competentes cuando exista obligación legal.</li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>6. Conservación</h2>
        <p>
          Los datos se conservan por el tiempo necesario para prestar el servicio, cumplir obligaciones legales,
          mantener trazabilidad operativa y resolver incidentes técnicos o administrativos.
        </p>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>7. Derechos y contacto</h2>
        <p>
          Si necesitás realizar una consulta relacionada con privacidad, acceso, rectificación o tratamiento de datos,
          podés comunicarte con DEF Software a través de:
        </p>
        <ul>
          <li>Email: <a href="mailto:def.software.argentina@gmail.com">def.software.argentina@gmail.com</a></li>
          <li>Sitio web: <a href="https://def-software.com">https://def-software.com</a></li>
        </ul>

        <h2 style={{ marginTop: '2rem', marginBottom: '0.75rem' }}>8. Cambios en esta política</h2>
        <p>
          Esta política puede actualizarse para reflejar mejoras del producto, cambios legales o ajustes operativos.
          La versión vigente será la publicada en esta URL.
        </p>
      </section>
    </main>
  );
}
