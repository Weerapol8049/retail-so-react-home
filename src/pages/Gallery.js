import { validate } from '@material-ui/pickers';
import React, { useState, useEffect } from 'react'

const defaultImageSrc = '/images/images-empty.png'

const initialFieldValues = {
    recId: 0,
    refRecId: 0,
    imageName: '',
    createDateTime: new Date(),
    image: '',
    imageSrc: defaultImageSrc,
    imageFile: null
}

export default function Gallery(props) {

    const {addOrEdit} = props;

    const [values, setValues] = useState(initialFieldValues);
    const [errors, setErrors] = useState({})

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })

            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        let temp = {}
        temp.imageName = values.imageName == "" ? false : true;
        temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true;
        setErrors(temp);
        return Object.values(temp).every(x => x == true);
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({})
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData();
            formData.append('recId',64002125)
            formData.append('SODaily',64002125)
            formData.append('Name',values.imageName)
            formData.append('imageFile',values.imageFile)
            addOrEdit(formData, resetForm)
        }
    }

    const applyErrorClass = field => ((field in errors && errors[field] == false) ? ' invalid-field' : '')

    return (
        <>
            <div className="container text-center">
                <p className="lead">Gallery</p>
            </div>
            <form autoComplete="off" noValidate onSubmit={handleOnSubmit}>
                <div className="card">
                    <div className="card-body">
                        <img src={values.imageSrc} className="card-img-top"></img>
                        <div className="form-group">
                            <input 
                                type="file" 
                                accept="image/*" 
                                className={"form-control-file" + applyErrorClass('imageSrc')}
                                onChange={showPreview}
                                id="image-uploader"></input>
                        </div>
                        <div className="form-group">
                            <input className={"form-control" + applyErrorClass('imageName')} 
                                placeholder="Image Name" 
                                name="imageName"
                                value={values.imageName}
                                onchange={handleInputChange}></input>
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-light">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </>

    )
}
