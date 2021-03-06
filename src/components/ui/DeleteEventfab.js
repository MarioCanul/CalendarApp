import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  eventStartDelete } from '../../actions/events'

export const DeleteEventfab = () => {
    const dispatch = useDispatch()
    const {activeEvent} = useSelector(state => state.calendar)
    const handleDelete=()=>{
        dispatch(eventStartDelete(activeEvent))
    }
    return (
        <button
        onClick={handleDelete}
        className='btn btn-danger fab-danger'
        >
            <i className='fas fa-trash'></i>
            <span>Borrar Evento</span>
        </button>
    )
}
