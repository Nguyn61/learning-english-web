// ========== YouPass Collect Popup ==========
const btn = document.getElementById("handleOpenPopup");
const popup = document.getElementById("popup-youPass-collect");
const overlayBg = document.getElementsByClassName("overlay-popup")[0];
btn.addEventListener("click", function () {
  popup.style.display = "block";
  overlayBg.style.display = "block";
});

// ========== Popup Card Selection & Navigation ==========
(function () {
  var cardRealTest = document.getElementById("cardRealTest");
  var cardPractice = document.getElementById("cardPractice");
  var btnStartExam = document.getElementById("btnStartExam");
  var selectedMode = null;

  function selectCard(card, mode) {
    // Remove selection from both cards
    cardRealTest.style.border = "";
    cardPractice.style.border = "";
    cardRealTest.style.boxShadow = "";
    cardPractice.style.boxShadow = "";

    // Highlight selected card
    card.style.border = "2.5px solid var(--color-primary)";
    card.style.boxShadow = "0 4px 16px rgba(76, 175, 132, 0.2)";
    selectedMode = mode;
  }

  cardRealTest.addEventListener("click", function () {
    selectCard(cardRealTest, "real");
  });

  cardPractice.addEventListener("click", function () {
    selectCard(cardPractice, "practice");
  });

  btnStartExam.addEventListener("click", function (e) {
    e.preventDefault();
    if (selectedMode === "practice") {
      window.location.href = "exam.html";
    } else if (selectedMode === "real") {
      alert("Giao diện Thi thật đang được phát triển!");
    } else {
      alert("Vui lòng chọn một giao diện làm bài!");
    }
  });
})();

// ========== Auth Popup Logic ==========
(function () {
  const btnLogin = document.getElementById("btnLogin");
  const authOverlay = document.getElementById("authOverlay");
  const authPopup = document.getElementById("authPopup");
  const authCloseBtn = document.getElementById("authCloseBtn");
  const authBackBtn = document.getElementById("authBackBtn");
  const authTitle = document.getElementById("authTitle");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const switchToRegister = document.getElementById("switchToRegister");
  const authFooterText = document.getElementById("authFooterText");

  // Open popup
  btnLogin.addEventListener("click", function () {
    authOverlay.classList.add("active");
    authPopup.classList.add("active");
    document.body.style.overflow = "hidden";
  });

  // Close popup
  function closeAuthPopup() {
    authOverlay.classList.remove("active");
    authPopup.classList.remove("active");
    document.body.style.overflow = "";
    // Reset to login form
    setTimeout(function () {
      showLogin();
      clearAllErrors();
    }, 350);
  }

  authCloseBtn.addEventListener("click", closeAuthPopup);
  authOverlay.addEventListener("click", closeAuthPopup);

  // Switch forms
  function showLogin() {
    loginForm.classList.add("active");
    registerForm.classList.remove("active");
    authTitle.textContent = "Đăng nhập";
    authBackBtn.classList.remove("visible");
    authFooterText.innerHTML =
      'Chưa có tài khoản? <span class="auth-popup__footer-link" onclick="document.getElementById(\'switchToRegister\').click()">Đăng ký ngay</span>';
    bindFooterLink();
  }

  function showRegister() {
    registerForm.classList.add("active");
    loginForm.classList.remove("active");
    authTitle.textContent = "Đăng ký";
    authBackBtn.classList.add("visible");
    authFooterText.innerHTML =
      'Đã có tài khoản? <span class="auth-popup__footer-link" id="switchToLogin">Đăng nhập</span>';
    document
      .getElementById("switchToLogin")
      .addEventListener("click", function () {
        showLogin();
        clearAllErrors();
      });
  }

  function bindFooterLink() {
    var link = authFooterText.querySelector(".auth-popup__footer-link");
    if (link) {
      link.addEventListener("click", function () {
        showRegister();
        clearAllErrors();
      });
    }
  }

  switchToRegister.addEventListener("click", function () {
    showRegister();
    clearAllErrors();
  });

  authBackBtn.addEventListener("click", function () {
    showLogin();
    clearAllErrors();
  });

  // Password toggle
  document
    .querySelectorAll(".auth-input-wrapper__toggle")
    .forEach(function (toggle) {
      toggle.addEventListener("click", function () {
        var targetId = this.getAttribute("data-target");
        var input = document.getElementById(targetId);
        var icon = this.querySelector("i");
        if (input.type === "password") {
          input.type = "text";
          icon.classList.remove("fa-eye");
          icon.classList.add("fa-eye-slash");
        } else {
          input.type = "password";
          icon.classList.remove("fa-eye-slash");
          icon.classList.add("fa-eye");
        }
      });
    });

  // Password strength
  var registerPasswordInput = document.getElementById("registerPassword");
  var strengthBars = document.querySelectorAll(
    ".auth-password-strength__bar"
  );

  registerPasswordInput.addEventListener("input", function () {
    var val = this.value;
    var strength = 0;
    if (val.length >= 6) strength++;
    if (val.length >= 8) strength++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) strength++;
    if (/[^A-Za-z0-9]/.test(val)) strength++;

    strengthBars.forEach(function (bar, i) {
      bar.classList.remove("weak", "medium", "strong");
      if (i < strength) {
        if (strength <= 1) bar.classList.add("weak");
        else if (strength <= 2) bar.classList.add("medium");
        else bar.classList.add("strong");
      }
    });
  });

  // Clear errors
  function clearAllErrors() {
    document
      .querySelectorAll(".auth-form-group__error")
      .forEach(function (el) {
        el.classList.remove("visible");
      });
    document
      .querySelectorAll(".auth-input-wrapper input")
      .forEach(function (el) {
        el.classList.remove("error");
      });
  }

  // Login validation
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearAllErrors();
    var valid = true;
    var email = document.getElementById("loginEmail");
    var password = document.getElementById("loginPassword");

    if (!email.value.trim()) {
      document.getElementById("loginEmailError").classList.add("visible");
      email.classList.add("error");
      valid = false;
    }
    if (!password.value.trim()) {
      document
        .getElementById("loginPasswordError")
        .classList.add("visible");
      password.classList.add("error");
      valid = false;
    }
    if (valid) {
      alert("Đăng nhập thành công! (Demo)");
      closeAuthPopup();
    }
  });

  // Register validation
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();
    clearAllErrors();
    var valid = true;
    var name = document.getElementById("registerName");
    var email = document.getElementById("registerEmail");
    var password = document.getElementById("registerPassword");
    var confirmPassword = document.getElementById("registerConfirmPassword");

    if (!name.value.trim()) {
      document
        .getElementById("registerNameError")
        .classList.add("visible");
      name.classList.add("error");
      valid = false;
    }
    if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
      document
        .getElementById("registerEmailError")
        .classList.add("visible");
      email.classList.add("error");
      valid = false;
    }
    if (password.value.length < 6) {
      document
        .getElementById("registerPasswordError")
        .classList.add("visible");
      password.classList.add("error");
      valid = false;
    }
    if (password.value !== confirmPassword.value) {
      document
        .getElementById("registerConfirmError")
        .classList.add("visible");
      confirmPassword.classList.add("error");
      valid = false;
    }
    if (!document.getElementById("agreeTerms").checked) {
      alert("Vui lòng đồng ý với Điều khoản sử dụng.");
      valid = false;
    }
    if (valid) {
      alert("Đăng ký thành công! (Demo)");
      closeAuthPopup();
    }
  });

  // Close with ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && authPopup.classList.contains("active")) {
      closeAuthPopup();
    }
  });
})();
