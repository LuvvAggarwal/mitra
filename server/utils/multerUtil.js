const multer = require('multer');
const path = require("path");
const { v4 } = require('uuid');
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const accessKeyId = process.env.S3_accessKeyId;
const secretAccessKey = process.env.S3_secretAccessKey;
const bucket = process.env.S3_bucket
const s3 = new aws.S3({
    accessKeyId,
    secretAccessKey,
});

const storage = multer.diskStorage({
    destination: '../front2/public/files',
    onFileUploadStart: function (file) {
        // console.log(file.fieldname + ' is starting ...')
    },
    onFileUploadData: function (file, data) {
        // console.log(data.length + ' of ' + file.fieldname + ' arrived')
    },
    onFileUploadComplete: function (file) {
        // console.log(file.fieldname + ' uploaded to  ' + file.path)
    },
    filename: function (req, file, cb) {
        const id = v4()
        // console.log(id);
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, id + '_' + file.fieldname + ext);
    }
});


const storageS3 = multerS3({
    s3: s3,
    bucket: bucket,
    acl: "public-read",
    metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, "files/" + v4() + ext);
    },
});

// Init Upload
const uploadIamge = multer({
    storage: storageS3,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        // console.log("uploading");
        checkImage(file, cb);
    }
});

const upload = multer({
    storage: storageS3,
    limits: { fileSize: 10000000 },
    fileFilter: function (req, file, cb) {
        // console.log("uploading");
        checkFileType(file, cb);
    }
});

// Check File Type
function checkImage(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    // console.log("checking");
    if (mimetype && extname) {
        // console.log("creating image");
        return cb(null, true);
    } else {
        cb('Error: Images Only!');

    }
}

function checkFileType(file, cb) {
    // Allowed ext
    const filetypes = /jpeg|jpg|png|gif|mkv|mp4|pdf|xlsx|docx/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images,Videos,Documents and Excel only!');
    }
}

module.exports = { upload, uploadIamge }