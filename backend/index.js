// app.js
const express = require('express');
const gsmarena = require('gsmarena-api');
const cors = require('cors');
const app = express();
const port = 4000; // You can use any port you prefer

app.use(cors());

async function fetchDeals() {
  try {
    const deals = await gsmarena.deals.getDeals();
    return deals;
  } catch (error) {
    throw new Error('Error fetching deals:', error.message);
  }
}

// Define a route to handle the Axios request
app.get('/product-list', async (req, res) => {
  try {
    const deals = await fetchDeals();

    // Extract the id, name, img, and description keys from each deal
    // Convert the price from Rupee to PHP and set it as an integer
    const result = deals.map(({ id, name, img, description, deal: { price } }) => ({
      id,
      name,
      img,
      description,
      price: parseInt(price * 67),
    }));

    res.json(result);
    console.log(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
