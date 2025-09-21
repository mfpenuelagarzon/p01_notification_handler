import {IStrategy} from "../interfaces/IStrategy.interface";
import {INotificationConfig} from "../interfaces/INotificationConfig.interface";

class EmailContext {
    strategy: IStrategy;
    constructor(strategy:IStrategy) {
        this.strategy = strategy;
    }

    public getNotificationConfig(): INotificationConfig {
        console.log('getting notification config');
        return this.strategy.getNotificationConfig();
    }
}