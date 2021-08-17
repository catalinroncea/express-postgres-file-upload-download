const express = require('express');
const router = express.Router();
const db = require('../db/connection');

router.get('/:id', async (req, res) => {
   const data = await db.one('SELECT image FROM images WHERE id = $1', req.params.id);
   console.log('data', data);
   const byte = new Uint8Array(data.image);
   console.log('byte', byte.length);

   res.set('Content-Type', 'application/octet-stream')
   res.set('Content-Disposition', 'attachment; filename="picture.png"');
   res.send(new Buffer(byte, 'binary'))
});

module.exports = router;
