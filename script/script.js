$( document ).ready(function() {
    var title = document.getElementById("title");
    var input = document.getElementById("input");
    var submit = document.getElementById("submit");
    var image = document.getElementById("vendor-image");
    var rootRef = new Firebase("https://goatsmeet.firebaseio.com");
    var userRef = rootRef.child(user);
    var nameRef = rootRef.child(user + "/name");
    var descRef = rootRef.child(user + "/description");
    var coordX = rootRef.child(user + "/coordinates/x");
    var coordY = rootRef.child(user + "/coordinates/y");
    submit.addEventListener("click",function(){
      user =  "matthewgaim";
      userRef.push(user);
      nameRef.push("Matthew Gaim");
      descRef.push("Chill dude.");
      coordX.push(-122.4297259);
      coordY.push(37.8117919);
      console.log("Firebase worked!");
    });
    rootRef.authWithOAuthPopup("google", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
    });
    var a = document.getElementById("sidebar");
    a.setAttribute("id", "sidebar1");
    a.setAttribute("onclick", "start_login");
    
    function start_login(){
    ref.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});
    }
    /** map **/
    var map;
    require(["esri/map", "dojo/domReady!"], function(Map) {
      map = new Map("map", {
        basemap: "topo",  
        center: [-122.4297259, 37.8117919],
        zoom: 13
      });
    });
    /** end of map **/
});
