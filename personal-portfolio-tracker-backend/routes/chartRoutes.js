const express = require('express');
const router = express.Router();

router.get('/portfolio', (req, res) => {
  const { tenure } = req.query;

  const dummyData = {
    Daily: [
      { date: '2024-01-01', value: 100 },
      { date: '2024-01-02', value: 105 },
      { date: '2024-01-03', value: 110 },
    ],
    Weekly: [
      { date: 'Week 1', value: 120 },
      { date: 'Week 2', value: 130 },
      { date: 'Week 3', value: 125 },
    ],
    Monthly: [
      { date: 'Jan', value: 150 },
      { date: 'Feb', value: 160 },
      { date: 'Mar', value: 170 },
    ],
    Quarterly: [
      { date: 'Q1', value: 200 },
      { date: 'Q2', value: 210 },
    ],
    Yearly: [
      { date: '2023', value: 300 },
      { date: '2024', value: 350 },
    ]
  };

  res.json(dummyData[tenure || 'Daily']);
});

module.exports = router;
