// utils/fileUpload.ts
import multer from 'multer';
import path from 'path';
const storage = multer.diskStorage({
    destination: '/tmp',
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}-${file.fieldname}${ext}`);
    },
});
export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowed = ['.csv', '.xlsx', '.xls'];
        const ext = path.extname(file.originalname).toLowerCase();
        if (allowed.includes(ext))
            cb(null, true);
        else
            cb(new Error('Only CSV, XLSX, and XLS files are allowed'));
    },
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
});
