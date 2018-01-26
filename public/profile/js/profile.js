//initialize a global variable to hold user data. JS reads this var and sets it to undefined at this point.
var userData;

//this is grabbing the url and slicing (/profile/) off of it and isolating the the username
var userUrl = window.location.pathname.slice(9, 100).trim()

//this will hide the update profile section. You can view others profiles but if your not that user you shouldn't be able to see an update profile for that view.
$(updateDiv).hide()

// Here we make a call to grab user data. This will populate the page with user data regardless if you are the logged in user or not.
$.get("/api/profile/" + userUrl).then(function(data) {
  $('#userProfHeading').text(data.name)
  $('#userProfImg').attr("src", data.profilePic)
})

// here we are making a call to get logged in data for a user if 
$.get("/api/session").then(function(data) {
  //here we are assigning the data passed back from the api call to our global var. userdata now has its value.
  userData = data;

  // here we are checking to see if the the data from the url matches our signed in user. if it does and our user is signed in we will overide the user data shown on the DOM.
  if (data.currentUser.username == userUrl && data.loggedIn === true){
    $('#userProfHeading').text(data.currentUser.name)
    $('#userProfImg').attr("src", data.currentUser.profilePic)
    //since we can now be sure we are on the signed in users profile page and that our user is logged in we will show an option for them to update their profile.
    $(updateDiv).show()
  }
})


$("#updateProfile").on("click", function () {
  //double check to make sure that the user is logged in.
  if(userData.loggedIn == true){
    //grab the users data from the DOM. Format them as an object that represents the user trying to update their info.
    var user = {
      name: $("#signUpName").val().trim(),
      username: $("#signUpUsername").val().trim(),
      email: $("#signUpEmail").val().trim(),
      profilePic: $('#profilePic').val().trim()
    }
     //the formatted data is sent to our server with via an AJAX PUT. method is the type of CRUD operation we are trying to do. url is endpoint we are hitting on the server, data is our user data being sent to the node server to be grabbed via a req.body
    $.ajax({
      method: "PUT",
      url: "/api/update/" + userData.currentUser.name,
      data: user
    }) .then(res => console.log(res))
  }

})