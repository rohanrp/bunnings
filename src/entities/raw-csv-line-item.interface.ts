import { ProductSource } from './product-source.model';

export interface RawCSVLineItem {
    source: ProductSource;
    parseJSON(json: {[key:string]: string}): void;
}