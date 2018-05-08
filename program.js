/**
 * instalation:
 * run: npm install -g learnyounode
 */

/**
 * HELLO WORLD (Exercise 1 of 13):
 * Write a program that prints the text "HELLO WORLD" to the console
  (stdout).
 */

// console.log('HELLO WORLD');

// =========================================================================

/**
 * BABY STEPS (Exercise 2 of 13) :
 * Write a program that accepts one or more numbers as command-line
  arguments and prints the sum of those numbers to the console (stdout).
 */

// var processArguments = process.argv;
// var suma = 0;

// for (var i = 2; i < processArguments.length; i += 1) {
//     suma = suma + parseInt(processArguments[i]);
// }

// console.log(suma);

/**
 * Official solution:
 *  var result = 0
    for (var i = 2; i < process.argv.length; i++) {
    result += Number(process.argv[i])
    }
    console.log(result)
 */

/**
 * note:
 * you missed convert the argv to number
 */

 // =========================================================================
/**
 * MY FIRST I/O! (Exercise 3 of 13):
 * Write a program that uses a single synchronous filesystem operation to
  read a file and print the number of newlines (\n) it contains to the
  console (stdout), similar to running cat file | wc -l.

  The full path to the file to read will be provided as the first
  command-line argument (i.e., process.argv[2]). You do not need to make
  your own test file.
 */

// var fs = require('fs');

// var filePath = process.argv[2];
// var content = fs.readFileSync(filePath);
// var str = content.toString();
// console.log(str.split(/\r\n|\r|\n/).length - 1);

/**
 * Official solution:
 *  var fs = require('fs')

    var contents = fs.readFileSync(process.argv[2])
    var lines = contents.toString().split('\n').length - 1
    console.log(lines)

    note you can avoid the .toString() by passing 'utf8' as the
    second argument to readFileSync, then you'll get a String!

    fs.readFileSync(process.argv[2], 'utf8').split('\n').length - 1
 */

// =========================================================================
/**
 * MY FIRST ASYNC I/O! (Exercise 4 of 13):
 * Write a program that uses a single asynchronous filesystem operation to
 * read a file and print the number of newlines it contains to the console
 * (stdout), similar to running cat file | wc -l.

  The full path to the file to read will be provided as the first
  command-line argument.
 */

// var fs = require('fs');

// var filePath = process.argv[2];
// var sumLines = 0;

// var countLine = function(err, fileContent) {
//     if (err) return console.error(err);
//     sumLines = fileContent.split('\n').length - 1;
//     console.log(sumLines);
// }

// function readCustomFile() {
//     fs.readFile(filePath, 'utf8', countLine);
// }

// readCustomFile();

/**
 *  Official solution:
 */
// var fs = require('fs')
// var file = process.argv[2]

// fs.readFile(file, function (err, contents) {
//   if (err) {
//     return console.log(err)
//   }
//   // fs.readFile(file, 'utf8', callback) can also be used
//   var lines = contents.toString().split('\n').length - 1
//   console.log(lines)
// })

// =========================================================================
/**
 * FILTERED LS (Exercise 5 of 13):
 * Create a program that prints a list of files in a given directory,
 * filtered by the extension of the files. You will be provided a
 * directory name as the first argument to your program (e.g.
 * '/path/to/dir/') and a file extension to filter by as the second
 * argument.

  For example, if you get 'txt' as the second argument then you will need
  to filter the list to only files that end with .txt. Note that the
  second argument will not come prefixed with a '.'.

  Keep in mind that the first arguments of your program are not the first
  values of the process.argv array, as the first two values are reserved
  for system info by Node.

  The list of files should be printed to the console, one file per line.
  You must use asynchronous I/O.
 */

// var fs = require('fs');
// var path = require('path');

// var dirPath = process.argv[2];
// var fileType = '.' + process.argv[3];

// var readDirContent = function(err, files) {
//     if (err) return console.log(err);

//     files.forEach(function(fileName) {
//         if(path.extname(fileName) === fileType) {
//             console.log(fileName);
//         }
//     })
// }

// fs.readdir(dirPath, 'utf8', readDirContent);

/**
 * Official solution:
 *  var fs = require('fs')
    var path = require('path')

    var folder = process.argv[2]
    var ext = '.' + process.argv[3]

    fs.readdir(folder, function (err, files) {
        if (err) return console.error(err)
        files.forEach(function (file) {
            if (path.extname(file) === ext) {
            console.log(file)
            }
        })
    })
 */

