import { ButtonGroup, InputAdornment, List, makeStyles, Paper, TableBody, TableCell, TableRow, Toolbar, withStyles } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import useTable from '../components/useTable'
import * as actions from "../actions/order";
import { connect } from "react-redux";
import Controls from "../components/controls/Controls";
import { Add, Close, EditOutlined, PhotoLibrary, Search, ViewList } from '@material-ui/icons';
import MainForm from "./MainForm";

const styles = () => ({
    paper: {
        padding: '1%',
        marginTop: '3%',
        marginRight: '5%',
        marginLeft: '5%'
    },
    pageContent: {
        margin: '3%',
        padding: '2%',
    },
    searchInput: {
        width: "75%",
    },
    newButton: {
        position: "absolute",
        right: "10px",
    },
})

const headCells = [
    { id: "date", label: "วันที่ขาย" },
    { id: "storeId", label: "Store" },
    { id: "pool", label: "Pool" },
    { id: "qty", label: "จำนวน" },
    { id: "amount", label: "ยอดเงินรวม" },
    { id: "dueDate", label: "วันที่ติดตั้ง" },
    { id: "salesId", label: "Sales order" },
    { id: "purchId", label: "Purchase order" },
    { id: "custName", label: "ชื่อลูกค้า" },
    { id: "action", label: "", disableSoring: true },
]

const Main = ({ classes, ...props }) => {

    const [recordForEdit, setRecordForEdit] = useState(null);
    const [openPopup, setOpenPopup] = useState(false);
    const [records, setRecords] = useState(props.orderList);
    const [filterFn, setFilterFn] = useState({
        fn: (items) => {
            console.log(JSON.stringify(items))
            return items;
        },
    });

    const pages = [10, 15, 20, 25, 50];
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(pages[page]);

    const [order, setOrder] = useState();
    const [orderBy, setOrderBy] = useState();

    useEffect(() => {
        props.fetchAllOrder();
    }, [])

    const {
        TblContainer,
        TblHead,
        TblPagination
       
    } = useTable(props.orderList, headCells, filterFn)

    const handleSearch = (e) => {
        let target = e.target;
        setFilterFn({
          fn: (items) => {
            if (target.value == "") return items;
            else
              return items.filter((x) =>
                x.fullName.toLowerCase().includes(target.value)
              );
          },
        });
      };

    function stableSort(array, comparator) {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
            const order = comparator(a[0], b[0]);
            if (order !== 0) return order;
            return a[1] - b[1];
        });
        return stabilizedThis.map((el) => el[0]);
    }

    function getComparator(order, orderBy) {
        return order === "desc"
            ? (a, b) => descendingComparator(a, b, orderBy)
            : (a, b) => -descendingComparator(a, b, orderBy);
    }

    function descendingComparator(a, b, orderBy) {
        if (b[orderBy] < a[orderBy]) {
            return -1;
        }
        if (b[orderBy] > a[orderBy]) {
            return 1;
        }
        return 0;
    }

    const recordsAfterPagingAndSorting = () => {
        return stableSort(filterFn.fn(records), getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            (page + 1) * rowsPerPage
        );
    };

    const openInPopup = (item) => {
        setRecordForEdit(item);
        //setOpenPopup(true);
    };

    return (
        <>
            <Paper className={classes.paper}>
                <Toolbar>
                    <Controls.Input
                        label="Search"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search></Search>
                                </InputAdornment>
                            )
                        }}
                        onChange={handleSearch}
                    ></Controls.Input>
                    <Controls.Button
                        text="Add New"
                        variant="outlined"
                        startIcon={<Add />}
                        className={classes.newButton}
                        onClick={() => {
                            setOpenPopup(true);
                            setRecordForEdit(null);
                        }}
                    />
                </Toolbar>
                <TblContainer>
                    <TblHead></TblHead>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map((record, index) => {
                                return (
                                    <TableRow key={record.recId} hover>
                                        <TableCell>{record.date}</TableCell>
                                        <TableCell>{record.storeId}</TableCell>
                                        <TableCell>{record.pool}</TableCell>
                                        <TableCell>{record.qty}</TableCell>
                                        <TableCell>{record.amount}</TableCell>
                                        <TableCell>{record.confirmDate}</TableCell>
                                        <TableCell>{record.salesId}</TableCell>
                                        <TableCell>{record.purchId}</TableCell>
                                        <TableCell>{record.custName}</TableCell>
                                        <TableCell>
                                            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
                                                <Controls.ActionButton
                                                    color="primary"
                                                    onClick={() => {
                                                        openInPopup(record);
                                                    }}
                                                >
                                                    <EditOutlined fontSize="small"></EditOutlined>
                                                </Controls.ActionButton>
                                                <Controls.ActionButton
                                                    color="secondary"
                                                >
                                                    <Close fontSize="small"></Close>
                                                </Controls.ActionButton>
                                                <Controls.ActionButtonBadge
                                                    color="primary"
                                                    onClick={() => {
                                                        openInPopup(record);
                                                    }}
                                                >
                                                    <PhotoLibrary fontSize="small"></PhotoLibrary>
                                                </Controls.ActionButtonBadge>
                                                <Controls.ActionButtonBadge
                                                    color="secondary"
                                                >
                                                    <ViewList fontSize="small"></ViewList>
                                                </Controls.ActionButtonBadge>
                                            </ButtonGroup>

                                        </TableCell>

                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination></TblPagination>
            </Paper>
            <Controls.Popup
                title="New Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <MainForm></MainForm>
            </Controls.Popup>
        </>
    )
}

const mapStateToProps = (state) => ({
    orderList: state.order.list
})

const mapActionToProps = {
    fetchAllOrder: actions.fetchAll
    //fetchStoreOrder: actions.fetchStore
}

export default connect(mapStateToProps, mapActionToProps)(withStyles(styles)(Main));
