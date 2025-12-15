import nodemailer from 'nodemailer';
import 'dotenv/config'; // Garante que as variáveis do .env sejam carregadas (se você estiver usando o dotenv)

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525, // Deve ser 587, 465, ou 2525
    secure: false, 
    auth: {
        user: "2b32d474d4c995",
        pass: "07159a64c27f11",
    }
});

// Função para enviar e-mail de teste (exemplo)
export const sendMail = async (to, subject, htmlContent) => {
    try {
        let info = await transporter.sendMail({
            from: process.env.MAIL_FROM, 
            to: to, 
            subject: subject, 
            html: htmlContent, 
        });

        console.log("Mensagem enviada: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Erro ao enviar e-mail:", error);
        throw error;
    }
};

export default transporter;