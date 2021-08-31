import moment from "moment";
import { types } from "../types/types";

const initialState = {
  events: [
    {
        id:new Date().getTime(),
      title: "Cumpleaños del jefe",
      start: moment().toDate(),
      end: moment().add(2, "hours").toDate(),
      bgcolor: "#fafafa",
      user: {
        _id: 123,
        name: "Mario",
      },
    },
  ],
  activeEvent: null,
};
export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.eventSetActive:
      return {
        ...state,
        activeEvent: action.payload,
      };
    case types.eventAddNew:
      console.log(action.payload);
      return {
        ...state,
        events: [...state.events, action.payload],
      };
case types.ClearActiveEvent:
    return{
        ...state,
        activeEvent:null
    }

case types.UpdatedEvent:
    return{
        ...state,
        events:state.events.map(e=> (e.id===action.payload.id)?action.payload:e
        )
    }
    case types.DeleteEvent:
    return{
        ...state,
        events:state.events.filter(e=> (e.id!==state.activeEvent.id)
        ),
        activeEvent:null
    }
    default:
      return state;
  }
};