// Store id in variable
const userId;
 
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

const postStats = () => {
  $(".enter").on("click", (event) => {      
    event.preventDefault();
     
    const userData = {      
      miles: $("#miles-input").val().trim(),
      duration: $("#duration-input").val().trim(),      
      id: $("#id-input").val()      
    };
        
    // Send the POST request.
    $.ajax("/api/user-data", {
      type: "POST",
      data: userData
    }).then(() => {
       updateStats();             
    }); 

    // Clear input fields after data is sent
    $("#miles-input").val("");
    $("#duration-input").val("");
    $("#id-input").val("");     
  });
}

const updateStats = () => {
  $.get("/api/all-stats", (data) => {     
   if (data.length === 0) {
     return; 
   } else {
      // Filter out database for entries that match the user logged in
      const newLog = data.filter(x => x.UserId === userId);

      // Add information to HTML
      $("#miles").text(`${newLog[0].miles}${' total miles'}`);
      $("#duration").text(`${newLog[0].duration}${ ' total min'}`); 
    }       
  }); 
}



