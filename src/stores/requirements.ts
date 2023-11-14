import { defineStore } from 'pinia';

interface Requirement {
    title: string;
    content: string;
}

interface RequirementItem extends Requirement {
    id: number;
}

export const defaultRequirement = `Please read the following essays carefully and evaluate them based on the provided criteria. Assign the essay a grade from A to F, where A signifies an excellent essay and F indicates a failing grade. Evaluate the essays considering the following aspects:
1. Thesis and Argument: Does the essay have a clear and compelling thesis statement? Does the essay present logical and coherent arguments to support its thesis?
2. Organization and Structure: Is the essay well-organized with a clear introduction, body, and conclusion? Does it follow a logical progression of ideas?
3. Evidence and Support: Does the essay provide relevant and credible evidence to back its claims? Are the sources well-integrated and properly cited?
4. Writing Style and Voice: Is the essay's writing style appropriate for the target audience? Does the writer exhibit a distinct and engaging voice?
5. Grammar, Syntax, and Mechanics: Are there any grammatical, spelling, or punctuation errors? Is the syntax varied and does it contribute to the clarity and style of the writing?
6. Originality and Creativity: Does the essay provide a unique perspective on the topic? Does it exhibit original thought and insight?
Provide constructive feedback for each essay, highlighting strengths and areas for improvement. If specific criteria are not met, please explain why and suggest ways the essay could be enhanced to meet those standards. When grading, take into account the overall impact of the essay alongside the individual elements. Your feedback should be balanced, fair, and aimed at helping the writer improve their work.
For example, you can structure your feedback like:
- Positive Feedback: Highlight what the essay does well, referencing specific examples from the text.
- Areas for Improvement: Identify parts of the essay that could be improved, offering specific suggestions on how to address these issues.
- Remarks on Specific Criteria: Give a short commentary about each of the grading criteria, mentioning how well the essay meets each standard.
- Final Comments: Provide a closing thought or piece of advice that guides the writer toward enhancing their essay on the next draft.
Remember to maintain a respectful and encouraging tone throughout your evaluation, ensuring that the writer feels motivated to continue refining their writing skills.`;

