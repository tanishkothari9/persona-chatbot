/**
 * Vercel Serverless Function — Chat API Proxy
 *
 * Proxies chat requests to Google Gemini API.
 * Tries multiple models in order to handle quota limits on certain models.
 * API key is read from the GEMINI_API_KEY environment variable.
 */

// Models to try in order — current as of April 2026
// Gemini 2.0 and 1.5 are deprecated; new keys only work with 2.5+ models
const MODELS = [
  { name: 'gemini-2.5-flash', api: 'v1beta' },
  { name: 'gemini-2.5-flash-lite', api: 'v1beta' },
  { name: 'gemini-3-flash-preview', api: 'v1beta' },
];

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: 'Server misconfiguration — API key not set. Please add GEMINI_API_KEY to environment variables.',
    });
  }

  const { systemPrompt, history } = req.body;

  if (!systemPrompt || !history || !Array.isArray(history)) {
    return res.status(400).json({ error: 'Missing systemPrompt or history in request body.' });
  }

  const payload = {
    system_instruction: {
      parts: [{ text: systemPrompt }],
    },
    contents: history,
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      topK: 40,
      maxOutputTokens: 512,
    },
    safetySettings: [
      { category: 'HARM_CATEGORY_HARASSMENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_HATE_SPEECH', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
      { category: 'HARM_CATEGORY_DANGEROUS_CONTENT', threshold: 'BLOCK_MEDIUM_AND_ABOVE' },
    ],
  };

  let lastError = null;

  // Try each model in order until one succeeds
  for (const { name: model, api } of MODELS) {
    try {
      const geminiUrl = `https://generativelanguage.googleapis.com/${api}/models/${model}:generateContent?key=${apiKey}`;

      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      // If rate-limited (429), try the next model
      if (response.status === 429) {
        console.warn(`Model ${model} returned 429 (rate limited), trying next model...`);
        lastError = `Model ${model} rate limited`;
        continue;
      }

      if (!response.ok) {
        const errBody = await response.text();
        console.error(`Gemini API error (${model}):`, response.status, errBody);
        lastError = `Gemini API returned ${response.status}`;
        continue;
      }

      const data = await response.json();

      // Extract the text reply
      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'I wasn\'t able to generate a response. Could you try rephrasing your question?';

      return res.status(200).json({ reply });
    } catch (err) {
      console.error(`Error with model ${model}:`, err.message);
      lastError = err.message;
      continue;
    }
  }

  // All models failed
  return res.status(502).json({
    error: `All models failed. Last error: ${lastError}. Please check your API key at aistudio.google.com/apikey and ensure the Generative Language API is enabled.`,
  });
}
