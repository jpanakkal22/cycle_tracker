$(document).ready(() => {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(data => {
    $(".member-name").text(data.firstName);
    console.log(data.firstName);
    $("#id-input").val(data.id);
  });
 
  postStats();
   
});

function postStats(){
  $(".enter").on("click", function(event) {      
    event.preventDefault();
    var selectOption = $("select").children("option:selected").val();
    
    var userData = {
      challenge: selectOption,
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
        console.log("Added new info");               
    }); 
     
  }); 
}
