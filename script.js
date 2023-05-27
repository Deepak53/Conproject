
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  .then(response => response.json())
  .then(data => {
    renderTable(data);
  })
  .catch(error => console.error(error));

// Fetch data using async/await
// async function fetchDataAsync() {
//   try {
//     const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
//     const data = await response.json();
//     renderTable(data);
//   } catch (error) {
//     console.error(error);
//   }
// }

function renderTable(data) {
  const tableBody = document.getElementById('coinTableBody');
  tableBody.innerHTML = '';

  data.forEach(coin => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${coin.image}" alt="${coin.name}" width="25" height="25"> ${coin.name}</td>
      <td>${coin.symbol}</td>
      <td>${coin.current_price}</td>
      <td>${coin.total_volume}</td>
    `;
    tableBody.appendChild(row);
  });
}

// Filter data based on search input
function filterData() {
  const searchInput = document.getElementById('searchInput');
  const searchText = searchInput.value.toLowerCase();
  const tableBody = document.getElementById('coinTableBody');
  const rows = tableBody.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    const name = rows[i].getElementsByTagName('td')[0].textContent.toLowerCase();
    if (name.includes(searchText)) {
      rows[i].style.display = '';
    } else {
      rows[i].style.display = 'none';
    }
  }
}

// Sort data by market cap
function sortDataByMarketCap() {
  const tableBody = document.getElementById('coinTableBody');
  const rows = Array.from(tableBody.getElementsByTagName('tr'));

