import {INotificationConfig} from "./INotificationConfig.interface";

export interface IStrategy {
    getNotificationConfig(): Promise<INotificationConfig>;
}