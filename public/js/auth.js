console.log("yo")



$("#signIn").on("click", function () {

  var user = {
    username: $("#username").val().trim(),
    password: $("#pw").val().trim()
  }
  console.log(user)

  $.post('/api/login', user).then(function (response) {
    console.log(response)
    if (response !== 'Successful login') {
      console.log("your password or username are spelt incorrectly")
    }else{
      console.log("you are logged in sucessfully")
      location = "/profiles"
    }
  })

})

$("#signUp").on("click", function () {

  var user = {
    name: $("#signUpName").val().trim(),
    username: $("#signUpUsername").val().trim(),
    password: $("#signUpPassword").val().trim(),
    email: $("#signUpEmail").val().trim(),
    profilePic: $('#profilePic').val().trim()
  }

  $.post('/api/signUp', user).then(function (response) {
    console.log(response)
  })

})