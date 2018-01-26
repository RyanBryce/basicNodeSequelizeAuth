console.log("yo")
//here we listen for user sign in button to get clicked
$("#signIn").on("click", function () {
//grab the users data (username and password) from the DOM. Format them as an object that represents the user trying to sign in
  var user = {
    username: $("#username").val().trim(),
    password: $("#pw").val().trim()
  }
 //the formatted data is sent to our server with via an AJAX POST. first param is the endpoint we are hitting, the second is our user data being sent to the node server to be grabbed via a req.body
  $.post('/api/login', user).then(function (response) {
    //if the response is not equal to a sucessful login, we send the user an alert saying that they need to check their password

    if (response !== 'Successful login') {
      console.log("your password or username are spelt incorrectly")
      alert("your password or username are spelt incorrectly")
    }else{
      //if it is an successfull login we send the user to their profile page by altering the URL. the server picks up on this URL change and routes us to the correct page.
      console.log("you are logged in sucessfully")
      window.location.replace("/profile/"+ user.username)
    }
  })

})
//listener for the user to click the sign up button.
$("#signUp").on("click", function () {
//grab the users data from the DOM. Format them as an object that represents the user trying to sign up.
  var user = {
    name: $("#signUpName").val().trim(),
    username: $("#signUpUsername").val().trim(),
    password: $("#signUpPassword").val().trim(),
    email: $("#signUpEmail").val().trim(),
    profilePic: $('#profilePic').val().trim()
  }
//the formatted data is sent to our server with via an AJAX POST. first param is the endpoint we are hitting, the second is our user data being sent to the node server to be grabbed via a req.body

  $.post('/api/signUp', user).then(function (response) {
    //if it is an successfull login we send the user to their profile page by altering the URL. the server picks up on this URL change and routes us to the correct page.
    window.location.replace("/profile/" + user.username)
  })

})