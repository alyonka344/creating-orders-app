import React, { useEffect } from "react";
import { TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/order";
import dayjs from 'dayjs';
import InputAdornment from '@mui/material/InputAdornment';
import { toast } from 'react-toastify';

const initialFieldValues = {
    senderCity: "",
    senderAddress: "",
    recipientCity: "",
    recipientAddress: "",
    weight: "",
    pickupDate: null
}

const formatting = (values) => {
    return {
        senderCity: values.senderCity,
        senderAddress: values.senderAddress,
        recipientCity: values.recipientCity,
        recipientAddress: values.recipientAddress,
        weight: values.weight,
        pickupDate: values.pickupDate.format("YYYY-MM-DD")
    }
}

const OrderForm = ({ ...props }) => {

    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('senderCity' in fieldValues)
            temp.senderCity = fieldValues.senderCity ? "" : "Please enter sender's city"
        if ('senderAddress' in fieldValues)
            temp.senderAddress = fieldValues.senderAddress ? "" : "Please enter sender's address"
        if ('recipientCity' in fieldValues)
            temp.recipientCity = fieldValues.recipientCity ? "" : "Please enter recipient's city"
        if ('recipientAddress' in fieldValues)
            temp.recipientAddress = fieldValues.recipientAddress ? "" : "Please enter recipient's address"
        if ('weight' in fieldValues)
            temp.weight = /^([0-9]{1,4})(\.[0-9]{1,2})?$/.test(fieldValues.weight) ? "" : "Weight must be a number (< 10000 kg) with up to two decimal places (delimeter - dot)";
        if ('pickupDate' in fieldValues)
            temp.pickupDate = fieldValues.pickupDate ? "" : "Please enter pick up date"
        setErrors({
            ...temp
        })

        if (fieldValues === values)
            return Object.values(temp).every(x => x === "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFieldValues, validate, props.setCurrentId)

    const handleSubmit = e => {
        e.preventDefault()
        if (validate()) {
            const onSuccess = () => {
                resetForm()
                toast.success("Submitted successfully")
            }
            if (props.currentId === 0)
                props.createOrder(formatting(values), onSuccess)
            else
                props.updateOrder(props.currentId, values, onSuccess)
        }
    }

    useEffect(() => {
        if (props.currentId !== 0) {
            setValues({
                ...props.orderList.find(x => x.id === props.currentId)
            })
            setErrors({})
        }
    }, [props.currentId])

    return (
        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                    <Grid size={6}>
                    <TextField
                        name="senderCity"
                        variant="outlined"
                        label="Sender's city"
                        value={values.senderCity}
                        onChange={handleInputChange}
                        {...(errors.senderCity && { error: true, helperText: errors.senderCity })}
                    />
                    </Grid>
                    <Grid size={6}>
                    <TextField
                        name="senderAddress"
                        variant="outlined"
                        label="Sender's address"
                        value={values.senderAddress}
                        onChange={handleInputChange}
                        {...(errors.senderAddress && { error: true, helperText: errors.senderAddress })}
                    />
                    </Grid>
                    <Grid size={6}>
                    <TextField
                        name="recipientCity"
                        variant="outlined"
                        label="Recipient's city"
                        value={values.recipientCity}
                        onChange={handleInputChange}
                        {...(errors.recipientCity && { error: true, helperText: errors.recipientCity })}
                    />
                    </Grid>
                
                
                    <Grid size={6}>
                    <TextField
                        name="recipientAddress"
                        variant="outlined"
                        label="Recipient's address"
                        value={values.recipientAddress}
                        onChange={handleInputChange}
                        {...(errors.recipientAddress && { error: true, helperText: errors.recipientAddress })}
                    />
                    </Grid>
                    <Grid size={5.36} sx={{ mr: 3.64 }}>
                    <TextField
                        name="weight"
                        variant="outlined"
                        label="Weight"
                        value={values.weight}
                        onChange={handleInputChange}
                        slotProps={{
                            input: {
                              startAdornment: <InputAdornment position="start">kg</InputAdornment>,
                            },
                          }}
                        {...(errors.weight && { error: true, helperText: errors.weight })}
                    />
                    </Grid>
                    <Grid size={5.36}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker 
                                disablePast
                                inputFormat="MM/DD/YYYY"
                                name="pickupDate"
                                variant="outlined"
                                label="Pick up date"
                                value={values.pickupDate}
                                onChange={(date) => handleInputChange({ target: { name: 'pickupDate', value: dayjs(date) } })}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <div>
                        <Button sx={{ mr: 2 }}
                            variant="contained"
                            color="primary"
                            type="submit"
                            className="smMargin">
                            Create order
                        </Button>
                        <Button
                            variant="contained"
                            className="smMargin"
                            onClick={resetForm}>
                            Reset
                        </Button>
                    </div>
            </Grid>
        </form>
    );
}

const mapStateToProps = state => ({
    orderList: state.Order.list
})

const mapActionToProps = {
    createOrder: actions.create,
    updateOrder: actions.update
}

export default connect(mapStateToProps, mapActionToProps)(OrderForm);