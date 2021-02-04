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
      location.reload();
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
    for (let i = 0; i < data.allData.length; i++) {
      const tableRow = $("<tr>");
      $("#tableBody").append(tableRow);
      let dateX = (data.allData[i].date);
      let tableDate = new Date(dateX).toLocaleDateString("en-US");
      const tableData1 = $("<td>").text(tableDate);
      tableData1.css("color", "white");
      const tableData2 = $("<td>").text(data.allData[i].miles);
      tableData2.css("color", "white");
      const tableData3 = $("<td>").text(data.allData[i].duration);
      tableData3.css("color", "white");
      tableRow.append(tableData1, tableData2, tableData3);
    }
    // Add total miles and duration to HTML
    $("#miles").text(`${data.totalMiles}${' total miles'}`);
    $("#duration").text(`${data.totalDuration}${ ' total min'}`);      
  }); 
}



