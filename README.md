# Bunnings Catalogue Merge Application

coding skill challenge can be found here: https://github.com/tosumitagrawal/codingskills.

In a nutshell, when presented with an inventory of products from company A and company B, a common inventory must be produced. The logic for working out what is in common is based on the barcode of a product stock item being universal to that product class across companies.


The data is fed in through a collection of CSV files (input folder) and the common catalogue is produced as a CSV file (output folder);



## Getting Started

This NodeJS application has been built with Typescript for type safety, InversifyJS for Dependency Injection and Jest for tests as well as some CSV file reading/writing libs.

The bootstrap to the application is main.ts

There are three main services:

company-cataloger.service.ts - which is used to add product items from a company to the inventory

csv-file-reader.service - which is used to read csv files and convert them to domain models

csv-file-writer.service - which is used to write to a csv file given an array of domain models


## Solution
A graph of the company source and barcodes are each concurrently maintained on adding a line item. Eventually common barcodes can be looked up in the barcode graph and from there it links to its source (supplier, sku, description);

### Prerequisites

NPM > 6

Node > 12.13


### Build

open a command console into the current folder and run the following to download dependencies
```
npm install
```



### Running the tests

All test can be run using 
```
npm run test
```

## Running the application

Run the following

For one-off result

```
npm run start
```

For dev server

```
npm run start:dev
```



## Improvements

* Ability to supply input argumenbts via command line arguments or NPM 'prompt' library
* Improved error handling with parsing CSV files
* Separate file reader and cataloger into seperate modules
* Improved tests around CSV file reading and writing.
* Performance improvements for handling large csv file sizes
* Add linter as you save
* Clarification on terminology - catalogue, inventory, stock, etc.