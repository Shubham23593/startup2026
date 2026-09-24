import { GoogleGenerativeAI } from '@google/generative-ai';

// Free Gemini API - 60 req/min free
const genAI = new GoogleGenerativeAI('YOUR_GEMINI_API_KEY');

export async function extractDeadlineFromScreenshot(base64Image: string) {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  const prompt = "Extract Title, Date, Time, Venue from this screenshot. Return JSON: {title, date, time, venue}";
  const result = await model.generateContent([prompt, { inlineData: { data: base64Image, mimeType: 'image/jpeg' } }]);
  return result.response.text();
}

export async function detectClash(events: any[]) {
  // AI logic to detect deadline clash
  return events.filter((e,i) => events.some((o,j) => i!==j && Math.abs(o.deadline - e.deadline) < 24*60*60*1000));
}
