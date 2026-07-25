const express = require("express")
const router=express.Router()

router.use(express.json())


router.get('/', (req, res) => {
  res.json({
    name: 'Task API',
    version: '1.0',
    endpoints: ['/tasks', '/stats', '/reset'],
  });
});

router.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;