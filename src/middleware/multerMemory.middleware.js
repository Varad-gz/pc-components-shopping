const multer = require("multer");
const path = require('path');
const fs = require('fs').promises;
const { v4: uuidv4 } = require('uuid');
const { deleteFolderorInsertDb } = require("../utils/deleteUnnecessayUploads");

const createFileUploadMiddleware = (fieldName, maxCount, fileSizeLimit) => {
    return (req, res, next) => {
        const folderName = uuidv4();
        const folderPath = path.join('D:', 'TYBBACA Ecommerce Project', 'find_comp_components', 'public', 'images', 'uploads', folderName);

        const storage = multer.diskStorage({
            destination: async (req, file, cb) => {
                try {
                    await fs.access(folderPath);
                } catch (error) {
                    await fs.mkdir(folderPath, { recursive: true });
                }
                req.body.folderpath = folderPath;

                cb(null, folderPath);
            },
            filename: (req, file, cb) => {
                try {
                    const uniqueFilename = uuidv4();
                    const fileExtension = path.extname(file.originalname);
                    const fullFilename = `${uniqueFilename}${fileExtension}`;
                    cb(null, fullFilename);
                } catch (err) {
                    cb(err);
                }
            },
        });

        const fileFilter = (req, file, cb) => {
            const allowedExtensions = ['.jpg', '.jpeg', '.png'];
            const extname = path.extname(file.originalname).toLowerCase();
            if (allowedExtensions.includes(extname)) {
                cb(null, true);
            } else {
                cb(new Error(`Invalid file extension. Allowed extensions: ${allowedExtensions.join(', ')}`), false);
            }
        };

        const upload = multer({ storage: storage, limits: { fileSize: fileSizeLimit }, fileFilter: fileFilter});

        upload.array(fieldName, maxCount)(req, res, async (err) => {
            if(err) {
                try {
                    await deleteFolderorInsertDb(folderPath)
                } catch (deleteError) {
                    req.flash('alertWithButton', `Process Failed!!`);
                    res.redirect('back');
                }
                if (err.code === 'LIMIT_UNEXPECTED_FILE') {
                    req.flash('alertWithButton', `Too many files. Maximum allowed: ${maxCount}`);
                } else {
                    req.flash('alertWithButton', ['Error during file upload:', `${err.message}`]);
                }
                res.redirect('back');
            } else {
                next();
            }
        })
    };
};

module.exports = {
    createFileUploadMiddleware
};