// =========================================================================
/**
 * MAKE IT MODULAR (Exercise 6 of 13):
 * This problem is the same as the previous but introduces the concept of
  modules. You will need to create two files to solve this.

  Create a program that prints a list of files in a given directory,
  filtered by the extension of the files. The first argument is the
  directory name and the second argument is the extension filter. Print
  the list of files (one file per line) to the console. You must use
  asynchronous I/O.

  You must write a module file to do most of the work. The module must
  export a single function that takes three arguments: the directory
  name, the filename extension string and a callback function, in that
  order. The filename extension argument must be the same as what was
  passed to your program. Don't turn it into a RegExp or prefix with "."
  or do anything except pass it to your module where you can do what you
  need to make your filter work.

  The callback function must be called using the idiomatic node(err,
  data) convention. This convention stipulates that unless there's an
  error, the first argument passed to the callback will be null, and the
  second will be your data. In this exercise, the data will be your
  filtered list of files, as an Array. If you receive an error, e.g. from
  your call to  fs.readdir(), the callback must be called with the error,
  and only the error, as the first argument.

  You must not print directly to the console from your module file, only
  from your original program.

  In the case of an error bubbling up to your original program file,
  simply check for it and print an informative message to the console.

  These four things are the contract that your module must follow.

   1. Export a single function that takes exactly the arguments described.
   2. Call the callback exactly once with an error or some data as
      described.
   3. Don't change anything else, like global variables or stdout.
   4. Handle all the errors that may occur and pass them to the callback.

  The benefit of having a contract is that your module can be used by
  anyone who expects this contract. So your module could be used by
  anyone else who does learnyounode, or the verifier, and just work.
 */

// var fs = require('fs');
// var path = require('path');

// module.exports = function(filePath, fileExtention, callback) {
//     var result=[];
//     var extenstion = '.' + fileExtention;
//     var readDirContent = function(err, files) {
//         if (err) return callback(err);

//         files.forEach(function(fileName) {
//             if(path.extname(fileName) === extenstion) {
//                 result.push(fileName)
//             }
//         })

//         return callback(null, result)
//     }

//     fs.readdir(filePath, 'utf8', readDirContent);
// }

/**
 * test.js:
 */
// var printOutFilesName = require('./program');

// var filePath = process.argv[2];
// var fileExtention = process.argv[3];

// var printOutFileName = function(err, filesName) {
//     if (err) {
//         return console.error(err)
//     } else {
//         filesName.forEach(function(fileName) {
//             console.log(fileName)
//         })
//     };
// }

// printOutFilesName(filePath, fileExtention, printOutFileName);

 /**
  * Official solution:
    solution.js:
    var filterFn = require('./solution_filter.js')
    var dir = process.argv[2]
    var filterStr = process.argv[3]

    filterFn(dir, filterStr, function (err, list) {
        if (err) {
            return console.error('There was an error:', err)
        }

        list.forEach(function (file) {
            console.log(file)
        })
    })

    solution_filter.js
    var fs = require('fs')
    var path = require('path')

    module.exports = function (dir, filterStr, callback) {
        fs.readdir(dir, function (err, list) {
            if (err) {
                return callback(err)
            }

            list = list.filter(function (file) {
                return path.extname(file) === '.' + filterStr
            })

            callback(null, list)
        })
    }
  */

// =========================================================================
/**
 * HTTP CLIENT (Exercise 7 of 13):
 * Write a program that performs an HTTP GET request to a URL provided to you
 * as the first command-line argument. Write the String contents of each
 * "data" event from the response to a new line on the console (stdout).
 */

// var http = require('http');
// var endpoint = process.argv[2];

// http.get(endpoint, function(res) {
//     res.on('data', function(content) {
//         console.log(content.toString());
//     })
// }).on('error', function(err) {
//     console.error('Got error: ' + err.message)
// })

/**
 * Official solution:
 *  var http = require('http')
    http.get(process.argv[2], function (response) {
    response.setEncoding('utf8')
    response.on('data', console.log)
    response.on('error', console.error)
    }).on('error', console.error)
 */

// =========================================================================

/**
 * HTTP COLLECT (Exercise 8 of 13):
 * Write a program that performs an HTTP GET request to a URL provided to you
  as the first command-line argument. Collect all data from the server (not
  just the first "data" event) and then write two lines to the console
  (stdout).

  The first line you write should just be an integer representing the number
  of characters received from the server. The second line should contain the
  complete String of characters sent by the server.
 */

