
        // Mock data for user
        const userData = {
            name: "Usuario Ejemplo",
            email: "usuario@ejemplo.com",
            phone: "+1234567890"
        };

        // Mock data for reservations
        const reservationsData = [
            { id: 1, type: "Standard", date: "2025-04-22", time: "10:00", status: "pending" },
            { id: 2, type: "Premium", date: "2025-04-25", time: "14:30", status: "confirmed" },
            { id: 3, type: "VIP", date: "2025-04-28", time: "18:00", status: "pending" }
        ];

        // Mock data for history
        const historyData = [
            { id: 101, type: "Standard", date: "2025-04-10", time: "11:00", status: "completed" },
            { id: 102, type: "Premium", date: "2025-04-05", time: "16:30", status: "completed" },
            { id: 103, type: "VIP", date: "2025-03-28", time: "19:00", status: "cancelled" }
        ];

        // DOM Elements
        const menuItems = document.querySelectorAll('.menu-item');
        const viewSections = document.querySelectorAll('.view-section');
        const sectionTitle = document.getElementById('sectionTitle');
        const reservationsTable = document.getElementById('reservationsTable');
        const historyTable = document.getElementById('historyTable');
        const modal = document.getElementById('reservationModal');
        const closeModalBtn = document.getElementById('closeModal');
        const closeModalX = document.querySelector('.close');
        const reservationDetails = document.getElementById('reservationDetails');
        const colorOptions = document.querySelectorAll('.color-preview');
        const userName = document.getElementById('userName');
        const welcomeUserName = document.getElementById('welcomeUserName');

        // Set user data
        userName.textContent = userData.name;
        welcomeUserName.textContent = userData.name.split(' ')[0];
        document.getElementById('profileName').value = userData.name;
        document.getElementById('profileEmail').value = userData.email;
        document.getElementById('profilePhone').value = userData.phone;

        // Navigation functionality
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                // Update active menu item
                menuItems.forEach(menuItem => menuItem.classList.remove('active'));
                item.classList.add('active');

                // Show corresponding view
                const viewId = item.getAttribute('data-view');
                viewSections.forEach(section => section.classList.remove('active'));
                document.getElementById(viewId).classList.add('active');

                // Update section title
                sectionTitle.textContent = item.querySelector('span').textContent;
            });
        });

        // Populate reservations table
        function populateReservationsTable() {
            reservationsTable.innerHTML = '';
            reservationsData.forEach(reservation => {
                const row = document.createElement('tr');
                
                const statusClass = reservation.status === 'pending' ? 'badge-pending' : 'badge-confirmed';
                const statusText = reservation.status === 'pending' ? 'Pendiente' : 'Confirmada';
                
                row.innerHTML = `
                    <td>${reservation.type}</td>
                    <td>${formatDate(reservation.date)}</td>
                    <td>${reservation.time}</td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="btn btn-primary btn-sm" data-id="${reservation.id}">Ver Detalles</button>
                    </td>
                `;
                reservationsTable.appendChild(row);
            });

            // Add event listeners to detail buttons
            document.querySelectorAll('#reservationsTable button').forEach(button => {
                button.addEventListener('click', () => {
                    const reservationId = button.getAttribute('data-id');
                    showReservationDetails(reservationId);
                });
            });
        }

        // Populate history table
        function populateHistoryTable() {
            historyTable.innerHTML = '';
            historyData.forEach(reservation => {
                const row = document.createElement('tr');
                
                let statusClass = 'badge-confirmed';
                let statusText = 'Completada';
                
                if (reservation.status === 'cancelled') {
                    statusClass = 'badge-pending';
                    statusText = 'Cancelada';
                }
                
                row.innerHTML = `
                    <td>${reservation.type}</td>
                    <td>${formatDate(reservation.date)}</td>
                    <td>${reservation.time}</td>
                    <td><span class="badge ${statusClass}">${statusText}</span></td>
                    <td>
                        <button class="btn btn-primary btn-sm" data-id="${reservation.id}">Ver Detalles</button>
                    </td>
                `;
                historyTable.appendChild(row);
            });

            // Add event listeners to detail buttons
            document.querySelectorAll('#historyTable button').forEach(button => {
                button.addEventListener('click', () => {
                    const reservationId = button.getAttribute('data-id');
                    showReservationDetails(reservationId);
                });
            });
        }

        // Format date
        function formatDate(dateStr) {
            const date = new Date(dateStr);
            return date.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
        }

        // Show reservation details
        function showReservationDetails(id) {
            // Find the reservation by id (combine both current and history)
            const allReservations = [...reservationsData, ...historyData];
            const reservation = allReservations.find(res => res.id == id);
            
            if (reservation) {
                let statusText = '';
                switch(reservation.status) {
                    case 'pending': statusText = 'Pendiente'; break;
                    case 'confirmed': statusText = 'Confirmada'; break;
                    case 'completed': statusText = 'Completada'; break;
                    case 'cancelled': statusText = 'Cancelada'; break;
                }
                
                reservationDetails.innerHTML = `
                    <div>
                        <p><strong>ID de Reserva:</strong> #${reservation.id}</p>
                        <p><strong>Tipo:</strong> ${reservation.type}</p>
                        <p><strong>Fecha:</strong> ${formatDate(reservation.date)}</p>
                        <p><strong>Hora:</strong> ${reservation.time}</p>
                        <p><strong>Estado:</strong> ${statusText}</p>
                        <p><strong>Cliente:</strong> ${userData.name}</p>
                        <p><strong>Contacto:</strong> ${userData.email}</p>
                    </div>
                `;
                
                modal.style.display = 'flex';
            }
        }

        // Close modal
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        closeModalX.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Theme color options
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                const theme = option.getAttribute('data-theme');
                setTheme(theme);
            });
        });

        // Set theme function
        function setTheme(theme) {
            const root = document.documentElement;
            
            switch(theme) {
                case 'blue':
                    root.style.setProperty('--primary-color', '#3498db');
                    root.style.setProperty('--secondary-color', '#2980b9');
                    root.style.setProperty('--accent-color', '#f39c12');
                    root.style.setProperty('--sidebar-bg', '#2c3e50');
                    break;
                case 'green':
                    root.style.setProperty('--primary-color', '#2ecc71');
                    root.style.setProperty('--secondary-color', '#27ae60');
                    root.style.setProperty('--accent-color', '#e67e22');
                    root.style.setProperty('--sidebar-bg', '#2c3e50');
                    break;
                case 'red':
                    root.style.setProperty('--primary-color', '#e74c3c');
                    root.style.setProperty('--secondary-color', '#c0392b');
                    root.style.setProperty('--accent-color', '#f1c40f');
                    root.style.setProperty('--sidebar-bg', '#34495e');
                    break;
                case 'purple':
                    root.style.setProperty('--primary-color', '#9b59b6');
                    root.style.setProperty('--secondary-color', '#8e44ad');
                    root.style.setProperty('--accent-color', '#f1c40f');
                    root.style.setProperty('--sidebar-bg', '#34495e');
                    break;
                case 'dark':
                    root.style.setProperty('--primary-color', '#34495e');
                    root.style.setProperty('--secondary-color', '#2c3e50');
                    root.style.setProperty('--accent-color', '#f39c12');
                    root.style.setProperty('--sidebar-bg', '#1a1a1a');
                    root.style.setProperty('--bg-color', '#ecf0f1');
                    break;
            }
        }

        // Handle new reservation form submission
        document.getElementById('newReservationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const type = document.getElementById('reservationType').value;
            const date = document.getElementById('reservationDate').value;
            const time = document.getElementById('reservationTime').value;
            
            if(!type || !date || !time) {
                alert('Por favor complete todos los campos requeridos');
                return;
            }
            
            // Add new reservation to data
            const newId = reservationsData.length > 0 ? Math.max(...reservationsData.map(r => r.id)) + 1 : 1;
            reservationsData.push({
                id: newId,
                type: type,
                date: date,
                time: time,
                status: 'pending'
            });
            
            // Update table
            populateReservationsTable();
            
            // Show success message
            alert('Reserva creada con éxito');
            
            // Reset form
            this.reset();
        });

        // Handle profile form submission
        document.getElementById('profileForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Update user data
            userData.name = document.getElementById('profileName').value;
            userData.email = document.getElementById('profileEmail').value;
            userData.phone = document.getElementById('profilePhone').value;
            
            // Update UI
            userName.textContent = userData.name;
            welcomeUserName.textContent = userData.name.split(' ')[0];
            
            // Show success message
            alert('Perfil actualizado con éxito');
        });
        
        // Esperar a que el DOM esté completamente cargado
        document.addEventListener('DOMContentLoaded', function() {
        // Buscar el elemento del menú para cerrar sesión
            const logoutMenuItem = document.querySelector('.menu-item[data-view="closedashboard"]');
            
            // Añadir evento de clic al elemento de cierre de sesión
            if (logoutMenuItem) {
                logoutMenuItem.addEventListener('click', function() {
                    // Eliminar datos de autenticación del sessionStorage
                    sessionStorage.removeItem('authenticated');
                    sessionStorage.removeItem('username');
                    
                    // También puedes eliminar cualquier otro dato de sesión que hayas guardado
                    // sessionStorage.removeItem('otrosDatos');
                    
                    // Opcional: Mostrar mensaje de despedida
                    alert('Sesión cerrada correctamente. ¡Hasta pronto!');
                    
                    // Redirigir al usuario a la página de inicio (index.html)
                    window.location.href = 'index.html';
                });
            } else {
                console.error('No se encontró el elemento de menú para cerrar sesión');
            }
        });
        

        // Initialize tables
        populateReservationsTable();
        populateHistoryTable();
    