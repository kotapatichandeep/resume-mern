const fs = require('fs');
const pdf = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');

let genAI;

const analyzeResume = async (filePath) => {
    if (!genAI) {
        genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    }
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdf(dataBuffer);
        const text = data.text;

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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

        const result = await model.generateContent(prompt);
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
        console.error("AI Analysis Error:", error);
        return {
            text: "Error processing resume content.",
            skills: ['Analysis failed'],
            score: 0,
            summary: "Automatic analysis failed due to a server error. Please try again or check the API key."
        };
    }
};

module.exports = { analyzeResume };
