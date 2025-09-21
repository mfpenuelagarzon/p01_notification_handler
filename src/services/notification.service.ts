import {IEvent} from "../../../p01_database_lib";
import {Event} from "../../../p01_database_lib";
import {Op} from "../../../p01_database_lib";

class NotificationService {
    public save(event: IEvent) {
        return new Promise((resolve, reject) => {
            try {
                // @ts-ignore
                const result = Event.create(event);
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

    public report(startDate: string, endDate: string) {
        return new Promise(async(resolve, reject) => {
            try {
                const from = `${startDate} 00:00:00`;
                const to = `${endDate} 11:59:59`;
                const result = await Event.findAll({
                    where: {
                        created_at: {
                            [Op.gte]: from,
                            [Op.lte]: to,
                        },
                    },
                    include: [
                        {association: 'User'}
                    ]
                });
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }
}

const eventService = new NotificationService();
export default eventService;