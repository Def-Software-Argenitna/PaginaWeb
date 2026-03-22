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

    const subject = encodeURIComponent('Consulta comercial - Software para carnicerias y fiambrerias');
    const body = encodeURIComponent(
      [
        `Nombre: ${formData.name}`,
        `Negocio: ${formData.business}`,
        `Email: ${formData.email}`,
        `Telefono: ${formData.phone}`,
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
        <h2>Solicita una demo y una propuesta comercial.</h2>
        <p>Indicanos tu rubro, tu operatoria y si buscas una demo o una licencia definitiva.</p>
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
        placeholder="Telefono o WhatsApp"
        value={formData.phone}
        onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
      />
      <textarea
        placeholder="Ejemplo: tengo una carniceria con dos cajas, necesito una demo y quiero evaluar la compra definitiva para controlar stock, precios y caja diaria."
        value={formData.message}
        onChange={(event) => setFormData({ ...formData, message: event.target.value })}
        required
      />

      <button type="submit">Solicitar demo o propuesta</button>
    </form>
  );
}

export default ContactForm;
