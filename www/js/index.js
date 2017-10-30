$(document).ready(function () {
    var ref = firebase.database().ref("users/");
    ref.on("value", function (snapshot) {
        var total = snapshot.numChildren();
        console.log(total);
        localStorage.setItem("total", total);
        console.log(localStorage.getItem("userId"));
    });
});
function toIndex() {
    window.location = "index.html";
}
function toRegis() {
    window.location = "register.html";
}
function toLogin() {
    window.location = "login.html";
}
function register() {
    var set_userId = parseInt(localStorage.getItem("total"));
    firebase.database().ref('users/' + set_userId).set({
        email: $("#email_regis").val(),
        fullname: $("#name_regis").val(),
        username: $("#user_regis").val(),
        password: $("#pass_regis").val(),
    });
    window.location = "login.html";
}
function login() {
    var total = parseInt(localStorage.getItem("total"));
    for (i = 0; i < total; i++) {
        var ref = firebase.database().ref("users/" + i + "/username");
        ref.on("value", function (snapshot) {
            var username = snapshot.val();
            if ($("#user_login").val() == username) {
                var ref = firebase.database().ref("users/" + i + "/password");
                ref.on("value", function (snapshot) {
                    var password = snapshot.val();
                    if ($("#pass_login").val() == password) {
                        localStorage.setItem("userId", i);
                        window.location = "pageHome.html";
                    }
                });
            }
        });
    }
}
//map
function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: uluru
    });
    var marker = new google.maps.Marker({
      position: uluru,
      map: map
    });
  }

