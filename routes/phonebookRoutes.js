const express = require('express');
const router = express.Router();
const personController = require('../controllers/phonebookControllers');

router.get('/', personController.index);
router.get('/:id', personController.show);
router.put('/:id', personController.update);
router.delete('/:id', personController.deleteById);
router.post('/', personController.create);

module.exports = router;