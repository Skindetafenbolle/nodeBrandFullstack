const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const sequelize = require('./config/database');
const Brand = require('./models/Brand');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

sequelize.authenticate()
    .then(() => {
        console.log('Connection to the database has been established successfully');
    })
    .catch((error) => {
        console.error('Unable to connect to the database:', error);
    });

Brand.sync()
    .then(() => {
        console.log('Brand model synchronized with the database');
    })
    .catch((error) => {
        console.error('Error synchronizing Brand model:', error);
    });

app.post('/createBrands', async (req, res) => {
    const { name, description, foundationDate, logoURL, socialLinks } = req.body;

    try {
        const newBrand = await Brand.create({
            name,
            description,
            foundationDate,
            logoURL,
            socialLinks,
        });

        res.status(201).json({ message: 'Brand created successfully', brand: newBrand });
    } catch (error) {
        console.error('Error creating brand:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/brands', async (req, res) => {
    try {
        const brands = await Brand.findAll();
        const plainBrands = brands.map(brand => brand.get({ plain: true }));
        res.render('brands', { brands: plainBrands });
    } catch (error) {
        console.error('Ошибка при получении брендов:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
