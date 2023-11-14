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