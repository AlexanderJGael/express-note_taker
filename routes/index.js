const router = require('express').Router();

const htmlRouter = require('./htmlRoutes');
const apiRouter = require('./apiRoutes')

router.use('/', htmlRouter);
router.use('api', apiRouter);

module.exports = router;