// var http = require('http')
// var bl = require('bl')
// var endpoint = process.argv[2]

// http.get(endpoint, function(response) {
//     response.pipe(bl(function(err, data) {
//         if (err) return console.error(err)
//         console.log(data.toString().length)
//         console.log(data.toString())
//     }))
// })

// var http = require('http');
// var bl = require('bl');

// var endpoint = process.argv[2];

// http.get(endpoint, function(res) {
//     res.pipe(bl(function(err, data) {
//         if (err) return console.error(err);
//         data = data.toString();
//         console.log(data.length)
//         console.log(data);
//     }))
// }).on('error', console.error)

/**
 * example from net:
 */
// var http = require('http');
// var url = process.argv[2];
// http.get(url,function(res){
//     var body = '';
//     res.on('error',function(err){
//         console.error(err);
//     })
//     res.on('data',function(chunk){
//         body += chunk.toString();
//     });
//     res.on('end',function(){
//         console.log(body.length);
//         console.log(body);
//     });
// });

/**
 * Official solution:
 */
// var http = require('http')
// var bl = require('bl')

// http.get(process.argv[2], function (response) {
//     response.pipe(bl(function (err, data) {
//     if (err) {
//         return console.error(err)
//     }
//     data = data.toString()
//     console.log(data.length)
//     console.log(data)
//     }))
// })

// =========================================================================
/**
 * JUGGLING ASYNC (Exercise 9 of 13):
 * This problem is the same as the previous problem (HTTP COLLECT) in that
  you need to use http.get(). However, this time you will be provided with
  three URLs as the first three command-line arguments.

  You must collect the complete content provided to you by each of the URLs
  and print it to the console (stdout). You don't need to print out the
  length, just the data as a String; one line per URL. The catch is that you
  must print them out in the same order as the URLs are provided to you as
  command-line arguments.
 */

// var http = require('http')
// var bl = require('bl')

// var endpoints = process.argv.slice(2);
// var count = 0;
// var results = [];

// function getData(index) {
//     http.get(endpoints[index], function(response) {
//         response.pipe(bl(function(err, data) {
//             if (err) return console.error(err)
//             results[index] = data.toString()
//             count += 1

//             if (count === endpoints.length) {
//                 printResults(results);
//             }
//         }))
//     })
// }

// function printResults(results) {
//     for (var i = 0; i < results.length; i += 1) {
//         console.log(results[i])
//     }
// }

// for (var j = 0; j < endpoints.length; j += 1) {
//     getData(j)
// }


// var http = require('http');
// var bl = require('bl');

// var processArgvs = process.argv;
// var responses = [];
// var count = 0;
// var urls = [];

// if (processArgvs.length < 2) return console.error('missing endpoint');

// for ( var i = 2; i < processArgvs.length; i += 1) {
//     urls.push(processArgvs[i]);
// }

// function readResponse(index) {
//     http.get(urls[index], function(res) {
//         res.pipe(bl(function(err, data) {
//             if (err) return console.error(err);
//             responses[index] = data.toString();
//             count += 1;

//             if (count === urls.length) {
//                 responses.forEach(function(res) {
//                     console.log(res);
//                 })
//             }
//         }))
//     }).on('error', console.error)
// }

// for ( var i = 0; i < urls.length; i += 1) {
//     readResponse(i);
// }

/**
 * example from net:
 * https://stackoverflow.com/questions/34352459/how-to-count-callbacks
 */

/**
 * Official solution:
 */
// var http = require('http')
//     var bl = require('bl')
//     var results = []
//     var count = 0

// function printResults () {
//     for (var i = 0; i < 3; i++) {
//     console.log(results[i])
//     }
// }

// function httpGet (index) {
//     http.get(process.argv[2 + index], function (response) {
//     response.pipe(bl(function (err, data) {
//         if (err) {
//         return console.error(err)
//         }

//         results[index] = data.toString()
//         count++

//         if (count === 3) {
//         printResults()
//         }
//     }))
//     })
// }

// for (var i = 0; i < 3; i++) {
//     httpGet(i)
// }

