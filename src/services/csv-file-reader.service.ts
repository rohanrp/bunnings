import { injectable } from "inversify";
import { FileReaderService } from "../entities/file-reader.interface";
import { RawCSVLineItem } from '../entities/raw-csv-line-item.interface';
import { ProductSource } from '../entities/product-source.model';
import csv = require('csv-parser');
import fs = require('fs');

@injectable()
export class CSVReaderService implements FileReaderService {

	public async getLineItems<T extends RawCSVLineItem>(folder: string, source: ProductSource, filename: string, factory: () => RawCSVLineItem): Promise<Array<T>> {
		const lineItems: { [key: string]: string }[] = await this.readFile(folder, source, filename);
		return lineItems.map(row => {
			const lineItem: RawCSVLineItem = factory();
			lineItem.parseJSON(row)
			lineItem.source = source;
			return lineItem as T;
		})
	}

	public readFile(folder: string, source: ProductSource, filename: string): Promise<{ [key: string]: string }[]> {
		return new Promise((resolve, reject) => {
			const items: { [key: string]: string }[] = [];
			const path = `${folder}/${filename}${source.name}.csv`;
			
			if (!fs.existsSync(path)) {
				console.error("Unable to find file in path: " + path)
				reject(null);
			}
			fs.createReadStream(path)
				.pipe(csv())
				.on('data', (row: { [key: string]: string }) => {
					items.push(row);
				})
				.on('end', () => {
					resolve(items);
				})
				.on('error', (e) => {
					console.error("Unable to parse file from path: " + path)
					reject(e);
				});
		});
	}
}