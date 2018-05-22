// let _ = require('lodash');
const doubleArr = _.map([1, 2, 3], value => {
    return value * 3;
});
console.log(doubleArr);



const filterArr = _.filter((doubleArr, val) => {
    return val > 1;
});
console.log(filterArr);
