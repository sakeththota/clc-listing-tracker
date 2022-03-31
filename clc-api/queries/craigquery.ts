import { Query } from "./query";
import * as fs from "fs";
import * as puppeteer from "puppeteer";

interface resultObj {
  title: string;
  price: string;
  link: string;
}

export class CraigQuery extends Query {
  constructor() {
    super("Craigslist");
  }

  private async login(page: puppeteer.Page) {
    try {
      // enter username
      let craig_user: string = process.env.CRAIG_USER;
      await page.focus("#inputEmailHandle");
      await page.keyboard.type(craig_user);
      // enter password
      let craig_pass: string = process.env.CRAIG_PASS;
      await page.focus("#inputPassword");
      await page.keyboard.type(craig_pass);
      // submit form
      let submitButton = await page.$("#login");
      await submitButton.click();
    } catch (e) {
      console.log("something went wrong when loggin in");
      console.log(e);
    }
  }

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
    await page.goto("https://accounts.craigslist.org/login");

    console.log("logging in");
    await this.login(page);
    console.log("logged in");

    // console.log("searching for " + terms);
    // let newItems: resultObj[] = [];

    // // replaces spaces in search terms with %20 to tack onto URLs
    // let searchTerm: string = terms.join(" ");
    // console.log(`\nResults for ${terms}:\n`);
    // await page.screenshot({ path: "./ss1.png", fullPage: true });

    // // go to search terms link
    // await page.goto(
    //   `https://www.facebook.com/marketplace/${location}/search?deliveryMethod=local_pick_up&minPrice=${min}&maxPrice=${max}${
    //     condition !== "all" ? `&itemCondition=${condition}` : ""
    //   }&query=${searchTerm}&exact=false`
    // );
    // await page.screenshot({ path: "./ss2.png", fullPage: true });

    // let allItemsVisible = await page.$x('//div[@class="kbiprv82"]');

    // for (let i = 0; i < allItemsVisible.length; i++) {
    //   let item = allItemsVisible[i];
    //   let id = (
    //     await item.$eval("a", (element) => element.getAttribute("href"))
    //   ).split("/")[3];
    //   console.log(id);
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
