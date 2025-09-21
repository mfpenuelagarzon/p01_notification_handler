import {Request, Response, NextFunction} from "express";
import {Transporter} from "nodemailer";
import {createTransporter} from "../config/mailer.config";

declare global {
    namespace Express {
        interface Request {
            mailTransporter: ReturnType<typeof createTransporter>;
        }
    }
}

let initialized = false;
let transporter: Transporter;

export const mailMiddleware = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log('mailMiddleware.in');
            if (!initialized) {
                console.log('mailMiddleware.initializing transporter...');
                transporter = createTransporter();
                console.log('mailMiddleware.initializing transporter successfully');
                initialized = true;
            }
            console.log('mailMiddleware.transporter connected');
            // Agregar el transporter de mensajeria al request
            req.mailTransporter = transporter;
            next();
        } catch (error) {
            console.error('mailMiddleware.error:: ',error);
            next(error);
        }
    }
}