$(document).ready(function() {
  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  var firstNameInput = $("input#firstName-input");
 
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      firstName: firstNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password || !userData.firstName) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    firstNameInput.val("");
    emailInput.val("");
    passwordInput.val("");    
  });

  // Does a post to the signup route. If successful, we are redirected to the allexercises page
  // Otherwise we log any errors
  function signUpUser() {
    var userData = {
      firstName: firstNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()      
    };

    $.post("/api/signup", userData)
      .then(function(data) {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    console.log(err);
    $(".msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
