import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { name, uid } = getState().auth;
    try {
      const resp = await fetchConToken("Calendar", event, "POST");
      const body = await resp.json();
      if (body.ok) {
        event.id = body.eventoGuardado.id;
        event.user = {
          _id: uid,
          name,
        };
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => ({
  type: types.eventAddNew,
  payload: event,
});

export const eventSetActive = (event) => ({
  type: types.eventSetActive,
  payload: event,
});
export const clearActiveEvent = () => ({
  type: types.ClearActiveEvent,
});
export const StartEventUpdate=(event)=>{
return async(dispatch)=>{
  try {
    const resp = await fetchConToken(`Calendar/${event.id}`, event, "PUT");
    const body = await resp.json();
    if (body.ok) {
      dispatch(updatedEvent(event))
    }else{
      Swal.fire('Error',body.msg,'error')
    }
    
  } catch (error) {
    console.log(error)
  }
}
}
const updatedEvent = (event) => ({
  type: types.UpdatedEvent,
  payload: event,
});
export const eventStartDelete=(event)=>{
  return async(dispatch,getState)=>{
    const {activeEvent}=getState().calendar
    try {
      const resp = await fetchConToken(`Calendar/${activeEvent.id}`, {}, "DELETE");
      const body = await resp.json();
      if (body.ok) {
        dispatch(DeleteEvent())
      }else{
        Swal.fire('Error',body.msg,'error')
      }
      
    } catch (error) {
      console.log(error)
    }
  }
}
export const DeleteEvent = () => ({
  type: types.DeleteEvent,
});
export const eventStartLoading=()=>{
    return async(dispatch)=>{
        try {
            const resp = await fetchConToken("Calendar");
            const body = await resp.json();
            const eventos = prepareEvents(body.getEventos)
            dispatch(eventLoaded(eventos))
        } catch (error) {
            console.log(error)
        }
    }
}
const eventLoaded=(events)=>({
type:types.eventsStartLoading,
payload:events
})