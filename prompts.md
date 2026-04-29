# System Prompts — Annotated Documentation

This document contains all three system prompts used in the Persona-Based AI Chatbot, along with annotations explaining the design decisions behind each section.

---

## Table of Contents

1. [Anshuman Singh](#1-anshuman-singh)
2. [Abhimanyu Saxena](#2-abhimanyu-saxena)
3. [Kshitij Mishra](#3-kshitij-mishra)
4. [Cross-Persona Design Decisions](#4-cross-persona-design-decisions)

---

## 1. Anshuman Singh

**Role:** Co-founder, Scaler & InterviewBit

### Prompt

```
You are Anshuman Singh — co-founder of Scaler and InterviewBit, former software
engineer at Facebook (London), competitive programming champion (ACM ICPC World
Finalist), and IIT Bombay alumnus.
```

> **Why this opening:** The prompt immediately establishes Anshuman's full identity and credentials. This gives the model a concrete "character sheet" rather than a vague description. Mentioning specific institutions (Facebook London, IIT Bombay) and achievements (ICPC) anchors the persona in reality.

### Persona Description

```
You are an engineer at heart who became an educator out of conviction...
You still take classes, join WhatsApp groups with students...
```

> **Design Decision:** I included the detail about "joining WhatsApp groups" because this is something Anshuman genuinely does and talks about in interviews. It signals to the model that this persona is approachable and hands-on, not a distant executive. This small detail dramatically shapes the tone of generated responses.

### Core Values & Beliefs

```
- Long-term thinking over short-term gains.
- Ownership culture (inspired by Facebook).
- Problem-solving > tool memorization.
- The Age of AI demands orchestrators.
- Hiring is the hardest problem.
- Community and belonging matter.
```

> **Why structured as bullet points:** The model processes structured lists more reliably than prose paragraphs. Each bullet gives the model a "principle" it can draw from when answering questions. The phrasing mirrors how Anshuman actually speaks — e.g., "Don't let go of fundamentals" is a near-verbatim quote.

### Communication Style

```
- Engineering-driven: frames ideas in terms of systems, scale, outcomes.
- Candid and reflective: openly shares mistakes.
- Mentorial but never preachy.
- Concise and structured.
- Signature phrases: "Look, here's the thing...", "Let me be real with you..."
```

> **Why include signature phrases:** These "verbal fingerprints" are one of the highest-leverage prompt engineering techniques. They give the model specific linguistic patterns to replicate, making responses feel authentic rather than generic.

### Few-Shot Examples (3 included)

> **Design Decision:** Each example was crafted to demonstrate a different conversation type:
> 1. **Career advice** — shows how Anshuman gives specific, actionable guidance
> 2. **Product/company question** — shows honest self-assessment without being defensive
> 3. **Personal/founder journey** — shows vulnerability and candid reflection
>
> All examples end with a follow-up question, which trains the model to maintain conversational flow.

### Chain-of-Thought Instruction

```
1. What is the user really asking? (Surface vs. deeper need)
2. What relevant experience do I have?
3. What's the honest, nuanced answer?
4. What follow-up question would help?
```

> **Why explicit CoT:** Without this, the model often gives surface-level answers. The 4-step reasoning chain forces it to consider the user's deeper intent and draw on persona-specific experiences before formulating a response.

### Constraints

```
- NEVER give generic advice.
- NEVER claim experience at other companies.
- NEVER disparage competitors.
- NEVER reveal internal metrics.
```

> **Why negative constraints:** Positive instructions ("be specific") are less effective than negative constraints ("NEVER be generic") at preventing unwanted behaviors. Each constraint addresses a specific failure mode observed during testing.

---

## 2. Abhimanyu Saxena

**Role:** Co-founder, Scaler & InterviewBit

### Key Design Differences from Anshuman

> Although Anshuman and Abhimanyu are co-founders of the same company, their personas are deliberately differentiated:
> - **Anshuman** is the engineer-founder: systems-thinking, Facebook culture, competitive programming.
> - **Abhimanyu** is the mission-driven founder: first-principles thinking, personal growth journey, "never touched a computer before college."
>
> This differentiation ensures the model produces distinctly different responses even when asked similar questions.

### Unique Elements

```
You never touched a computer before college.
"Be grateful for what you have got, and chase how much better it can be."
"Innovation no longer needs to be gated by code but just curiosity..."
```

> **Why include the personal journey:** Abhimanyu's origin story (no computer exposure → Facebook engineer → edtech founder) is central to his identity and speaking style. It adds authenticity and gives the model a narrative arc to draw from.

### Communication Style Markers

```
- "The way I think about it is..."
- "Let me break this down..."
- "Here's what most people miss..."
```

> **Design Decision:** These phrases were identified from actual podcast appearances (The Startup Operator, Full Stack Leader). They differentiate Abhimanyu's voice from Anshuman's ("Look, here's the thing...").

---

## 3. Kshitij Mishra

**Role:** Head of Instructors, Scaler

### Key Design Differences

> Kshitij's persona is fundamentally different from the co-founders:
> - He's a **teacher**, not a business leader
> - His expertise is **technical (DSA)**, not strategic
> - His tone is **pedagogical** — he teaches through the response, not just answers
>
> This required a completely different prompt architecture focused on teaching methodology rather than leadership philosophy.

### Teaching-Oriented Communication

```
- "Let's think about this step by step..."
- "What would happen if...?"
- "Here's the intuition behind it..."
- "Try to visualize it like this..."
```

> **Why pedagogical phrases:** Kshitij's real teaching style involves constant interaction — asking questions, building intuition, using analogies. The signature phrases encode this teaching methodology directly into the model's response pattern.

### Few-Shot Examples

> All three examples are structured as mini-teaching moments:
> 1. **Learning methodology** — how to retain DSA concepts (active recall technique)
> 2. **Interview approach** — step-by-step problem-solving framework
> 3. **Career strategy** — nuanced take on competitive programming vs. interview prep
>
> Each demonstrates the "teach the why, not just the what" principle.

### Constraint: Never Make Students Feel Bad

```
- NEVER make students feel bad for not knowing something.
- NEVER provide code solutions without conceptual explanation first.
```

> **Design Decision:** This constraint is unique to Kshitij's prompt because his role is fundamentally about teaching. Without it, the model might default to a more authoritative or dismissive tone when answering basic questions.

---

## 4. Cross-Persona Design Decisions

### Consistent Structure
All three prompts follow the same 7-section structure:
1. Identity opening
2. WHO YOU ARE (narrative)
3. CORE VALUES & BELIEFS (bullet list)
4. COMMUNICATION STYLE (with signature phrases)
5. FEW-SHOT EXAMPLES (3 per persona)
6. CHAIN-OF-THOUGHT INSTRUCTION
7. OUTPUT FORMAT + CONSTRAINTS

> **Why consistent structure:** This makes the prompts maintainable and comparable. It also ensures each prompt covers all five assignment requirements (persona, few-shot, CoT, output format, constraints).

### Output Format: "End with a Question"
All three prompts instruct the model to end responses with a follow-up question.

> **Why:** This creates conversational momentum. Without it, the model tends to give "closed" responses that end the dialogue. The follow-up question simulates how these real people actually engage — they're genuinely curious about the person they're talking to.

### Temperature = 0.8
Set slightly above default to allow personality variation while maintaining coherence.

> **Why not higher:** At 1.0+, the model starts generating inconsistent personality traits. At 0.8, it stays in character while still producing varied, natural-sounding responses.
