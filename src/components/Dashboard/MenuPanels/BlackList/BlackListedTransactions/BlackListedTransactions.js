import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import classes from "../../Transactions/TransactionsTable/TransactionsTable.module.css";
import { IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import Spinner from "../../../../../containers/UI/Spinner/Spinner";

const BlackListedTransactions = (props) => {
  const { handleDeleteBlackList, currentTableData } = props;
  const isLoading = useSelector((state) => state.blackList.fetching);
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead classes={{ root: classes.table_head }}>
          <TableRow classes={{ root: classes.table__head_row }}>
            <TableCell>Wallet Address</TableCell>
            <TableCell align="right">Time To Next Transaction</TableCell>
            <TableCell align="right" className={classes.action_icon_row}>
              Options
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody classes={{ root: classes.table__body }}>
          {!isLoading &&
            currentTableData &&
            currentTableData.map((row) => {
              return (
                <TableRow
                  key={row.name}
                  classes={{ root: classes.table_body_row }}
                >
                  <TableCell component="th" scope="row">
                    {row.wallet_address}
                  </TableCell>
                  <TableCell align="right">2 Days</TableCell>
                  <TableCell align="right" className={classes.action_icon_row}>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      className={classes.action_icon}
                      onClick={() => handleDeleteBlackList(row.uuid)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      {isLoading && (
        <div className={classes.spinner_wrapper}>
          <Spinner />
        </div>
      )}
    </TableContainer>
  );
};
export default BlackListedTransactions;
