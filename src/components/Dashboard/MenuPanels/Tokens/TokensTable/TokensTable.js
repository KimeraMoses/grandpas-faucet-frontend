import React from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import DescriptionIcon from "@material-ui/icons/Description";
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

const TokensTable = (props) => {
  const { handleDeleteTokens, handleEditHandler, currentTableData } = props;
  const isLoading = useSelector((state) => state.tokens.fetching);
  const TransactionsList = useSelector(
    (state) => state.transactions.transactionsList
  );

  return (
    <TableContainer>
      <Table className={classes.table} aria-label="customized table">
        <TableHead classes={{ root: classes.table_head }}>
          <TableRow classes={{ root: classes.table__head_row }}>
            <TableCell>Name</TableCell>
            <TableCell align="right">Balance</TableCell>
            <TableCell align="right">Total Transactions</TableCell>
            <TableCell align="right" className={classes.action_icon_row}>
              Options
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody classes={{ root: classes.table__body }}>
          {!isLoading &&
            currentTableData &&
            currentTableData.map((row) => {
              const TotalTokens = TransactionsList && TransactionsList.filter((trans)=>trans.token.name === row.name)
              return (
                <TableRow
                  key={row.id}
                  classes={{ root: classes.table_body_row }}
                >
                  <TableCell component="th" scope="row">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.total_value}</TableCell>
                  <TableCell align="right">{TotalTokens.length}</TableCell>
                  <TableCell align="right" className={classes.action_icon_row}>
                    <IconButton
                      aria-label="delete"
                      size="small"
                      className={classes.action_icon}
                      onClick={() => handleDeleteTokens(row.uuid)}
                    >
                      <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Add"
                      size="small"
                      className={classes.action_icon}
                      onClick={() => handleEditHandler(row.uuid)}
                    >
                      <DescriptionIcon />
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
      {!isLoading && currentTableData.length<1 && (
        <div className={classes.no__values_wrapper}>
          <h4>No Tokens Found!!</h4>
        </div>
      )}
    </TableContainer>
  );
};
export default TokensTable;
