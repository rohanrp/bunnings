import { injectable } from "inversify";
import { FileReaderService } from "../entities/file-reader.interface";
import { RawCSVLineItem } from '../entities/raw-csv-line-item.interface';
import { ProductSource } from '../entities/product-source.model';
import csv = require('csv-parser');
import fs = require('fs');

@injectable()
export class CSVReaderService implements FileReaderService {

	public getLineItems<T extends RawCSVLineItem>(folder: string, source: ProductSource, filename: string, factory: () => RawCSVLineItem): Promise<Array<T>> {
		return new Promise((resolve, reject) => {
			const items: RawCSVLineItem[] = [];
			const path = `${folder}/${filename}${source.name}.csv`;
			fs.createReadStream(path)
				.pipe(csv())
				.on('data', (row: {[key:string]: string}) => {
					const lineItem: RawCSVLineItem = factory();
					lineItem.parseJSON(row)
					lineItem.source = source;
					items.push(lineItem);
				})
				.on('end', () => {
					resolve(items as T[]);
				})
				.on('error', (e) => {
					reject(e);
				});
		});
	}
}