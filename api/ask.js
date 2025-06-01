import axios from 'axios';

export default async (req, res) => {
  try {
    const { query } = req.body;
    
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are PhilosopherGPT. Respond in short, wise philosophical quotes.'
          },
          { role: 'user', content: query }
        ],
        temperature: 0.7,
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    res.status(200).json({ reply: response.data.choices[0].message.content });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'The oracle is meditating. Try again later.' });
  }
};
