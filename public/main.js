document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const addItemForm = document.getElementById('add-item-form');
    const inventoryList = document.getElementById('inventory-list');

    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(registerForm);
            const data = {
                username: formData.get('username'),
                password: formData.get('password'),
            };
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                window.location.href = '/login.html';
            } else {
                alert('Registration failed');
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(loginForm);
            const data = {
                username: formData.get('username'),
                password: formData.get('password'),
            };
            const response = await fetch('/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                window.location.href = '/inventory.html';
            } else {
                alert('Login failed');
            }
        });
    }

    if (addItemForm) {
        addItemForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const formData = new FormData(addItemForm);
            const data = {
                name: formData.get('name'),
                quantity: formData.get('quantity'),
            };
            const response = await fetch('/inventory', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                loadInventory();
            } else {
                alert('Failed to add item');
            }
        });
    }

    async function loadInventory() {
        const response = await fetch('/inventory');
        const items = await response.json();
        inventoryList.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ${item.quantity}`;
            inventoryList.appendChild(li);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', async () => {
                await fetch(`/inventory/${item.id}`, {
                    method: 'DELETE'
                });
                loadInventory();
            });
            li.appendChild(deleteButton);

            const updateForm = document.createElement('form');
            updateForm.innerHTML = `
                <input type="text" name="name" value="${item.name}" required>
                <input type="number" name="quantity" value="${item.quantity}" required>
                <button type="submit">Update</button>
            `;
            updateForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                const formData = new FormData(updateForm);
                const data = {
                    name: formData.get('name'),
                    quantity: formData.get('quantity'),
                };
                await fetch(`/inventory/${item.id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                });
                loadInventory();
            });
            li.appendChild(updateForm);
        });
    }

    if (inventoryList) {
        loadInventory();
    }
});
