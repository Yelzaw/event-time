// const router = require('express').Router();
// const {
//     Event
// } = require('../../models');
// const withAuth = require('../../utils/auth');

// router.post('/', withAuth, async (req, res) => {
//     try {
//         const eventData = await Event.create(req.body);
//         res.status(200).json(eventData);
//     } catch (err) {
//         res.status(400).json(err);
//     }
// });

// // For future development
// router.delete('/:id', withAuth, async (req, res) => {

// })

// module.exports = router;