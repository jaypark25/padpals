const express = require('express');
const router = express.Router();
const Grocery = require('../models/grocery'); 

// CREATE: Add a new grocery item
router.post('/', (req, res) => {
  const newItem = new Grocery({...req.body, userID: req.userID});

  newItem.save()
    .then(item => res.json(item))
    .catch(err => res.status(400).json('Error: ' + err));
});

// READ: Get all grocery items
router.get('/', (req, res) => {
  Grocery.find({userID: req.userID})
    .then(items => res.json(items))
    .catch(err => res.status(400).json('Error: ' + err));
});

// UPDATE: Update a grocery item by ID
router.put('/:id', (req, res) => {
  const userID = req.userID;
  const groceryID = req.params.id;

  Grocery.findOne({_id: billID, userID: userID})
    .then(item => {
      item.itemName = req.body.itemName;
      item.quantity = req.body.quantity;
      item.purchased = req.body.purchased;
      
      item.save()
        .then(() => res.json('Item updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// DELETE: Delete a grocery item by ID
router.delete('/:id', (req, res) => {
  const userID = req.userID;
  const groceryID = req.params.id;

  Grocery.findOne({ _id: groeryID, userID: userID })
  .then(item => {
      if (item) {
          // Delete the bill if found
          item.remove()
              .then(() => res.json('Grocery item deleted.'))
              .catch(err => res.status(400).json('Error: ' + err));
      } else {
          res.status(400).json('Error: Groecery item not found or you don\'t have permission');
      }
  })
  .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;
