import {Transporter} from "nodemailer";
import * as fs from "node:fs";

class NotificationService {
    public sendEmail(transporter: Transporter) {
        return new Promise(async (resolve, reject) => {
            try {
                const htmlString = fs.readFileSync("src/templates/CreateRequest.template.html", {encoding: "utf-8"});
                console.log('sendEmail.htmlString:: ',htmlString);
                /*const result = await transporter.sendMail({
                    from: '"Next&Tech" <mgarzonnaranjo@gmail.com>',
                    to: 'felipegarxon@hotmail.com',
                    subject: 'Prueba desde NodeJs + Ts',
                    html: htmlString
                });*/
                const result = {
                    "accepted": [
                        "felipegarxon@hotmail.com"
                    ],
                    "rejected": [],
                    "ehlo": [
                        "SIZE 35882577",
                        "8BITMIME",
                        "AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH",
                        "ENHANCEDSTATUSCODES",
                        "PIPELINING",
                        "CHUNKING",
                        "SMTPUTF8"
                    ],
                    "envelopeTime": 562,
                    "messageTime": 736,
                    "messageSize": 369,
                    "response": "250 2.0.0 OK  1758469083 a1e0cc1a2514c-9000129f5adsm127193241.14 - gsmtp",
                    "envelope": {
                        "from": "mgarzonnaranjo@gmail.com",
                        "to": [
                            "felipegarxon@hotmail.com"
                        ]
                    },
                    "messageId": "<60adf536-8ff5-a10b-5e7a-00347f352922@gmail.com>"
                }
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

}

const eventService = new NotificationService();
export default eventService;