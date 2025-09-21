import {IStrategy} from "../interfaces/IStrategy.interface";
import * as fs from "node:fs";
import {MailConfig} from "../config/mailer.config";
import {Request, User} from "marketing-request-database-lib";

export class CreateRequestStrategy implements IStrategy {
    public getNotificationConfig(request_id: number): Promise<MailConfig> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await this.getData(request_id);
                const {marketingLead, request} = data;
                const {Advertiser,Customer,RequestAssignments} = request;
                const servicePartner = RequestAssignments.find((item:any) => item.type === 'main');
                const notificationConfig: MailConfig = {
                    from: `${Customer.name} <${Customer.email}>`,
                    to: `${servicePartner.ServicePartner.email}`,
                    cc: marketingLead.email,
                    subject: 'Solicitud de Campaña',
                    html: this.getTemplate({uuid: request.uuid, advertiser: Advertiser.name}),
                };
                resolve(notificationConfig);
            } catch (e) {
                console.log('CreateRequestStrategy.error::', e);
                reject(e);
            }
        });
    }

    async getData(request_id: number): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const marketingLead = await User.findOne({where: {role_id:2}});
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
                        },
                        {association: 'Customer'},
                        {association: 'Advertiser'}
                    ]
                })
                resolve({marketingLead, request})
            } catch (e) {
                console.log('CreateRequestStrategy.getData.error::', e);
                resolve({marketingLead: null, request: null});
            }
        });
    }

    getTemplate(data: { uuid: string, advertiser: string }): string {
        const htmlString = fs.readFileSync("src/templates/CreateRequest.template.html", {encoding: "utf-8"});
        console.log('sendEmail.htmlString:: ',htmlString);
        let finalHtmlString = htmlString.replace("{{advertiser}}", data.advertiser);
        finalHtmlString = finalHtmlString.replace("{{uuid}}", data.uuid);
        return finalHtmlString;
    }
}