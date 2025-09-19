const express = require('express');

const router = express.Router()


const {
    getEntry,
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry
  } = require('../controllers/entryController')


router.get('/', getEntries);

router.get('/:id', getEntry);

router.post('/', createEntry);

router.patch('/:id', updateEntry)

router.delete('/:id', deleteEntry);

//export route
module.exports = router;