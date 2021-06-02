import { RawCSVLineItem } from './raw-csv-line-item.interface';
import { ProductSource } from './product-source.model';

export interface FileReaderService {
    getLineItems<T extends RawCSVLineItem>(folder: string, source: ProductSource, filename: string, factory: () => RawCSVLineItem): Promise<Array<T>>
    readFile(folder: string, source: ProductSource, filename: string): Promise<{ [key: string]: string }[]>;
}