import ExcelJS from "exceljs";

export default function ExportButton({ userInfo }) {
  const final = [];
  let array = [];
  function exportExcelFile() {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("My sheet");
    const header = [
      "Label",
      "Sample",
      "Amount",
      "Creation Date",
      "Status",
      "Expire Date",
      "Custom Fields",
    ];
    sheet.addRow(header);
    for (let i = 0; i < userInfo.location.children.length; i++) {
      // sheet.addRow(
      //   Object.values(flatObject(userInfo.location.children[i].biosample))
      // );
      final.push(flatObject(userInfo.location.children[i].biosample));
    }
    console.log(userInfo.location.children);
    for (let i = 0; i < final.length; i++) {
      array.push(userInfo.location.children[i].name);
      array.push(final[i].name);
      array.push(final[i].quantity);
      array.push(final[i].createDate);
      array.push(final[i].status);
      array.push(final[i].expireDate);
      for (let j = 0; j < final[i].newCustomfields.length; j++) {
        array.push(final[i].newCustomfields[j]);
      }
      sheet.addRow(array);
      array = [];
    }
    sheet.mergeCells("G1:Z1");
    sheet.columns.forEach((column) => {
      column.width = 25;
    });
    sheet.eachRow((row) => {
      row.height = 24;
      row.eachCell((cell) => {
        cell.alignment = { horizontal: "center" };
        cell.font = {
          size: 12,
          color: { argb: "515151" },
        };
      });
    });
    const row = sheet.getRow(1);
    row.eachCell({ includeEmpty: true }, (cell) => {
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "E4E8E6" },
      };
      cell.font = {
        size: 17,
        color: { argb: "999A9A" },
      };
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
  function flatObject(obj) {
    const keysToDelete = [
      "biotype",
      "biotypeId",
      "caseStudyId",
      "containerId",
      "createUserId",
      "description",
      "facilityId",
      "id",
      "isParticipant",
      "locationId",
      "parentId",
      "studyId",
      "transferId",
      "_pedigree",
      "updateDate",
      "expireDate",
    ];
    keysToDelete.forEach((key) => {
      delete obj[key];
    });
    const e = {};
    obj.customfields.forEach((x) => {
      e[x.id] = `${x.name}: ${x.value}`;
    });
    const newCustomfields = Object.values(e);
    const x = {
      ...obj,
      newCustomfields,
    };
    removeElement(x);
    return x;
  }
  function removeElement(x) {
    x.customfields = null;
  }
  return (
    <div>
      <button onClick={exportExcelFile}>Export</button>
    </div>
  );
}
