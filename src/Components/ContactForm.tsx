import { FormEvent, useState } from 'react';
import '../Css/ContactsForm.css';

const initialForm = {
  name: '',
  business: '',
  email: '',
  phone: '',
  message: '',
};

function ContactForm() {
  const [formData, setFormData] = useState(initialForm);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent('Consulta comercial - Software para carnicerías y fiambrerías');
    const body = encodeURIComponent(
      [
        `Nombre: ${formData.name}`,
        `Negocio: ${formData.business}`,
        `Email: ${formData.email}`,
        `Teléfono: ${formData.phone}`,
        '',
        'Consulta:',
        formData.message,
      ].join('\n'),
    );

    window.location.href = `mailto:info@def-software.com?subject=${subject}&body=${body}`;
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <span className="form-tag">Contacto comercial</span>
        <h2>Coordiná una demo y recibí una propuesta.</h2>
        <p>Contanos tu rubro, cantidad de puestos y objetivo comercial.</p>
      </div>

      <input
        type="text"
        placeholder="Nombre y apellido"
        value={formData.name}
        onChange={(event) => setFormData({ ...formData, name: event.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Nombre del negocio"
        value={formData.business}
        onChange={(event) => setFormData({ ...formData, business: event.target.value })}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(event) => setFormData({ ...formData, email: event.target.value })}
        required
      />
      <input
        type="tel"
        placeholder="Teléfono o WhatsApp"
        value={formData.phone}
        onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
      />
      <textarea
        placeholder="Ejemplo: tengo una carnicería con dos cajas, quiero controlar stock, precios y caja diaria, y conocer el costo de implementación."
        value={formData.message}
        onChange={(event) => setFormData({ ...formData, message: event.target.value })}
        required
      />

      <button type="submit">Solicitar demo y propuesta</button>
    </form>
  );
}

export default ContactForm;
