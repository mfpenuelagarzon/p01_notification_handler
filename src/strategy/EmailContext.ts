import {IStrategy} from "../interfaces/IStrategy.interface";
import {MailConfig} from "../config/mailer.config";

export class EmailContext {
    strategy: IStrategy;
    constructor(strategy:IStrategy) {
        this.strategy = strategy;
    }

    public async getNotificationConfig(request_id: number): Promise<MailConfig> {
        return await this.strategy.getNotificationConfig(request_id);
    }
}
