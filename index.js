// Ваш app.js

const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const sequelize = require('./config/database');
const Brand = require('./models/Brand');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(bodyParser.json());

app.engine('.handlebars', exphbs({
    defaultLayout: 'main',
    extname: '.handlebars',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    cache: process.env.NODE_ENV === 'production' ? true : false,
}));

app.set('view engine', '.handlebars');

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

app.get('/createBrand', (req, res) => {
    console.log("Received GET request for /createBrand");
    const templatePath = path.join(__dirname, 'views', 'createBrand');
    res.render(templatePath, { layout: 'main' });
});

// Роут для обработки создания бренда
app.post('/createBrand', async (req, res) => {
    console.log('Received POST request for /createBrand');
    const { name, description, foundationDate, logoURL, socialLinks } = req.body;

    try {
        const newBrand = await Brand.create({
            name,
            description,
            foundationDate,
            logoURL,
            socialLinks,
        });

        console.log('New brand created:', newBrand);

        res.status(201);

    } catch (error) {
        console.error('Error creating brand:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



app.delete('/deleteBrand/:id', async (req, res) => {
    const brandId = req.params.id;

    try {
        // Поиск бренда по идентификатору
        const brandToDelete = await Brand.findByPk(brandId);

        if (!brandToDelete) {
            return res.status(404).json({ error: 'Brand not found' });
        }

        // Удаление бренда
        await brandToDelete.destroy();

        // Возвращаем успешный статус
        res.status(200).json({ message: 'Brand deleted successfully' });
    } catch (error) {
        console.error('Error deleting brand:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/brands', async (req, res) => {
    try {
        const brands = await Brand.findAll();
        const plainBrands = brands.map(brand => brand.get({ plain: true }));
        res.render('brands', { brands: plainBrands });
    } catch (error) {
        console.error('Error fetching brands:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
