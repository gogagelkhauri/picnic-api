const datasetService = require('../services/dataset.service');


function get(req,res,next) {
    try{
        // res.json(datasetService.getDataset());
       // console.log(`Directory name is ${__dirname}`);

        location = '../WhatsgoodlyData-10.csv'
        datasetService.getDataset(location, (results) => {
            //console.log(results.length);
            res.send(results);
          });
    }catch(err){
        console.error(`Error while getting dataset`, err.message);
        next(err);
    }
}

module.exports = {
    get
}