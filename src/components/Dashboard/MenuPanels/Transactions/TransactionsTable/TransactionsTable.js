import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import classes from "./TransactionsTable.module.css";
import { useSelector } from "react-redux";
import Spinner from "../../../../../containers/UI/Spinner/Spinner";

const TransactionsTable = (props) => {
  const isLoading = useSelector((state) => state.transactions.isLoading);
  const { currentTableData } = props;
  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead classes={{ root: classes.table_head }}>
          <TableRow classes={{ root: classes.table__head_row }}>
            <TableCell>To</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Currency</TableCell>
            <TableCell align="right">Hash</TableCell>
          </TableRow>
        </TableHead>
        <TableBody classes={{ root: classes.table__body }}>
          {!isLoading &&
            currentTableData &&
            currentTableData.map((row) => (
              <TableRow key={row.id} classes={{ root: classes.table_body_row }}>
                <TableCell component="th" scope="row">
                  {row.wallet}
                </TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">
                  {row.token && row.token.name}
                </TableCell>
                <TableCell
                  align="right"
                  className={classes.hash__value_wrapper}
                >
                  {row.hash}
                </TableCell>
              </TableRow>
            ))}
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
export default TransactionsTable;
