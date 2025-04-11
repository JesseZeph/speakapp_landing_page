import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();


        const mailerSend = new MailerSend({
            apiKey: process.env.MAILERSEND_API_KEY! as string,
        });

        const sentFrom = new Sender("MS_axlWzn@test-r83ql3pw57zgzw1j.mlsender.net", "Speakapp");

        const recipients = [
            new Recipient("techfusionhub@gmail.com", "Speakapp")
        ];

        const emailParams = new EmailParams()
            .setFrom(sentFrom)
            .setTo(recipients)
            .setReplyTo(sentFrom)
            .setSubject(`Contact Us Inquiry`)
            .setHtml(`
       <html>

<head>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            color: #000;
            line-height: 2rem;
        }

        .container {
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 5px;
            background-color: #f9f9f9;
        }

        .footer {
            margin-top: 20px;
            font-size: 12px;
            color: #666;
        }

        .logo {
            border-radius: 5px 5px 0 0;
            padding: 15px;
            background: #000;
            color: #FFF;
            text-align: center;
        }
        .label{
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="logo">
          <img src=" data:image/png;base64,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"/>
        </div>
        <p>Dear Team,</p>
        <p>You have received a new inquiry from your website's Contact Us form:</p>
        <p><b class="label">Full Name:</b> ${name}</p>
        <p><b class="label">Email:</b> ${email}</p>
        <p><b class="label">Message:</b></p>
        <p>${message}</p>
        <br>
        <p>Best regards,<br><b>${name}</b></p>
    </div>
    <div class="footer">
        <p>This email was generated from your website's Contact Us form. Please do not reply to this email directly.</p>
    </div>
</body>

</html>
    `);


        await mailerSend.email.send(emailParams);

        return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    } catch (error: any) {
        console.error('Error sending email:', error);
        return NextResponse.json({ message: 'Failed to send email', error: error.message }, { status: 500 });
    }
}
