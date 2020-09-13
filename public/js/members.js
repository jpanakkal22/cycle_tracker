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

    $("#miles-input").val("");
    $("#duration-input").val("");
    $("#id-input").val("");
     
  });

}

function updateStats(){
  $(".update").on("click", function(event){
    event.preventDefault();

    $.get("/api/all-stats", function(data){  
      
      // Filter out database for entries that match the user logged in
      var newLog = data.filter(x => x.UserId === userId);

      // Add information to HTML
      $("#challenge").text(newLog[0].challenge);
      $("#miles").text(`${newLog[0].miles}${' total miles'}`);
      $("#duration").text(`${newLog[0].duration}${ ' total min'}`);
      
    });     
  });
}

updateStats();

