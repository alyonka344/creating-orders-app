import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/order";
import { Paper, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import OrderForm from "./OrderForm";
import MopedRoundedIcon from '@mui/icons-material/MopedRounded';
import OrderList from './OrderList';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";


const SiteView = ({ ...props }) => {

    const [currentId, setCurrentId] = useState(0)
    const [orderListVisibility, setOrderListVisibility] = useState(false);


    useEffect(() => {
        props.fetchAllOrders()
    },[])

    const openListOfOrders = () => {
        setOrderListVisibility(true);
    }

    const closeListOfOrders = () => {
        setOrderListVisibility(false);
    }

    return (
        <>
        <Paper elevation={3} sx={{ mt: 2 }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} justifyContent="center">
                <Grid item size={11.5} sx={{ mt: 2, mb: 2 }}>
                    <OrderForm {...({ currentId, setCurrentId })} />
                </Grid>
            </Grid>
        </Paper>
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
                <Button
                    size="large"
                    onClick={openListOfOrders}
                    startIcon={<MopedRoundedIcon />}
                    variant="contained">
                    Orders
                </Button>
            </Grid>
        <Dialog
            open={orderListVisibility}
            onClose={closeListOfOrders}
            maxWidth="md"
            fullWidth
        >
            <DialogTitle>List of Orders</DialogTitle>
            <DialogContent>
                <OrderList {...{ setCurrentId, setOrderListVisibility }} />
            </DialogContent>
        </Dialog>
        </>
    );
} 

const mapStateToProps = state => ({
    orderList: state.Order.list
})

const mapActionToProps = {
    fetchAllOrders: actions.fetchAll,
    deleteOrder: actions.Delete
}

export default connect(mapStateToProps, mapActionToProps)(SiteView);