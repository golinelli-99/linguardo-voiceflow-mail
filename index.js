import express from "express";
import nodemailer from "nodemailer";

const app = express();
app.use(express.json());

app.post("/send", async (req, res) => {
  const { messaggio } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "alessandrogolinelliscuola@gmail.com", // <-- QUI METTEREMO la mail della persona X
      subject: "Nuovo messaggio dal cliente",
      text: messaggio
    });

    return res.json({ success: true });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, error: e.message });
  }
});

app.listen(3000, () => console.log("Server ready"));
