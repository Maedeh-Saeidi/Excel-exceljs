import ExcelJS from "exceljs";

export default function GridView({ userInfo }) {
  function exportExcelFile() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My sheet");
    sheet.eachRow((row) => {
      row.height = 25;
    });
    let row = [];
    const cols = userInfo.location.cells.cols;
    userInfo.location.children.forEach((element) => {
      row.push(`${element.name}\n\n\n${element.biosample.name}`);
      if (element.order % cols === 0) {
        sheet.addRow(row);
        row = [];
      }
    });
    sheet.eachRow((row) => {
      row.height = 50;
      row.alignment = { wrapText: true };
      row.eachCell((cell) => {
        cell.alignment = { vertical: "top", wrapText: true };
      });
    });
    sheet.columns.forEach((column) => {
      column.width = 15;
    });
    workbook.xlsx.writeBuffer().then(function (data) {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "ExcelFile.xlsx";
      anchor.click();
      window.URL.revokeObjectURL(url);
    });
  }
  return (
    <div>
      <button onClick={exportExcelFile}>Export</button>
    </div>
  );
}
