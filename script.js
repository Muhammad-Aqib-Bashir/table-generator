const MAX_TABLE_NUMBER = 10000; // whose table to generate
const MAX_BOUNDARY = 500; // how much expressions can be
const MIN_VALUE = 1; // number whose table will be

const numberInput = document.querySelector(".js.table-number");
const boundryInput = document.querySelector(".js.table-boundry");
const writeBtn = document.querySelector(".js.write-btn");
const printBtn = document.querySelector(".js.print-btn");
const tableContainer = document.querySelector(".js.output-container");
const errorContainer = document.querySelector(".error.js");

numberInput.setAttribute("max", MAX_TABLE_NUMBER);
boundryInput.setAttribute("max", MAX_BOUNDARY);

writeBtn.addEventListener("click", generateTable);
printBtn.addEventListener("click", printTable);

function generateTable() {
  const tableNumber = Number(numberInput.value);
  const tableBoundry = Number(boundryInput.value);

  // Clear previous content and error messages
  tableContainer.innerHTML = "";
  errorContainer.classList.remove("visible");
  numberInput.classList.remove("error-input");
  boundryInput.classList.remove("error-input");

  // Hide print button initially
  printBtn.style.display = "none";

  // Validation logic
  const isValidNumber =
    tableNumber >= MIN_VALUE && tableNumber <= MAX_TABLE_NUMBER;
  const isValidBoundry =
    tableBoundry >= MIN_VALUE && tableBoundry <= MAX_BOUNDARY;

  if (!isValidNumber) {
    errorContainer.textContent = `Please enter a valid number (${MIN_VALUE}–${MAX_TABLE_NUMBER}) for 'Table of'.`;
    errorContainer.classList.add("visible");
    numberInput.classList.add("error-input");
    numberInput.focus();
    return;
  }

  if (!isValidBoundry) {
    errorContainer.textContent = `Please enter a valid number (${MIN_VALUE}–${MAX_BOUNDARY}) for 'Up to'.`;
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
          <th colspan="4">Multiplication Table of ${tableNumber}</th>
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

  // Show print button after table is generated
  printBtn.style.display = "inline-block";
}

function printTable() {
  window.print();
}
