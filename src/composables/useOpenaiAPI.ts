import { OpenAI } from 'openai';

const OPENAI_API_KEY = '';

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

const openingPrompt = `
You are EssayMarker. An AI model that can grade essays and ONLY reply in JSON (Template will be given to you after).
---`;
const ieltsJsonFormatPrompt = `
The following is a JSON format template.
---
{"TR": 0,"CC": 0,"LR": 0,"GRA": 0,"comment": "overall comment here"}
---
A JSON format template is provided above.
Replace all the placeholders with proper contents.
Comments: Comments should incorporate the content of the essay, not simply generalize it.
Score should be an integer between 1 and 9. Strictly follow the marking criteria to grade the essay. Always give integer scores and no decimals.
Comment should be around 100 words.
---
Now, follow the upcoming instructions to grade the essay.`;
const jsonFormatPrompt = `
The following is a JSON format template.
---
{"grade": "A","comment": "overall comment here"}
---
A JSON format template is provided above.
Replace all the placeholders with proper contents.
Comments: Comments should incorporate the content of the essay, not simply generalize it.
Grade options: A+, A, B+, B, C+, C, F, where A signifies an excellent essay and F indicates a failing grade.
Comment should be around 150 words.
---
Now, follow the upcoming instructions to grade the essay.
`;
const userMessagePrompt = (essay: string) => `
essay content:
${essay}`;
const ieltsTopicPrompt = (topic: string) => `
The topic of this essay is: ${topic}
If the essay is off-topic, it should be given an extremely low score and you must mention it in the overall comment.`;

const personalInfoPrompt = (name: string, customInfo: string) => `
---
You will be grading ${name}'s essay, so please use a friendly tone. Below is a personal addtitonal info of ${name}, please consider the additional info in your comment. 
${customInfo}
In your comment, start with a friendly greeting.
Now, according to the scoring criteria and the personal info, grade the essay above.
`;

async function openaiRequest(requirement: string, essay: string, ieltsTopic: string, name: string, customInfo: string) {
    let systemPrompt;
    let contentPrompt;

    if (ieltsTopic != '') {
        systemPrompt = openingPrompt + personalInfoPrompt(name, customInfo) + requirement + ieltsJsonFormatPrompt;
        contentPrompt = userMessagePrompt(essay) + ieltsTopicPrompt(ieltsTopic);
    } else {
        systemPrompt = openingPrompt + personalInfoPrompt(name, customInfo) + requirement + jsonFormatPrompt;
        contentPrompt = userMessagePrompt(essay);
    }

    try {
        const completion = await openai.chat.completions.create({
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: contentPrompt }
            ],
            model: 'gpt-3.5-turbo-1106',
            response_format: { type: 'json_object' }
        });

        console.log(completion.choices[0].message.content);
        return completion.choices[0].message.content;
    } catch (err) {
        console.error(err);
    }
}

export default openaiRequest;
