const fs = require('fs');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;

const analyzeResume = async (filePath) => {
    if (!genAI) {
        if (!process.env.GEMINI_API_KEY) {
            console.error("GEMINI_API_KEY is missing from environment variables.");
            return {
                text: "Error: AI configuration missing.",
                skills: ['Analysis failed'],
                score: 0,
                summary: "Automatic analysis failed. GEMINI_API_KEY is not configured."
            };
        }
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        const text = data.text;

        const prompt = `
            Analyze the following resume text and provide a structured JSON response.
            The JSON should have these fields:
            - skills: Array of top technical skills found (max 10).
            - score: An overall score from 0-100 based on resume quality and impact.
            - summary: A 2-sentence professional summary for the candidate.

            Resume Text:
            ${text}

            Respond ONLY with the JSON object.
        `;

        const modelsToTry = ["gemini-flash-latest", "gemini-1.5-flash", "gemini-2.0-flash"];
        let result;
        let lastError;

        for (const modelName of modelsToTry) {
            try {
                console.log(`Attempting analysis with model: ${modelName}`);
                const model = genAI.getGenerativeModel({ model: modelName });
                result = await model.generateContent(prompt);
                if (result) break;
            } catch (e) {
                lastError = e;
                console.warn(`Model ${modelName} failed or not found. trying next...`);
                if (e.status !== 404 && !e.message?.includes('404')) {
                    throw e; // Rethrow if it's not a 404
                }
            }
        }

        if (!result) throw lastError;

        const response = await result.response;
        const resultText = response.text();

        // Parse JSON from response
        const jsonMatch = resultText.match(/\{[\s\S]*\}/);
        const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : {};

        return {
            text: text.substring(0, 1000) + "...",
            skills: analysis.skills || ['Not detected'],
            score: analysis.score || 0,
            summary: analysis.summary || "AI analysis failed to generate a summary."
        };
    } catch (error) {
        console.error("AI Analysis Error Detail:", error);

        let errorMessage = "Automatic analysis failed due to a server error.";
        if (error.status === 403 || error.message?.includes('403')) {
            errorMessage = "AI Analysis Error: API Key is invalid or blocked. Please check your GEMINI_API_KEY.";
        } else if (error.status === 404 || error.message?.includes('404')) {
            errorMessage = "AI Analysis Error: Model not found or API endpoint invalid.";
        }

        return {
            text: "Error processing resume content.",
            skills: ['Analysis failed'],
            score: 0,
            summary: errorMessage
        };
    }
};

module.exports = { analyzeResume };
