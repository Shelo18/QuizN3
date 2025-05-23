document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('grid');
  const searchInput = document.getElementById('search-input');
  const loader = document.getElementById('loader');

  let allUsers = [];
  
  const getInitials = (name) =>
    name.split(' ').map(word => word[0].toUpperCase()).join('');
  const formatAddress = (address) =>
    `${address.street}${address.suite ? ', ' + address.suite : ''}<br />${address.city}`;
  const createUserCard = (user) => `
    <div class="card">
      <div class="card-header">
        <div class="card-avatar">${getInitials(user.name)}</div>
      </div>
      <div class="card-body">
        <h3 class="card-title">${user.name}</h3>
        <p class="card-username">@${user.username}</p>
        <div class="card-details">
          <p class="card-details-title">Address</p>
          <p class="card-address">${formatAddress(user.address)}</p>
        </div>
        <div class="card-details">
          <p class="card-details-title">Company</p>
          <p class="card-company">${user.company.name}</p>
        </div>
      </div>
    </div>
  `;
  const renderUsers = (users) => {
    grid.innerHTML = users.map(createUserCard).join('');
  };
  const filterUsers = (term) => {
    const query = term.toLowerCase().trim();
    const filtered = query
      ? allUsers.filter(user => user.name.split(' ')[0].toLowerCase().includes(query))
      : allUsers;
    renderUsers(filtered);
  };
  const fetchUsers = async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users');
    allUsers = await res.json();
    renderUsers(allUsers);
    loader.style.display = 'none';
  };
  searchInput.addEventListener('input', (e) => {
    filterUsers(e.target.value);
  });
  fetchUsers();
});

