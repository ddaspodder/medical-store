import * as React from "react";
import { useState, useEffect, useCallback } from "react";
import { getTableData } from "../../apiEndpoint";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "../core/Button";
import AddToStoreForm from "./AddToStoreForm";
import AddToShopForm from "./AddToShopForm";
import SellProductForm from "./SellProductForm";
import StoreToShopForm from "./StoreToShopForm";
import EditProductForm from "./EditProductForm";
import DeleteProductForm from "./DeleteProductForm";
import Modal from "../core/Modal";
import dayjs from "dayjs";

const actionColumns = [
  {
    id: "add_to_shop",
    label: "Add To Shop",
    minWidth: 120,
    align: "left",
  },
  {
    id: "add_to_store",
    label: "Add To Store",
    minWidth: 120,
    align: "left",
  },
  {
    id: "store_to_shop",
    label: "Store To Shop",
    minWidth: 120,
    align: "left",
  },
  {
    id: "sell_item",
    label: "Sell Item",
    minWidth: 120,
    align: "left",
  },
  {
    id: "edit",
    label: "Update Product",
    minWidth: 120,
    align: "left",
  },
  {
    id: "delete",
    label: "Remove Product",
    minWidth: 120,
    align: "left",
  },
];

function Row({
  row,
  rowIndex,
  unitList,
  subUnitList,
  typeList,
  handleAlert,
  fetchData,
  columns,
}) {
  const [open, setOpen] = useState(false);
  const getForm = useCallback(
    (column, modalProps) => {
      switch (column.id) {
        case "add_to_shop":
          return (
            <AddToShopForm
              {...modalProps}
              data={{ ...row }}
              unitList={unitList}
              subUnitList={subUnitList}
              handleAlert={handleAlert}
              fetchData={fetchData}
            />
          );
        case "add_to_store":
          return (
            <AddToStoreForm
              {...modalProps}
              data={{ ...row }}
              unitList={unitList}
              subUnitList={subUnitList}
              handleAlert={handleAlert}
              fetchData={fetchData}
            />
          );
        case "sell_item":
          return (
            <SellProductForm
              {...modalProps}
              data={{ ...row }}
              unitList={unitList}
              subUnitList={subUnitList}
              handleAlert={handleAlert}
              fetchData={fetchData}
            />
          );
        case "store_to_shop":
          return (
            <StoreToShopForm
              {...modalProps}
              data={{ ...row }}
              unitList={unitList}
              subUnitList={subUnitList}
              handleAlert={handleAlert}
              fetchData={fetchData}
            />
          );
        case "edit":
          return (
            <EditProductForm
              {...modalProps}
              data={{ ...row }}
              unitList={unitList}
              subUnitList={subUnitList}
              typeList={typeList}
              handleAlert={handleAlert}
              fetchData={fetchData}
            />
          );
        case "delete":
          return (
            <DeleteProductForm
              {...modalProps}
              data={{ ...row }}
              unitList={unitList}
              subUnitList={subUnitList}
              handleAlert={handleAlert}
              fetchData={fetchData}
            />
          );
        default:
          return "";
      }
    },
    [
      row,
      unitList,
      subUnitList,
      typeList,
      handleAlert,
      fetchData,
    ]
  );

  const getFormattedQty = useCallback(
    (qty) => {
      if (!!qty) {
        const [unitQty, subUnitQty] = qty.split("|");
        const filteredUnit = unitList.find(
          (unit) => unit.id === row.unit
        );
        const filteredSubUnit = subUnitList.find(
          (subUnit) => subUnit.id === row.subUnit
        );
        const filteredUnitLabel =
          (filteredUnit && filteredUnit.value) || "";
        const filteredSubUnitLabel =
          (filteredSubUnit && filteredSubUnit.value) || "";
        const qtyLabel = `${unitQty}\u00A0${filteredUnitLabel} ${
          !!row.subUnit ? subUnitQty : ""
        }\u00A0${filteredSubUnitLabel}`;
        return qtyLabel;
      }
      return "";
    },
    [row, unitList, subUnitList]
  );

  return (
    <React.Fragment>
      <TableRow>
        <TableCell style={{ borderBottom: "none" }}>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        {/* for SL no */}
        <TableCell
          key={"serial"}
          align={"left"}
          style={{ borderBottom: "none" }}
        >
          {rowIndex + 1}
        </TableCell>
        {columns.map((column) => {
          const value = (() => {
            if (
              column.id === "stock" ||
              column.id === "store" ||
              column.id === "shop"
            )
              return getFormattedQty(row[column.id]);
            else if (column.id === "type") {
              const filteredType = typeList.find(
                (item) => item.id === row["type"]
              );
              return filteredType ? filteredType.value : "";
            } else if (
              column.id === "expiry" &&
              !!row[column.id]
            ) {
              return dayjs(row[column.id]).format(
                "DD-MM-YYYY"
              );
            }
            return row[column.id];
          })();
          return (
            <TableCell
              key={column.id}
              align={column.align}
              style={{ borderBottom: "none" }}
            >
              {value}
            </TableCell>
          );
        })}
      </TableRow>
      <TableCell
        style={{ paddingBottom: 0, paddingTop: 0 }}
        colSpan={10}
      >
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box>
            <Table>
              <TableRow>
                {actionColumns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      borderBottom: "none",
                    }}
                  >
                    <Modal
                      label={column.label}
                      buttonVariant={"contained"}
                    >
                      {(modalProps) =>
                        getForm(column, modalProps)
                      }
                    </Modal>
                  </TableCell>
                ))}
              </TableRow>
            </Table>
          </Box>
        </Collapse>
      </TableCell>
    </React.Fragment>
  );
}
export default function StickyHeadTable(props) {
  const {
    data,
    fetchData,
    unitList,
    subUnitList,
    typeList,
    handleAlert,
    columns,
  } = props;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(400);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = data;
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 1000 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell
                key={"collapse_btn"}
                align={"left"}
                style={{ minWidth: 20 }}
              />
              {/* for S.L. no */}
              <TableCell
                key={"serial"}
                align={"left"}
                style={{ minWidth: 20, fontWeight: "bold" }}
              >
                {"S.L."}
              </TableCell>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{
                    minWidth: column.minWidth,
                    fontWeight: "bold",
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
              .map((row, index) => {
                return (
                  <Row
                    key={row.serial}
                    rowIndex={index}
                    row={row}
                    unitList={unitList}
                    subUnitList={subUnitList}
                    handleAlert={handleAlert}
                    typeList={typeList}
                    fetchData={fetchData}
                    columns={columns}
                  />
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100, 200, 400]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
