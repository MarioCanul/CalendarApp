import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import DateTimePicker from "react-datetime-picker";
import moment from "moment";
import Swal from "sweetalert2";
import { uiCloseModal } from "../../actions/ui";
import {
  clearActiveEvent,
  eventAddNew,
  updatedEvent,
} from "../../actions/events";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");
const nowDate = moment().minutes(0).seconds(0).add(1, "hours");
const endDate = nowDate.clone().add(1, "hours");

const initEvent = {
  title: "",
  notes: "",
  start: nowDate.toDate(),
  end: endDate.toDate(),
};

export const CalendarModal = () => {
  const dispatch = useDispatch();
  const { modalOpen } = useSelector((state) => state.ui);
  const { activeEvent } = useSelector((state) => state.calendar);
  console.log(modalOpen);
  const [dateStart, setDateStart] = useState(nowDate.toDate());
  const [dateEnd, setDateEnd] = useState(endDate.toDate());
  const [Titlevalid, setTitlevalid] = useState(true);
  const [FormValues, setFormVAlues] = useState(initEvent);
  const { title, notes, start, end } = FormValues;
  useEffect(() => {
    if (activeEvent) {
      setFormVAlues(activeEvent);
    }else{
      setFormVAlues(initEvent)
    }
  }, [activeEvent, setFormVAlues]);

  const handleInputChange = ({ target }) => {
    setFormVAlues({
      ...FormValues,
      [target.name]: target.value,
    });
  };
  const closeModal = () => {
    //   TODO :cerrar modal
    dispatch(uiCloseModal());
    dispatch(clearActiveEvent());
    setFormVAlues(initEvent);
  };
  const handleStartDateChange = (e) => {
    setDateStart(e);
    setFormVAlues({
      ...FormValues,
      start: e,
    });
  };
  const handleEndtDateChange = (e) => {
    setDateEnd(e);
    setFormVAlues({
      ...FormValues,
      end: e,
    });
  };
  const handleSubmitForm = (e) => {
    console.log("submit");
    e.preventDefault();
    const momentStart = moment(start);
    const momentEnd = moment(end);

    if (momentStart.isSameOrAfter(momentEnd)) {
      return Swal.fire(
        "Error",
        "La fecha fin debe de ser mayor a la fecha de inicio",
        "error"
      );
    }
    if (title.trim().length < 2) {
      return setTitlevalid(false);
    }
    if (activeEvent) {
      dispatch(updatedEvent(FormValues));
    } else {
      dispatch(
        eventAddNew({
          ...FormValues,
          id: new Date().getTime(),
          user: {
            _id: "123",
            name: "mario",
          },
        })
      );
    }

    setTitlevalid(true);
    closeModal();
  };
  return (
    <Modal
      isOpen={modalOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      style={customStyles}
      closeTimeoutMS={200}
      className="modal"
      overlayClassName="modal-fondo"
    >
      <h1> {(activeEvent)?'EditarEvento':'Nuevo Evento'} </h1>
      <hr />
      <form onSubmit={handleSubmitForm} className="container">
        <div className="form-group">
          <label>Fecha y hora inicio</label>
          <DateTimePicker
            onChange={handleStartDateChange}
            value={dateStart}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Fecha y hora fin</label>
          <DateTimePicker
            onChange={handleEndtDateChange}
            value={dateEnd}
            minDate={dateStart}
            className="form-control"
          />
        </div>

        <hr />
        <div className="form-group">
          <label>Titulo y notas</label>
          <input
            type="text"
            className={`form-control ${!Titlevalid && "is-invalid"}`}
            placeholder="Título del evento"
            name="title"
            value={title}
            onChange={handleInputChange}
            autoComplete="off"
          />
          <small id="emailHelp" className="form-text text-muted">
            Una descripción corta
          </small>
        </div>

        <div className="form-group">
          <textarea
            type="text"
            className="form-control"
            placeholder="Notas"
            rows="5"
            name="notes"
            value={notes}
            onChange={handleInputChange}
          ></textarea>
          <small id="emailHelp" className="form-text text-muted">
            Información adicional
          </small>
        </div>

        <button type="submit" className="btn btn-outline-primary btn-block">
          <i className="far fa-save"></i>
          <span> Guardar</span>
        </button>
      </form>
    </Modal>
  );
};
