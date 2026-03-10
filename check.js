const path = process.argv[2];
const fs = require('fs');
fs.readFile(path, (err, data) => {
    if (err) return console.error(err);
    console.log('first bytes:', data.slice(0, 32));
});
