import '../Css/ContactsForm.css'

function ContactForm() {
  return (
    <form className="contact-form">
      <h2>Contacto</h2>
      <input type="text" placeholder="Nombre" required />
      <input type="text" placeholder="Apellido" required />
      <input type="email" placeholder="Email" required />
      <textarea placeholder="Mensaje" required />
      <button type="submit">Enviar</button>
    </form>
  );
}

export default ContactForm;
