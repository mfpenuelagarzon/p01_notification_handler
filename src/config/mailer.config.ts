import nodemailer, {Transporter} from "nodemailer";


export interface MailConfig {
    from: string;
    to: string;
    cc: string;
    subject: string;
    html: string;
}

export const createTransporter = (): Transporter => {
    const transporter: Transporter= nodemailer.createTransport({
        host: 'smtp.gmail.com',// smtp.hostinger.com
        port: 587, // 465 para SSL
        secure: false, // true si va con 465
        auth: {
            user: 'mgarzonnaranjo@gmail.com', // process.env.EMAIL
            pass: 'tblz sypr qllq gjuz', // process.env.PASSWORD
        }
    })
    return transporter;
}
