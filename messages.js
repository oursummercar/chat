let messages = [];

module.exports = (req, res) => {
  if (req.method === 'GET') {
    res.status(200).json(messages);
  } else if (req.method === 'POST') {
    const { text } = JSON.parse(req.body);
    if (text) {
      messages.push({ text });
      res.status(200).json({ message: 'Message saved' });
    } else {
      res.status(400).json({ error: 'Message is required' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
