const express = require('express');
const router = express.Router();
const phonebookControllers = require('../controllers/phonebookControllers');
const phonebookRoutes = require('./phonebookRoutes');

router.get('/info', phonebookControllers.info);
router.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>');
});

router.use('/api/phonebook', phonebookRoutes);
//roouter.use("/api/users", userRoutes)

module.exports = router;