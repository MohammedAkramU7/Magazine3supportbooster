document.addEventListener('DOMContentLoaded', () => {
    const meetButton = document.querySelector('.widget:nth-child(1) .btn-primary');
    const calendarButton = document.querySelector('.widget:nth-child(2) .btn-primary');

    meetButton.addEventListener('click', () => {
        alert('Launching Google Meet...');
        // Add integration logic here
    });

    calendarButton.addEventListener('click', () => {
        alert('Opening Calendar...');
        // Add integration logic here
    });
});

/* tast page */
document.addEventListener('DOMContentLoaded', () => {
    const taskColumns = document.querySelectorAll('.task-column .task-list');
    const addTaskButtons = document.querySelectorAll('.btn-add-task');

    // Add new task
    addTaskButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const taskText = prompt('Enter the task:');
            if (taskText) {
                const newTask = createTaskElement(taskText);
                button.nextElementSibling.appendChild(newTask);
            }
        });
    });

    // Enable dragging for tasks
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

    // Function to create a task element
    function createTaskElement(text) {
        const task = document.createElement('div');
        task.classList.add('task-item');
        task.setAttribute('draggable', 'true');
        task.textContent = text;

        task.addEventListener('dragstart', () => {
            task.classList.add('dragging');
        });

        task.addEventListener('dragend', () => {
            task.classList.remove('dragging');
        });

        task.addEventListener('dblclick', () => {
            if (confirm('Delete this task?')) {
                task.remove();
            }
        });

        return task;
    }
});

/* google meeting */

// Handle Tab Click to Show Google Meeting Section
document.getElementById('google-meeting-tab').addEventListener('click', function () {
    const meetingSection = document.getElementById('google-meeting-section');
    const controls = document.getElementById('meeting-section');
    meetingSection.style.display = "block"; // Show Google Meeting Section
    controls.style.display = "block";      // Show Meeting Controls
});

// Start Instant Meeting
document.getElementById('start-instant-meeting').addEventListener('click', function () {
    alert('Starting an instant meeting...');
});

// Schedule a Meeting
document.getElementById('schedule-meeting').addEventListener('click', function () {
    alert('Redirecting to Google Calendar for scheduling...');
    window.open('https://calendar.google.com/', '_blank');
});

// Create Meeting for Later
document.getElementById('create-meeting').addEventListener('click', function () {
    const meetingLink = document.getElementById('meeting-link');
    const meetingURL = document.getElementById('meeting-url');

    // Simulate a generated meeting URL
    const generatedLink = "https://meet.google.com/random-meeting-id";
    meetingURL.value = generatedLink;

    // Show the Meeting Link Section
    meetingLink.style.display = "block";
});

// Copy Meeting Link
document.getElementById('copy-link').addEventListener('click', function () {
    const meetingURL = document.getElementById('meeting-url');
    meetingURL.select();
    document.execCommand('copy');
    alert('Meeting link copied to clipboard!');
});

// team chat
const contactList = document.getElementById('contact-list');
const messagesContainer = document.getElementById('messages');
const chatHeader = document.getElementById('chat-header');
const messageInput = document.getElementById('message-text');
const sendMessageButton = document.getElementById('send-message');
const attachMediaButton = document.getElementById('attach-media');

let currentChatUser = 'John'; // Default user
let chats = {
    John: [],
    Jane: [],
    Mike: [],
};

// Display chat messages
function displayMessages(user) {
    messagesContainer.innerHTML = '';
    chats[user].forEach(msg => {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', msg.type);
        msgDiv.textContent = msg.text;
        messagesContainer.appendChild(msgDiv);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Switch chat user
contactList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        document.querySelectorAll('.contact-list li').forEach(li => li.classList.remove('active'));
        e.target.classList.add('active');
        currentChatUser = e.target.dataset.user;
        chatHeader.textContent = `Chat with ${currentChatUser}`;
        displayMessages(currentChatUser);
    }
});

// Send a message
sendMessageButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();
    if (messageText) {
        chats[currentChatUser].push({ text: messageText, type: 'sent' });
        displayMessages(currentChatUser);
        messageInput.value = '';
        // Simulate a reply after a short delay
        simulateReply();
    }
});

// Simulate receiving a reply after a short delay
function simulateReply() {
    setTimeout(() => {
        const reply = `Reply from ${currentChatUser}: Got it!`;
        chats[currentChatUser].push({ text: reply, type: 'received' });
        displayMessages(currentChatUser);
    }, 1500);
}

// Save chat data to localStorage (optional, for persistence)
function saveChats() {
    localStorage.setItem('chats', JSON.stringify(chats));
}

// Load chat data from localStorage (optional, for persistence)
function loadChats() {
    const storedChats = localStorage.getItem('chats');
    if (storedChats) {
        chats = JSON.parse(storedChats);
    }
}

// Initial setup: Load chats from localStorage and load default chat (John)
loadChats();
displayMessages(currentChatUser);

// Auto-save chat data whenever a new message is added
window.addEventListener('beforeunload', saveChats);
