const router = require('express').Router();
const { Saved_event } = require('../../models');
const withAuth = require('../../utils/auth');

//Route to create Saved event
router.post('/', withAuth, async (req,res)=>{
 try{
    const newSave = await Saved_event.create({
        ...req.body,
        user_id: req.session.user_id,
    })
    res.status(200).json(newSave);
 } catch (err) {
    res.status(400).json(err);
 }
})

// Route to delete Saved Event
router.delete('/:id', withAuth, async (req, res)=> {
   try {
      const delData = await Saved_event.destroy({
        where: {
          id: req.params.id,
          user_id: req.session.user_id,
        },
      });
  
      if (!delData) {
        res.status(404).json({ message: 'No event found with this id!' });
        return;
      }
  
      res.status(200).json(delData);
    } catch (err) {
      res.status(500).json(err);
    }
})

// Route for Note of Saved Event
router.put('/:id', withAuth, async (req, res)=> {
 console.log('data is here')
  try {
    const note = await Saved_event.update(
      {
        notes: req.body.notes,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json(note);
  } catch (err) {
    res.status(500).json(err);
  }
})
module.exports = router;