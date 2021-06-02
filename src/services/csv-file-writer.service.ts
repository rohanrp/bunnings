import { injectable } from "inversify";
import { FileWriterService } from "../entities/file-writer.interface";
import { CatalogueProduct } from "../entities/catalogue-product.interface";
import fs = require('fs');

@injectable()
export class CSVWriterService implements FileWriterService {
  
  public logCatalogue(
    inventory: CatalogueProduct[],
    outputFolder: string
  ): Promise<string> {
    const path = this.getFileName(outputFolder);

    if (!fs.existsSync(outputFolder)) {
      throw new Error("Unable to find folder in path: " + path);
    }

    const createCsvWriter = require("csv-writer").createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path,
      header: [
        { id: "sku", title: "SKU" },
        { id: "description", title: "Description" },
        { id: "source", title: "Source" },
      ],
    });

    return csvWriter
      .writeRecords(inventory)
      .then(() => {
        console.log("The CSV file was written successfully")
        const file: string = fs.readFileSync(path, "utf8");
        console.log(file);
        return Promise.resolve(file);
      });
  }

  public writeFile(csvWriter: any, inventory: CatalogueProduct[]): void {
    return csvWriter
        .writeRecords(inventory)
        .then(() => console.log("The CSV file was written successfully"));
  }

  private getFileName(outputFolder: string) {
    const date = new Date();
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return (
      outputFolder +
      "/result_output_" +
      `${year}${month}${day}${date.getHours()}${date.getMinutes()}${date.getSeconds()}` +
      ".csv"
    );
  }

}
