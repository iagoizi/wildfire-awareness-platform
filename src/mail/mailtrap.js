import transporter from './nodemailer.js'; 
import 'dotenv/config'; 

export const sendMail = async (to, subject, htmlContent) => {
    try {
        let info = await transporter.sendMail({
            from: process.env.MAIL_FROM, // Remetente definido no .env
            to: to, 
            subject: subject, 
            html: htmlContent, 
        });

        console.log(`[Mailtrap] Mensagem enviada: ${info.messageId}. Preview URL: https://mailtrap.io/inboxes/...`);
        
        return info;
    } catch (error) {
        console.error("ERRO: Falha ao enviar e-mail via Mailtrap:", error);
        
        throw new Error("Não foi possível enviar o e-mail.");
    }
};