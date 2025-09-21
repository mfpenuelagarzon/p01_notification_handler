import {Request, Response} from 'express';

class NotificationController {
    public async send(req: Request, res: Response) {
        try {
            return res.status(200).json({
                message: 'ok',
                body: {}
            });
        } catch (e) {
            return res.status(409).json(e);
        }
    }


}

const notificationController = new NotificationController();
export default notificationController;