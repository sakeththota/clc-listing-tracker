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
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36"
    );

    console.log("searching for " + terms);
    let newItems: resultObj[] = [];

    // replaces spaces in search terms with %20 to tack onto URLs
    let searchTerm: string = terms.join(" ");
    console.log(`\nResults for ${terms}:\n`);

    // go to search terms link

    await page.goto(
      `https://${location}.craigslist.org/search/sss?query=${searchTerm}&min_price=${min}&max_price=${max}&condition=10`
    );

    await page.waitForXPath(
      '//ul[@id="search-results"]/li/div[@class="result-info"]/h3[@class="result-heading"]/a'
    );
    let links = await page.$x(
      '//ul[@id="search-results"]/li/div[@class="result-info"]/h3[@class="result-heading"]/a'
    );
    let info = await page.evaluate((...links) => {
      return links.map((e) => {
        return {
          link: e.href,
          title: e.innerHTML,
          price: "0",
        };
      });
    }, ...links);
    console.log(info);

    for (let i = 0; i < info.length; i++) {
      let item = info[i];
      let id: number = +item.link.split("/")[7].slice(0, -5);

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
