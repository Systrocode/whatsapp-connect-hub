export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST allowed" });
  }

  try {
    let body = req.body;

    if (!body) {
      return res.status(400).json({ error: "Missing body" });
    }

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const { name, phone, email } = body;

    if (!name || !phone) {
      return res.status(400).json({ error: "Missing fields" });
    }

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

    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return res.status(200).json({
      success: true,
      espocrm_response: data
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
