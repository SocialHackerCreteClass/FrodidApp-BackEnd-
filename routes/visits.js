const express = require('express');
const pool = require('../connection/connection');

const router = express.Router();

// PG Get with id Method
router.get('/', (req, res) => {
  try {
    let data;
    let pageLength;

    if (Object.keys(req.query).length !== 2) {
      pool.query('SELECT * FROM a004_visits', (error, results) => {
        res.send(results);
      });
    } else {
      pool.query('SELECT Count(*) FROM a004_visits', (error, results) => {
        data = results.rows[0].count;
      });

      pool.query(
        `SELECT * FROM a004_visits LIMIT ${req.query.items_per_page} OFFSET ${
        (req.query.page_number - 1) * req.query.items_per_page
        }`,
        (error, results) => {
          pageLength = data / req.query.items_per_page;
          res.send({
            count: data,
            items: results.rows,
            pages_length: pageLength,
            items_per_page: req.query.items_per_page,
          });
        }
      );
    }
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// PG Get with id Method
router.get('/:id', (req, res) => {
  try {
    pool.query(
      `SELECT * FROM a004_visits WHERE id=${req.params.id}`,
      (error, results) => {
        res.send(results);
        // pool.end();
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// PG  Post Method
router.post('/', (req, res) => {
  try {
    pool.query(
      `INSERT INTO a004_visits (date, comment, start_time, end_time, user_id) VALUES ('${req.body.date}',
      '${req.body.comment}',
      '${req.body.start_time}',
      '${req.body.end_time}',
      ${req.body.user_id})`,
      () => {
        res.send('Entry added.');
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// PG Put Method
router.put('/:id', (req, res) => {
  try {
    pool.query(
      `UPDATE a004_visits SET 
        date='${req.body.date}',
        comment='${req.body.comment}',
        start_time='${req.body.start_time}',
        end_time='${req.body.end_time}',
        user_id=${req.body.user_id} 
      WHERE id=${req.params.id}`,
      () => {
        res.send('Entry updated.');
      }
    );
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

// PG Delete Method
router.delete('/:id', (req, res) => {
  try {
    pool.query(`DELETE FROM a004_visits WHERE id=${req.params.id}`, () => {
      res.send('Entry deleted.');
    });
  } catch (error) {
    if (error) console.error(`Error: ${error.message}`);
  }
});

module.exports = router;
// -----------------
// MYSQL
// -----------------
// Get Method
// router.get('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query('SELECT * FROM visits', (error, results) => {
//         connection.release();
//         if (error) throw error;
//         res.send(results);
//       });
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// Get with id Method
// router.get('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `SELECT * FROM visits WHERE id=${req.params.id}`,
//         (error, results) => {
//           connection.release();
//           res.send(results);
//         },
//       );
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

//  Post Method
// router.post('/', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       const visitInfo = [
//         new Date(req.body.date),
//         req.body.comment,
//         new Date(req.body.start_time),
//         new Date(req.body.end_time),
//         req.body.user_id,
//       ];

//       connection.query(
//         'INSERT INTO visits (date, comment, start_time, end_time, user_id) VALUES (?)',
//         [visitInfo],
//         () => {
//           connection.release();
//           res.send('Entry added.');
//         },
//       );
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// Put Method
// router.put('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(
//         `UPDATE visits SET
//       date=${new Date(req.body.date)},
//       comment="${req.body.comment}",
//       start_time=${new Date(req.body.start_time)},
//       end_time=${req.body.end_time},
//       user_id=${req.body.user_id} WHERE id=${req.params.id}`,
//         () => {
//           connection.release();
//           res.send('Entry updated.');
//         },
//       );
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });

// Delete Method
// router.delete('/:id', (req, res) => {
//   pool.getConnection((err, connection) => {
//     try {
//       connection.query(`DELETE FROM visits WHERE id=${req.params.id}`, () => {
//         connection.release();
//         res.send('Entry deleted.');
//       });
//     } catch (error) {
//       if (error) console.error(`Error: ${error.message}`);
//     }
//   });
// });
