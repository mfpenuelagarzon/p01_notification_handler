
class NotificationService {
    public sendEmail() {
        return new Promise((resolve, reject) => {
            try {
                const result = "email sended succcesfully";
                resolve(result);
            } catch (e) {
                reject(e);
            }
        })
    }

}

const eventService = new NotificationService();
export default eventService;