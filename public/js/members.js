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
    readStats();
  })
}

// Create - create cycle entry 
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
      method: "POST",
      data: userData
    }).then(() => {
      location.reload();
      readStats();             
    }); 

    // Clear input fields after data is sent
    $("#miles-input").val("");
    $("#duration-input").val("");        
  });
}

// Read - retrieve cycle entries from database
const readStats = () => {
  $.get("/api/all_stats/" + userId, (data) => { 
        
    // Add information to HTML
    for (let i = 0; i < data.allData.length; i++) {
      const tableRow = $("<tr>");
      $("#tableBody").append(tableRow);
      let dateX = (data.allData[i].date);
      let tableDate = new Date(dateX).toLocaleDateString("en-US");
      const tableData1 = $("<td hidden>").text(data.allData[i].id);
      const tableData2 = $("<td>").text(tableDate);
      const tableData3 = $("<td class='edit-data'>").text(data.allData[i].miles);      
      const tableData4 = $("<td class='edit-data'>").text(data.allData[i].duration);      
      const checkBtn = $("<td>" + "<button type='button' class='btn change' disabled>" + "<i class='bi bi-check2-circle'>");
      const deleteBtn = $("<td>" + "<button type='button' class='btn change' disabled>" + "<i class='bi bi-x-square'>")
      tableRow.append(tableData1, tableData2, tableData3, tableData4, checkBtn, deleteBtn);
    }
    // Add total miles and duration to HTML
    $("#miles").text(`${data.totalMiles}${' total miles'}`);
    $("#duration").text(`${data.totalDuration}${ ' total min'}`);      
  }); 
}

// Add contenteditable attribute to miles and duration table data when Edit button is clicked
$("#editBtn").click(() => {  
  $(".edit-data").attr("contenteditable", "true");
  $(".change").attr("disabled", false);
});


// Using event delegation to capture click events for dynamically created buttons
$("#tableBody").click(event => {  
  const par = $(event.target).parentsUntil("tbody");
  let child;

  if (event.target.matches("i.bi.bi-check2-circle")) { 
    child = par[2].children;   

    const changedData = {
      UserId: userId,
      dataId: child[0].innerHTML,
      miles: child[2].innerHTML,
      duration: child[3].innerHTML 
    }   

    // Update table data and send PUT request
    $.ajax("/api/cycle_data", {
      method: "PUT",      
      data: changedData
    }).then(() => {
      location.reload();
      readStats();             
    });      
  }
  // Delete table row with DELETE request
  else if (event.target.matches("i.bi.bi-x-square")) {
    child = par[2].children;

    $.ajax("api/cycle_data", {
      method: "DELETE",
      data: {
        UserId: userId,
        dataId: child[0].innerHTML
      }
    }).then(() => {
      location.reload();
      readStats();
    });
  }  
})



