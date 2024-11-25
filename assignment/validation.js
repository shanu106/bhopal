document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registrationForm");
    const submitButton = document.getElementById("submitButton");
  
    // Helper function to display error messages
    function showError(id, message) {
      document.getElementById(id).textContent = message;
    }
  
    // Helper function to clear error messages
    function clearError(id) {
      document.getElementById(id).textContent = "";
    }
  
    // Validation Functions
    function validateName() {
      const name = document.getElementById("name").value.trim();
      if (name === "") {
        showError("nameError", "Name is required.");
        return false;
      }
      clearError("nameError");
      return true;
    }
  
    function validateEmail() {
      const email = document.getElementById("email").value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.match(emailPattern)) {
        showError("emailError", "Enter a valid email address.");
        return false;
      }
      clearError("emailError");
      return true;
    }
  
    function validatePhone() {
      const phone = document.getElementById("phone").value.trim();
      if (!/^\d{10}$/.test(phone)) {
        showError("phoneError", "Enter a valid 10-digit phone number.");
        return false;
      }
      clearError("phoneError");
      return true;
    }
  
    function validateAge() {
      const age = document.getElementById("age").value;
      if (age < 18 || age === "") {
        showError("ageError", "You must be 18 or older.");
        return false;
      }
      clearError("ageError");
      return true;
    }
  
    function validateGender() {
      const male = document.getElementById("male").checked;
      const female = document.getElementById("female").checked;
      if (!male && !female) {
        showError("genderError", "Please select your gender.");
        return false;
      }
      clearError("genderError");
      return true;
    }
  
    function validateEventType() {
      const eventType = document.getElementById("eventType").value;
      if (eventType === "") {
        showError("eventTypeError", "Please select an event type.");
        return false;
      }
      clearError("eventTypeError");
      return true;
    }
  
    // Final validation on form submission
    function validateForm() {
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isPhoneValid = validatePhone();
      const isAgeValid = validateAge();
      const isGenderValid = validateGender();
      const isEventTypeValid = validateEventType();
  
      return (
        isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isAgeValid &&
        isGenderValid &&
        isEventTypeValid
      );
    }
  
    // Event listeners for real-time validation
    document.getElementById("name").addEventListener("input", validateName);
    document.getElementById("email").addEventListener("input", validateEmail);
    document.getElementById("phone").addEventListener("input", validatePhone);
    document.getElementById("age").addEventListener("input", validateAge);
    document.getElementsByName("gender").forEach((radio) =>
      radio.addEventListener("change", validateGender)
    );
    document.getElementById("eventType").addEventListener("change", validateEventType);
  
    // Submit button click event
    submitButton.addEventListener("click", function () {
      if (validateForm()) {
        document.getElementById("successMessage").textContent =
          "Thank you for registering!";
        form.reset();
      } else {
        document.getElementById("successMessage").textContent = "";
        alert("Please correct the errors in the form before submitting.");
      }
    });
  });
  