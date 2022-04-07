import * as mailer from "@sendgrid/mail";

class SendGridMailerService {
  public static async sendMail(to: string, token: string) {
    mailer.setApiKey(process.env.SENDGRID_API_KEY as string);

    console.log("to:", to);
    console.log("token:", token);

    const message = {
      to,
      from: "http://localhost:4200",
      subject: "change your password",
      text: "its your token",
      html: `<a>token:${token} </>`,
    };

    try {
      const result = await mailer.send(message);

      console.log("mailer result:", result);
    } catch (err) {
      console.log("mailer err obj:", err);
    }
  }
}

export { SendGridMailerService };
