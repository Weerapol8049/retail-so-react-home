import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    FETCH_LOGIN: 'FETCH_LOGIN',
    FETCH_STORE: 'FETCH_STORE'
}

const stored = [];
function insertStored(recId, storeId, name) {
    return {recId, storeId, name };
}

export const fetchLogin = (user, password, onSuccess) => dispatch => {
    api.order().fetchLogin(user, password)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_LOGIN,
                payload: response.data
            })
            onSuccess();
        })
        .catch(err => console.log(err))
}

export const fetchAll = () => (dispatch) => {

    api.order().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchStore = (name, type) => dispatch => {
    api.store().fetchStore(name, type)
        .then(response => {

            const data = response.data.map((element) => {
                return { element };
            });
            for (const [index, value] of data.entries()) {
                stored.push(insertStored(value.element.recId, value.element.storeId, value.element.name));
            }

            console.log(JSON.stringify(stored))
            dispatch({
                type: ACTION_TYPES.FETCH_STORE,
                payload: stored
            })
        })
        .catch(err => console.log(err))
}

// export const fetchAll =  ()=> {
//     return async dispatch => {
//         await api.order().fetchAll()
//         .then(response =>{
//             dispatch({
//                 type: ACTION_TYPES.FETCH_ALL,
//                 payload: response.data
//             })
//         })
//         .catch(err => console.log(err))
//     }

// }