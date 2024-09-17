let selectedCrypto = null;
let firstObject = null
let newData = null;
document.getElementById('cryptoSelect').addEventListener('change', async function () {
  selectedCrypto = this.value;

  const url = new URL(window.location);
  url.searchParams.set('coin', selectedCrypto);
  window.history.pushState({}, '', url);

  fetchData();
});



document.addEventListener('DOMContentLoaded', function () {
  const connectTelegramBtn = document.getElementById('connectTelegram');
  const telegramContainer = document.getElementById('telegramContainer');
  const tableContainer = document.getElementById('tableContainer');

  connectTelegramBtn.addEventListener('click', function () {
      if (telegramContainer.style.display === 'none') {
          telegramContainer.style.display = 'block';
          tableContainer.style.display = 'none';
      } else {
          telegramContainer.style.display = 'none';
          tableContainer.style.display = 'block';
      }
  });
});



let counter = 1;
const counterElement = document.getElementById('counter-value');

function startCounter() {
    setInterval(() => {
        counter = (counter + 1) % 40;
        counterElement.textContent = counter;
    }, 1000);
}

startCounter();

const bgContainer = document.getElementById('bg-container');
const themeToggle = document.getElementById('theme-toggle');
const tableContainer = document.getElementById("loadingcontainer");

themeToggle.addEventListener('click', () => {
    if (bgContainer.classList.contains('dark-theme')) {
        bgContainer.classList.remove('dark-theme');
        bgContainer.classList.add('light-theme');
        themeToggle.textContent = 'DARK';
    } else {
        bgContainer.classList.remove('light-theme');
        bgContainer.classList.add('dark-theme');
        themeToggle.textContent = 'LIGHT';
    }
});

async function fetchData() {
  console.log("FetchData is called!");

  document.getElementById('loadingcontainer').style.display = 'block';

  try {
    console.log("API Call Occurs");
    const response = await axios.get('http://localhost:3000/get-tickers');
    const data = response.data;
    firstObject = data[0]; 
    newData = data.slice(1,-1)

    
    document.getElementById('loadingcontainer').style.display = 'none';
    displayData(data); 


    if (!selectedCrypto) {
      console.log("No crypto selected");
      return;
    }
    const selectedCryptoData = data.filter((eachdata) => eachdata.base_unit === selectedCrypto);

  
    console.log("First Object:", firstObject);
  
  
    
    if (selectedCryptoData.length === 0) {
      displayData("");
    } else {
      displayData(selectedCryptoData);
    }

    document.getElementById('loadingcontainer').style.display = 'none';
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

window.onload = () => {
  fetchData();
};

function displayData(data) {
  const tableContainernew = document.getElementById("tableContainer");


  tableContainernew.innerHTML = '';

  if (data === "") {
    const messageElement = document.createElement("h2");
    messageElement.textContent = "No data available for the selected cryptocurrency.";
    tableContainernew.appendChild(messageElement);
  } else {
    const table = document.createElement('table');
    table.classList.add('data-table');

    const headers = `
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Price</th>
          <th>Buy</th>
          <th>Sell</th>
          <th>Volume</th>
          <th>Base Unit</th>
        </tr>
      </thead>
    `;

    table.innerHTML = headers;

    const tbody = document.createElement('tbody');
    data.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.last}</td>
        <td>${item.buy}</td>
        <td>${item.sell}</td>
        <td>${item.volume}</td>
        <td>${item.base_unit}</td>
      `;
      tbody.appendChild(row);
    });

    table.appendChild(tbody);
    tableContainernew.appendChild(table);
  }
}


var modal = document.getElementById("myModal");


var btn = document.getElementById("addHodlInfoBtn");

var span = document.getElementsByClassName("close")[0];
 
btn.onclick = function() {
    modal.style.display = "block";
}


span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


const initialContainer = document.getElementById("topRatedContainer")
const container1 = document.createElement("div");
container1.classList.add("stylecontainer");
const heading1 = document.createElement("h1");
const para1 = document.createElement("p");
heading1.classList.add("color");
para1.classList.add("para");
heading1.textContent = "0.1 %";
para1.textContent = "5Mins";
container1.appendChild(heading1)
container1.appendChild(para1)
initialContainer.appendChild(container1)

const container2 = document.createElement("div");
container2.classList.add("stylecontainer");
const heading2 = document.createElement("h1");
const para2 = document.createElement("p");
heading2.classList.add("color");
para2.classList.add("para");
heading2.textContent = "0.96 %";
para2.textContent = "1 Hour";
container2.appendChild(heading2)
container2.appendChild(para2)
initialContainer.appendChild(container2)


const container3 = document.createElement("div");
container3.classList.add("stylecontainer");
const heading3 = document.createElement("h1");
const para3 = document.createElement("p");
heading3.classList.add("color1")
para3.classList.add("para");
heading3.textContent = "₹ 26,56,110";
para3.textContent ="Average BTC/INR net price including commission";
container3.appendChild(heading3)
container3.appendChild(para3)
initialContainer.appendChild(container3)
const container4 = document.createElement("div");
container4.classList.add("stylecontainer");
const heading4 = document.createElement("h1");
const para4 = document.createElement("p");
heading4.classList.add("color")
para4.classList.add("para");
heading4.textContent = "2.73 %"
para4.textContent = "1 Day";
container4.appendChild(heading4)
container4.appendChild(para4)
initialContainer.appendChild(container4)
const container5 = document.createElement("div");
container5.classList.add("stylecontainer");
const heading5 = document.createElement("h1");
const para5 = document.createElement("p");
heading5.classList.add("color");
para5.classList.add("para");
heading5.textContent = "7.51 %";
para5.textContent = "7 Days";
container5.appendChild(heading5)
container5.appendChild(para5)
initialContainer.appendChild(container5)