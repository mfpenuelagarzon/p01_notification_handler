import {IStrategy} from "../interfaces/IStrategy.interface";
import {INotificationConfig} from "../interfaces/INotificationConfig.interface";

export class AddSupportStrategy implements IStrategy {
    public async getNotificationConfig(): Promise<INotificationConfig> {
        return new Promise((resolve, reject) => {
            try {
                const notificationConfig: INotificationConfig = {
                    to: '',
                    cc: '',
                    subject: '',
                    data: {},
                    template: ''
                };
                console.log('AddSupportStrategy.notificationConfig', notificationConfig);
                resolve(notificationConfig);
            } catch (e) {

            }
        });
    }
}