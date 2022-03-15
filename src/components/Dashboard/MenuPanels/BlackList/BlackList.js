import React, { useEffect, useState, useMemo } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import classes from "./BlackList.module.css";
import BlackListedTransactions from "./BlackListedTransactions/BlackListedTransactions";
import TransactionActions from "../Transactions/TransactionActions";
import ModalComponent, {
  ACTIONTYPE,
} from "../../../../containers/UI/Modal/Modal";
import Pagination from "../../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlackList } from "../../../../store/Actions/BlackListActions";
let PageSize = 5;

const SortingArray = [
  { name: "wallet Address", value: "wallet_address" },
  { name: "Time to next transaction", value: "time" },
];

const BlackList = () => {
  const { token, apiToken } = useSelector((state) => state.auth);
  const blackList = useSelector((state) => state.blackList.blackList);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("Wallet Address");
  const [selectedToken, setSelectedToken] = useState("Select Wallet Address");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(fetchBlackList(token, apiToken));
  }, [token, apiToken, dispatch]);

  let sortedData =[]
  if (blackList && blackList.length > 0) {
     sortedData = [...blackList];
  }
  if (selected !== null) {
    sortedData.sort((a, b) => {
      if (a[selected] < b[selected]) {
        return -1;
      }
      if (a[selected] > b[selected]) {
        return 1;
      }
      return 0;
    });
  }

  const handleDeleteBlackList = (token_uuid) => {
    setType(ACTIONTYPE.DELETE_BLACKLIST);
    setOpen(true);
    setSelectedToken(token_uuid);
  };

  const AddNewBlackListHandler = () => {
    setType(ACTIONTYPE.ADD_TO_BLACKLIST);
    setOpen(true);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return sortedData && sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedData]);

  const FormatedData = blackList && blackList.map((row) => {
    let BlackListDate = new Date(row.created).toLocaleString("en-GB", {
      hour12: true,
    });
    return [row.wallet_address, row.uuid, 2, row.ip_address, BlackListDate];
  });

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });
    doc.text("BlackList Details", 10, 10);
    doc.autoTable({
      theme: "grid",
      columnStyles: { valign: "center" },
      headStyles: { minCellWidth: 20 },
      head: [
        [
          "Wallet Address",
          "UUID",
          "Time To Next Transaction",
          "ip_address",
          "Date",
        ],
      ],
      body: FormatedData,
    });
    doc.save("BlackList.pdf");
  };

  return (
    <>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        type={type}
        selected={selectedToken}
        setSelected={setSelectedToken}
      />
      <div className={classes.black_list_transactions_wrapper}>
        <div className={classes.black_list_transactions_section}>
          <TransactionActions
            AddNewBlackListHandler={AddNewBlackListHandler}
            selected={selected}
            SortingArray={SortingArray}
            setSelected={setSelected}
            actions={downloadPdf}
          />
          <div className={classes.transactions_table_wrapper}>
            <BlackListedTransactions
              handleDeleteBlackList={handleDeleteBlackList}
              currentTableData={currentTableData}
            />
          </div>
        </div>
        <div className={classes.transcations_actions_wrapper}>
          <div className={classes.displayed_transactions_count}>
            <h4>
              Displaying {currentTableData.length} of{" "}
              {blackList && blackList.length} items
            </h4>
          </div>
          <div className={classes.transaction_pagination_wrapper}>
            {blackList && blackList.length>0 &&
            <Pagination
              className="pagination-bar"
              currentPage={currentPage}
              totalCount={blackList && blackList.length}
              pageSize={PageSize}
              onPageChange={(page) => setCurrentPage(page)}
            />}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlackList;
