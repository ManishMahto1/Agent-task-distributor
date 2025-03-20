// utils/parseFile.ts
import csvParser from 'csv-parser';
import fs from 'fs';
import xlsx from 'xlsx';
import path from 'path';
export const parseFile = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    return new Promise((resolve, reject) => {
        if (ext === '.csv') {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csvParser())
                .on('data', (data) => results.push(data))
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        }
        else if (ext === '.xlsx' || ext === '.xls') {
            try {
                const workbook = xlsx.readFile(filePath);
                const sheet = workbook.Sheets[workbook.SheetNames[0]];
                const data = xlsx.utils.sheet_to_json(sheet);
                resolve(data);
            }
            catch (err) {
                reject(err);
            }
        }
        else {
            reject(new Error('Unsupported file format'));
        }
    });
};
