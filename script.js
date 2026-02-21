const MAX_TABLE_NUMBER = 100000; // Maximum number for table generation
const MAX_BOUNDARY = 50000; // Maximum limit for table expressions
const MIN_VALUE = 1; // Minimum value for inputs

const numberInput = document.querySelector(".js.table-number");
const fromInput = document.querySelector(".js.table-from");
const boundryInput = document.querySelector(".js.table-boundry");
const writeBtn = document.querySelector(".js.write-btn");
const printBtn = document.querySelector(".js.print-btn");
const tableContainer = document.querySelector(".js.output-container");
const errorContainer = document.querySelector(".error.js");

// Set maximum values for inputs
numberInput.setAttribute("max", MAX_TABLE_NUMBER);
fromInput.setAttribute("max", MAX_BOUNDARY);
boundryInput.setAttribute("max", MAX_BOUNDARY);

document.addEventListener("DOMContentLoaded", () => {
  writeBtn.addEventListener("click", generateTable);
  printBtn.addEventListener("click", printTable);
});

function generateTable() {
  const tableNumber = Number(numberInput.value);
  const tableFrom = Number(fromInput.value);
  const tableBoundry = Number(boundryInput.value);

  // Clear previous content and error messages
  tableContainer.innerHTML = "";
  errorContainer.classList.remove("visible");
  numberInput.classList.remove("error-input");
  fromInput.classList.remove("error-input");
  boundryInput.classList.remove("error-input");

  // Hide print button initially
  printBtn.style.display = "none";

  // Validation logic
  const isValidNumber =
    tableNumber >= MIN_VALUE && tableNumber <= MAX_TABLE_NUMBER;

  const isValidFrom = tableFrom >= MIN_VALUE && tableFrom <= MAX_BOUNDARY;

  const isValidBoundry =
    tableBoundry >= MIN_VALUE && tableBoundry <= MAX_BOUNDARY;

  if (!isValidNumber) {
    errorContainer.textContent = `Please enter a valid number (${MIN_VALUE}–${MAX_TABLE_NUMBER}) for 'Table for'.`;
    errorContainer.classList.add("visible");
    numberInput.classList.add("error-input");
    numberInput.focus();
    return;
  }

  if (!isValidFrom) {
    errorContainer.textContent = `Please enter a valid number (${MIN_VALUE}–${MAX_BOUNDARY}) for 'From'.`;
    errorContainer.classList.add("visible");
    fromInput.classList.add("error-input");
    fromInput.focus();
    return;
  }

  if (!isValidBoundry) {
    errorContainer.textContent = `Please enter a valid number (${MIN_VALUE}–${MAX_BOUNDARY}) for 'Up to'.`;
    errorContainer.classList.add("visible");
    boundryInput.classList.add("error-input");
    boundryInput.focus();
    return;
  }

  if (tableFrom > tableBoundry) {
    errorContainer.textContent = `'From' value cannot be greater than 'Up to'.`;
    errorContainer.classList.add("visible");
    fromInput.classList.add("error-input");
    boundryInput.classList.add("error-input");
    fromInput.focus();
    return;
  }

  let tableHTML = `
    <table class="table-container">
      <thead>
        <tr>
          <th colspan="5">
            Multiplication Table of ${tableNumber}
            (${tableFrom} to ${tableBoundry})
          </th>
        </tr>
      </thead>
      <tbody>
  `;

  for (let i = tableFrom; i <= tableBoundry; i++) {
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

  tableHTML += `
      </tbody>
    </table>
  `;

  tableContainer.innerHTML = tableHTML;

  // Show print button after table is generated
  printBtn.style.display = "inline-block";
}

function printTable() {
  window.print();
}
