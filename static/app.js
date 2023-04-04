const apiUrl = 'https://jsonplaceholder.typicode.com/users';
const usersTable = document.getElementById('users-table');
const tbody = usersTable.getElementsByTagName('tbody')[0];

// function to fetch users data
async function getUsers() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error fetching users', error);
  }
}

// function to render users data in table
function renderUsers(users) {
  tbody.innerHTML = '';
  users.forEach((user) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${user.id}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.phone}</td>
      <td>${user.website}</td>
      <td>
        <button class="button" onclick="editUser(${user.id})">Edit</button>
        <button class="button" onclick="deleteUser(${user.id})">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// function to initialize app
async function init() {
  const users = await getUsers();
  renderUsers(users);
}

// call init function to start app
init();

// function to handle edit user button click
function editUser(id) {
  console.log(`Edit user with id ${id}`);
}

// function to handle delete user button click
function deleteUser(id) {
  console.log(`Delete user with id ${id}`);
}
