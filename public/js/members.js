// Store id in variable
let userId;
 
$(document).ready(() => {  
  userInfo();  
  postStats();       
});

// GET request to get user info after login
const userInfo = () => {
  $.get("/api/user_data").then(data => {    
    userId = data.id;
    $(".member-name").text(`${data.firstName}${"!"}`);
    $("#id-input").val(data.id);
    
  }).then(() => {
    updateStats();
  })
}

const postStats = () => {
  $(".enter").on("click", (event) => {      
    event.preventDefault();
     
    const userData = {      
      miles: $("#miles-input").val().trim(),
      duration: $("#duration-input").val().trim(),      
      id: $("#id-input").val()      
    };
        
    // Send the POST request.
    $.ajax("/api/cycle_data", {
      type: "POST",
      data: userData
    }).then(() => {
       updateStats();             
    }); 

    // Clear input fields after data is sent
    $("#miles-input").val("");
    $("#duration-input").val("");        
  });
}

const updateStats = () => {
  $.get("/api/all_stats/" + userId, (data) => {    
    // Add information to HTML
    $("#miles").text(`${data.miles}${' total miles'}`);
    $("#duration").text(`${data.duration}${ ' total min'}`);      
  }); 
}



