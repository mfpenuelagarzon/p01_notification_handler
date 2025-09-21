import {Transporter} from "nodemailer";
import {MailConfig} from "../config/mailer.config";

class NotificationService {
    public sendEmail(transporter: Transporter, mailConfig: MailConfig) {
        return new Promise(async (resolve, reject) => {
            try {
                //const result = await transporter.sendMail(mailConfig);
                const result = "mail sended XD!";
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

}

const eventService = new NotificationService();
export default eventService;