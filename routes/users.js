const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gmail.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gmail.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  // Copy the code here
  res.send(JSON.stringify({users}), null, 4)//This line is to be replaced with actual return value
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
  // Extract the email parameter from the request URL
  const email = req.params.email;
  // Filter the users array to find users whose email matches the extracted email parameter
  let filtered_users = users.filter((user) => user.email === email);
  // Send the filtered_users array as the response to the client
  res.send(JSON.stringify({filtered_users}, null, 4));
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  //push a new user object into the users array based on query parameters from the request
  users.push({
    "firstNamr": req.query.firstName,
    "lastName": req.query.lastName,
    "email": req.query.email,
    "DOB": req.query.DOB,
  })
  // Send a success message as a response, indicating the user has been updated
  res.send("The user "+ req.query.firstName+" has been updated");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Extract email parameter and find user with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user)=>user.email === email);

  if (filtered_users.length>0){
    // Select the first matching user and update attributed if provided
    let filtered_user = filtered_users[0];

    // Extract and update DOB if provided
    let DOB = req.query.DOB;
    if (DOB){
      filtered_user.DOB = DOB;
    }
    // Extract and update lastName if provided
    let firstName = req.query.firstName;
    if (firstName){
      filtered_user.DOB = firstName;
    }
    // Extract and update lastName if provided
    let lastName = req.query.lastName;
    if (lastName){
      filtered_user.DOB = lastName;
    }
    // Replace old user entry with updated user
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);

    // Send message indicating the user has been updated
    res.send(`User with email ${email} updated.`);
  } else {
    // send error message if no user found
    res.send("Unable to find user");
  }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
// Extract the email parameter from the request URL
const email = req.params.email;
// filter the users array to exclude the user wiht the specified array
users = users.filter((user)=>user.email != email);
// send a success message as the response, indicating the user has been deleted
res.send(`User with the email ${email} has been deleted.`)
});

module.exports=router;
