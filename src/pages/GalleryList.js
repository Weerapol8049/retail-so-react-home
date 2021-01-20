import axios from 'axios';
import React from 'react'
import Gallery from "./Gallery";

export default function GalleryList() {

    const API =(url = 'http://localhost:60658/api/Image') => {
        return {
            fetchAll: () => axios.get(url),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }

    const addOrEdit = (formData, onSuccess) => {
        API().create(formData)
        .then(response => {
            onSuccess();
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <Gallery addOrEdit={addOrEdit}></Gallery>
            </div>
            <div className="col-md-8">
                <div>list</div>
            </div>
        </div>

    )
}
