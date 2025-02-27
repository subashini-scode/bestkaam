// counter effect
function counterEffect(){
    let counted = false;
      $(window).scroll(function() {
          let oTop = $('.counter-section').offset().top - window.innerHeight;
          if (!counted && $(window).scrollTop() > oTop) {
              $('.counter').each(function() {
                  let $this = $(this),
                      countTo = $this.attr('data-count');
                  $({ countNum: $this.text() }).animate({
                      countNum: countTo
                  }, {
                      duration: 2000,
                      easing: 'swing',
                      step: function() {
                          $this.text(Math.floor(this.countNum));
                      },
                      complete: function() {
                          $this.text(this.countNum);
                      }
                  });
              });
              counted = true;
          }
      });
}

//   togglepassword
function autoCompleteSearch() {
    let jobTitles = ["UI Designer", "UX Researcher", "Android Developer", "Software Engineer", "Product Manager"];
    let jobLocations = ["New York", "San Francisco", "Los Angeles", "Chicago", "Bangalore"];
    $("#jobTitle").autocomplete({
        source: jobTitles
    }).keyup(function() {
        $(this).autocomplete("search", $(this).val());
    });
    $("#jobLocation").autocomplete({
        source: jobLocations
    }).keyup(function() {
        $(this).autocomplete("search", $(this).val());
    });
}

// passwordToggle
  function togglePassword() {
      let passwordField = document.getElementById("userpassword");
      let eyeIcon = document.getElementById("eyeIcon");

      if (passwordField.type === "password") {
          passwordField.type = "text";
          eyeIcon.classList.remove("mdi-eye-off");
          eyeIcon.classList.add("mdi-eye-outline");
          
      } else {
          passwordField.type = "password";
          eyeIcon.classList.remove("mdi-eye-outline");
          eyeIcon.classList.add("mdi-eye-off");
      }
  }

  // form valitation
  function LoginFormValitation() {
    
      document.getElementById("loginForm").addEventListener("submit", function (event) {
          event.preventDefault(); // Prevent form submission
    
          const username = document.getElementById("username");
          const password = document.getElementById("userpassword");
          const nameLabel = document.getElementById("name-label");
          const passLabel = document.getElementById("pass-label");
    
          let isValid = true;
    
          // Username Validation
          if (username.value.trim() === "") {
              setError(username, "usererr", "usersuccess");
              isValid = false;
          } else {
              setSuccess(username, "usererr", "usersuccess");
          }
    
          // Password Validation
          if (password.value.trim() === "") {
              setError(password, "passerr", "passsuccess");
              isValid = false;
          } else {
              setSuccess(password, "passerr", "passsuccess");
          }
    
          // if (isValid) {
          //     alert("Form submitted successfully!");
          // }
      });
      function setError(input, errorId, successId) {
          let errorDisplay = document.getElementById(errorId);
          let successDisplay = document.getElementById(successId);
          let label = input.nextElementSibling;
          label.style.color = "red";
          input.classList.remove("border-success");
          input.classList.add("border-danger");
      }
    
      function setSuccess(input, errorId, successId) {
          let errorDisplay = document.getElementById(errorId);
          let successDisplay = document.getElementById(successId);
          console.log(errorDisplay);
          console.log(successDisplay); 
          let label = input.nextElementSibling;
          label.style.color = "";
          input.classList.remove("border-danger");
          input.classList.add("border-success");
      }
  }

//   resgister progress-bar

function RegprogressBar() {
    document.addEventListener("DOMContentLoaded", function() {
        let currentStep = 0;
        const steps = document.querySelectorAll(".wizard-step");
        const progressSteps = document.querySelectorAll(".progress-step");
        const progressBar = document.getElementById("progress-bar");
        const nextBtns = document.querySelectorAll(".next-btn");
        const prevBtns = document.querySelectorAll(".prev-btn");

        function updateProgress() {
            steps.forEach((step, index) => step.classList.toggle("active", index === currentStep));
            progressSteps.forEach((step, index) => step.classList.toggle("active", index <= currentStep));
            progressBar.style.width = `${((currentStep + 1) / steps.length) * 100}%`;
        }

        nextBtns.forEach(btn => btn.addEventListener("click", () => {
            if (currentStep < steps.length - 1) {
                currentStep++;
                updateProgress();
            }
        }));

        prevBtns.forEach(btn => btn.addEventListener("click", () => {
            if (currentStep > 0) {
                currentStep--;
                updateProgress();
            }
        }));

        document.getElementById("multiStepForm").addEventListener("submit", function(event) {
            event.preventDefault();
            alert("Form submitted successfully!");
        });

        updateProgress();
    });
}