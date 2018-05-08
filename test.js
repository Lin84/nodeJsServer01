var printOutFilesName = require('./program');

var filePath = process.argv[2];
var fileExtention = process.argv[3];

var printOutFileName = function(err, filesName) {
    if (err) {
        return console.error(err)
    } else {
        filesName.forEach(function(fileName) {
            console.log(fileName)
        })
    };
}

printOutFilesName(filePath, fileExtention, printOutFileName);
