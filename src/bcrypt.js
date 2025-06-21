var bcrypt = require('bcrypt')

const password = "XhlxhlttsE9!"
const loops = 1       //  start by showing 1 time, then 10 times
var hash;
async function hash(password){
console.time("bcrypt")
for (i = 0; i < loops; i++) {
    hash =  await bcrypt.hash(password, 12)
}
console.timeEnd("bcrypt")

console.log ({
	password,
	hash
})}

hash (password)