$(function () {  
    $(document).ready(() => {        
      // getAllStats();          
    });     
  });

  // Function to get all challenge information from database
  function getAllStats(){
    $.get("/api/all-stats", function(data){      
      $(".container").text(JSON.stringify(data));
    }); 
  }