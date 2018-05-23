let doubleArr = _.map([1, 2, 3], value => {
    return value * 3;
});
console.log(`${doubleArr} used lodash.js lib`);



let array = [100,200,300,400];
let concatArr = _.concat(array, doubleArr);
console.log(`${concatArr}  used lodash.js lib`) ;
