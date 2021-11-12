// JAI SIYARAM
const fs = require('fs');
module.exports = {
    crf : function (path, fileName, message) {
        const stream = fs.createWriteStream(path + fileName);
        stream.once('open', function (fd) {
            stream.write(message);
            stream.end();
        });

    },

    rwf : function (path, fileName, message) {
        fs.writeFile(path + fileName, message, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("The file was saved!");
            }
        });
    },

    wrf : function (path, fileName, message) {
        fs.appendFile(path + fileName, message, function (err) {
            if (err) throw err;
            console.log("successfully the message has been added to the file");
        });
    },

    dlf : function (path, fileName) {

        fs.unlink(path + fileName, function (err) {
            if (err) throw err;
            console.log('successfully deleted the file');
        });
    },

    rnf : function (path, oldFileName, newFileName) {
        fs.rename(path + oldFileName, path + newFileName, function (err) {
            if (err) throw err;
            console.log('successfully renamed the file');
        });
    },

    rdf : function (path, fileName) {
        fs.readFile(path + fileName, 'UTF-8', function (err, content) {
            if (err) throw err;
            console.log(content);
        })
    },

    cof : function (oldPath, fileName, newPath) {
        fs.readFile(oldPath + fileName, 'UTF-8', function (err, content) {
            if (err) throw err;
            crf(newPath, fileName, content);
        })
    },

    mef : function (oldPath, fileName, newPath) {
        fs.readFile(oldPath + fileName, 'UTF-8', function (err, content) {
            if (err) throw err;
            crf(newPath, fileName, content);
            dlf(oldPath, fileName);
        })
    }

}


// exports.createFile = crf; 
// exports.rewriteFile = rwf;
// exports.writeFile = wrf;
// exports.deleteFile = dlf;
// exports.renameFile = rnf;
// exports.readFile = rdf;
// exports.copyFile = cof;
// exports.moveFile = mef;
