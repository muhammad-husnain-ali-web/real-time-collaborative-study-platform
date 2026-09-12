import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailsService {
    private transporter: any;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
    }

    async sendmail(
        purpose: string,
        name: string,
        email: string,
        otp: string,
    ) {
        try {
            const { subject, html } = this.generateOtpEmail(
                purpose,
                name,
                otp,
            );

            const mailOptions = {
                from: `"Study Platform" <${process.env.EMAIL_USER}>`,
                to: email,
                subject,
                html,
            };

            const info = await this.transporter.sendMail(mailOptions);

            return info;
        } catch (error) {
            throw error;
        }
    }

    generateOtpEmail(
        purpose: string,
        name: string,
        otp: string,
    ) {
        let subject = '';
        let intro = '';

        switch (purpose) {
            case 'register':
                subject = 'Verify Your Email - Collaborative Study Platform';
                intro = `
                    Thank you for joining the 
                    <b>Real-Time Collaborative Study Platform</b>.
                    To complete your registration, please verify your 
                    email address using the OTP below:
                `;
                break;

            case 'login':
                subject = 'Login Verification OTP - Collaborative Study Platform';
                intro = `
                    We noticed a login attempt on your 
                    <b>Collaborative Study Platform</b> account.
                    For your security, please confirm that it's you 
                    by entering the OTP below:
                `;
                break;

            case 'forgot-password':
                subject = 'Password Reset OTP - Collaborative Study Platform';
                intro = `
                    We received a request to reset your password for your 
                    <b>Collaborative Study Platform</b> account.
                    Use the OTP below to continue with the password reset:
                `;
                break;
        }

        const html = `
            <div style="
                font-family: Arial, sans-serif;
                padding: 20px;
                background-color: #f9f9f9;
            ">

                <h2 style="color:#2563eb;">
                    Hello, <b>${name}</b> 👋
                </h2>

                <p>${intro}</p>

                <div style="
                    text-align:center;
                    margin:20px 0;
                ">
                    <span style="
                        font-size:22px;
                        font-weight:bold;
                        color:#333;
                        border:2px dashed #2563eb;
                        padding:10px 20px;
                        border-radius:8px;
                    ">
                        ${otp}
                    </span>
                </div>

                <p>
                    This OTP will expire in <b>5 minutes</b>.
                </p>

                <p>
                    If you did not request this code, please ignore this email.
                </p>

                <hr style="margin:20px 0;">

                <p style="
                    font-size:12px;
                    color:#555;
                ">
                    Regards,<br/>
                    The <b>Collaborative Study Platform</b> Team
                </p>

            </div>
        `;

        return { subject, html };
    }
}