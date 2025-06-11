import {
    GoogleGenAI,
} from '@google/genai';

let defaultMessage = "Create a 30 second long ADVENTURE STORY video script. Include AI ImagePrompts in Fantasy Format for each scene in realistic format. Provide the result in JSON format with 'imagePrompt' and 'textContent' fields."

export async function createVideoAi(message: string = defaultMessage) {

    const ai = new GoogleGenAI({
        apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    });
    const config = {
        responseMimeType: 'text/plain',
    };
    const model = 'gemini-1.5-flash';
    const contents = [
        {
            role: 'user',
            parts: [
                {
                    text: message,
                },
            ],
        },
    ];

    const response = await ai.models.generateContentStream({
        model,
        config,
        contents,
    });

    let fullText = '';

    for await (const chunk of response) {
        fullText += chunk.text;
    }

// Удаляем Markdown блок, если он есть
    const cleanedResponse = fullText
        .replace(/```json/g, '')
        .replace(/```/g, '')
        .trim();

    let jsonResponse;
    try {
        jsonResponse = JSON.parse(cleanedResponse);
        console.log('✅ Parsed JSON:', jsonResponse);
    } catch (error) {
        console.error('❌ Failed to parse JSON:');
        console.error(cleanedResponse);
        console.error(error);
    }
}
