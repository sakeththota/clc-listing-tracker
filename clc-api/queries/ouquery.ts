import { Query } from "./query";
import * as fs from "fs";
import * as puppeteer from "puppeteer";

interface resultObj {
  title: string;
  price: string;
  link: string;
}

export class OUQuery extends Query {
  constructor() {
    super("OfferUp");
  }

  // protected async login(page: puppeteer.Page) {
  //   try {
  //     // enter username
  //     let ou_user: string = process.env.OU_USER;
  //     await page.focus("#auth-login-dialog-email-field");
  //     await page.keyboard.type(ou_user);
  //     // enter password
  //     let ou_pass: string = process.env.OU_PASS;
  //     await page.focus("#auth-login-dialog-password-field");
  //     await page.keyboard.type(ou_pass);
  //     // submit form
  //     let submitButton = await page.$x(
  //       "//span[contains(text(), 'Log in') and contains(@class, 'jss34')]"
  //     );
  //     await submitButton[0].click();
  //   } catch (e) {
  //     console.log("something went wrong when loggin in");
  //     console.log(e);
  //   }
  // }

  public async query(
    terms: string[],
    location: string,
    min: number,
    max: number,
    recipient: string,
    condition: "new" | "used" | "all"
  ): Promise<void> {
    // puppeteer setup
    console.log("setting up browser");
    const browser: puppeteer.Browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page: puppeteer.Page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36"
    );

    console.log("searching for " + terms);
    let newItems: resultObj[] = [];

    // replaces spaces in search terms with %20 to tack onto URLs
    let searchTerm: string = terms.join(" ");
    console.log(`\nResults for ${terms}:\n`);

    // go to search terms link
    await page.goto(
      `https://offerup.com/search?q=${searchTerm}&condition=100&price_min=${min}&price_max=${max}$&delivery_param=p`
    );

    let links = await page.$x('//div[@class="jss349 jss350"]//a');
    let link_urls = await page.evaluate((...links) => {
      return links.map((e) => e.href);
    }, ...links);

    let info = await page.evaluate((...links) => {
      return links
        .filter((e) => e.href.includes("offerup"))
        .map((e) => {
          let link = e.href;
          let aria = e.getAttribute("aria-label").split("in")[0].split("$");
          let title = aria[0].trim();
          let price = aria[1].trim();
          return { link: link, title: title, price: price };
        });
    }, ...links);
    console.log(info);

    // for (let i = 0; i < allItemsVisible.length; i++) {
    //   let item = allItemsVisible[i];
    //   let id = (
    //     await item.$eval("", (element) => element.getAttribute("href"))
    //   ).split("/")[3];

    //   if (!this.pastItems.pastItems.includes(id)) {
    //     let infoEl = await item.$x('.//div[@class="aahdfvyu fsotbgu8"]');

    //     let priceEl = (await infoEl[0].$x(".//*//*//*"))[0];
    //     let price = (
    //       await page.evaluate((x) => x.textContent, priceEl)
    //     ).substring(1);

    //     let titleEl = (await infoEl[1].$x(".//*//*//*//*"))[0];
    //     let title = await page.evaluate((x) => x.textContent, titleEl);

    //     let itemObj = {
    //       link: `https://www.facebook.com/marketplace/item/${id}`,
    //       price: price,
    //       title: title,
    //     };
    //     this.pastItems.pastItems.push(id);
    //     newItems.push(itemObj);
    //   }
    // }

    // if (newItems.length > 0) {
    //   this.sendEmail(terms, newItems, recipient);
    // } else {
    //   console.log("No new items for " + terms);
    // }

    // await browser.close();

    // fs.writeFile(
    //   "./pastItems.json",
    //   JSON.stringify(this.pastItems),
    //   "utf-8",
    //   function (err) {
    //     if (err) throw err;
    //     console.log("Updated past items");
    //   }
    // );
  }
}
