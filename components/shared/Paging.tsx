import React from "react";
import { makeStyles } from '@mui/styles';
import { Pagination } from "@mui/material";

const useStyles = makeStyles(() => ({
    ul: {
        "& .Mui-selected": {
            backgroundColor: "#0B305F",
            color: "#fff",
            "&:hover" :{
                backgroundColor: "#0B305F",
                color: "#fff",
            }
        },
    },
}));

const Paging = (props: PagingProps) => {
    const classes = useStyles();
    const {totalPage, currentPage, handlePageChange } = props;

    return <Pagination 
        classes={{ ul: classes.ul }}
        count={totalPage} 
        page={currentPage} 
        onChange={(e: any, v:number) => handlePageChange(v)} 
        variant="outlined" 
        shape="rounded" 
    />
}

export interface PagingProps {
    totalPage: number;
    currentPage: number;
    handlePageChange: any;
}

export default Paging;