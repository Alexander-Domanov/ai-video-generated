import {
    GoogleGenAI,
} from '@google/genai';

let defaultMessage = "Create a 30 second long ADVENTURE STORY video script. Include AI ImagePrompts in Fantasy Format for each scene in realistic format. Provide the result in JSON format with 'imagePrompt' and 'textContent' fields."

export async function createVideoAi(message: string = defaultMessage) {

    // const ai = new GoogleGenAI({
    //     apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
    // });
    // const config = {
    //     responseMimeType: 'text/plain',
    // };
    // const model = 'gemini-1.5-flash';
    // const contents = [
    //     {
    //         role: 'user',
    //         parts: [
    //             {
    //                 text: message,
    //             },
    //         ],
    //     },
    // ];
    //
    // const response = await ai.models.generateContentStream({
    //     model,
    //     config,
    //     contents,
    // });
    //
    // let fullText = '';
    //
    // for await (const chunk of response) {
    //     fullText += chunk.text;
    // }
    //
    // const cleanedResponse = fullText
    //     .replace(/```json/g, '')
    //     .replace(/```/g, '')
    //     .trim();

    // let jsonResponse;
    let jsonResponse = [
        {
            imagePrompt: 'A dimly lit, gothic-style bookstore overflowing wi…y detailed, 8k resolution, trending on artstation',
            textContent: '(Scene opens with a sweeping shot of the Thriller …carier than the books is what they might unleash.'
        },

        {
            imagePrompt: 'A close-up on a weathered hand reaching for a book…intense shadows, detailed textures, octane render',
            textContent: "(Close-up on a customer's hand reaching for a book.  Suspenseful music intensifies.)"
        },

        {
            imagePrompt: 'A shadowy figure lurking in the aisles between tow…nematic lighting, artgerm style, digital painting',
            textContent: '(Quick shot of a shadowy figure. Music builds to a crescendo.)'
        },

        {
            imagePrompt: 'A young woman with wide eyes, clutching a book to …lur,  dramatic lighting, cinematic, 8k resolution',
            textContent: '(A young woman flees, terrified. Music reaches its peak.)'
        },


        {
            imagePrompt: 'The Thriller Store logo – a stylized skull with a …article effects,  cinematic, Greg Rutkowski style',
            textContent: '(The Thriller Store logo appears. Music fades.) Thriller Store. Dare to enter.'
        }

    ]

    try {
        // jsonResponse = JSON.parse(cleanedResponse);
        console.log('✅ Parsed JSON:', jsonResponse);
        return {
            success: true,
            data: jsonResponse
        }
    } catch (error) {
        console.error('❌ Failed to parse JSON:');
        // console.error(cleanedResponse);
        console.error(error);
    }
}

