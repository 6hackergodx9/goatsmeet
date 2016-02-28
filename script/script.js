  var rootRef = new Firebase("https://goatsmeet.firebaseio.com");
    rootRef.on("child_added", function(snapshot) {
          console.log("from firebase",snapshot.val());  // Alerts "San Francisco"
        });
var newPost;
var author;
$( document ).ready(function() {
  /** map **/
    var map;
    require(["esri/map","esri/toolbars/draw",
        "esri/symbols/SimpleMarkerSymbol","esri/Color","esri/geometry/Point", "esri/SpatialReference","esri/graphic", "dojo/domReady!"], function(Map,Draw,
        SimpleMarkerSymbol,Color,Point,SpatialReference, Graphic) {
      map = new Map("map", {
        basemap: "topo",  
        center: [-121.5863249, 37.142945],
        zoom: 13
      });
    var markerSymbol = new SimpleMarkerSymbol();
        //markerSymbol.setPath("M16,4.938c-7.732,0-14,4.701-14,10.5c0,1.981,0.741,3.833,2.016,5.414L2,25.272l5.613-1.44c2.339,1.316,5.237,2.106,8.387,2.106c7.732,0,14-4.701,14-10.5S23.732,4.938,16,4.938zM16.868,21.375h-1.969v-1.889h1.969V21.375zM16.772,18.094h-1.777l-0.176-8.083h2.113L16.772,18.094z");
        //markerSymbol.setColor(new Color("#00FFFF"));
    var pt = new Point(-121.5863249, 37.142945,SpatialReference({ wkid: 4326 }));
    //var graphic = new Graphic(pt,markerSymbol);
    map.on("load",function(){
      map.graphics.add(new Graphic(pt, markerSymbol));
    });
    });
    
    /** end of map **/
    var submit = document.getElementById("submit");
    var name = document.getElementById("name");
    var description = document.getElementById("description");
    var stock = document.getElementById("stock");
    var state = document.getElementById("state");
    var url = document.getElementById("imgurl");
    var postsRef = rootRef.child("posts");
    submit.addEventListener("click",function(){
      var name = document.getElementById("name");
      var description = document.getElementById("description");
      if(name.value.length <= 0 || description.value.length <= 0){
        swal({   title: "Incomplete!", text: "Your forms are incomplete",   type: "error",   confirmButtonText: "I'll fill them in" });
        console.log("Incomplete!!!");
      }
      else{
          rootRef.push({
          name: name.value,
          description: description.value,
          stock: stock.value,
          url:url.value
          }
        );
        
        rootRef.on("child_added", function(snapshot, prevChildKey) {
        newPost = snapshot.val();
        console.log("Author: " + newPost.author);
        author = newPost.author;
        console.log("Title: " + newPost.title);
        console.log("Previous Post ID: " + prevChildKey);
});
        
        rootRef.child("name").on("child_added", function(snapshot) {
          alert(snapshot.val());  // Alerts "San Francisco"
        });
        var row = document.getElementsByClassName("row");
        var div = document.createElement("div");
        div.className += " col-xs-6 col-lg-4";
        var name = document.createElement("h2");
        name.innerHTML = newPost.name;
        name.className += " vendor-name"
        var img = document.createElement("img");
        img.src = url.innerHTML;
        img.className += " vendor-pic";
        var description = document.createElement("p");
        description.innerHTML = newPost.description;
        description.className += " vendor-description";
        var state = document.createElement("h3");
        state.innerHTML = newPost.state;
        $(".row").append(div);
        $(name).append(div)
        $(img).append(div);
        $(description).append(div);
        $(state).append(div);
        swal({ title:"Success!", text:"Thanks " + name.value + "! You're now an official vendor", type:"success", confirmButtonText: "Noice!"});
      }
    });
    rootRef.authWithOAuthPopup("google", function(error, authData) {
          if (error) {
            console.log("Login Failed!", error);
          } else {
            console.log("Authenticated successfully with payload:", authData);
          }
    });
    
    
    function start_login(){
    rootRef.authWithOAuthPopup("google", function(error, authData) {
  if (error) {
    console.log("Login Failed!", error);
  } else {
    console.log("Authenticated successfully with payload:", authData);
  }
});
    }
    /**Sorry**/
   var sinchClient = new SinchClient({
        applicationKey: '5ef954f3-a692-4aed-89b5-b121bc27887e',
        capabilities: {calling: true},
    });
    
    //store the username of the current user
    var global_username = '';
    $('button#createUser').on('click', function(event) {
        event.preventDefault();
        $('button#createUser').attr('disabled', true);
        $('button#loginUser').attr('disabled', true);
         clearError();
         var username = $('input#username').val();
         var password = $('input#password').val();
        var loginObject = {username: username, password: password};
        sinchClient.newUser(loginObject, function(ticket) {
              sinchClient.start(ticket, function() {
                global_username = username;
                   showCall();
              }).fail(handleError);
        }).fail(handleError);
    });
    $('button#loginUser').on('click', function(event) {
        event.preventDefault();
        $('button#createUser').attr('disabled', true);
        $('button#loginUser').attr('disabled', true);
        clearError();
        var username = $('input#username').val();
        var password = $('input#password').val();
        var loginObject = {username: username, password: password};
        sinchClient.start(loginObject, function() {
              global_username = username;
            showCall();
        }).fail(handleError);
    });
    //handle errors
    var handleError = function(error) {
         $('button#createUser').attr('disabled', false);
         $('button#loginUser').attr('disabled', false);
         $('div.error').text(error.message);
    }
    //clear out old errors
    var clearError = function() {
        $('div.error').text("");
    }
    //show the call screen
    var showCall = function() {
        $('form#auth').css('display', 'none');
        $('div#call').show();
        $('span#username').append(global_username);
    }
   
      var callListener = {
        onCallProgressing: function(call) {
            $('div#callLog').append("<div>Ringing...</div>");
        },
        onCallEstablished: function(call) {
            $('audio#incoming').attr('src', call.incomingStreamURL);
            $('div#callLog').append("<div>Call answered</div>");
        },
        onCallEnded: function(call) {
            $('audio#incoming').removeAttr('src');
            $('button#call').removeAttr('disabled');
            $('button#answer').removeAttr('disabled');
            $('div#callLog').append("<div>Call ended</div>");
        }
    }
    var button1 = document.getElementById("button1");
    var button2 = document.getElementById("button2");
    
     var callClient = sinchClient.getCallClient();
    var call;
    
    $('button#call').click(function(event) {
        event.preventDefault();
        clearError();
        $('button#call').attr('disabled', 'disabled');
        $('button#answer').attr('disabled', 'disabled');
        $('div#callLog').append("<div>Calling " + $('input#callUsername').val() + "</div>");
        call = callClient.callUser($('input#callUsername').val());
        call.addEventListener(callListener);
    });
    
     $('button#hangup').click(function(event) {
        event.preventDefault();
        clearError();
        call && call.hangup();
    });

  callClient.addEventListener({
        onIncomingCall: function(incomingCall) {
        $('div#callLog').append("<div>Incoming call from " + incomingCall.fromId + "</div>");
        call = incomingCall;
        call.addEventListener(callListener);
        }
    });
    
   
});

