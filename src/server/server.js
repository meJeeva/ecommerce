const express = require('express');
const ConnectDB = require('./ConnectDB');
const { createCategory, allCategories } = require('./controller/categoryController');
const { createBanner, allBanner } = require('./controller/bannerController');
const app = express();
const router = express.Router();
const PORT = 8000;

ConnectDB();

app.use(express.json());

// category
router.post('/category/create', createCategory);
router.get('/category/get-all', allCategories);


// banner
router.post('/banner/create', createBanner);
router.get('/banner/get-all', allBanner);

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`server is running in the port ${PORT}`);
})