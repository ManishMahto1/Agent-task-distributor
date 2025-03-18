import csvParser from 'csv-parser';
import fs from 'fs';
import { Task } from '../types';

export const parseCSV = (filePath: string): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    const results: Task[] = [];
    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
};