// =========================================================================
/**
 * TIME SERVER (Exercise 10 of 13):
 * Write a TCP time server!

  Your server should listen to TCP connections on the port provided by the
  first argument to your program. For each connection you must write the
  current date & 24 hour time in the format:

     "YYYY-MM-DD hh:mm"

  followed by a newline character. Month, day, hour and minute must be
  zero-filled to 2 integers. For example:

     "2013-07-06 17:42"

  After sending the string, close the connection.
 */

 /**
  * note:
  using brew to install 'netcat'
  check if port is up: netstat -an | grep 8888
  using 'netcat' to connect to server: netcat 127.0.0.1 8888
  trick how to format date: https://stackoverflow.com/questions/3605214/javascript-add-leading-zeroes-to-date
  */


// var net = require('net')
// var port = process.argv[2]
// var server = net.createServer(function(socket) {
//     var MyDate = new Date();
//     var MyDateString = '';

//     MyDateString =  MyDate.getFullYear() + '-'
//                 + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-'
//                 + ('0' + MyDate.getDate()).slice(-2) + ' '
//                 + MyDate.getHours() + ':'
//                 + MyDate.getMinutes()
//     socket.write(MyDateString)
//     socket.end('\n')
// })

// server.listen(port)

// var net = require('net');
// var date = new Date();

// var month = ('0' + (date.getMonth()+1)).slice(-2);
// var day = ('0' + date.getDate()).slice(-2);

// var dateformat = [date.getFullYear(), month, day].join('-')
//     + ' '
//     + [date.getHours(), date.getMinutes()].join(':');

// var port = process.argv[2];
// var server = net.createServer(function(socket) {
//     socket.write(dateformat);
//     socket.end('\n');
// })
// server.listen(port);

/**
 * Official solution:
 */
// var net = require('net')

//     function zeroFill (i) {
//     return (i < 10 ? '0' : '') + i
// }

// function now () {
//     var d = new Date()
//     return d.getFullYear() + '-' +
//     zeroFill(d.getMonth() + 1) + '-' +
//     zeroFill(d.getDate()) + ' ' +
//     zeroFill(d.getHours()) + ':' +
//     zeroFill(d.getMinutes())
// }

// var server = net.createServer(function (socket) {
//     socket.end(now() + '\n')
// })

// server.listen(Number(process.argv[2]))

// =========================================================================
/**
 * HTTP FILE SERVER (Exercise 11 of 13):
 * Write an HTTP server that serves the same text file for each request it
  receives.

  Your server should listen on the port provided by the first argument to
  your program.

  You will be provided with the location of the file to serve as the second
  command-line argument. You must use the fs.createReadStream() method to
  stream the file contents to the response.
 */

 /**
  * materials:
  better understanding module 'fs.createReadStream':
  https://docs.nodejitsu.com/articles/advanced/streams/how-to-use-fs-create-read-stream/
  */

/**
 * 07/05/2018:
 */
// var http = require('http')
// var fs = require('fs')
// var port = process.argv[2]
// var fileLocation = process.argv[3]

// var server = http.createServer(function(request, response) {
//     var readStream = fs.createReadStream(fileLocation)
//     readStream.on('open', function () {
//         readStream.pipe(response);
//     });

//     readStream.on('error', function(err) {
//         res.end(err);
//     });
// })

// server.listen(port)

// var http = require('http');
// var fs = require('fs');

// var port = process.argv[2];
// var filePath = process.argv[3];

// var server = http.createServer(function(req, res) {
//     //request handle logic...
//     var readStream = fs.createReadStream(filePath);

//     readStream.on('open', function() {
//         readStream.pipe(res);
//     });

//     readStream.on('error', function(err) {
//         res.end(err);
//     })
//  })

// server.listen(port);

/**
 * Official solution:
 */

// var http = require('http')
// var fs = require('fs')

// var server = http.createServer(function (req, res) {
//     res.writeHead(200, { 'content-type': 'text/plain' })

//     fs.createReadStream(process.argv[3]).pipe(res)
// })

// server.listen(Number(process.argv[2]))


/**
 * note:
 * use Number method to convert the port number;
 * read below to see more about pipe
 * https://www.naeemrana.com/node-js/node-js-streams-pipe-and-chaining/
 * https://docs.nodejitsu.com/articles/advanced/streams/how-to-use-stream-pipe/
 */

 // =========================================================================
/**
 * HTTP UPPERCASERER (Exercise 12 of 13):
 * Write an HTTP server that receives only POST requests and converts
  incoming POST body characters to upper-case and returns it to the client.

  Your server should listen on the port provided by the first argument to
  your program.
 */

