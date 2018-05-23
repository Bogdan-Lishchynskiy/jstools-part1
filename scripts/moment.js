let date = moment('2016-01-01'); 
let datePlusOneWeek = date.clone().add(1, 'week'); 
console.log(`${datePlusOneWeek.format()}  used moment.js lib`);
console.log(`${date.format()}  used moment.js lib`);
