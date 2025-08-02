import nodemailer from 'nodemailer'


const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, 
  auth: {
    user: "ayushrajranjan10@gmail.com",
    pass: "qurdwxwkedaxehde",
  },
});

export const sendOtpEmail = async (email,otp) => {
    try {
      const info = await transporter.sendMail({
        from: `"Daily Journal" <"ayushrajranjan10@gmail.com">`,
        to: email,
        subject: "OTP Verification",
        html: `<b>Your OTP is: ${otp}</b>`,
      });
  
      console.log("Message sent: %s", info.messageId);
    } catch (error) {
      console.error("Error sending OTP:", error);
      throw new Error("Failed to send OTP");
    }
  };