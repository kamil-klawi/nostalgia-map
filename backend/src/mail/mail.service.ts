import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from "@nestjs/config";
import { createTransport, SendMailOptions, Transporter } from "nodemailer";
import * as path from "path";
import * as pug from "pug";
import * as process from "node:process";

@Injectable()
export class MailService {
    private readonly logger = new Logger(MailService.name);
    private transporter: Transporter;
    constructor(private readonly configService: ConfigService) {
        this.transporter = createTransport({
            host: this.configService.get<string>("MAIL_HOST"),
            port: Number(this.configService.get<string>("MAIL_PORT")),
            secure: this.configService.get<string>("MAIL_SECURE") === 'true',
            auth: {
                user: this.configService.get<string>("MAIL_USER"),
                pass: this.configService.get<string>("MAIL_PASS"),
            }
        });
    }

    async sendVerificationCode(to: string, code: string): Promise<void> {
        const from = this.configService.get('MAIL_FROM');
        const templatePath = path.join(process.cwd(), 'src/mail/templates/verification.pug');
        const html = pug.renderFile(templatePath, {code});

        const mailOptions: SendMailOptions = {
            from,
            to,
            subject: 'Verification code',
            html
        };

        try {
            await this.transporter.sendMail(mailOptions);
            this.logger.log(`Verification code sent to ${to}`);
        } catch (err) {
            this.logger.error('Email sending failed:', err.message);
            throw err;
        }
    }
}