const ieltsRequirement = `You are going to grade an IELTS writing task 2 essay. The official band descriptors are below.
---
Task Response

Band 9
- fully addresses all parts of the task
- presents a fully developed position in answer to the question with relevant, fully extended and well supported ideas

Band 8
- sufficiently addresses all parts of the task
- presents a well-developed response to the question with relevant, extended and supported ideas

Band 7
- addresses all parts of the task
- presents a clear position throughout the response
- presents, extends and supports main ideas, but there may be a tendency to overgeneralise and/or supporting ideas may lack focus

Band 6
- addresses all parts of the task although some parts may be more fully covered than others
- presents a relevant position although the conclusions may become unclear or repetitive
- presents relevant main ideas but some may be inadequately developed/unclear

Band 5
- addresses the task only partially; the format may be inappropriate in places
- expresses a position but the development is not always clear and there may be no conclusions drawn
- presents some main ideas but these are limited and not sufficiently developed; there may be irrelevant detail

Band 4
- responds to the task only in a minimal way or the answer is tangential; the format may be inappropriate
- presents a position but this is unclear
- presents some main ideas but these are difficult to identify and may be repetitive, irrelevant or not well supported

Band 3
- does not adequately address any part of the task
- does not express a clear position
- presents few ideas, which are largely undeveloped or irrelevant

Band 2
- barely responds to the task
- does not express a position
- may attempt to present one or two ideas but there is no development

Band 1
- answer is completely unrelated to the task

---

Coherence and Cohesion

Band 9
- uses cohesion in such a way that it attracts no attention
- skilfully manages paragraphing

Band 8
- sequences information and ideas logically
- manages all aspects of cohesion well
- uses paragraphing sufficiently and appropriately

Band 7
- logically organises information and ideas; there is clear progression throughout
- uses a range of cohesive devices appropriately although there may be some under-/over-use
- presents a clear central topic within each paragraph

Band 6
- arranges information and ideas coherently and there is a clear overall progression
- uses cohesive devices effectively, but cohesion within and/or between sentences may be faulty or mechanical
- may not always use referencing clearly or appropriately;
- uses paragraphing, but not always logically

Band 5
- presents information with some organisation but there may be a lack of overall progression
- makes inadequate, inaccurate or over-use of cohesive devices
- may be repetitive because of lack of referencing and substitution
- may not write in paragraphs, or paragraphing may be inadequate

Band 4
- presents information and ideas but these are not arranged coherently and there is no clear progression in the response
- uses some basic cohesive devices but these may be inaccurate or repetitive
- may not write in paragraphs or their use may be confusing

Band 3
- does not organise ideas logically
- may use a very limited range of cohesive devices, and those used may not indicate a logical relationship between ideas

Band 2
- has very little control of organisational features

Band 1
- fails to communicate any message

---

Lexical Resource

Band 9
- uses a wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as 'slips'

Band 8
- uses a wide range of vocabulary fluently and flexibly to convey precise meanings
- skilfully uses uncommon lexical items but there may be occasional inaccuracies in word choice and collocation
- produces rare errors in spelling and/or word formation

Band 7
- uses a sufficient range of vocabulary to allow some flexibility and precision
- uses less common lexical items with some awareness of style and collocation
- may produce occasional errors in word choice, spelling and/or word
formation

Band 6
- uses an adequate range of vocabulary for the task
- attempts to use less common vocabulary but with some inaccuracy
- makes some errors in spelling and/or word formation, but they do not impede communication

Band 5
- uses a limited range of vocabulary, but this is minimally adequate for the task
- may make noticeable errors in spelling and/or word formation that may cause some difficulty for the reader

Band 4
- uses only basic vocabulary which may be used repetitively or which may be inappropriate for the task
- has limited control of word formation and/or spelling; errors may cause strain for the reader

Band 3
- uses only a very limited range of words and expressions with very limited control of word formation and/or spelling
- errors may severely distort the message

Band 2
- uses an extremely limited range of vocabulary; essentially no control of word formation and/or spelling

Band 1
- can only use a few isolated words

---

Grammatical Range and Accuracy

Band 9
- uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as 'slips'

Band 8
- uses a wide range of structures
- the majority of sentences are error- free
- makes only very occasional errors or inappropriacies

Band 7
- uses a variety of complex structures
- produces frequent error-free sentences
- has good control of grammar and punctuation but may make a few errors

Band 6
- uses a mix of simple and complex sentence forms
- makes some errors in grammar and punctuation but they rarely reduce communication

Band 5
- uses only a limited range of structures
- attempts complex sentences but these tend to be less accurate than simple sentences
- may make frequent grammatical errors and punctuation may be faulty; errors can cause some difficulty for the reader

Band 4
- uses only a very limited range of structures with only rare use of subordinate clauses
- some structures are accurate but errors predominate, and punctuation is often faulty

Band 3
- attempts sentence forms but errors in grammar and punctuation predominate and distort the meaning

Band 2
- cannot use sentence forms except in memorised phrases

Band 1
- cannot use sentence forms at all

The official IELTS writing task 2 marking criteria are above.`;

const primarySchoolRequirement = `As a primary school essay grader, your task is to carefully read each student's essay and provide supportive, constructive feedback. Remember, your role is to encourage budding writers and cultivate a love of writing, so it's essential to highlight efforts, creativity, and improvements. 
Prompt for Grading Primary School Essays:
1. Start by reading the student's essay entirely without making any corrections or comments. Try to understand the writer's voice and perspective.
2. After your initial reading, go back and note down the strengths of the essay. Look for creative elements, clear sentences, good use of vocabulary, and any other positive aspects you can praise. Be sure to be specific with your praise so the student knows what they did well.
3. Commend the author for their hard work and dedication to the assignment. Encouragement can greatly impact a young learner's continued interest in writing.
4. Now, look for areas where the student can improve. Frame your suggestions in a positive and encouraging way. For example, instead of saying, "You made a spelling mistake," you might say, "You've got a good word here, and with a little tweak in spelling, it will be perfect!"
5. Give specific, actionable advice. Instead of general comments like "write better," provide clear guidance. For example, "Next time, try to add a little more detail about your main character's adventures. It will help your story come to life!"
6. Offer examples when explaining concepts that may be new or challenging. For instance, if you're discussing the use of descriptive words, provide a comparison showing how they enrich a story.
7. Encourage the student to keep reading and writing. Suggest that reading various books can inspire them and introduce new ideas for their writing.
8. Lastly, end with a positive note—a sentence that reinforces your belief in their potential and looks forward to seeing how they grow as a writer.
9. Provide a grade if required, but ensure that the grade aligns with the detailed feedback provided.
Throughout this process, keep your feedback age-appropriate, and be mindful of the student's confidence and unique voice. The goal is to foster improvement while maintaining students' enthusiasm and self-esteem.`

