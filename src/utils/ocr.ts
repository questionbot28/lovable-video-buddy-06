
import { createWorker } from 'tesseract.js';

/**
 * Extract text from an image using Tesseract OCR
 */
export const extractTextFromImage = async (imageFile: File): Promise<string> => {
  try {
    console.log("Starting OCR processing for", imageFile.name);
    
    // Create a worker
    const worker = await createWorker('eng');
    
    // Convert File to data URL for Tesseract
    const imageDataUrl = await fileToDataUrl(imageFile);
    
    // Recognize text
    const { data } = await worker.recognize(imageDataUrl);
    
    // Terminate worker
    await worker.terminate();
    
    console.log("OCR processing complete. Extracted text length:", data.text.length);
    
    return data.text.trim() || "No text could be extracted from this image";
  } catch (error) {
    console.error("OCR processing error:", error);
    return "Error: Could not process image for text extraction";
  }
};

/**
 * Converts a File object to a data URL
 */
const fileToDataUrl = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};
