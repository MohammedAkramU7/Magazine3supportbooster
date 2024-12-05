document.addEventListener('DOMContentLoaded', () => {
    const taskColumns = document.querySelectorAll('.task-column .task-list');
    const addTaskButtons = document.querySelectorAll('.btn-add-task');

    // Add Task button click event
    addTaskButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const taskType = prompt('Would you like to add a simple task (just text) or a detailed task (with description, due date, and priority)? Enter "simple" or "detailed":');
            
            if (taskType === 'simple') {
                const taskText = prompt('Enter task description:');
                if (taskText) {
                    addSimpleTask(button.nextElementSibling, taskText);
                }
            } else if (taskType === 'detailed') {
                const taskHeading = prompt('Enter task heading:');
                if (taskHeading) {
                    const taskDescription = prompt('Enter task description:');
                    const taskDueDate = prompt('Enter task due date (YYYY-MM-DD):');
                    const taskPriority = prompt('Enter task priority (Low, Medium, High):');
                    if (taskDescription && taskDueDate && taskPriority) {
                        // Validate date and priority
                        if (validateDueDate(taskDueDate) && validatePriority(taskPriority)) {
                            addDetailedTask(button.nextElementSibling, taskHeading, taskDescription, taskDueDate, taskPriority);
                        } else {
                            alert('Invalid input. Please check the due date format or priority.');
                        }
                    } else {
                        alert('Please fill in all fields for the detailed task.');
                    }
                }
            } else {
                alert('Invalid choice! Please enter "simple" or "detailed".');
            }
        });
    });

    // Enable drag-and-drop functionality
    taskColumns.forEach((column) => {
        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            const dragging = document.querySelector('.dragging');
            column.appendChild(dragging);
        });

        column.addEventListener('drop', () => {
            const dragging = document.querySelector('.dragging');
            dragging.classList.remove('dragging');
        });
    });

    /**
     * Validates the due date format (YYYY-MM-DD).
     * @param {string} date - The date to validate.
     * @returns {boolean} - Returns true if valid, false otherwise.
     */
    function validateDueDate(date) {
        const regex = /^\d{4}-\d{2}-\d{2}$/;
        return regex.test(date);
    }

    /**
     * Validates the task priority (Low, Medium, High).
     * @param {string} priority - The priority to validate.
     * @returns {boolean} - Returns true if valid, false otherwise.
     */
    function validatePriority(priority) {
        return ['Low', 'Medium', 'High'].includes(priority);
    }

    /**
     * Creates a simple task element and appends it to the specified container.
     * @param {HTMLElement} container - The task list container to add the task to.
     * @param {string} text - The text content of the task.
     */
    function addSimpleTask(container, text) {
        const task = document.createElement('div');
        task.classList.add('task-item');
        task.setAttribute('draggable', 'true');
        task.textContent = text;

        // Drag start event
        task.addEventListener('dragstart', () => {
            task.classList.add('dragging');
        });

        // Drag end event
        task.addEventListener('dragend', () => {
            task.classList.remove('dragging');
        });

        // Double-click to delete task
        task.addEventListener('dblclick', () => {
            if (confirm('Delete this task?')) {
                task.remove();
            }
        });

        container.appendChild(task);
    }

    /**
     * Creates a detailed task element with heading, description, due date, priority, and edit functionality.
     * @param {HTMLElement} container - The task list container to add the task to.
     * @param {string} heading - The heading/content of the task.
     * @param {string} description - The description/content of the task.
     * @param {string} dueDate - The due date of the task.
     * @param {string} priority - The priority of the task.
     */
    function addDetailedTask(container, heading, description, dueDate, priority) {
        const task = document.createElement('div');
        task.classList.add('task-item');
        task.setAttribute('draggable', 'true');

        const taskHeading = document.createElement('h3');
        taskHeading.classList.add('task-heading');
        taskHeading.textContent = heading;

        const taskDescription = document.createElement('p');
        taskDescription.classList.add('task-description');
        taskDescription.textContent = description;
        taskDescription.style.display = 'none'; // Initially hidden

        const taskDueDate = document.createElement('p');
        taskDueDate.classList.add('task-due-date');
        taskDueDate.textContent = `Due: ${dueDate}`;
        taskDueDate.style.display = 'none'; // Initially hidden

        const taskPriority = document.createElement('p');
        taskPriority.classList.add('task-priority');
        taskPriority.textContent = `Priority: ${priority}`;
        taskPriority.classList.add(`priority-${priority.toLowerCase()}`);
        taskPriority.style.display = 'none'; // Initially hidden

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('btn-edit');

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.classList.add('btn-save');
        saveButton.style.display = 'none'; // Initially hidden

        // Edit button functionality
        editButton.addEventListener('click', () => {
            // Make task fields editable
            taskDescription.setAttribute('contenteditable', 'true');
            taskDueDate.setAttribute('contenteditable', 'true');
            taskPriority.setAttribute('contenteditable', 'true');
            editButton.style.display = 'none';
            saveButton.style.display = 'inline-block';
        });

        // Save button functionality
        saveButton.addEventListener('click', () => {
            // Make task fields non-editable and save changes
            taskDescription.setAttribute('contenteditable', 'false');
            taskDueDate.setAttribute('contenteditable', 'false');
            taskPriority.setAttribute('contenteditable', 'false');
            editButton.style.display = 'inline-block';
            saveButton.style.display = 'none';
        });

        // Toggle task details visibility on click
        task.addEventListener('click', () => {
            const isVisible = taskDescription.style.display === 'block';
            taskDescription.style.display = isVisible ? 'none' : 'block';
            taskDueDate.style.display = isVisible ? 'none' : 'block';
            taskPriority.style.display = isVisible ? 'none' : 'block';
        });

        task.appendChild(taskHeading);
        task.appendChild(taskDescription);
        task.appendChild(taskDueDate);
        task.appendChild(taskPriority);
        task.appendChild(editButton);
        task.appendChild(saveButton);

        // Drag start event
        task.addEventListener('dragstart', () => {
            task.classList.add('dragging');
        });

        // Drag end event
        task.addEventListener('dragend', () => {
            task.classList.remove('dragging');
        });

        // Double-click to delete task
        task.addEventListener('dblclick', () => {
            if (confirm('Delete this task?')) {
                task.remove();
            }
        });

        container.appendChild(task);
    }

    // Example: Add initial tasks programmatically
    const tasksToDo = [
        {
            heading: 'Plan marketing strategy',
            description: 'Create a marketing plan for Q2.',
            dueDate: '2024-05-15',
            priority: 'High'
        },
        {
            heading: 'Develop landing page',
            description: 'Design and develop a landing page for new product.',
            dueDate: '2024-06-01',
            priority: 'Medium'
        }
    ];

    tasksToDo.forEach(task => {
        addDetailedTask(document.querySelector('[data-status="todo"] .task-list'), task.heading, task.description, task.dueDate, task.priority);
    });
});
