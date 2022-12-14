const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * Get all of the items on the shelf
 */
router.get('/', (req, res) => {
  let queryText = `SELECT * FROM "item"`;
  pool.query(queryText).then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    console.log(error);
    res.sendStatus(500);
  });
});

/**
 * Add an item for the logged in user to the shelf
 */
 router.post('/', (req, res) => {
  // console.log('/pet POST route');
  console.log(req.body);
  // console.log('is authenticated?', req.isAuthenticated());
  // console.log('user', req.user);
  if(req.isAuthenticated()) {
      // all lowercase with singular names 
      const queryText = `INSERT INTO "item" ("description", "image_url", "user_id")
                         VALUES ($1, $2, $3)`;
      pool.query(queryText, [req.body.name, req.body.url, req.user.id]).then(() => {
          res.sendStatus(201);
      }).catch((e) => {
          res.sendStatus(500);
      })
  } else {
      res.sendStatus(403); // Forbidden
  }
});

/**
 * Delete an item
 */
router.delete('/:id', (req, res) => {
  // endpoint functionality
});

module.exports = router;
