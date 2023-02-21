const router = require('express').Router();
const {
  Event,
  User,
  Category,
  Saved_event,
  Order
} = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    // get all categories and JOIN with event data
    const dbCategoryData = await Category.findAll({
      include: [{
        model: Event,
        atrributes: ['title', 'description'],
      }, ],
    });

    // Serialize data so the template can read it
    const categories = dbCategoryData.map((category) =>
      category.get({
        plain: true
      })
    );

    // Pass serialized data and session flag into template
    res.render('homepage', {
      categories,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }

});
// Route to show individual Category Page
router.get('/category/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.findByPk(req.params.id, {
      include: [{
        model: Event,
        attributes: [
          'id',
          'title',
          'present_by',
          'dateandtime',
          'location',
          'description',
          'price',
          'filename',
          'map',
        ],
      }, ],
    });
    var category = dbCategoryData.get({
      plain: true
    });

//Get Category list to show in nav bar for user to click and go other categories
    const dbCategories = await Category.findAll();  
    var categories=[];
    for(let i=0; i < dbCategories.length; i++){
      if(dbCategories[i].dataValues.id!==category.id){
        categories.push({id:dbCategories[i].dataValues.id, name:dbCategories[i].dataValues.category_name })
      }
    }
    category['categoryLists'] = categories;

    res.render('category', {
      category,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET one event
router.get('/event/:id', async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    // If the user is logged in, allow them to view the event
    try {
      const dbEventData = await Event.findByPk(req.params.id);

      const event = dbEventData.get({
        plain: true
      });

      res.render('event', {
        event,
        logged_in: req.session.logged_in
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

// Render signup page
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {

  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: {
        exclude: ['password']
      },
      include: [{
          model: Event,
          attributes: ['id', 'title', 'dateandtime']
        },
        {
          model: Saved_event,
          attributes: ['id', 'event_id', 'title', 'notes']
        },
      ],
    });

    var user = userData.get({
      plain: true
    });
    
//Get Category list to show in nav bar for user to click and go other categories
    const dbCategories = await Category.findAll();  
    // console.log(dbCategories)
    var categories=[];
    for(let i=0; i < dbCategories.length; i++){
        categories.push({id:dbCategories[i].dataValues.id, name:dbCategories[i].dataValues.category_name })      
    }
    user['categoryLists'] = categories;
    // console.log(user)

    res.render('profile', {
      ...user,
      logged_in: true
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

//login function
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login')
});

// route for future development
// router.get('/newevent', (req, res) => {
   
//     res.render('newevent', {
//       logged_in: true
//     });
//   });

//Get Data for Calendar
router.get('/events', async (req, res) => {
  try {
      const eventData = await Event.findAll();
      // console.log(eventData)
      res.status(200).json(eventData);
  } catch (err) {
      res.status(400).json(err);
  }
});

module.exports = router;