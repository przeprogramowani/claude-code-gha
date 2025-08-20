import type { APIRoute } from 'astro';

const randomResponses = [
  "That's an interesting question! Let me think about that...",
  "I understand what you're asking. Here's my perspective on that topic.",
  "Great point! I'd like to add some thoughts to that discussion.",
  "That reminds me of something important I should mention.",
  "I see where you're coming from. Let me elaborate on that idea.",
  "Thanks for bringing that up! It's definitely worth exploring further.",
  "You've raised a fascinating topic. Here's how I would approach it.",
  "That's a thoughtful observation. I think there are several angles to consider.",
  "Interesting! I have some insights that might be helpful here.",
  "I appreciate your question. Let me share what I know about this.",
  "That's a complex topic with many layers. Let me break it down.",
  "You're touching on something really important here. My thoughts are...",
  "I find that perspective compelling. Here's how I see it differently.",
  "That's exactly the kind of question that gets me thinking deeply.",
  "Your message sparked an interesting connection in my mind.",
];

export const POST: APIRoute = async ({ request }) => {
  try {
    const { message } = await request.json();
    
    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1500));

    // Generate random response
    const randomIndex = Math.floor(Math.random() * randomResponses.length);
    const response = randomResponses[randomIndex];

    return new Response(JSON.stringify({ response }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};