import React, { useEffect, useState, useMemo } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import classes from "../BlackList/BlackList.module.css";
import TransactionActions from "../Transactions/TransactionActions";
import ModalComponent, {
  ACTIONTYPE,
} from "../../../../containers/UI/Modal/Modal";
import Pagination from "../../Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchBlackListSettings,
} from "../../../../store/Actions/BlackListActions";
import BlackListTable from "./BlackListTable/BlackListTable";
import { fetchAllTokens } from "../../../../store/Actions/TokensActions";
let PageSize = 5;

const SortingArray = [
  { name: "Token Name", value: "name" },
  { name: "Max Amount", value: "max_amount" },
  { name: "Max Amount Duration", value: "max_amount_duration" },
];

const BlackListSettings = () => {
  const { token, apiToken } = useSelector((state) => state.auth);
  const blackList = useSelector((state) => state.blackList.blackListSettings);
  const TokensData = useSelector((state) => state.tokens.tokens);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("Token Name");
  const [selectedToken, setSelectedToken] = useState("Select Token");
  const [selectedName, setSelectedName] = useState("Select Token");
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    dispatch(fetchBlackListSettings(token, apiToken));
    dispatch(fetchAllTokens(token, apiToken));
  }, [token, apiToken, dispatch]);
  console.log(blackList)
  const filteredTokens = TokensData.filter((token) => {
    let isAdded = false;
    for (let i = 0; i < blackList.length; i++) {
      if (token._id === blackList[i].token._id) {
        isAdded = true;
      }
    }
    return !isAdded;
  });

  let sortedData = [];
  if (blackList && blackList.length > 0) {
    sortedData = [...blackList];
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

  const handleDeleteBlackList = (ID) => {
    setType(ACTIONTYPE.DELETE_BLACKLIST_SETTING);
    setOpen(true);
    setSelectedToken(ID);
  };

  const handleEditHandler = (ID) => {
    setType(ACTIONTYPE.EDIT_BLACKLIST_SETTING);
    setOpen(true);
    setSelectedToken(ID);
  };

  const AddNewBlackListHandler = () => {
    setType(ACTIONTYPE.ADD_TO_BLACKLIST_SETTINGS);
    setOpen(true);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return sortedData && sortedData.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, sortedData]);

  const FormatedData =
    blackList &&
    blackList.map((row) => {
      let BlackListDate = new Date(row.created).toLocaleString("en-GB", {
        hour12: true,
      });
      return [
        row.token.name,
        row.uuid,
        row.max_amount,
        row.max_amount_duration,
        BlackListDate,
      ];
    });

  const downloadPdf = () => {
    const doc = new jsPDF({
      orientation: "landscape",
    });
    doc.text("BlackList Settings Details", 10, 10);
    doc.autoTable({
      theme: "grid",
      columnStyles: { valign: "center" },
      headStyles: { minCellWidth: 20 },
      head: [
        [
          "Token Name",
          "UUID",
          "Max Amount",
          "Max Amount Duration",
          "Date BlackListed",
        ],
      ],
      body: FormatedData,
    });
    doc.save(
      `BlackListSettings-${new Date().toLocaleString("en-GB", {
        hour12: true,
      })}.pdf`
    );
  };

  return (
    <>
      <ModalComponent
        open={open}
        setOpen={setOpen}
        type={type}
        selected={selectedToken}
        setSelected={setSelectedToken}
        selectedName={selectedName}
        setSelectedName={setSelectedName}
        ArrayData={filteredTokens}
      />
      <div className={classes.black_list_transactions_wrapper}>
        <div className={classes.black_list_transactions_section}>
          <TransactionActions
            AddNewBlackListHandler={AddNewBlackListHandler}
            selected={selected}
            SortingArray={SortingArray}
            setSelected={setSelected}
            actions={downloadPdf}
            ArrayData={filteredTokens}
          />
          <div className={classes.transactions_table_wrapper}>
            <BlackListTable
              handleDeleteBlackList={handleDeleteBlackList}
              handleEditHandler={handleEditHandler}
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
            {blackList && blackList.length > 0 && (
              <Pagination
                className="pagination-bar"
                currentPage={currentPage}
                totalCount={blackList && blackList.length}
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

export default BlackListSettings;
