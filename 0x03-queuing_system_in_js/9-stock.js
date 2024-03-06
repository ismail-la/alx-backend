// In stock?
import express from 'express';
import { promisify } from 'util';
import { createClient } from 'redis';

const app = express();
const client = createClient();
const port = 1245;
const host = '127.0.0.1';

const listProducts = [{
  id: 1, name: 'Suitcase 250', price: 50, stock: 4,
},
{
  id: 2, name: 'Suitcase 450', price: 100, stock: 10,
},
{
  id: 3, name: 'Suitcase 650', price: 350, stock: 2,
},
{
  id: 4, name: 'Suitcase 1050', price: 550, stock: 5,
},
];

// Searches for product in listProducts based on id parameter
function getItemById(id) {
  return listProducts.find((product) => product.id === id);
}

// Redis client ops
client.on('error', (error) => {
  console.log(`Redis client not connected to server ${error.message}`);
});

// Stores itemId-stock key-value pair in redis

function reserveStockById(itemId, stock) {
  client.set(`item.${itemId}`, stock);
}

// Gets stock value associated with given item id (as key)
async function getCurrentReservedStockById(itemId) {
  const get = promisify(client.get).bind(client);
  const value = await get(`item.${itemId}`);
  return value;
}

// Express app routes
// Get list of all products
app.get('/list_products', (_req, res) => {
  res.send(listProducts.map((product) => ({
    itemId: product.id,
    itemName: product.name,
    price: product.price,
    initialAvailableQuantity: product.stock,
  })));
});

// Get items by given id
app.get('/list_products/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(Number(itemId));
  if (product === undefined) {
    res.statusCode = 404;
    res.send({ status: 'Product not found' });
  } else {
    const reserveStock = await getCurrentReservedStockById(product.id);
    res.send({
      itemId: product.id,
      itemName: product.name,
      price: product.price,
      initialAvailableQuantity: product.stock,
      currentQuantity: reserveStock === null ? product.stock : Number(reserveStock),
    });
  }
});

// Reserve a product with given id if it exists and in stock
app.get('/reserve_product/:itemId', async (req, res) => {
  const { itemId } = req.params;
  const product = getItemById(Number(itemId));
  if (product === undefined) {
    res.statusCode = 404;
    res.send({ status: 'Product not found' });
    return;
  }
  let reserveStock = await getCurrentReservedStockById(product.id);
  reserveStock = reserveStock === null ? product.stock : Number(reserveStock);
  if (!reserveStock) {
    res.send({ status: 'Not enough stock available', ItemId: product.id });
  } else {
    reserveStockById(product.id, reserveStock - 1);
    res.send({ status: 'Reservation confirmed', ItemId: product.id });
  }
});

app.listen(port, host, () => {
  console.log(`Server is live at ${host}:${port}`);
});
