import React, { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import classes from "./Tokens.module.css";
import TokensTable from "./TokensTable/TokensTable";
import TransactionActions from "../Transactions/TransactionActions";
import ModalComponent, {
  ACTIONTYPE,
} from "../../../../containers/UI/Modal/Modal";
import Pagination from "../../Pagination/Pagination";
import { fetchAllTokens } from "../../../../store/Actions/TokensActions";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { fetchAllTransactions } from "../../../../store/Actions/TransactionsActions";

let PageSize = 5;
const SortingArray = [
  { name: "Name", value: "name" },
  { name: "Balance", value: "total_value" },
  { name: "Total transactions", value: "maximum_amount" },
];

const Tokens = () => {
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [action, setAction] = useState();
  const [selected, setSelected] = useState("Name");
  const [selectedToken, setSelectedToken] = useState("");
  const { token, apiToken } = useSelector((state) => state.auth);
  const EnabledTokens = useSelector((state) => state.tokens.tokens);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllTokens(token, apiToken));
    dispatch(fetchAllTransactions(token, apiToken));
  }, [token, apiToken, dispatch]);

  let sortedData = [];
  if (EnabledTokens && EnabledTokens.length > 0) {
    sortedData = [...EnabledTokens];
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

  const handleDeleteTokens = (token_uuid) => {
    setAction(ACTIONTYPE.DELETE_TOKEN);
    setOpen(true);
    setSelectedToken(token_uuid);
  };
  const handleEditHandler = (token_uuid) => {
    setAction(ACTIONTYPE.EDIT_TOKEN);
    setOpen(true);
    setSelectedToken(token_uuid);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return sortedData && sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedData]);

  const FormatedData =
    EnabledTokens &&
    EnabledTokens.map((row) => {
      return [
        row.wallet_address,
        row.uuid,
        row.name,
        row.total_value,
        row.maximum_amount,
        row.gas,
      ];
    });

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });
    doc.text("Tokens Details", 10, 10);
    doc.autoTable({
      theme: "grid",
      columnStyles: { valign: "center" },
      headStyles: { minCellWidth: 20 },
      head: [["Wallet Address", "UUID", "Name", "Balance", "Amount", "Gas"]],
      body: FormatedData,
    });
    doc.save(
      `Tokens-${new Date().toLocaleString("en-GB", { hour12: true })}.pdf`
    );
  };

  return (
    <>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        type={action}
        selected={selectedToken}
      />
      <div className={classes.user_tokens_wrapper}>
        <div className={classes.user_tokens_section}>
          <TransactionActions
            transactions={true}
            setOpen={setOpen}
            selected={selected}
            setSelected={setSelected}
            SortingArray={SortingArray}
            actions={downloadPdf}
          />
          <div className={classes.tokens_table_wrapper}>
            <TokensTable
              handleDeleteTokens={handleDeleteTokens}
              handleEditHandler={handleEditHandler}
              currentTableData={currentTableData}
            />
          </div>
        </div>
        <div className={classes.tokens_actions_wrapper}>
          <div className={classes.displayed_transactions_count}>
            <h4>
              Displaying {currentTableData && currentTableData.length} of{" "}
              {EnabledTokens && EnabledTokens.length} items
            </h4>
          </div>
          <div className={classes.transaction_pagination_wrapper}>
            {EnabledTokens && EnabledTokens.length > 0 && (
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={EnabledTokens && EnabledTokens.length}
                pageSize={PageSize}
                onPageChange={(page) => setCurrentPage(page)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Tokens;
