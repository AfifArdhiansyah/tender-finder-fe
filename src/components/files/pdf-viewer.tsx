
"use client";

interface PdfViewerProps {
  url: string;
  height?: string;
}

const PdfViewer = ({ url, height }: PdfViewerProps) => {
  return (
    <iframe 
    src={url}
    width="100%"
    height={height || "600px"}
    loading="lazy"
    title="PDF-file"
    ></iframe>
  );
};
export default PdfViewer;