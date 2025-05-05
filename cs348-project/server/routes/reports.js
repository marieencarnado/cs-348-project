const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://mencarnado03:%40Maremare03@cluster0.vj51gqv.mongodb.net/Travelapp?retryWrites=true&w=majority&appName=Cluster0';

// GET report by continent
router.get('/continent/:continent', async (req, res) => {
  const continent = req.params.continent;

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db('Travelapp');
    const trips = db.collection('trips');

    const result = await trips.find({ continent }).toArray();
    const totalTrips = result.length;
    const avgCost = result.length > 0
      ? result.reduce((sum, trip) => sum + (trip.total_cost || 0), 0) / result.length
      : 0;

    res.json({
      totalTrips,
      avgCost: avgCost.toFixed(2),
      trips: result
    });

    await client.close();
  } catch (err) {
    console.error('Report query failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
