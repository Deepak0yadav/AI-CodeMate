const aiService = require('../services/ai.service');

module.exports.getreview = async (req, res) => {
      try {
            const code = req.body.code;

            if (!code) {
                  return res.status(400).send('code is required');
            }

            const response = await aiService.generateContent(code);
            res.send(response);

      } catch (error) {
            console.error("Error generating response:", error);
            res.status(500).json({ error: "Something went wrong!" });
      }
};
