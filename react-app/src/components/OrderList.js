import React, { useEffect } from 'react'
import * as actions from "../actions/order";
import Table from "@mui/material/Table";
import { TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { connect } from "react-redux";

const OrderList = ({ ...props }) => {

    useEffect(() => {
        props.fetchAllOrders()
    },[])

    const showForUpdate = id => {
        props.setCurrentId(id);
        props.setOrderListVisibility(false);
    }

    const styles = {
        fontWeight: 'bold', 
        backgroundColor: '#f0f0f0', 
        fontSize: '16px' 
    }

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell style={styles}>№</TableCell>
                    <TableCell style={styles}>Sender's city</TableCell>
                    <TableCell style={styles}>Sender's address</TableCell>
                    <TableCell style={styles}>Recipient's city</TableCell>
                    <TableCell style={styles}>Recipient's address</TableCell>
                    <TableCell style={styles}>Weight</TableCell>
                    <TableCell style={styles}>Pick up date</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                        props.orderList.map((record, index) => {
                            return (<TableRow key={index} hover>
                                <TableCell
                                    onClick={() => showForUpdate(index)}>
                                    {index}
                                </TableCell>
                                <TableCell
                                    onClick={() => showForUpdate(index)}>
                                    {record.senderCity}
                                </TableCell>
                                <TableCell
                                    onClick={() => showForUpdate(index)}>
                                    {record.senderAddress}
                                </TableCell>
                                <TableCell
                                    onClick={() => showForUpdate(index)}>
                                    {record.recipientCity}
                                </TableCell>
                                <TableCell
                                    onClick={() => showForUpdate(index)}> 
                                    {record.recipientAddress}
                                </TableCell>
                                <TableCell
                                    onClick={() => showForUpdate(index)}> 
                                    {record.weight}
                                </TableCell>
                                <TableCell
                                    onClick={() => showForUpdate(index)}> 
                                    {record.pickupDate.substring(0, 10)}
                                </TableCell>
                            </TableRow>)
                        }
                    )
                }
            </TableBody>
        </Table>
    )
}

const mapStateToProps = state => ({
    orderList: state.Order.list
})

const mapActionToProps = {
    fetchAllOrders: actions.fetchAll
}

export default connect(mapStateToProps, mapActionToProps)(OrderList);