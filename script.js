
document.addEventListener("DOMContentLoaded", function () {
  const texts = document.querySelector(".texts");
  const tableId = document.querySelector("#tableId");
  const searchBtn = document.querySelector("#searchBtn");
  const suggestionList = document.querySelector("#suggestionList");
  let dataFields = [];
  let table = null;

  tableId.addEventListener("input", autocomplete);
  searchBtn.addEventListener("click", showData);
  tableId.addEventListener("keydown", (e) => e.key === "Enter" && showData());

  function autocomplete() {
    const inputValue = tableId.value.toLowerCase().trim();
    suggestionList.innerHTML = "";
    if (!inputValue) return;

    const filteredData = dataTables.filter((t) => t.NameEn.toLowerCase().includes(inputValue));
    filteredData.slice(0, 10).forEach((suggestion) => {
      const div = document.createElement("div");
      div.classList.add("suggestion-item");
      div.textContent = `${suggestion.Id} -- ${suggestion.NameEn}`;
      div.addEventListener("click", function () {
        tableId.value = suggestion.NameEn;
        suggestionList.innerHTML = "";
      });
      suggestionList.appendChild(div);
    });
  }

  function showData() {
    texts.innerHTML = "";
    const tableName = tableId.value.trim();
    const tableData = dataTables.find((t) => t.NameEn.toLowerCase() === tableName.toLowerCase());
    if (!tableData) {
      texts.innerHTML = "<p>No matching table found.</p>";
      return;
    }

    const p = document.createElement("p");
    p.textContent = `${tableData.Id} - ${tableData.NameEn} : ${tableData.NameFr}`;
    texts.appendChild(p);

    table = document.createElement("table");
    table.classList.add("tab-info");
    dataFields = tableData.Fields;
    buildTable(table, dataFields);
  }

  function buildTable(table, data) {
    table.innerHTML = "";
    texts.appendChild(table);
    const headers = Object.keys(data[0] || {});
    const headerRow = document.createElement("tr");
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    data.slice(0, 10).forEach((rowObj) => {
      const row = document.createElement("tr");
      headers.forEach((header) => {
        const td = document.createElement("td");
        td.textContent = rowObj[header] || "-";
        row.appendChild(td);
      });
      table.appendChild(row);
    });
  }
});