/**
 * 07/05/2018:
 */

// var http = require('http')
// var bl = require('bl')
// var map = require('through2-map')
// var port = process.argv[2]

// var server = http.createServer(function(req, res) {
//     if (req.method === 'POST') {
//         var transform = map(function(data) {
//             return data.toString().toUpperCase()
//         })

//         /**
//          * solution 1:
//          */
//         req.pipe(transform).pipe(res)

//         /**
//          * solution 2:
//          */
//         req.pipe(bl(function(err, data) {
//             if (err) return console.error(err)
//             res.end(data.toString().toUpperCase())
//         }))
//     }
// })

// server.listen(port)

/**
 * first solution:
 * /

// var http = require('http');
// var map = require('through2-map');
// var bl = require('bl');

// var port = process.argv[2];

// var server = http.createServer(function(req, res) {
//     res.writeHead(200, { 'content-type': 'text/plain'});
//     req.pipe(bl(function(err, data) {
//         if (err) return console.error(err);
//         var body = data.toString().toUpperCase();
//         res.end(body);
//     }))
// })

// server.listen(port);

/**
 * Official solution:
 */
// var http = require('http')
// var map = require('through2-map')

// var server = http.createServer(function (req, res) {
//     if (req.method !== 'POST') {
//     return res.end('send me a POST\n')
//     }

//     req.pipe(map(function (chunk) {
//     return chunk.toString().toUpperCase()
//     })).pipe(res)
// })

// server.listen(Number(process.argv[2]))

/**
 * note:
 * missing feature in the solution:
 * => only expect only 'POST' request
 * => try to understand more 'pipe' and implement it into your solution
 * => try to use the recommended npm package = 'through2-map'
 */

  // =========================================================================
  /**
   * HTTP JSON API SERVER (Exercise 13 of 13):
   * Write an HTTP server that serves JSON data when it receives a GET request
  to the path '/api/parsetime'. Expect the request to contain a query string
  with a key 'iso' and an ISO-format time as the value.

  For example:

  /api/parsetime?iso=2013-08-10T12:10:15.474Z

  The JSON response should contain only 'hour', 'minute' and 'second'
  properties. For example:

     {
       "hour": 14,
       "minute": 23,
       "second": 15
     }

  Add second endpoint for the path '/api/unixtime' which accepts the same
  query string but returns UNIX epoch time in milliseconds (the number of
  milliseconds since 1 Jan 1970 00:00:00 UTC) under the property 'unixtime'.
  For example:

     { "unixtime": 1376136615474 }

  Your server should listen on the port provided by the first argument to
  your program.
   */

/**
 * 08/05/2018:
 */
// var http = require('http')
// var url = require('url')
// var port = process.argv[2]

// var server = http.createServer(function(request, response) {
//     response.writeHead(200, { 'Content-Type': 'application/json' })
//     var pathname = url.parse(request.url, true).pathname
//     var query = url.parse(request.url, true).query
//     var date = new Date(query.iso)
//     var result = {}
//     if (pathname === '/api/parsetime') {
//         result['hour'] = date.getHours()
//         result['minute'] = date.getMinutes()
//         result['second'] = date.getSeconds()
//     }

//     if (pathname === '/api/unixtime') {
//         result['unixtime'] = date.getTime()
//     }
//     response.end(JSON.stringify(result))
// })

// server.listen(port)

/**
 * first solution:
 */
// var url = require('url');
// var http = require('http');
// var bl = require('bl');

// var port = process.argv[2];

// var server = http.createServer(function(req, res) {
//     if (req.method !== 'GET') {
//         return res.end('send me a GET REQUEST\n');
//     }
//     res.writeHead(200, {'content-type': 'text/plain'});

//     req.pipe(bl(function(error, data){
//         if (error) console.error(error);
//         var parsedUrl = url.parse(req.url, true);
//         var parsedQuery = parsedUrl.query;
//         var date = new Date(parsedQuery.iso);
//         var response;

//         if(parsedUrl.pathname === '/api/parsetime') {
//             response = {
//                 hour: date.getHours(),
//                 minute: date.getMinutes(),
//                 second: date.getSeconds()

//             }
//         }

//         if(parsedUrl.pathname === '/api/unixtime') {
//             response = {
//                 unixtime: date.getTime()
//             }
//         }

//         res.end(JSON.stringify(response));
//     }));
// })

// server.listen(port);
