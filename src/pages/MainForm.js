import { Grid } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import Controls from "../components/controls/Controls";
import { useForm, Form } from '../components/useForm';
import * as actions from "../actions/order";
import { connect } from "react-redux";

const initialFieldValue = {
    recId: 0,
    date: new Date(),
    storeId: '',
    pool: '',
    qty: 0,
    amount: 0,
    confirmDate: new Date(),
    salesId: '',
    purchId: '',
    custName: '',
    lineCount: 0,
    imageCount: 0
}

const initialFieldStoreValue = {
    storeId: '',
    name: '',
}

const MainForm = (props) => {

    const {
      values, 
      setValues,
      errors, 
      setErrors, 
      handleInputChange, 
      resetForm 
    } = useForm(initialFieldValue);

    useEffect(() => {
        props.fetchStoreOrder();
    }, [])//componentDidMount


    const [stores, setStores] = useState(props.storeList)

    return (
      
            <Grid container>
                <Grid item md={6} xs={6}>
                    <Controls.DatePicker
                        name="date"
                        label="วันที่ขาย"
                        value={values.date}
                        onChange={handleInputChange}
                    />
                    <Controls.Select
                        label="Store Id"
                        name="storeId"
                        value={values.storeId}
                        onChange={handleInputChange}
                        //options={stores}
                    />
                    <Controls.Input
                        label="จำนวน"
                        name="qty"
                        value={values.qty}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item md={6} xs={6}>
                    <Controls.DatePicker
                        name="confirmDate"
                        label="วันที่ติดตั้ง"
                        value={values.confirmDate}
                        onChange={handleInputChange}
                    />
                    <Controls.Select
                        label="Pool"
                        name="pool"
                        //value={values.pool}
                        //onChange={handleInputChange}
                    //options={}
                    />
                    <Controls.Input
                        label="ยอดเงินรวม"
                        name="amount"
                        value={values.amount}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item md={12} xs={12}>
                    <Controls.Input
                        label="ชื่อลูกค้า"
                        name="custName"
                        value={values.custName}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item md={6} xs={6}>
                    <Controls.Input
                        label="Sales order"
                        name="salesId"
                        value={values.salesId}
                        onChange={handleInputChange}
                    />
                </Grid>
                <Grid item md={6} xs={6}>
                    <Controls.Input
                        label="Purchase order"
                        name="purchId"
                        value={values.purchId}
                        onChange={handleInputChange}
                    />
                </Grid>
             
            </Grid>
       
    )
}

const mapStateToProps = (state) => ({
    storeList: state.order.list
})

const mapActionToProps = {
    fetchStoreOrder: actions.fetchStore
}

export default connect(mapStateToProps, mapActionToProps) (MainForm);
//export default MainForm;


