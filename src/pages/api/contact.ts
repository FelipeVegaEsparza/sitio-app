import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const subject = formData.get('subject');
  const message = formData.get('message');

  // Basic validation
  if (!name || !email || !subject || !message) {
    return new Response(
      JSON.stringify({
        message: "Todos los campos son requeridos.",
      }),
      { status: 400 }
    );
  }

  // Simulate sending email
  console.log("--- Formulario de Contacto Recibido ---");
  console.log("Nombre:", name);
  console.log("Email:", email);
  console.log("Asunto:", subject);
  console.log("Mensaje:", message);
  console.log("---------------------------------------");

  // In a real-world scenario, you would use a service like SendGrid, Mailgun, or Nodemailer here.

  // Return a success response
  return new Response(
    JSON.stringify({
      message: "¡Formulario enviado con éxito!",
    }),
    { status: 200 }
  );
};
