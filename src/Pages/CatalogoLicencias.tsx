import React, { FC } from 'react';

interface License {
  id: string;
  name: string;
  badge: string;
  description: string;
  price: number;
  priceUnit: string;
}

const licenses: License[] = [
  {
    id: '1',
    name: 'App Movil Gerencial',
    badge: 'WEB + APP VINCULADA',
    description: 'Habilita la app movil gerencial para el administrador del cliente, con cajas en tiempo real, indicadores y ubicacion de repartidores.',
    price: 5,
    priceUnit: 'Por cliente'
  },
  {
    id: '2',
    name: 'Despostada',
    badge: 'MODULO WEB',
    description: 'Modulo de despostada.',
    price: 15,
    priceUnit: 'Por sucursal'
  },
  {
    id: '3',
    name: 'Entregas_TEST',
    badge: 'WEB + APP VINCULADA',
    description: 'entregas_test',
    price: 0,
    priceUnit: 'Por usuario'
  },
  {
    id: '4',
    name: 'Licencia Envios',
    badge: 'WEB + APP VINCULADA',
    description: 'Se asigna a un usuario de una sucursal. Habilita el modulo de logistica en la web y el acceso del repartidor a la app movil.',
    price: 5,
    priceUnit: 'Por usuario'
  },
  {
    id: '5',
    name: 'Licencia MeatManager',
    badge: 'OPERACION WEB',
    description: 'Habilita MeatManager por sucursal y permite al administrador gestionar usuarios web con permisos granulados.',
    price: 50,
    priceUnit: 'Por sucursal'
  },
  {
    id: '6',
    name: 'Mantenimiento pagina web',
    badge: 'MODULO WEB',
    description: 'Mantenimiento pagina web',
    price: 30,
    priceUnit: 'Por cliente'
  },
  {
    id: '7',
    name: 'Menu Digital',
    badge: 'MODULO WEB',
    description: 'Habilita el pedido por whatsapp para la sucursal asignada.',
    price: 5,
    priceUnit: 'Por sucursal'
  },
  {
    id: '8',
    name: 'Rendimiento Pro',
    badge: 'MODULO WEB',
    description: 'Habilita el rendimiento en todas las sucursales del cliente.',
    price: 10,
    priceUnit: 'Por cliente'
  },
  {
    id: '9',
    name: 'SuperUser',
    badge: 'MODULO WEB',
    description: 'Habilita todas las funciones de MeatManager Web y App. Un noble permiso ingresar al panel administrativo completo.',
    price: 0,
    priceUnit: 'Por cliente'
  },
  {
    id: '10',
    name: 'Test',
    badge: 'APP MOVIL INDEPENDIENTE',
    description: 'test',
    price: 1,
    priceUnit: 'Por sucursal'
  }
];

const CatalogoLicencias: FC = () => {
  return (
    <main className="new-main-content">
      <section className="new-hero-section" style={{ paddingBottom: '2rem', paddingTop: '8rem', textAlign: 'left', display: 'block' }}>
        <div className="reveal active" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>Catalogo de Licencias</h1>
            <p style={{ color: 'var(--text-dim)', fontSize: '1rem' }}>Productos, pricing y configuracion comercial base.</p>
          </div>
          <button className="modern-btn nav-btn" style={{ borderRadius: '8px' }}>
            + Crear Producto
          </button>
        </div>
      </section>

      <section className="new-info-section" style={{ paddingTop: '0', maxWidth: '1400px' }}>
        <div className="license-grid">
          {licenses.map((license) => (
            <div key={license.id} className="glass-panel license-card reveal active">
              <div className="license-card-header">
                <div className="license-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--accent-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 8l4 4-4 4M8 12h8"></path>
                  </svg>
                </div>
                <div className="license-status">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              </div>
              
              <div className="license-card-content">
                <div className="license-badge">{license.badge}</div>
                <h3 className="license-title">{license.name}</h3>
                <p className="license-desc">{license.description}</p>
              </div>

              <div className="license-card-footer">
                <div className="license-price">
                  <span className="price-label">PRECIO</span>
                  <div className="price-value">
                    USD {license.price} <span className="price-unit">/ {license.priceUnit}</span>
                  </div>
                  <span className="price-sub">0 asignaciones</span>
                </div>
                
                <div className="license-actions">
                  <button className="action-btn delete-btn" title="Eliminar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                  <button className="action-btn settings-btn" title="Configurar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        .license-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
          gap: 1.5rem;
          padding: 0 1rem;
        }

        .license-card {
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          min-height: 280px;
          text-align: left;
          background: rgba(10, 10, 15, 0.4);
        }

        .license-card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .license-icon {
          width: 32px;
          height: 32px;
        }

        .license-status {
          width: 20px;
          height: 20px;
          background: rgba(0, 255, 136, 0.1);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
        }

        .license-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-dim);
          background: rgba(255, 255, 255, 0.05);
          padding: 0.2rem 0.5rem;
          border-radius: 4px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.8rem;
        }

        .license-title {
          font-size: 1.1rem;
          color: #fff;
          margin: 0 0 0.5rem 0;
          font-weight: 700;
        }

        .license-desc {
          font-size: 0.85rem;
          color: var(--text-dim);
          line-height: 1.5;
          margin: 0;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: 3.8em;
        }

        .license-card-footer {
          margin-top: auto;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .license-price {
          display: flex;
          flex-direction: column;
          gap: 0.2rem;
        }

        .price-label {
          font-size: 0.6rem;
          font-weight: 800;
          color: var(--text-dim);
          letter-spacing: 1px;
        }

        .price-value {
          font-size: 1.2rem;
          font-weight: 800;
          color: #fff;
        }

        .price-unit {
          font-size: 0.75rem;
          color: var(--text-dim);
          font-weight: 400;
        }

        .price-sub {
          font-size: 0.7rem;
          color: var(--text-dim);
        }

        .license-actions {
          display: flex;
          gap: 0.6rem;
        }

        .action-btn {
          width: 36px;
          height: 36px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.05);
          color: var(--text-dim);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }

        .action-btn svg {
          width: 18px;
          height: 18px;
        }

        .delete-btn:hover {
          background: rgba(255, 50, 50, 0.1);
          border-color: rgba(255, 50, 50, 0.3);
          color: #ff3232;
        }

        .settings-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          color: #fff;
        }
      `}</style>
    </main>
  );
};

export default CatalogoLicencias;
