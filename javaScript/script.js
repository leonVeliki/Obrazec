document.addEventListener('DOMContentLoaded', () => {
    const signupForm = document.getElementById('signupForm');
    const customGender = document.querySelector('.custom-gender');
    
    // Show/hide custom gender fields and handle pronoun validation
    const pronounSelect = document.querySelector('.pronoun-select');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    
    genderRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            customGender.style.display = e.target.value === 'custom' ? 'block' : 'none';
            
            // Toggle required attribute based on custom gender selection
            if (e.target.value === 'custom') {
                pronounSelect.setAttribute('required', '');
            } else {
                pronounSelect.removeAttribute('required');
            }
        });
    });

    // Reset custom validation messages on input
    const emailInput = document.querySelector('input[name="contact"]');
    const passwordInput = document.getElementById('password');
    
    if (emailInput) {
        emailInput.addEventListener('input', () => {
            emailInput.setCustomValidity('');
        });
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            passwordInput.setCustomValidity('');
        });
    }

    // Handle form submission with validation
    if (signupForm) {
        signupForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const genderValue = document.querySelector('input[name="gender"]:checked')?.value;
            
            // Update pronoun select required state
            if (genderValue === 'custom') {
                pronounSelect.setAttribute('required', '');
            } else {
                pronounSelect.removeAttribute('required');
            }

            // Validate email or phone number format
            const emailInput = document.querySelector('input[name="contact"]');
            const contactValue = emailInput.value.trim();
            
            // Check if it's a phone number (only digits, spaces, +, -, or ())
            const isPhoneNumber = /^[\d\s\+\-\(\)]+$/.test(contactValue);
            
            if (isPhoneNumber) {
                // Valid phone number format
                emailInput.setCustomValidity('');
            } else {
                // Validate as email
                const hasSpace = /\s/.test(contactValue);
                const hasAt = contactValue.includes('@');
                const atIndex = contactValue.indexOf('@');
                const hasDotAfterAt = atIndex !== -1 && contactValue.indexOf('.', atIndex) > atIndex;
                
                if (hasSpace || !hasAt || !hasDotAfterAt) {
                    emailInput.setCustomValidity('Vnesi veljavno številko mobilnega telefona ali e-poštni naslov.');
                    emailInput.reportValidity();
                    return;
                } else {
                    emailInput.setCustomValidity('');
                }
            }

            // Validate password strength
            const passwordInput = document.getElementById('password');
            const password = passwordInput.value;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
            const isLongEnough = password.length >= 8;

            if (!isLongEnough || !hasUpperCase || !hasLowerCase || !hasNumber) {
                let errorMsg = 'Geslo mora vsebovati: ';
                let errors = [];
                if (!isLongEnough) errors.push('najmanj 8 znakov');
                if (!hasUpperCase) errors.push('veliko črko');
                if (!hasLowerCase) errors.push('malo črko');
                if (!hasNumber) errors.push('številko');
                
                passwordInput.setCustomValidity(errorMsg + errors.join(', '));
                passwordInput.reportValidity();
                return;
            } else {
                passwordInput.setCustomValidity('');
            }

            const submitBtn = signupForm.querySelector('.signup-button');
            const originalText = submitBtn.textContent;
            
            // Visual feedback
            submitBtn.textContent = 'Ustvarjam račun...';
            submitBtn.disabled = true;

            // Form validation feedback
            if (!signupForm.checkValidity()) {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                signupForm.reportValidity();
                return;
            }

            // Simulate async request
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // Show SweetAlert success message
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Uspešno!',
                        text: 'Račun je bil uspešno ustvarjen!',
                        icon: 'success',
                        confirmButtonText: 'V redu',
                        confirmButtonColor: '#1877f2'
                    });
                } else {
                    alert('Račun je bil uspešno ustvarjen!');
                }
            }, 800);
        });
    }

    // Handle create account button on index.html
    const createBtn = document.getElementById('createBtn');
    if (createBtn) {
        createBtn.addEventListener('click', () => {
            window.location.href = 'signup.html';
        });
    }

    // Handle login form submissions (index.html and login.html)
    const loginForm = document.getElementById('loginForm');
    if (loginForm && !signupForm) {
        const loginEmailInput = loginForm.querySelector('input[name="email"], input[name="contact"]');
        const loginPasswordInput = loginForm.querySelector('input[name="password"]');
        
        // Reset custom validation messages on input
        if (loginEmailInput) {
            loginEmailInput.addEventListener('input', () => {
                loginEmailInput.setCustomValidity('');
            });
        }
        
        if (loginPasswordInput) {
            loginPasswordInput.addEventListener('input', () => {
                loginPasswordInput.setCustomValidity('');
            });
        }
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Validate email or phone number format
            const contactValue = loginEmailInput.value.trim();
            
            // Check if it's a phone number (only digits, spaces, +, -, or ())
            const isPhoneNumber = /^[\d\s\+\-\(\)]+$/.test(contactValue);
            
            if (isPhoneNumber) {
                // Valid phone number format
                loginEmailInput.setCustomValidity('');
            } else {
                // Validate as email
                const hasSpace = /\s/.test(contactValue);
                const hasAt = contactValue.includes('@');
                const atIndex = contactValue.indexOf('@');
                const hasDotAfterAt = atIndex !== -1 && contactValue.indexOf('.', atIndex) > atIndex;
                
                if (hasSpace || !hasAt || !hasDotAfterAt) {
                    loginEmailInput.setCustomValidity('Vnesi veljavno številko mobilnega telefona ali e-poštni naslov.');
                    loginEmailInput.reportValidity();
                    return;
                } else {
                    loginEmailInput.setCustomValidity('');
                }
            }
            
            // Validate password strength
            const password = loginPasswordInput.value;
            const hasUpperCase = /[A-Z]/.test(password);
            const hasLowerCase = /[a-z]/.test(password);
            const hasNumber = /[0-9]/.test(password);
            const isLongEnough = password.length >= 8;

            if (!isLongEnough || !hasUpperCase || !hasLowerCase || !hasNumber) {
                let errorMsg = 'Geslo mora vsebovati: ';
                let errors = [];
                if (!isLongEnough) errors.push('najmanj 8 znakov');
                if (!hasUpperCase) errors.push('veliko črko');
                if (!hasLowerCase) errors.push('malo črko');
                if (!hasNumber) errors.push('številko');
                
                loginPasswordInput.setCustomValidity(errorMsg + errors.join(', '));
                loginPasswordInput.reportValidity();
                return;
            } else {
                loginPasswordInput.setCustomValidity('');
            }
            
            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                return;
            }

            // Show SweetAlert success message
            if (typeof Swal !== 'undefined') {
                Swal.fire({
                    title: 'Prijava uspešna!',
                    text: 'Dobrodošli nazaj!',
                    icon: 'success',
                    confirmButtonText: 'V redu',
                    confirmButtonColor: '#1877f2'
                });
            } else {
                alert('Prijava uspešna!');
            }
        });
    }

});
