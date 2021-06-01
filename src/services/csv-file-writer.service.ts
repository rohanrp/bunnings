import { injectable } from "inversify";
import { FileWriterService } from "../entities/file-writer.interface";
import { CatalogueProduct } from "../entities/catalogue-product.interface";

@injectable()
export class CSVWriterService implements FileWriterService {
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

  public logCatalogue(
    inventory: CatalogueProduct[],
    outputFolder: string
  ): Promise<void> {
    const createCsvWriter = require("csv-writer").createObjectCsvWriter;
    const csvWriter = createCsvWriter({
      path: this.getFileName(outputFolder),
      header: [
        { id: "sku", title: "SKU" },
        { id: "description", title: "Description" },
        { id: "source", title: "Source" },
      ],
    });

    return csvWriter
      .writeRecords(inventory)
      .then(() => console.log("The CSV file was written successfully"));
  }
}
