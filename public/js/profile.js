var userData;
console.log(window.location)
var userUrl = window.location.pathname.slice(9, 100).trim()

console.log(typeof userUrl)
if(userUrl == ''){
  console.log("yay")
}else{
  console.log("no");
}
$.get("/api/session").then(function (data) {
  console.log(data);
  userData = data
  $('#userProfHeading').text(data.currentUser.name)
  $('#userProf').attr("src", data.currentUser.profilePic)
})

$("#updateProfile").on("click", function () {
  if (!userData) {

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
  }).then(res => console.log(res))

})