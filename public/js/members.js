 // Store id in variable
 var userId;
 
$(document).ready(() => {

  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    userId = data.id;
    $(".member-name").text(`${data.firstName}${"!"}`);
    $("#id-input").val(data.id);
  });
 
  postStats();
  
  updateStats();
   
});

function postStats(){
  $(".enter").on("click", function(event) {      
    event.preventDefault();
     
    var userData = {      
      miles: $("#miles-input").val().trim(),
      duration: $("#duration-input").val().trim(),      
      id: $("#id-input").val()      
    };
        
    // Send the POST request.
    $.ajax("/api/user-data", {
      type: "POST",
      data: userData
    }).then(
      function() {
       updateStats();             
    }); 

    $("#miles-input").val("");
    $("#duration-input").val("");
    $("#id-input").val("");     
  });
}

function updateStats(){
  $.get("/api/all-stats", function(data){     
   if (data.length === 0) {
     return; 
   } else {
      // Filter out database for entries that match the user logged in
      var newLog = data.filter(x => x.UserId === userId);

      // Add information to HTML
      $("#miles").text(`${newLog[0].miles}${' total miles'}`);
      $("#duration").text(`${newLog[0].duration}${ ' total min'}`); 
    }       
  }); 
}



