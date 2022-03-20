import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { fetchAllTransactions } from "../../../../store/Actions/TransactionsActions";
import Pagination from "../../Pagination/Pagination";
import TransactionActions from "./TransactionActions";
import TransactionsTable from "./TransactionsTable/TransactionsTable";
import classes from "./UserTransactions.module.css";

let PageSize = 5;
const SortingArray = [
  { name: "Wallet Address", value: "wallet" },
  { name: "Amount", value: "amount" },
  { name: "Currency", value: "name" },
  { name: "Hash", value: "hash" },
];

const UserTransactions = () => {
  const { token, apiToken } = useSelector((state) => state.auth);
  const transactionsList = useSelector(
    (state) => state.transactions.transactionsList
  );
  const [selected, setSelected] = useState("Wallet Address");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTransactions(token, apiToken));
  }, [token, apiToken, dispatch]);

  let sortedData = [];
  if (transactionsList && transactionsList.length > 0) {
    sortedData = [...transactionsList];
  }
  if (selected !== null) {
    sortedData.sort((a, b) => {
      if (
        selected === "name"
          ? a.token.name < b.token.name
          : a[selected] < b[selected]
      ) {
        return -1;
      }
      if (a[selected] > b[selected]) {
        return 1;
      }
      return 0;
    });
  }

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return sortedData && sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedData]);

  const FormatedData =
    transactionsList &&
    transactionsList.map((row) => {
      let TransactionDate = new Date(row.created).toLocaleString("en-GB", {
        hour12: true,
      });
      return [
        row.wallet,
        row.uuid,
        row.hash,
        row.amount,
        row.token.name,
        row.account.email,
        TransactionDate,
        row.status,
      ];
    });

  // const downloadExcel = () => {
  //   const workSheet = XLSX.utils.json_to_sheet(FormatedData);
  //   const workBook = XLSX.utils.book_new();
  //   XLSX.utils.book_append_sheet(workBook, workSheet, "transactions");
  //   //Buffer
  //   let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  //   //Binary string
  //   XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  //   //Download
  //   XLSX.writeFile(workBook, "Transactions.xlsx");
  // };

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });
    doc.text("Transactions Details", 10, 10);
    doc.autoTable({
      theme: "grid",
      columnStyles: { valign: "center" },
      headStyles: { minCellWidth: 20 },
      head: [
        [
          "Wallet Address",
          "Transaction uuid",
          "Hash",
          "Amount",
          "Token",
          "Email",
          "Date",
          "Status",
        ],
      ],
      body: FormatedData,
    });
    doc.save(
      `Transactions-${new Date().toLocaleString("en-GB", { hour12: true })}.pdf`
    );
  };

  return (
    <div className={classes.user_transactions_wrapper}>
      <div className={classes.user_transactions_section}>
        <TransactionActions
          transactions={true}
          setSelected={setSelected}
          selected={selected}
          SortingArray={SortingArray}
          actions={downloadPdf}
        />
        <div className={classes.transactions_table_wrapper}>
          <TransactionsTable currentTableData={currentTableData} />
        </div>
      </div>
      <div className={classes.transcations_actions_wrapper}>
        <div className={classes.displayed_transactions_count}>
          <h4>
            Displaying {currentTableData.length} of{" "}
            {transactionsList && transactionsList.length} items
          </h4>
        </div>
        <div className={classes.transaction_pagination_wrapper}>
          {transactionsList && transactionsList.length > 0 && (
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={transactionsList.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UserTransactions;
