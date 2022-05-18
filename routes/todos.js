const express = require('express');
const router = express.Router();

const todoController = require('../controllers/todoController');


// GET /feed/posts
router.get('/', todoController.getData);
// localhost:8080/contacts/
router.get('/:id', todoController.getSingleData);
// localhost:8080/contacts/:id

router.post('/', todoController.createData);

router.put('/:id', todoController.updateData);

router.delete('/:id', todoController.deleteData);

module.exports = router;