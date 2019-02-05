
var Excel = require('exceljs');
var fs = require('fs');
var workbook = new Excel.Workbook();
var log = require('../logging/logger');

module.exports = {
    readcsv: (dir) => {
        return new Promise((resolve, reject) => {
            var endpoints = [];
            var filename;
            filename = dir;

            log.info("Reading CSV, creating endpoint array for deployment...")

            workbook.csv.readFile(filename)
                .then((worksheet) => {
                    for(var i = 0; i<worksheet.actualRowCount+1; i++){
                        var row = worksheet.getRow(i+1).values;
                        row = row.toString().replace(/,/g,'');
                        if(row != ''){
                            log.info(row);
                            endpoints.push(row);
                        }

                    }
                    resolve(endpoints);
                }).catch((e) =>{
                reject(e);
            })

        })
    }
};

