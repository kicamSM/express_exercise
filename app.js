const express = require('express')
const ExpressError = require('./expressError')



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


function isArrayNums(array){
    const splitNums = array.split(',');

    let arrayNums = []
 
    for(const item of splitNums) {
        let num = parseInt(item) 
        if(isNaN(num)) {
            throw new ExpressError(`Please enter only numbers! ${item} is not a number.`, 403)
        }
        arrayNums.push(num)
    }
    return arrayNums
}

function findMean(arrayNums) {
    let total = 0;

    for(const num of arrayNums) {
        total += num
    }
    return total/arrayNums.length
}

function findMode(arrayNums){
    let frequency = {}
    arrayNums.forEach(num => {
        if(frequency[num]) {
            frequency[num]++; 
        } else {
        frequency[num] = 1;
        }
    }) 

    let maxValue = 0;
    let maxKey = null;

    for(const [key, value] of Object.entries(frequency)) {
        if(value > maxValue) {
            maxValue = value; 
            maxKey = key;
        }
    }
    return maxKey   
}

function findMedian(arrayNums) {
    let sortedArray = arrayNums.sort(function(a, b){return a-b;});

    if(sortedArray.length % 2 == 0) {
        let middle1Idx = ((sortedArray.length/2) -1)
        let middle2Idx = middle1Idx+1
        let total = sortedArray[middle1Idx]+sortedArray[middle2Idx]
        return total/2
    }

    let index = Math.floor(sortedArray.length/2)
    console.log('index', index)

    return sortedArray[index]
}

app.get("/mean", (req, res, next) => {
    if(!req.query.nums) {
        throw new ExpressError('Please pass in a query of nums seperated by commas', 400)
    }
    let array = req.query.nums
    let arrayOfNums = isArrayNums(array)
    let mean = findMean(arrayOfNums)

    return res.json({ 
        'operation': req.path,
        'value': mean
         });
}) 

app.get("/median", (req, res, next) => {
    if(!req.query.nums) {
        throw new ExpressError('Please pass in a query of nums seperated by commas', 400)
    }
    const str = req.query.nums
    let arrayOfNums = isArrayNums(str)
    let median = findMedian(arrayOfNums)

    return res.json({ 
        'operation': req.path,
        'value': median
         });
}) 

app.get("/mode", (req, res, next) => {
    if(!req.query.nums) {
        throw new ExpressError('Please pass in a query of nums seperated by commas', 400)
    }
    const array = req.query.nums
    console.log('array', array)
    let arrayOfNums = isArrayNums(array)
    let mode = findMode(arrayOfNums)
    console.log('mode:', mode)

    return res.json({ 
        'operation': req.path,
        'value': mode
         });
}) 


app.use((req, res, next) => {
    const e = new ExpressError('PAGE NOT FOUND', 404)
    next(e)
})

app.use((error, req, res, next) => {
    res.status(error.status).send(error.msg)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})

module.exports = {findMean, findMedian, findMode, isArrayNums}
// having findMean() here is giving me an this is not iterble error in findMean probably beacuse you are trying to call the function instead of exporting it

// note exports have to be in curly brackets