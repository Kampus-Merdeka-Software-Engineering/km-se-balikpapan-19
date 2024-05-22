// Function to format the total sales
function formatTotalSales(totalSales) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(totalSales);
}

// Function to calculate total sales
function calculateTotalSales(data) {
  let totalSales = 0;

  data.forEach((transaction) => {
    const qty = parseFloat(transaction.transaction_qty);
    const price = parseFloat(transaction.unit_price);
    totalSales += qty * price;
  });

  return totalSales;
}

// Function to calculate total quantity sold
function calculateTotalQuantity(data) {
  let totalQuantity = 0;

  data.forEach((transaction) => {
    const qty = parseFloat(transaction.transaction_qty);
    totalQuantity += qty;
  });

  return totalQuantity;
}

// Function to calculate the lowest sales by store
function calculateLowestSalesByStore(data) {
  const storeSales = {};

  // Aggregate sales by store
  data.forEach((transaction) => {
    const storeId = transaction.store_location;
    const qty = parseFloat(transaction.transaction_qty);
    const price = parseFloat(transaction.unit_price);
    const sales = qty * price;

    if (!storeSales[storeId]) {
      storeSales[storeId] = 0;
    }

    storeSales[storeId] += sales;
  });

  // Find the store with the lowest sales
  let lowestSalesStore = null;
  let lowestSales = Infinity;

  for (const storeId in storeSales) {
    if (storeSales[storeId] < lowestSales) {
      lowestSales = storeSales[storeId];
      lowestSalesStore = storeId;
    }
  }

  return lowestSalesStore;
}

// Function to calculate the highest sales by store
function calculateHighestSalesByStore(data) {
  const storeSales = {};

  // Aggregate sales by store
  data.forEach((transaction) => {
    const storeId = transaction.store_location;
    const qty = parseFloat(transaction.transaction_qty);
    const price = parseFloat(transaction.unit_price);
    const sales = qty * price;

    if (!storeSales[storeId]) {
      storeSales[storeId] = 0;
    }

    storeSales[storeId] += sales;
  });

  // Find the store with the highest sales
  let highestSalesStore = null;
  let highestSales = -Infinity;

  for (const storeId in storeSales) {
    if (storeSales[storeId] > highestSales) {
      highestSales = storeSales[storeId];
      highestSalesStore = storeId;
    }
  }
  return highestSalesStore;
}

// Function to calculate sales by store
function calculateSalesByStore(data) {
  const storeSales = {};

  // Aggregate sales by store
  data.forEach((transaction) => {
    const storeId = transaction.store_location;
    const qty = parseFloat(transaction.transaction_qty);
    const price = parseFloat(transaction.unit_price);
    const sales = qty * price;

    if (!storeSales[storeId]) {
      storeSales[storeId] = 0;
    }

    storeSales[storeId] += sales;
  });

  return storeSales;
}

// Function to calculate quantity sold by product
function calculateQuantitySoldByProduct(data) {
  const productQuantity = {};

  // Aggregate quantity sold by product
  data.forEach((transaction) => {
    const productId = transaction.product_category;
    const qty = parseFloat(transaction.transaction_qty);

    if (!productQuantity[productId]) {
      productQuantity[productId] = 0;
    }

    productQuantity[productId] += qty;
  });

  return productQuantity;
}

// Function to calculate monthly sales
function calculateMonthlySales(data) {
  const monthlySales = {};

  // Aggregate sales by month
  data.forEach((transaction) => {
    const month = new Date(transaction.transaction_date).getMonth();
    const qty = parseFloat(transaction.transaction_qty);
    const price = parseFloat(transaction.unit_price);
    const sales = qty * price;

    if (!monthlySales[month]) {
      monthlySales[month] = 0;
    }

    monthlySales[month] += sales;
  });

  return monthlySales;
}

// Function to filter data by date range
function filterDataByDate(data, startDate, endDate) {
  return data.filter((transaction) => {
    const transactionDate = new Date(transaction.transaction_date);
    return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
  });
}

// Variables to store chart instances
let barChartInstance = null;
let lineChartInstance = null;

// Function to update the charts and metrics
function updateDashboard(data) {
  const totalSales = calculateTotalSales(data);
  const total_sales_format = formatTotalSales(totalSales);
  const totalQuantity = calculateTotalQuantity(data);
  const low_sales_store = calculateLowestSalesByStore(data);
  const high_store = calculateHighestSalesByStore(data);
  const productQuantity = calculateQuantitySoldByProduct(data);
  const sortedProducts = Object.keys(productQuantity).sort(
    (a, b) => productQuantity[b] - productQuantity[a]
  );
  const topProducts = sortedProducts.slice(0, 5);
  const topProductsLabels = topProducts.map((productId) => productId);
  const topProductsData = topProducts.map(
    (productId) => productQuantity[productId]
  );
  const monthlySales = calculateMonthlySales(data);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const salesData = months.map((month, index) => monthlySales[index] || 0);

  // Destroy existing bar chart instance if it exists
  if (barChartInstance) {
    barChartInstance.destroy();
  }

  // Create bar chart
  const bar = document.getElementById("barChart");
  barChartInstance = new Chart(bar, {
    type: "bar",
    data: {
      labels: topProductsLabels,
      datasets: [
        {
          label: "Quantity Sold",
          data: topProductsData,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        legend: {
          display: false,
          position: "top",
        },
      },
    },
  });

  // Destroy existing line chart instance if it exists
  if (lineChartInstance) {
    lineChartInstance.destroy();
  }

  // Create line chart
  const line = document.getElementById("lineChart").getContext("2d");
  lineChartInstance = new Chart(line, {
    type: "line",
    data: {
      labels: months,
      datasets: [
        {
          label: "Monthly Sales",
          data: salesData,
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {},
    },
  });

  // Update the HTML content
  document.getElementById("total-sales").textContent = total_sales_format;
  document.getElementById("total-qty-sold").textContent = totalQuantity;
  document.getElementById("low_store").textContent = low_sales_store;
  document.getElementById("high_store").textContent = high_store;
}

// Function to handle date filter
function filterData() {
  const startDate = document.getElementById('start-date').value;
  const endDate = document.getElementById('end-date').value;
  
  if (new Date(endDate) < new Date(startDate)) {
    showModal('End date cannot be earlier than start date');
    return;
  }

  fetch("../final_dataset.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      const filteredData = filterDataByDate(data, startDate, endDate);
      updateDashboard(filteredData);
    });
}

// Function to show modal with error message
function showModal(message) {
  const modal = document.getElementById("errorModal");
  const modalMessage = document.getElementById("modal-message");
  const span = document.getElementsByClassName("close")[0];
  const closeModalButton = document.getElementById("closeModalButton");

  modalMessage.textContent = message;
  modal.style.display = "block";

  span.onclick = function() {
    modal.style.display = "none";
  }

  closeModalButton.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

// Initial load JSON data and update the dashboard
fetch("../final_dataset.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    // Initial update with all data
    updateDashboard(data);

    // Add event listener to the filter button
    document.querySelector('.date-range button').addEventListener('click', filterData);
  });

// SIDEBAR TOGGLE

let sidebarOpen = false;
const sidebar = document.getElementById("sidebar");

function openSidebar() {
  if (!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if (sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}
