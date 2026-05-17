(function () {
    const authBackBtn = document.getElementById('authBackBtn');
    const authTitle = document.getElementById('authTitle');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegister = document.getElementById('switchToRegister');
    const authFooterText = document.getElementById('authFooterText');
    
    function showLoginForm() {
        authBackBtn.classList.remove('visible');
        setTimeout(() => {
            authTitle.textContent = 'Đăng nhập';
            loginForm.classList.add('active');
            registerForm.classList.remove('active');
            authFooterText.innerHTML = 'Chưa có tài khoản? <span id="switchToRegisterAgain" class="auth-popup__footer-link">Đăng ký ngay</span>';
            document 
            .getElementById('switchToRegisterAgain')
            .addEventListener('click', showRegisterForm);
        }, 150);
    }
    function showRegisterForm() {
        authTitle.textContent = 'Đăng ký';
        loginForm.classList.remove('active');
        registerForm.classList.add('active');
        authBackBtn.classList.add('visible');
        authFooterText.innerHTML = 'Đã có tài khoản? <span id="switchToLogin" class="auth-popup__footer-link">Đăng nhập ngay</span>';
        document
        .getElementById('switchToLogin')
        .addEventListener('click', showLoginForm);
    }
    switchToRegister.addEventListener('click', showRegisterForm);
    authBackBtn.addEventListener('click', showLoginForm);
    
    document.querySelectorAll('.auth-input-wrapper_toggle').forEach(function (toggle) {
        toggle.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const input = document.getElementById(targetId);
            const icon = this.querySelector('i');
            if (input.type === 'password') {
                input.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                input.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    });
    
    const registerPasswordInput = document.getElementById('registerPassword');
    const strengthBar = document.querySelectorAll('.auth-password-strength_bar');
    console.log(registerPasswordInput);
    console.log(strengthBar);
    registerPasswordInput.addEventListener('input', function () {
        const val = this.value;
        let strength = 0; 
        if (val.length >= 6) strength++;
        if (val.length >= 8) strength++;
        if (/[A-Z]/.test(val) && /[0-9]/.test(val)) strength++;
        if (/[^A-Za-z0-9]/.test(val)) strength++;
        
        strengthBar.forEach(function (bar, i) {
            bar.classList.remove('weak', 'medium', 'strong');
            if (i < strength) {
                if (strength <= 1) {
                    bar.classList.add('weak');
                }
                else if (strength === 2) { 
                    bar.classList.add('medium');
                }
                else {
                    bar.classList.add('strong');
                }
            } 
        });
    });
    function clearAllErrors() {
        document.querySelectorAll(".group-error").forEach(function (el) {
            el.classList.remove("visible");
        });
        document.querySelectorAll(".auth-input-wrapper input").forEach(function (el) {
            el.classList.remove("error");
        });
    }
    
    function closeAuthPopup() {
        const overlayBg = document.getElementsByClassName("overlay-popup")[0];
        const popupLogin = document.getElementsByClassName("auth-popup")[0];
        overlayBg.style.display = "none";
        popupLogin.style.display = "none";
    }
    
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault(); 
        clearAllErrors();
        let valid = true;
        
        const email = document.getElementById("loginEmail");
        const password = document.getElementById("loginPassword");
        
        if (!email.value.trim()) {
            document.getElementById("loginEmailError").classList.add("visible");
            email.classList.add("error");
            valid = false;
        }
        if (!password.value.trim()) {
            document.getElementById("loginPasswordError").classList.add("visible");
            password.classList.add("error");
            valid = false;
        }
        if (valid) {
            alert("Đăng nhập thành công! (Demo)");
            closeAuthPopup();
        }
    });
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();
        clearAllErrors();
        var valid = true;
        var name = document.getElementById("registerName");
        var email = document.getElementById("registerEmail");
        var password = document.getElementById("registerPassword");
        var confirmPassword = document.getElementById("registerConfirmPassword");
        
        if (!name.value.trim()) {
            document.getElementById("registerNameError").classList.add("visible");
            name.classList.add("error");
            valid = false;
        }
        if (!email.value.trim() || !/\S+@\S+\.\S+/.test(email.value)) {
            document.getElementById("registerEmailError").classList.add("visible");
            email.classList.add("error");
            valid = false;
        }
        if (password.value.length < 6) {
            document.getElementById("registerPasswordError").classList.add("visible");
            password.classList.add("error");
            valid = false;
        }
        if (password.value !== confirmPassword.value) {
            document.getElementById("registerConfirmError").classList.add("visible");
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
})();

