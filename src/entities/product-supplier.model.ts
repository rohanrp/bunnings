import { RawCSVLineItem } from './raw-csv-line-item.interface';
import { ProductSource } from './product-source.model';

export class ProductSupplier implements RawCSVLineItem {
	id: string;
    name: string;
    source: ProductSource;

    parseJSON(json: {ID?: string, Name?: string}): void {
        let parseError: boolean = false;
        if (json.hasOwnProperty("ID")) {
            this.id = String(json.ID);
        } else {
            parseError = true;
        }
        if (json.hasOwnProperty("Name")) {
            this.name = String(json.Name);
        } else {
            parseError = true;
        }

        if (parseError) {
            throw new Error("Unable to parse JSON")
        }
    }
}