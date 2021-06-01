import { Container } from "inversify";
import "reflect-metadata";
import SERVICE_IDENTIFIER from "../constants/identifiers";
import { FileReaderService } from "../entities/file-reader.interface";
import { CSVReaderService } from "../services";
import { CatalogerService } from '../entities/cataloger.interface';
import { CompanyCatalogerService } from '../services/company-cataloger.service';
import { CSVWriterService } from '../services/csv-file-writer.service';
import { FileWriterService } from '../entities/file-writer.interface';

const container = new Container();

container.bind<FileReaderService>(SERVICE_IDENTIFIER.FILE_READER).to(CSVReaderService);
container.bind<CatalogerService>(SERVICE_IDENTIFIER.CATALOGER).to(CompanyCatalogerService);
container.bind<FileWriterService>(SERVICE_IDENTIFIER.FILE_WRITER).to(CSVWriterService);

export default container;