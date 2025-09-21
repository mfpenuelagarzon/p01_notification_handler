import {IStrategy} from "../interfaces/IStrategy.interface";
import {MailConfig} from "../config/mailer.config";
import {Request} from "marketing-request-database-lib";
import fs from "node:fs";

export class AddSupportStrategy implements IStrategy {
    public getNotificationConfig(request_id: number): Promise<MailConfig> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.getData(request_id);
                const {RequestAssignments} = data.request;
                const mainSp = RequestAssignments.find((item:any) => item.type === 'main');
                const supportSp = RequestAssignments.find((item:any) => item.type === 'support');
                const notificationConfig: MailConfig = {
                    from: '',
                    to: `${supportSp.ServicePartner.email}`,
                    cc: `${mainSp.ServicePartner.email}`,
                    subject: 'Asignación de Apoyo a Campaña',
                    html: ''
                };
                console.log('AddSupportStrategy.notificationConfig', notificationConfig);
                resolve(notificationConfig);
            } catch (e) {

            }
        });
    }

    async getData(request_id: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const request = await Request.findOne({
                    where: {
                        id: request_id,
                    },
                    include: [
                        {
                            association: 'RequestAssignments',
                            include: [
                                {association: 'ServicePartner'}
                            ]
                        }
                    ]
                })
                resolve({request})
            } catch (e) {
                console.log('AddSupportStrategy.getData.error::', e);
                resolve({marketingLead: null, request: null});
            }
        });
    }

    getTemplate(data: { uuid: string, advertiser: string }): string {
        const htmlString = fs.readFileSync("src/templates/AddSupport.template.html", {encoding: "utf-8"});
        console.log('sendEmail.htmlString:: ',htmlString);
        let finalHtmlString = htmlString.replace("{{advertiser}}", data.advertiser);
        finalHtmlString = finalHtmlString.replace("{{uuid}}", data.uuid);
        return finalHtmlString;
    }
}