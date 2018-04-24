var express = require('express');
var app = express();

app.use(express.static(__dirname + './../../')); //servers the index.html
app.listen(3000, () => {
    console.log('Serve listening on: 3000')
});