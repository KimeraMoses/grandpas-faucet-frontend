import XLSX from 'xlsx';
const DownloadExcel = ({data}) => {
    // const newData = studentData.map((row) => {
    //   delete row.tableData;
    //   return row;
    // });
    console.log("Table data",data)
    const workSheet = XLSX.utils.json_to_sheet(data);
    const workBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, "students");
    //Buffer
    let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
    //Binary string
    XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
    //Download
    XLSX.writeFile(workBook, "StudentsData.xlsx");
  };

  export default DownloadExcel;