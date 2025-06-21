const express = require('express');
const redis = require('redis');

const app = express();
const client = redis.createClient({
  url: 'redis://redis:6379'
});

client.connect().catch(console.error);

// Check cache middleware
const checkCache = async (req, res, next) => {
  const city = req.query.city;

  try {
    const data = await client.get(city);

    if (data) {
      return res.send({
        from: 'Redis Cache',
        city,
        weather: data
      });
    } else {
      next();
    }
  } catch (err) {
    console.error(err);
    next();
  }
};


app.get('/weather', checkCache, (req, res) => {
  const city = req.query.city;

  setTimeout(async () => {
    const temp = city.toLowerCase() === 'coimbatore' ? '28°C' : '35°C';
    const result = `cloudy {temp} in ${city}`;
    await client.set(city, result, { EX: 30 });

    res.send({
      from: 'New API',
      city,
      weather: result
    });
  }, 2000);
});

app.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
