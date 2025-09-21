import {Request, Response} from 'express';
import notificationService from "../services/notification.service";
import {IStrategy} from "../interfaces/IStrategy.interface";
import {CreateRequestStrategy} from "../strategy/CreateRequest.strategy";
import {AddSupportStrategy} from "../strategy/AddSupport.strategy";
import CustomError from "../models/CustomError";
import {EmailContext} from "../strategy/EmailContext";
import {MailConfig} from "../config/mailer.config";

const strategiesStore: {key: string, strategyToExecute: IStrategy}[] = [
    {key: 'createRequest', strategyToExecute: new CreateRequestStrategy()},
    {key: 'addSupport', strategyToExecute: new AddSupportStrategy()}
]

class NotificationController {
    public async send(req: Request, res: Response) {
        try {
            const {
                notification_strategy,
                request_id,
            } = req.body;
            if (!notification_strategy || notification_strategy === '') {
                throw new CustomError("Notification Strategy not found", "InputValidation", "");
            }
            const strategy = strategiesStore.find((item) => item.key === notification_strategy);
            if (!strategy) {
                throw new CustomError("Invalid strategy", "InputValidation", "");
            }
            const emailCtx: EmailContext = new EmailContext(strategy.strategyToExecute);
            const notificationConfig: MailConfig = await emailCtx.getNotificationConfig(request_id);
            const result = await notificationService.sendEmail(req.mailTransporter, notificationConfig);
            return res.status(200).json({
                message: 'ok',
                body: result
            });
        } catch (e) {
            console.log('NotificationController.send.error::', e);
            return res.status(409).json(e);
        }
    }


}

const notificationController = new NotificationController();
export default notificationController;