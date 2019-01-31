
var Excel = require('exceljs');
var fs = require('fs');
var workbook = new Excel.Workbook();
var log = require('../logging/logger');




module.exports = {
    readcsv: function(dir){
        return new Promise(function(resolve, reject){
            var endpoints = [];
            var filename;
            filename = dir;

            log.info("Reading CSV, creating endpoint array for deployment...")

            workbook.csv.readFile(filename)
                .then(function(worksheet) {

                    for(var i = 0; i<worksheet.actualRowCount+1; i++){
                        var row = worksheet.getRow(i+1).values;
                        row = row.toString().replace(/,/g,'');
                        log.info(row);
                        endpoints.push(row);

                    }
                    resolve(endpoints);
                }).catch(function(err){
                reject(err);
            })

        })
    }
};

