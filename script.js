const numberInput = document.querySelector(".js.table-number");
const boundryInput = document.querySelector(".js.table-boundry");
const writeBtn = document.querySelector(".js.write-btn");
const tableContainer = document.querySelector(".js.output-container");
const errorContainer = document.querySelector(".error.js");

writeBtn.addEventListener('click', generateTable);

function generateTable() {
  const tableNumber = Number(numberInput.value);
  const tableBoundry = Number(boundryInput.value);

  // Clear previous content and error messages
  tableContainer.innerHTML = "";
  errorContainer.classList.remove("visible");
  numberInput.classList.remove("error-input");
  boundryInput.classList.remove("error-input");

  // Validation logic
  const isValidNumber = tableNumber >= 1 && tableNumber <= 1000;
  const isValidBoundry = tableBoundry >= 1 && tableBoundry <= 50;

  if (!isValidNumber) {
    errorContainer.textContent = "Please enter a valid number (1–1000) for 'Table of'.";
    errorContainer.classList.add("visible");
    numberInput.classList.add("error-input");
    numberInput.focus(); // Focus on the invalid 'Table of' input
    return;
  }

  if (!isValidBoundry) {
    errorContainer.textContent = "Please enter a valid number (1–50) for 'Up to'.";
    errorContainer.classList.add("visible");
    boundryInput.classList.add("error-input");
    boundryInput.focus();
    return;
  }

  // Build the table with headers
  let tableHTML = `
    <table class="table-container">
      <thead>
        <tr>
          <th colspan="4">Expression</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
  `;
  
  for (let i = 1; i <= tableBoundry; i++) {
    tableHTML += `
      <tr class="table-row">
        <td>${tableNumber}</td>
        <td>×</td>
        <td>${i}</td>
        <td>=</td>
        <td>${tableNumber * i}</td> 
      </tr>
    `;
  }

  tableHTML += `</tbody></table>`;
  tableContainer.innerHTML = tableHTML;
}