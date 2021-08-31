import { types } from "../types/types";

export const eventAddNew=(event)=>({
type:types.eventAddNew,
payload:event
})

export const eventSetActive=(event)=>({
    type:types.eventSetActive,
    payload:event
})
export const clearActiveEvent=()=>({
    type:types.ClearActiveEvent
})
export const updatedEvent=(event)=>({
    type:types.UpdatedEvent,
    payload:event
} )
export const DeleteEvent=()=>({
    type:types.DeleteEvent
} )