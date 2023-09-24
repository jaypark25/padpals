const express = require('express');
const router = express.Router();
const Bill = require('../models/bill');

//CREATE : add a new payable / receivable.
router.post('/', (req, res) => {
  const newItem = new Bill({ ...req.body, userID: req.userID });

    newItem.save()
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error: ' + err));
});

//READ : get all payable / receivable.
router.get('/', (req, res) => {
  Bill.find({ userID: req.userID })
      .then(items => res.json(items))
      .catch(err => res.status(400).json('Error: ' + err));
});

// Assume we have some middleware that sets req.userID based on the token
// UPDATE : update a payable / receivable by ID.
router.put('/:id', (req, res) => {
  const userID = req.userID; 
  const billID = req.params.id; // comes from URL

  Bill.findOne({ _id: billID, userID: userID })
    .then(item => {
      if (item) {
        // Update logic here, e.g.,
        item.billName = req.body.billName;
        item.amount = req.body.amount;
        item.paid = req.body.paid;

        // Save the updated item
        item.save()
          .then(() => res.json('Item updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      } else {
        res.status(400).json('Error: Bill not found or you don\'t have permission');
      }
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

//DELETE : delete a bill from the database.
router.delete('/:id', (req, res) => {
  const userID = req.userID; // assumed to be set by some authentication middleware
  const billID = req.params.id; // comes from URL

  Bill.findOne({ _id: billID, userID: userID })
      .then(item => {
          if (item) {
              // Delete the bill if found
              item.remove()
                  .then(() => res.json('Bill deleted.'))
                  .catch(err => res.status(400).json('Error: ' + err));
          } else {
              res.status(400).json('Error: Bill not found or you don\'t have permission');
          }
      })
      .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
