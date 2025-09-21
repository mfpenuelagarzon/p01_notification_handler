import {Request, Response} from 'express';
import notificationService from "../services/notification.service";
import {IStrategy} from "../interfaces/IStrategy.interface";
import {CreateRequestStrategy} from "../strategy/CreateRequest.strategy";
import {AddSupportStrategy} from "../strategy/AddSupport.strategy";
import CustomError from "../models/CustomError";

const strategiesStore: Set<{key: string, strategy: IStrategy}> = new Set();
strategiesStore.add({key: 'createRequest', strategy: new CreateRequestStrategy()});
strategiesStore.add({key: 'addSupport', strategy: new AddSupportStrategy()});

class NotificationController {
    public async send(req: Request, res: Response) {
        try {
            const {notificationStrategy} = req.body;
            if (!notificationStrategy || notificationStrategy === '') {
                throw new CustomError("Notification Strategy not found", "InputValidation", "");
            }
            const result = await notificationService.sendEmail(req.mailTransporter);
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