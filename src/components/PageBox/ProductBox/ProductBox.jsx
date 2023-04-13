import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import "./ProductBox.css";
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
import useHttp from "../../../HooK/use-http";
import axios from "axios";
import { Api } from "../../../RTK/Api";
import { toast } from "react-toastify";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const ProductBox = () => {
  const navigate = useNavigate();
  let { t, i18n } = useTranslation();

  let [page, setPage] = useState(1);
  let [error, setError] = useState();
  

  const [products, setProducts] = useState();
  useEffect(() => {
    getProducts(page)
  }, [page]);
  
  
  let getProducts = async(pageNum)=>{
    try {
        let res = await axios.get(
            `${process.env.REACT_APP_API}/products?page=${pageNum}`,
            Api()
        );
        setProducts(res.data)
    } catch (error) {
        // console.log(error.response.data)
        console.log(error.response.data);
        setError(error.response.data)
    }
  }
  
  let deleteProduct = async (id)=>{
    try {
        let res = await axios.delete(
            `${process.env.REACT_APP_API}/products/${id}`,
            Api()
        );
        console.log(res.data)
        getProducts(page)
        toast.success("Product Deleted Successfully")
    } catch (error) {
        // console.log(error.response.data)
        toast.error(error.response.data)
    }
  }

  return (
    <>
      <div className=" mx-auto px-4  mt-[40px]">
        <div className="flex  items-start md:items-center justify-end flex-col md:flex-row mb-3  gap-5 ">
          <Button
            variant="contained"
            color="primary"
            className=" !bg-primaryBg"
            onClick={() => {
              navigate("/admin/product/add/add");
            }}
          >
            {t("pages.ProductBox.Add_a_new")}
          </Button>
        </div>
        <TableContainer component={Paper} sx={{ height: "438px" }}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell
                  align="center"
                  className="!bg-primaryBg capitalize"
                >
                  {t("pages.ProductBox.table.id")}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="!bg-primaryBg capitalize"
                >
                  {t("pages.ProductBox.table.Name")}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="!bg-primaryBg capitalize"
                >
                  {t("pages.ProductBox.table.Price")}
                </StyledTableCell>
                <StyledTableCell
                  align="center"
                  className="!bg-primaryBg capitalize"
                >
                  {t("pages.ProductBox.table.actions")}
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products?.data.map((product, index) => (
                <StyledTableRow key={product.id}>
                  <StyledTableCell align="center">{product.id}</StyledTableCell>
                  <StyledTableCell align="center">
                    {product.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {product.unit_price}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <div className="action flex items-center justify-center gap-2">
                      <IconButton
                        aria-label=""
                        onClick={() => {
                          navigate(`/admin/product/edit/${product.id}`);
                        }}
                      >
                        <ModeEdit />
                      </IconButton>
                      <IconButton aria-label="" onClick={()=>deleteProduct(product.id)}>
                        <DeleteForever />
                      </IconButton>
                    </div>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <PaginationBox count={products?.meta.last_page} setPageTarget={setPage} />
    </>
  );
};

export default ProductBox;
