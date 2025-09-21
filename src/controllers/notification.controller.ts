import {Request, Response} from 'express';
import notificationService from "../services/notification.service";

class NotificationController {
    public async send(req: Request, res: Response) {
        try {
            const result = await notificationService.sendEmail();
            return res.status(200).json({
                message: 'ok',
                body: result
            });
        } catch (e) {
            return res.status(409).json(e);
        }
    }


}

const notificationController = new NotificationController();
export default notificationController;