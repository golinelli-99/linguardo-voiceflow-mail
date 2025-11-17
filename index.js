import express from "express";
import { Resend } from "resend";

const app = express();
app.use(express.json());

const resend = new Resend(process.env.RESEND_API_KEY);

app.post("/send", async (req, res) => {
  const { messaggio } = req.body;

  try {
    const data = await resend.emails.send({
      from: "IlTuoBot <tuo_nome@tuodominio.resend.dev>",
      to: "alessandrogolinelliscuola@gmail.com",
      subject: "Nuovo messaggio dal cliente",
      text: messaggio
    });

    console.log("Email inviata!", data);
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3000, () => console.log("Server pronto"));
