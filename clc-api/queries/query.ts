import { Logger } from "../logger/logger";
import * as nodemailer from "nodemailer";
import * as dotenv from "dotenv";
dotenv.config();

interface pastItemsObj {
  pastItems: any[];
}

interface resultObj {
  title: string;
  price: string;
  link: string;
}

export abstract class Query {
  public pastItems: pastItemsObj;
  public logger: Logger;
  public transporter: nodemailer.Transporter;
  public name: string;

  constructor(name_in: string) {
    console.log(`Query constructor w/ ${name_in}`);
    this.logger = new Logger();
    this.transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    this.pastItems = { pastItems: [] };
    this.name = name_in;
  }

  protected sendEmail(
    terms: string[],
    results: resultObj[],
    recipient: string
  ): void {
    console.log(`to ${recipient}`);
    let message: string = "New results below: \n\n";

    for (const res of results) {
      message += `${res.title} - $${res.price}\n${res.link}\n\n`;
    }

    const opts = {
      from: process.env.GMAIL_USER,
      to: recipient,
      subject: `New Listings for ${terms}`,
      text: message,
    };

    this.transporter.sendMail(opts, (err, info) => {
      console.log(err ? err : "Email sent: " + info.response);
    });
  }

  public abstract query(
    terms: string[],
    location: string,
    min: number,
    max: number,
    recipient: string,
    condition: "new" | "used" | "all"
  ): void;
}
