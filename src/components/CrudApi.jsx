import { useState, useEffect, useReducer } from "react";
import { CrudForm } from "./CrudForm";
import { CrudTable } from "./CrudTable";
import {helpHttp} from "../helpers/helpHttp"
import Loader from "./Loader";
import Message from "./Message";
import { crudInitialState, crudReducer } from "../reducers/crudReducer";
import { TYPES } from "../actions/crudActions";

const CrudApi = () => {
    const [state, dispatch] = useReducer(crudReducer, crudInitialState)
    const {db} = state
    
    const [dataToEdit, setDataToEdit] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    let api = helpHttp();
    let url = "http://localhost:5000/santos"

    useEffect(() => {
        setLoading(true)
        api.get(url).then((res) => {
            if (!res.err) {
                dispatch({type: TYPES.READ_ALL_DATA, payload: res})
                setError(null)
            } else {
                dispatch({type: TYPES.NO_DATA})
                setError(res)
            }
            setLoading(false)
        })
    }, [url])


    const createData = (data) => {
        data.id = Date.now();

        let options = {
            body: data,
            headers: { "content-type": "application/json" }
        }

        api.post(url, options).then((res) => {
            if (!res.err) {
                dispatch({type: TYPES.CREATE_DATA, payload: res})
            } else {
                setError(res)
            }
        })
    }

    const updateData = (data) => {
        let endpoint = `${url}/${data.id}`
        let options = {
            body: data,
            headers: { "content-type": "application/json" }
        }
        api.put(endpoint, options).then((res) => {
            if (!res.err) {
                dispatch({type: TYPES.UPDATE_DATA, payload: data})
            } else {
                setError(res)
            }
        })
    }

    const deleteData = (id) => {
        let isDelete = confirm(`Estás seguro ded elimninar el registro con el id '${id}'`)
        if (isDelete) {
            let endpoint = `${url}/${id}`
            let options = {
                headers: { "content-type": "application/json" }
            }
            api.del(endpoint, options).then((res) => {
                if (!res.err) {
                    dispatch({type: TYPES.DELETE_DATA, payload: id})
                } else {
                    setError(res)
                }
            })
        } else {
            return;
        }
    }

    return (
        <div>
            <h2>CRUD-API</h2>
            <CrudForm
                createData={createData}
                updateData={updateData}
                dataToEdit={dataToEdit}
                setDataToEdit={setDataToEdit}
            />
            {loading && <Loader />}
            {error && <Message
                msg={`Error ${error.status}: ${error.statusText}`}
                bgColor="#dc3545" />}
            {db && <CrudTable
                data={db}
                setDataToEdit={setDataToEdit}
                deleteData={deleteData}
            />}
        </div>
    )
}

export default CrudApi