const GRID_SIZE = 20;

document.addEventListener("DOMContentLoaded", () => {
  const gridBody = document.querySelector(".js.grid-body");
  const gridHead = document.querySelector(".js.grid-head-row");
  const readout = document.querySelector(".js.grid-readout");
  const rowSelect = document.querySelector(".js.row-select");
  const colSelect = document.querySelector(".js.col-select");

  if (!gridBody || !gridHead || !readout || !rowSelect || !colSelect) {
    console.warn("Multiplication grid: required elements not found.");
    return;
  }

  buildHeaderRow();
  buildGridBody();
  buildSelectOptions();

  let activeRow = null;
  let activeCol = null;

  // ---- Build the top header row (corner cell + 1..20) ----
  function buildHeaderRow() {
    const corner = document.createElement("th");
    corner.scope = "col";
    corner.className = "grid-corner";
    corner.textContent = "×";
    gridHead.appendChild(corner);

    for (let c = 1; c <= GRID_SIZE; c++) {
      const th = document.createElement("th");
      th.scope = "col";
      th.textContent = c;
      th.dataset.col = c;
      th.className = "grid-col-header";
      gridHead.appendChild(th);
    }
  }

  // ---- Build the 20 data rows ----
  function buildGridBody() {
    const fragment = document.createDocumentFragment();

    for (let r = 1; r <= GRID_SIZE; r++) {
      const tr = document.createElement("tr");
      tr.dataset.row = r;

      const rowHeader = document.createElement("th");
      rowHeader.scope = "row";
      rowHeader.textContent = r;
      rowHeader.dataset.row = r;
      rowHeader.className = "grid-row-header";
      tr.appendChild(rowHeader);

      for (let c = 1; c <= GRID_SIZE; c++) {
        const td = document.createElement("td");
        td.textContent = r * c;
        td.dataset.row = r;
        td.dataset.col = c;
        td.tabIndex = -1;
        tr.appendChild(td);
      }

      fragment.appendChild(tr);
    }

    gridBody.appendChild(fragment);

    // Event delegation: hover (mouse) + click/tap (touch & mouse)
    gridBody.addEventListener("mouseover", handleCellEvent);
    gridBody.addEventListener("click", handleCellEvent);
  }

  function handleCellEvent(event) {
    const cell = event.target.closest("td");
    if (!cell) return;
    highlight(Number(cell.dataset.row), Number(cell.dataset.col));

    if (event.type === "click" && window.trackEvent) {
      window.trackEvent("grid_cell_selected", {
        row: cell.dataset.row,
        column: cell.dataset.col,
        result: Number(cell.dataset.row) * Number(cell.dataset.col),
      });
    }
  }

  // ---- Row/column dropdown fallback (also fully keyboard accessible) ----
  function buildSelectOptions() {
    for (let n = 1; n <= GRID_SIZE; n++) {
      rowSelect.appendChild(new Option(n, n));
      colSelect.appendChild(new Option(n, n));
    }

    rowSelect.addEventListener("change", () => selectFromDropdowns(true));
    colSelect.addEventListener("change", () => selectFromDropdowns(false));
  }

  function selectFromDropdowns(fromRow) {
    const row = Number(rowSelect.value) || null;
    const col = Number(colSelect.value) || null;
    highlight(row, col);

    if (window.trackEvent) {
      window.trackEvent("grid_dropdown_selected", {
        row: row,
        column: col,
        changed: fromRow ? "row" : "column",
      });
    }
  }

  // ---- Core highlight logic ----
  function highlight(row, col) {
    clearHighlights();
    activeRow = row;
    activeCol = col;

    if (row) {
      gridBody
        .querySelectorAll(`td[data-row="${row}"], th[data-row="${row}"]`)
        .forEach((el) => el.classList.add("hl-row"));
      gridHead.querySelector(`.grid-row-header[data-row="${row}"]`);
    }

    if (col) {
      gridBody
        .querySelectorAll(`td[data-col="${col}"]`)
        .forEach((el) => el.classList.add("hl-col"));
      const colHeader = gridHead.querySelector(`[data-col="${col}"]`);
      if (colHeader) colHeader.classList.add("hl-col");
    }

    if (row) {
      const rowHeader = gridBody.querySelector(
        `th.grid-row-header[data-row="${row}"]`
      );
      if (rowHeader) rowHeader.classList.add("hl-row");
    }

    if (row && col) {
      const activeCell = gridBody.querySelector(
        `td[data-row="${row}"][data-col="${col}"]`
      );
      if (activeCell) activeCell.classList.add("hl-active");
      readout.innerHTML = `<strong>${row} × ${col} = ${row * col}</strong>`;
      readout.classList.add("has-result");
      rowSelect.value = row;
      colSelect.value = col;
    }
  }

  function clearHighlights() {
    gridBody
      .querySelectorAll(".hl-row, .hl-col, .hl-active")
      .forEach((el) => el.classList.remove("hl-row", "hl-col", "hl-active"));
    gridHead
      .querySelectorAll(".hl-col")
      .forEach((el) => el.classList.remove("hl-col"));
  }
});
