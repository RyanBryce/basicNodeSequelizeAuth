var userData;
$.get("/api/session").then(function(data) {
  console.log(data);
  userData = data
  $('#userProfHeading').text(data.currentUser.name)
  $('#userProf').attr("src", data.currentUser.profilePic)
})

$("#updateProfile").on("click", function () {
  if(!userData){
    
  }
  var user = {
    name: $("#signUpName").val().trim(),
    username: $("#signUpUsername").val().trim(),
    password: $("#signUpPassword").val().trim(),
    email: $("#signUpEmail").val().trim(),
    profilePic: $('#profilePic').val().trim()
  }

  $.put('/api/updateProfile', user).then(function (response) {
    console.log(response)
  })

})