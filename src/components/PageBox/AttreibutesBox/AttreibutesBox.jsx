import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./AttreibutesBox.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { DeleteForever, ModeEdit } from "@mui/icons-material";
import { Avatar, Button } from "@mui/material";
import { PaginationBox } from "../../index.js";
import { useTranslation } from "react-i18next";
import { AttributeThunk } from "../../../RTK/Thunk/AttributeThunk";
import { useDispatch, useSelector } from "react-redux";
import { DeleteAttributeThunk } from "../../../RTK/Thunk/DeleteAttributeThunk";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

const AttreibutesBox = ({ setOpen, setTypeAttributes }) => {
    let { t, i18n } = useTranslation();
    let dispatch = useDispatch();

    const [pageTarget, setPageTarget] = useState(1);
    let { attributeData, lastPage } = useSelector(
        (state) => state.AttributeReducer
    );

    useEffect(() => {
        dispatch(AttributeThunk({ page: pageTarget }));
    }, [dispatch, pageTarget, i18n.language]);
    // handle Delete attribute
    let handleDeleteAttribute = (id) => {
        dispatch(
            DeleteAttributeThunk({
                id: id,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(AttributeThunk({ page: pageTarget }));
            })
            .catch((error) => {
                // console.log(error);
                // handle error here
            });
    };
    return (
        <>
            <div className=" mx-auto px-4 mt-[40px]">
                <div className="flex  items-start md:items-center justify-end flex-col md:flex-row mb-3  gap-5 ">
                    <Button
                        variant="contained"
                        color="primary"
                        className=" !bg-primaryBg"
                        onClick={() => {
                            setOpen(true);
                            setTypeAttributes({
                                type: "add",
                                id: "",
                            });
                        }}
                    >
                        {t("pages.AttributeBox.Add_a_new")}
                    </Button>
                </div>
                {attributeData.length && (
                    <TableContainer component={Paper} sx={{ height: "438px" }}>
                        <Table
                            sx={{ minWidth: 700 }}
                            aria-label="customized table"
                        >
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.AttributeBox.table.id")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.AttributeBox.table.Name")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.AttributeBox.table.actions")}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {attributeData.map((row, index) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell align="center">
                                            {row.id}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <div className="action flex items-center justify-center gap-2">
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        setOpen(true);
                                                        setTypeAttributes({
                                                            type: "update",
                                                            id: row.id,
                                                        });
                                                    }}
                                                >
                                                    <ModeEdit />
                                                </IconButton>
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        handleDeleteAttribute(
                                                            row.id
                                                        );
                                                    }}
                                                >
                                                    <DeleteForever />
                                                </IconButton>
                                            </div>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </div>

            <PaginationBox count={lastPage} setPageTarget={setPageTarget} />
        </>
    );
};

export default AttreibutesBox;