const secondarySchoolRequirement = `As you evaluate essays from secondary school students, your feedback should continue to be positive and aimed at encouraging development, while also providing more nuanced critique that challenges these more mature students to refine their skills. The approach should foster critical thinking and the ability to self-reflect on their writing.
Prompt for Grading Secondary School Essays:
1. Begin by reading through the student's essay thoroughly to get a sense of their argument or narrative, their writing style, and the structure they have chosen to convey their ideas.
2. Highlight and commend the strengths of the essay. Search for insightful ideas, well-constructed arguments, originality, engagement with the topic, and any particular turn of phrase or use of language that stands out.
3. Applaud the student for their effort, especially any evidence of detailed research, deep thinking about the topic, or creative approaches.
4. Identify areas for improvement, keeping in mind that the goal is to guide, not discourage. For instance, if a student's argument lacks clarity, suggest ways they might strengthen their thesis or provide more concrete evidence.
5. Offer constructive criticism coupled with examples. For instance, if you’re discussing narrative structure, compare a well-structured narrative with the student's work to illustrate how they could enhance their own.
6. Encourage the use of more sophisticated writing techniques where appropriate, such as varied sentence structure, advanced vocabulary, or the incorporation of literary devices like metaphor and symbolism.
7. Encourage the student to engage with multiple perspectives in argumentative essays, recognizing the complexity of issues and avoiding oversimplification.
8. Urge the student to continue developing their voice and style. At this stage, students should be encouraged to write in a way that not only demonstrates their knowledge but also their individual perspective and personality.
9. Close with positive reinforcement, reminding the student of their potential for growth and inviting them to continue exploring the vast landscape of writing.
10. Assign a grade that aligns with the educational standards and reflects both the merits and areas needing improvement noted in your feedback.
Throughout your assessment, maintain a tone of respect and professionalism, acknowledging that secondary school students are preparing for higher levels of academic engagement. Your feedback should inspire them to strive for excellence and to view writing as a vital and evolving skill.`

export const useRequirementsStore = defineStore('requirements', () => {

    const requirements: Ref<RequirementItem[]> = ref([
        {
            id: 1,
            title: 'Default Grading Criteria',
            content: defaultRequirement
        },
        {
            id: 2,
            title: 'IELTS Writing Task 2 Grading Criteria',
            content: ieltsRequirement
        },
        {
            id: 3,
            title: 'Primary School Essays',
            content: primarySchoolRequirement
        },
        {
            id: 4,
            title: 'Secondary School Essays',
            content: secondarySchoolRequirement
        }

    ]);

    const newRequirement: Ref<Requirement> = ref({
        title: '',
        content: ''
    });

    const currentEditingRequirement = ref<Requirement>({
        title: 'Default Grading Criteria',
        content: defaultRequirement
    });

    function addRequirement(requirement: Requirement) {
        requirements.value.push({
            id: requirements.value.length + 1,
            ...requirement
        });
    }

    function editRequirement(requirement: Requirement, id: number) {
        const index = requirements.value.findIndex(item => item.id === id);
        requirements.value[index] = {
            id,
            ...requirement
        };
    }

    function deleteRequirement(id: number) {
        const index = requirements.value.findIndex(item => item.id === id);
        requirements.value.splice(index, 1);
    }

    return {
        requirements,
        newRequirement,
        currentEditingRequirement,
        addRequirement,
        editRequirement,
        deleteRequirement
    };
});