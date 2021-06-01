import { RawCSVLineItem } from './raw-csv-line-item.interface';
import { ProductSource } from './product-source.model';

export class ProductCatalogItem implements RawCSVLineItem {
	sku: string;
    description: string;
    source: ProductSource;

    parseJSON(json: {SKU?: string, Description?: string}): void {
        let parseError: boolean = false;
        if (json.hasOwnProperty("SKU")) {
            this.sku = String(json.SKU);
        } else {
            parseError = true;
        }
        if (json.hasOwnProperty("Description")) {
            this.description = String(json.Description);
        } else {
            parseError = true;
        }

        if (parseError) {
            throw new Error("Unable to parse JSON")
        }
    }
}