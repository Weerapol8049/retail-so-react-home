import { FormControl, InputLabel,Select as MuiSelect, MenuItem, FormHelperText } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import * as actions from "../../actions/order";
import { connect } from "react-redux";


// export default function Select(props) {
    const Select = (props) => {
   const { name, label, value,error=null, onChange, options } = props;

   useEffect(() => {
    props.fetchStoreOrder();
}, [])//componentDidMount


const [stores, setStores] = useState(props.storeList)

console.log("Store === " + JSON.stringify(stores))

    return (
        <FormControl variant="outlined"
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value="">None</MenuItem>
                {
                    stores.map(item => (
                        <MenuItem key={item.recId} value={item.storeId}>
                            {item.name}
                        </MenuItem>
                    )
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}

const mapStateToProps = (state) => ({
    storeList: state.order.list
})

const mapActionToProps = {
    fetchStoreOrder: actions.fetchStore
}

export default connect(mapStateToProps, mapActionToProps) (Select);
