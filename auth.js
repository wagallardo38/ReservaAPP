/**
 * auth.js - Biblioteca de autenticación simple para gestionar sesiones
 */

const AuthManager = {
    // Guardar datos de autenticación en sessionStorage
    login: function(username, password) {
        // En un entorno real, aquí se verificaría contra un servidor/API
        // Esta es una versión simplificada para demostración
        if (username === 'usuario@ejemplo.com' && password === 'contraseña123') {
            sessionStorage.setItem('authenticated', 'true');
            sessionStorage.setItem('username', username);
            return true;
        }
        return false;
    },
    
    // Verificar si el usuario está autenticado
    isAuthenticated: function() {
        return sessionStorage.getItem('authenticated') === 'true';
    },
    
    // Obtener el nombre de usuario actual
    getUsername: function() {
        return sessionStorage.getItem('username');
    },
    
    // Cerrar sesión y limpiar datos
    logout: function() {
        sessionStorage.removeItem('authenticated');
        sessionStorage.removeItem('username');
    },
    
    // Redirigir según el estado de autenticación
    redirectIfNotAuthenticated: function(loginPage = 'index.html') {
        if (!this.isAuthenticated()) {
            window.location.href = loginPage;
        }
    },
    
    // Redirigir si ya está autenticado (útil para la página de login)
    redirectIfAuthenticated: function(dashboardPage = 'dashboard.html') {
        if (this.isAuthenticated()) {
            window.location.href = dashboardPage;
        }
    }
};

// Exportar para uso como módulo (opcional)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthManager;
}