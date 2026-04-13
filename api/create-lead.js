export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    const { name, phone, email } = req.body;

    const response = await fetch("http://3.89.106.86:8080/api/v1/Lead", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.ESPO_API_KEY
      },
      body: JSON.stringify({
        name,
        phoneNumber: phone,
        emailAddress: email,
        description: "Lead from Avelo WhatsApp"
      })
    });

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
