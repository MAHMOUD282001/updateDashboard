import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RolesBox.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { DeleteForever, ModeEdit, RemoveRedEye } from "@mui/icons-material";
import { Button } from "@mui/material";
import { PaginationBox } from "../../index.js";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { AllRolesThunk } from "../../../RTK/Thunk/AllRolesThunk";
import { DeleteRoleThunk } from "../../../RTK/Thunk/DeleteRoleThunk";

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



const RolesBox = () => {
    const navigate = useNavigate();
    let dispatch = useDispatch();

    let { t, i18n } = useTranslation();
    let { roleData, lastPage } = useSelector((state) => state.RolesReducer);
    const [pageTarget, setPageTarget] = useState(1);
    useEffect(() => {
        dispatch(AllRolesThunk({ page: pageTarget }));
    }, [dispatch, pageTarget, i18n.language]);
    // handle Delete role
    let handleDeleteRole = (id) => {
        dispatch(
            DeleteRoleThunk({
                id: id,
            })
        )
            .unwrap()
            .then((data) => {
                // console.log(data);
                dispatch(AllRolesThunk({ page: pageTarget }));
            })
            .catch((error) => {
                // console.log(error);
                // handle error here
            });
    };
    return (
        <>
            <div className=" mx-auto px-4  mt-[40px]">
                <div className="flex  items-start md:items-center justify-end flex-col md:flex-row mb-3  gap-5 ">
                    <Button
                        variant="contained"
                        color="primary"
                        className=" !bg-primaryBg"
                        onClick={() => {
                            navigate("/admin/roles/add/add");
                        }}
                    >
                        {t("pages.RolesBox.Add_a_new")}
                    </Button>
                </div>
                {roleData.length ? (
                    <TableContainer component={Paper} className="  !h-fit">
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
                                        {t("pages.RolesBox.table.id")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.RolesBox.table.Name")}
                                    </StyledTableCell>
                                    <StyledTableCell
                                        align="center"
                                        className="!bg-primaryBg capitalize"
                                    >
                                        {t("pages.RolesBox.table.actions")}
                                    </StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roleData.map((row, index) => (
                                    <StyledTableRow key={row.id}>
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
                                                        navigate(
                                                            `/admin/roles/edit/${row.id}`
                                                        );
                                                    }}
                                                >
                                                    <ModeEdit />
                                                </IconButton>
                                                <IconButton
                                                    aria-label=""
                                                    onClick={() => {
                                                        handleDeleteRole(row.id);
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
                ) : null}
            </div>

            <PaginationBox count={lastPage} setPageTarget={setPageTarget} />
        </>
    );
};

export default RolesBox;
