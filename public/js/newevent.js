
// const newEventFormHandler = async (e) => {
//     e.preventDefault();

//      // Collect values from the create event form
//   const title = document.querySelector('#title').value.trim();
//   const present_by = document.querySelector('#present-by').value.trim();
//   const dateandtime = document.querySelector('#date').value.trim();
//   const location = document.querySelector('#location').value.trim();
//   const category_id = document.querySelector('#category').value.trim();
//   const filename = document.querySelector('#imageurl').value.trim();
//   const price = document.querySelector('#price').value.trim();
//   const map = "";
//   const description = document.querySelector('#description').value.trim();

//   if (title && present_by && dateandtime && location && category_id && filename && price && description) {
//     // Send a POST request to the API endpoint
//     const response = await fetch('api/events', {
//       method: 'POST',
//       body: JSON.stringify({ title, present_by, dateandtime, location, category_id, filename, price, map, description }),
//       headers: { 'Content-Type': 'application/json'}
//     });

//     if (response.ok) {
//       // If successful, redirect the browser to the profile page
//       alert('Event successfully created!');
//       document.location.replace('/');
//       console.log(title, present_by, dateandtime, location, category_id, filename, price, description);
//     //    document.location.replace('/profile');
//     } else {
//       alert(response.statusText);
//     }
//   }
// };

// document.querySelector('#newevent-form').addEventListener('submit', newEventFormHandler);