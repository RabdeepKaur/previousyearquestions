export function buildAnswerPrompt(
  notesText: string,
  questionPaper: string,
  marks: number,
  subject: string
) {
  return `
You are an expert academic assistant helping students prepare for exams.

I will provide you with:
1. STUDY NOTES - comprehensive notes on the subject
2. PREVIOUS YEAR QUESTION - a specific question from past exam papers

Your task is to generate a well-structured answer using ONLY the information from the study notes.

---

**STUDY NOTES:**
${notesText}

---

**PREVIOUS YEAR QUESTION:**
${questionPaper}

**Marks:** ${marks}
**Subject:** ${subject}

---

**INSTRUCTIONS:**

1. **Answer Length Guidelines:**
   - 2 marks = 150–200 words
   - 5 marks = 300–450 words
   - 10 marks = 600–750 words
   - 15 marks = 900–1050 words

2. **Answer Structure:**
   - Introduction / definition
   - Main points with explanations
   - Relevant examples from notes
   - Concise conclusion
   - Use headings/subheadings where appropriate

3. **Content Requirements:**
   - Use ONLY the provided study notes
   - Maintain academic tone
   - Include details, facts, and figures from notes
   - Organize logically
   - Directly address the question

4. **Formatting:**
   - Clear paragraphs
   - Bullet points for lists when appropriate
   - **Bold** key terms
   - Smooth flow between sections

**Generate the complete answer now.**
`;
}
