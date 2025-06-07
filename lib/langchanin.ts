/*import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(pdfurl: string) {
const resposne=await fetch(pdfurl);
const blob =await resposne.blob();

const arrayBuffer=await blob.arrayBuffer();
const loader = new PDFLoader(new Blob([arrayBuffer]));
const docs=await loader.load();

return docs.map(doc => doc.pageContent).join("\n");
}*/
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(pdfurl: string) {
    try {
        console.log('Fetching PDF from URL:', pdfurl);
        
        // Fix the typo: resposne -> response
        const response = await fetch(pdfurl);
        
        // Check if fetch was successful
        if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
        }
        
        console.log('PDF fetched successfully, content-type:', response.headers.get('content-type'));
        
        // Get the blob directly (no need for arrayBuffer conversion)
        const blob = await response.blob();
        
        console.log('Blob size:', blob.size, 'bytes');
        
        if (blob.size === 0) {
            throw new Error('Downloaded PDF is empty');
        }
        
        // Create PDFLoader with the blob
        const loader = new PDFLoader(blob);
        
        console.log('Loading PDF with LangChain...');
        const docs = await loader.load();
        
        console.log('PDF loaded, pages found:', docs.length);
        
        if (docs.length === 0) {
            throw new Error('No content found in PDF');
        }
        
        // Extract text from all pages
        const extractedText = docs.map(doc => doc.pageContent).join("\n");
        
        console.log('Text extracted, length:', extractedText.length);
        
        if (extractedText.trim().length === 0) {
            throw new Error('PDF contains no readable text');
        }
        
        return extractedText;
        
    } catch (error) {
        console.error('Error in fetchAndExtractPdfText:', error);
        throw error; // Re-throw the error so it can be caught by the calling function
    }
}