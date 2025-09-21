import {MailConfig} from "../config/mailer.config";

export interface IStrategy {
    getNotificationConfig(request_id: number): Promise<MailConfig>;
}