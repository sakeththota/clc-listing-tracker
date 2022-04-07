import { Query } from "./query";
import * as fs from "fs";
import * as puppeteer from "puppeteer";

interface resultObj {
  link: string;
  title: string;
  price: string;
}

export class OUQuery extends Query {
  constructor() {
    super("OfferUp");
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
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    const page: puppeteer.Page = await browser.newPage();
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
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
    await page.screenshot({ path: "./ss1.png", fullPage: true });

    await page.waitForXPath("//a[@href and @aria-label]");
    let links = await page.$x("//a[@href and @aria-label]");
    let info = await page.evaluate((...links) => {
      return links
        .filter((e) => e.href.includes("https://offerup.com/item/detail/"))
        .map((e) => {
          let link: string = e.href;
          let aria: string[] = e
            .getAttribute("aria-label")
            .split("in")[0]
            .split("$");
          let title: string = aria[0];
          let price: string = aria[1];
          return {
            link: link,
            title: title,
            price: price,
          };
        });
    }, ...links);

    for (let i = 0; i < info.length; i++) {
      let item = info[i];
      let id: number = +item.link.split("/")[5].split("?")[0];

      if (!this.pastItems.pastItems.includes(id)) {
        this.pastItems.pastItems.push(id);
        newItems.push(item);
      }
    }

    if (newItems.length > 0) {
      this.sendEmail(terms, newItems, recipient);
    } else {
      console.log("No new items for " + terms);
    }

    await browser.close();

    fs.writeFile(
      "./pastItems.json",
      JSON.stringify(this.pastItems),
      "utf-8",
      function (err) {
        if (err) throw err;
        console.log("Updated past items");
      }
    );
  }
}
