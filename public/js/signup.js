$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const firstNameInput = $("input#firstName-input");
 
  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", (event) => {
    event.preventDefault();
    const userData = {
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

  const signUpUser = signUpInfo => {
    // Send user information to database along signup route
    $.post("/api/signup", signUpInfo)
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleSignUpErr);
  }

  const handleSignUpErr = err => {
    $(".msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
