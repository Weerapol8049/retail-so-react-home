import axios from "axios";

const baseUrl = "http://localhost:60658/api/"

export default {
    order(url = baseUrl){
        return  {
            fetchAll : async () => await  axios.get(url + 'order/ชุติมา:4'),
            fetchById : async (id) => await axios.get(url + id),
            fetchLogin : async (user, password) => await axios.get(url + 'login/' + user + '/' + password),
            fetchStore : async (name, type) => await axios.get(url + 'order/store/ชุติมา:4'),
            create : newRecord => axios.post(url, newRecord),
            update : (id, updateRecord) => axios.put(url + id, updateRecord),
            delete : id => axios.delete(url + id)
        }
    }
   
}

