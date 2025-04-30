// Function to delete todo
async function deleteTodo(id) {
    try {
        const response = await fetch(`https://nextdo-backend.onrender.com/api/todos/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Todo deleted successfully');
            location.reload();  // Reload page to update the table
        } else {
            alert('Error deleting todo');
        }
    } catch (error) {
        console.error("Error deleting todo:", error);
    }
}

// Fetch Todos and populate the table
// Fetch Todos and populate the table
document.addEventListener("DOMContentLoaded", function() {
    const tableBody = document.getElementById('tablebody');
    const priorityFilter = document.getElementById('priorityFilter');
    const statusFilter = document.getElementById('statusFilter');

    // Function to fetch todos based on filters
    async function getTodos() {
        const priority = priorityFilter.value;
        const status = statusFilter.value;

        try {
            let url = 'https://nextdo-backend.onrender.com/api/todos';

            // Construct query params for filtering
            const filters = [];
            if (priority !== '') filters.push(`priority=${priority === 'true'}`); // true if Low, false if High
            if (status !== '') filters.push(`status=${status === 'true'}`); // true if Completed, false if Pending

            // Append filters to URL if there are any
            if (filters.length > 0) {
                url += '?' + filters.join('&');
            }

            const response = await fetch(url);
            const todos = await response.json();
            
            tableBody.innerHTML = '';  // Clear current rows before appending new ones
            
            todos.forEach(todo => {
                const row = document.createElement('tr');
                row.classList.add('border-b');
                
                // Display the correct priority (Low or High) based on the boolean value
                const priorityText = todo.priority ? 'Low' : 'High';
                const statusText = todo.status ? 'Completed' : 'Pending';

                row.innerHTML = `
                    <td class="py-3 px-6">${todo.title}</td>
                    <td class="py-3 px-6">${todo.description}</td>
                    <td class="border px-4 py-2">${priorityText}</td>
                    <td class="border px-4 py-2">${statusText}</td>
                    <td class="py-3 px-6">
                        <a href="EditTask.html?todoId=${todo.id}" class="text-yellow-500 hover:text-yellow-700 mx-2">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </a>
                        <button class="text-red-500 hover:text-red-700 mx-2" onclick="deleteTodo(${todo.id})">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }

    // Event listeners for filters
    priorityFilter.addEventListener('change', getTodos);
    statusFilter.addEventListener('change', getTodos);
    
    getTodos(); // Initial load of todos
});

