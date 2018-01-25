var userData;
console.log(window.location.pathname.slice(9, 100).trim())
var userUrl = window.location.pathname.slice(9, 100).trim()
console.log(userUrl)
console.log(typeof userUrl)
if (userUrl == '') {
  console.log("yay")
  $.get("/api/session").then(function(data) {
    console.log(data);
    userData = data
    $('#userProfHeading').text(data.currentUser.name)
    $('#userProfImg').attr("src", data.currentUser.profilePic)
  })
} else {
  $.get("/api/profile/" + userUrl).then(function (data) {
    console.log(data);
    userData = data
    $('#userProfHeading').text(userData.name)
    $('#userProf').attr("src", userData.profilePic)
  })
}


$("#updateProfile").on("click", function () {
  if(!userData){
    
  }
  var user = {
    name: $("#signUpName").val().trim(),
    username: $("#signUpUsername").val().trim(),
    email: $("#signUpEmail").val().trim(),
    profilePic: $('#profilePic').val().trim()
  }

  $.ajax({
    method: "PUT",
    url: "/api/update/" + userData.currentUser.name,
    data: user
  }) .then(res => console.log(res))

})