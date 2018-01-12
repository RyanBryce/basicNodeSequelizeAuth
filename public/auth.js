console.log("yo")



$("#signIn").on("click", function () {

  var user = {
    username: $("#username").val().trim(),
    password: $("#pw").val().trim()
  }

  $.get('/api/login', user).then(function (response) {
    console.log(response)
  })

})

$("#signUp").on("click", function () {

  var user = {
    name: $("#signUpName").val().trim(),
    username: $("#signUpUsername").val().trim(),
    password: $("#signUpPassword").val().trim(),
    email: $("#signUpEmail").val().trim(),

  }

  $.post('/api/signUp', user).then(function (response) {
    console.log(response)
  })

})