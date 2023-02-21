const router = require('express').Router();
const userRoutes = require('./userRoutes');
// const eventRoutes = require('./eventRoutes');
const orderRoutes = require('./orderRoutes');
const saveventRoutes = require('./saveventRoutes')

router.use('/users', userRoutes);
// router.use('/events', eventRoutes);
router.use('/orders', orderRoutes);
router.use('/savevents', saveventRoutes)
 module.exports = router;
