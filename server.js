const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const PORT = 3000;

// Routes
const foodCategoriesRoute = require('./routes/FoodCategories');
const foodRoute = require('./routes/Foods');
const tableRoute = require('./routes/Tables');
const tableSectionsRoute = require('./routes/TableSections');
const transactionsRoute = require('./routes/Transactions');
const ordersRoute = require('./routes/Orders');
const orderListingRoute = require('./routes/OrderListings');
const notificationsRoute = require('./routes/Notifications');

// init app & middleware
const app = express();

app.use(cors({ origin: '*' }));
app.use(bodyParser.json());

app.use('/api/foodCategories', foodCategoriesRoute);
app.use('/api/foods', foodRoute);
app.use('/api/tableSections', tableSectionsRoute);
app.use('/api/tables', tableRoute);
app.use('/api/transactions', transactionsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/orderListings', orderListingRoute);
app.use('/api/notifications', notificationsRoute);

app.get('/', (req, res) => {
	res.json({ msg: 'API returned a valid response' });
});

app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});
