import React, { useState, ChangeEvent, FormEvent } from 'react';
import { uploadTasks } from '../../services/task.service';
import { UploadCloud, File, X } from 'lucide-react';

interface FileUploadProps {
  setToast: React.Dispatch<React.SetStateAction<{ message: string; type: 'success' | 'error' } | null>>;
}

const FileUpload: React.FC <FileUploadProps>= ({setToast }) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError('Please select a file');
      return;
    }
    try {
      await uploadTasks(file);
      setToast({ message: 'File uploaded successfully!', type: 'success' });
      setFile(null);
    } catch {
      setError('Failed to upload tasks');
      setToast({ message: 'File not upload ', type: 'error' });
    }
  };

  return (
   
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-600 transition-colors">
        <label className="cursor-pointer">
          <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-600">
            <span className="text-indigo-600 font-medium">Click to upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">CSV, XLSX up to 10MB</p>
          <input
            type="file"
            accept=".csv,.xlsx,.xls"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>

      {file && (
        <div className="bg-gray-50 p-3 rounded-md flex items-center justify-between">
          <div className="flex items-center">
            <File className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-sm">{file.name}</span>
          </div>
          <button
            type="button"
            onClick={() => setFile(null)}
            className="text-gray-400 hover:text-red-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center"
        disabled={!file}
      >
        <UploadCloud className="h-5 w-5 mr-2" />
        Upload Tasks
      </button>
    </form>



  );
};

export default FileUpload;