$(function () {
  $(document).ready(() => {
      
    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
    $.get("/api/user_data").then(data => {
      $("#id-input").val(data.id);
    });

    postStats();
       
  });     
});

function postStats(){
  $(".btn").on("click", function(event) {      
    event.preventDefault();
    var selectOption = $("select").children("option:selected").val();
    
    var userData = {
      challenge: selectOption,
      goal: $("#goal-input").val().trim(),
      miles: $("#miles-input").val().trim(),
      duration: $("#duration-input").val().trim(),      
      steps: $("#steps-input").val().trim(),
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




  