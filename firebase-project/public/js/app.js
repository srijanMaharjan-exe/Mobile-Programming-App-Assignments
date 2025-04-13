import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-analytics.js";
import { getDatabase, set, ref, onValue } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyARx2LZeI8hRVllo0OcNQrmuCvibdsolcE",
    authDomain: "week6mobileapp.firebaseapp.com",
    databaseURL: "https://week6mobileapp-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "week6mobileapp",
    storageBucket: "week6mobileapp.firebasestorage.app",
    messagingSenderId: "732421983653",
    appId: "1:732421983653:web:75201f8d92bf09b724ec4c",
    measurementId: "G-W28D9HWH8Q"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const analytics = getAnalytics(app);

console.log("Database instance:", db);

// Debugging: Check if the database is connected
const testRef = ref(db, '.info/connected');
onValue(testRef, (snapshot) => {
  const isConnected = snapshot.val();
  if (isConnected) {
    console.log("Database is connected.");
  } else {
    console.log("Database is not connected.");
  }
});

// Function to write user data
// ...existing code...

// DOM Elements
const userForm = document.getElementById('userForm');
const userList = document.getElementById('userList');

// Event Listeners
userForm.addEventListener('submit', handleSubmit);

// Handle form submission
function handleSubmit(e) {
    e.preventDefault();
    const userId = document.getElementById('userId').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    writeUserData(userId, username, email);
    userForm.reset();
}

// Function to write user data
function writeUserData(userId, name, email) {
    console.log("Attempting to write user data...");
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email
    })
        .then(() => {
            console.log("User data written successfully.");
            loadUsers(); // Reload the user list
        })
        .catch((error) => {
            console.error("Error writing user data:", error);
        });
}

// Function to load and display users
function loadUsers() {
    const usersRef = ref(db, 'users');
    onValue(usersRef, (snapshot) => {
        userList.innerHTML = ''; // Clear existing list
        snapshot.forEach((childSnapshot) => {
            const userId = childSnapshot.key;
            const userData = childSnapshot.val();
            createUserCard(userId, userData);
        });
    });
}

// Function to create user card
function createUserCard(userId, userData) {
    const userCard = document.createElement('div');
    userCard.className = 'user-card';
    userCard.innerHTML = `
        <div class="user-info">
            <h3>${userData.username}</h3>
            <p>${userData.email}</p>
        </div>
        <div class="user-actions">
            <button class="edit-btn" onclick="editUser('${userId}')">Edit</button>
            <button class="delete-btn" onclick="deleteUser('${userId}')">Delete</button>
        </div>
    `;
    userList.appendChild(userCard);
}

// Function to delete user
function deleteUser(userId) {
    set(ref(db, 'users/' + userId), null)
        .then(() => {
            console.log("User deleted successfully");
        })
        .catch((error) => {
            console.error("Error deleting user:", error);
        });
}

// Function to edit user
function editUser(userId) {
    const userRef = ref(db, 'users/' + userId);
    onValue(userRef, (snapshot) => {
        const userData = snapshot.val();
        document.getElementById('userId').value = userId;
        document.getElementById('username').value = userData.username;
        document.getElementById('email').value = userData.email;
    }, { once: true });
}

// Load users when the page loads
loadUsers();

// Make functions available globally
window.deleteUser = deleteUser;
window.editUser = editUser;