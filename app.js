//import { login } from "auth.js";
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const passwordError = document.getElementById('password-error');
    const loginErrorMessage = document.getElementById('login-error-message');
    
    // Validar email con expresión regular
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Validar formulario al enviar
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        let isValid = true;
        
        // Limpiar mensajes de error previos
        emailError.style.display = 'none';
        passwordError.style.display = 'none';
        loginErrorMessage.style.display = 'none';
        
        // Validar email
        if (!isValidEmail(emailInput.value)) {
            emailError.style.display = 'block';
            isValid = false;
        }
        
        // Validar contraseña
        if (passwordInput.value.length < 6) {
            passwordError.style.display = 'block';
            isValid = false;
        }
        
        // Si el formulario es válido, intentar iniciar sesión
        if (isValid) {
            // Aquí podemos agregar la lógica para enviar los datos al servidor
            initiateLogin(emailInput.value, passwordInput.value);
        }
    });
    
    // Función para iniciar sesión (simulada)
    function initiateLogin(email, password) {
        // En un escenario real, esto sería una llamada AJAX al servidor
        console.log('Iniciando sesión con:', email, password);
        
        // Simulamos una verificación en el cliente (esto debe hacerse en el servidor en un caso real)
        const isValidUser = simulateServerValidation(email, password);
        
        if (isValidUser) {
            // Redirigir al usuario a la página principal
            alert('Inicio de sesión exitoso! Redirigiendo...');
            window.location.href = 'dashboard.html'; // Cambiar por la URL real
        } else {
            // Mostrar mensaje de error
            loginErrorMessage.style.display = 'block';
        }
    }

    
    // login(); // Esto imprimirá "Hola desde archivo1"
    
    // Simulación de validación en el servidor (esto NO debe hacerse así en producción)
    function simulateServerValidation(email, password) {
        // Esta es solo una simulación - en un entorno real, esto se haría con una petición al servidor
        // y nunca se incluirían credenciales en el código fuente del cliente
        const validEmail = 'usuario@ejemplo.com';
        const validPassword = 'contraseña123';
        
        return (email === validEmail && password === validPassword);
    }
    
    // Mejorar la experiencia de usuario limpiando los errores al escribir
    emailInput.addEventListener('input', function() {
        emailError.style.display = 'none';
        loginErrorMessage.style.display = 'none';
    });
    
    passwordInput.addEventListener('input', function() {
        passwordError.style.display = 'none';
        loginErrorMessage.style.display = 'none';
    });
});
