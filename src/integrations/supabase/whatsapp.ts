const TOKEN = import.meta.env.VITE_W_TOKEN; // Use your actual env var names
const PHONE_ID = import.meta.env.VITE_W_PHONE_ID;

export const sendMessage = async (to: string, text: string) => {
  try {
    const response = await fetch(`https://graph.facebook.com/v18.0/${PHONE_ID}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: to,
        type: 'text',
        text: { body: text },
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Failed to send message");
    
    return { success: true, data };
  } catch (error) {
    console.error("WhatsApp Error:", error);
    return { success: false, error: error.message };
  }
};