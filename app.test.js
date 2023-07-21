const { findMean, findMedian, findMode, isArrayNums } = require("./app");
const ExpressError = require("./expressError");


describe('mean median mode', function () {
    // test('mean', function () {
    // const arrayNums = [1, 2, 3];
    // let mean = findMean(arrayNums)
    
    // expect(mean).toEqual(2);
    // })
    // it("finds the median of an even set", function(){ 
    //     expect(findMedian([1, -1, 4, 2])).toEqual(1.5)
    //   })

    it("finds the mean of a set with negative numbers", function(){ 
        expect(findMean([1, -1, 4, 2])).toEqual(1.5)
      })

      it("finds the mean of a set", function(){ 
        expect(findMean([1, 3, 4, 2])).toEqual(2.5)
      })

    it("finds the mode of a set", function(){ 
        expect(findMode([1, 1, 2])).toEqual('1')
      })

    it("finds the median of odd set", function(){ 
        expect(findMedian([1, 1, 2, 5, 7])).toEqual(2)
      })

    it("finds the median of even set", function(){ 
        expect(findMedian([1, 2, 3, 4])).toEqual(2.5)
      })



    // test('mode', function () {
    //     const arrayNums = [1, 1, 3];
    //     let mode = findMode(arrayNums)
        
    //     expect(mode).toEqual(1);
    //     })

})

describe('Is the array passed to this function an array of numbers?', function () {

it("tests whether or not only nums are in query", function(){ 
expect(isArrayNums("1,2,3,4")).toEqual([1, 2, 3, 4])
      })

it("Confirms express error is raised", () => {
    const array = "1,2,3,foo";
    expect(() => {isArrayNums(array);}).toThrow(new ExpressError("Please enter only numbers! foo is not a number.", 403));
    });
    // asserts funciton to call isArrayNums() will throw an Express Error


})


