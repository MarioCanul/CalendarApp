import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import "moment/locale/es-mx";

import { Navbar } from "../ui/Navbar";
import { messages } from "../../helpers/Calendar-Messages";
import { CalendarEvent } from "./CalendarEvent";
import { CalendarModal } from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import { clearActiveEvent, eventSetActive, eventStartLoading } from "../../actions/events";
import { AddNewFab } from "../ui/AddNewFab";
import { DeleteEventfab } from "../ui/DeleteEventfab";
import { useEffect } from "react";
const localizer = momentLocalizer(moment);

export const CalendarScreen = () => {
  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );
  const {events, activeEvent} = useSelector(state => state.calendar)
  const {uid} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(eventStartLoading())
  }, [dispatch])
  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };
const handleSelectSlot=()=>{
  dispatch(clearActiveEvent())
}
  const onSelect = (e) => {
    dispatch(eventSetActive(e));
  };
  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };
  const eventStylesGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: (uid===event.user._id)? "#367CF7": '#465660',
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "black",
    };
    return { style };
  };
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        messages={messages}
        eventPropGetter={eventStylesGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        components={{
          event: CalendarEvent,
        }}
        onSelectSlot={handleSelectSlot}
        selectable={true}
        onView={onViewChange}
        view={lastView}
      />
      <AddNewFab />
   {(   activeEvent&& <DeleteEventfab/>)}
      <CalendarModal />
    </div>
  );
};
