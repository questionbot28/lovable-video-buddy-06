
import { createWorker, PSM } from 'tesseract.js';

interface OCROptions {
  language?: string;
  preprocessing?: boolean;
}

/**
 * Extract text from an image using enhanced Tesseract OCR
 * with support for multiple languages and preprocessing
 */
export const extractTextFromImage = async (
  imageFile: File, 
  options: OCROptions = {}
): Promise<string> => {
  try {
    console.log("Starting OCR processing for", imageFile.name);
    
    const language = options.language || 'eng';
    console.log(`Using language: ${language}`);
    
    // Create a worker with specified language
    const worker = await createWorker(language);
    
    // Set Page Segmentation Mode to automatic
    await worker.setParameters({
      tessedit_pageseg_mode: PSM.AUTO,
    });
    
    // Convert File to data URL for Tesseract
    let imageDataUrl = await fileToDataUrl(imageFile);
    
    // Apply preprocessing if enabled
    if (options.preprocessing) {
      console.log("Applying image preprocessing for better OCR results");
      imageDataUrl = await preprocessImage(imageDataUrl);
    }
    
    // Recognize text
    const { data } = await worker.recognize(imageDataUrl);
    
    // Calculate confidence
    const confidence = data.confidence;
    console.log(`OCR confidence: ${confidence}%`);
    
    // Terminate worker
    await worker.terminate();
    
    console.log("OCR processing complete. Extracted text length:", data.text.length);
    
    if (data.text.trim().length === 0) {
      return "No text could be extracted from this image. The image may not contain text, or the text may be too difficult to recognize.";
    }
    
    return data.text.trim();
  } catch (error) {
    console.error("OCR processing error:", error);
    return "Error: Could not process image for text extraction. Please try again with a clearer image.";
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

/**
 * Preprocesses an image to improve OCR results
 * Applies basic image processing directly in the browser
 */
const preprocessImage = async (dataUrl: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          console.error("Failed to get canvas context");
          resolve(dataUrl); // Return original if processing fails
          return;
        }
        
        // Set canvas size to match image
        canvas.width = img.width;
        canvas.height = img.height;
        
        // Draw image to canvas
        ctx.drawImage(img, 0, 0);
        
        // Get image data for processing
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Apply grayscale and contrast enhancement
        for (let i = 0; i < data.length; i += 4) {
          // Convert to grayscale
          const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
          
          // Apply contrast enhancement
          const contrast = 1.5; // Increase contrast
          const factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
          const newValue = factor * (gray - 128) + 128;
          
          // Apply thresholding for better text extraction
          const threshold = 128;
          const finalValue = newValue > threshold ? 255 : 0;
          
          data[i] = data[i + 1] = data[i + 2] = finalValue;
        }
        
        // Put processed data back on canvas
        ctx.putImageData(imageData, 0, 0);
        
        // Convert canvas to data URL
        resolve(canvas.toDataURL('image/png'));
      };
      
      img.onerror = () => {
        console.error("Error loading image for preprocessing");
        resolve(dataUrl); // Return original if processing fails
      };
      
      img.src = dataUrl;
    } catch (error) {
      console.error("Image preprocessing error:", error);
      resolve(dataUrl); // Return original if processing fails
    }
  });
};
