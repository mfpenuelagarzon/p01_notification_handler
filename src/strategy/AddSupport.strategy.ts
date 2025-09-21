import {IStrategy} from "../interfaces/IStrategy.interface";
import {MailConfig} from "../config/mailer.config";

export class AddSupportStrategy implements IStrategy {
    public getNotificationConfig(request_id: number): Promise<MailConfig> {
        return new Promise(async (resolve, reject) => {
            try {
                const notificationConfig: MailConfig = {
                    from: '',
                    to: '',
                    cc: '',
                    subject: '',
                    html: ''
                };
                console.log('AddSupportStrategy.notificationConfig', notificationConfig);
                resolve(notificationConfig);
            } catch (e) {

            }
        });
    }
}