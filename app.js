const express = require('express');
const app = express();
const ExpressError = require('./expressError');
const fs = require('fs');
const timestamp = new Date().toISOString();

const { convertAndValidateNumsArray, findMode, findMean, findMedian } = require('./funcs');

app.get('/mean', function (req, res, next) {
    if (!req.query.nums) {
        throw new ExpressError('Please enter a query key called nums with a list of numbers seperated by commas', 400)
    }
    let numStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

 

    let results = {
        operation: "mean",
        result: findMean(nums),
        timestamp: timestamp
    }

    if (req.query.save == true) {
        function writeFile () {
            const content = results;
            fs.writeFileSync('results.json', content, 'utf-8');

            console.log('File has been written!');
        }

        writeFile();
    };

    return res.send(results);

    
} );

app.get('/median', function (req, res, next) {
    if(!req.query.nums) {
        throw new ExpressError('Please enter a query key called nums with a list of numbers seperated by commas', 400)
    }
    let numStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let results = {
        operation: "median",
        result: findMedian(nums),
        timestamp: timestamp
    }

    if (req.query.save == true) {
        function writeFile () {
            const content = results;
            fs.writeFileSync('results.json', content, 'utf-8');

            console.log('File has been written!');
        }

        writeFile();
    };

    return res.send(results);
});

app.get('/mode', function (req, res, next) {
    if(!req.query.nums) {
        throw new ExpressError('Please enter a query key called nums with a list of numbers seperated by commas', 400)
    }
    let numStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let results = {
        operation: "mode",
        result: findMode(nums),
        timestamp: timestamp
    }

    if (req.query.save == true) {
        function writeFile () {
            const content = results;
            fs.writeFileSync('results.json', content, 'utf-8');

            console.log('File has been written!');
        }

        writeFile();
    };

    return res.send(results);
});

app.get('/all', function (req, res, next) {
    if(!req.query.nums) {
        throw new ExpressError('Please enter a query key called nums with a list of numbers seperated by commas', 400)
    }
    let numStrings = req.query.nums.split(',');
    let nums = convertAndValidateNumsArray(numStrings);
    if (nums instanceof Error) {
        throw new ExpressError(nums.message);
    }

    let results = {
        operation: "all",
        mean: findMean(nums),
        median: findMedian(nums),
        mode: findMode(nums),
        timestamp: timestamp
    }

    if (req.query.save == true) {
        function writeFile () {
            const content = results;
            fs.writeFileSync('results.json', content, 'utf-8');

            console.log('File has been written!');
        }

        writeFile();
    };

    return res.send(results);
})

// Error Handling

app.use( function (req, res, next) {
    const err = new ExpressError("Not Found", 404);

    return next(err)
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
  
    return res.json({
      error: err,
      message: err.message
    });
  });
  
  
  app.listen(3000, function() {
    console.log(`Server starting on port 3000`);
  });


