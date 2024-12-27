import React, { useCallback, useState } from "react";
import { IoMdCloudUpload } from "react-icons/io";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  label?: string;
  placeholder?: string;
  onlyPdf?: boolean;
  onlyImage?: boolean;
}

export default function FileUpload(props: FileUploadProps){
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const files = e.dataTransfer.files;
      if (files && files[0]) {
        const file = files[0];
        setUploadedFile(file); // Set uploaded file
        props.onFileUpload(files[0]);
      }
    },
    [props.onFileUpload]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
        const file = files[0];
        setUploadedFile(file);
        props.onFileUpload(files[0]);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg flex flex-col items-center justify-center w-full h-30 p-4 ${
        isDragging ? "border-blue-400 bg-blue-50" : "border-gray-300"
      }`}
      onDragEnter={handleDragEnter}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        id="fileInput"
        type="file"
        className="hidden"
        accept={props.onlyPdf ? ".pdf" : props.onlyImage ? "image/*" : "*"}
        onChange={handleFileChange}
      />
      {uploadedFile ? (
        <label className="text-center">
          <p className="text-gray-400 font-medium">
            File uploaded: <span className="text-blue-500">{uploadedFile.name}</span>
          </p>
        </label>
      ) : (
        <label
            htmlFor="fileInput"
            className="flex flex-col items-center justify-center cursor-pointer"
        >
            <div className="text-blue-500">
                <IoMdCloudUpload size={30} />
            </div>
            <p className="mt-2 text-blue-500 font-semibold">{props.label}</p>
            <p className="text-gray-400">{props.placeholder}</p>
        </label>
      )}
    </div>
  );
};
