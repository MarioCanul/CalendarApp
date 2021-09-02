import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../actions/auth";
import { useForm } from "../../hooks/useForm";
import "./login.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const [formvalues, handleInputChange] = useForm({
    lEmail: "mario_can12@hotmail.com",
    lPassword: "250497",
  });
  const { lEmail, lPassword } = formvalues;
  const [rformvalues, rhandleInputChange] = useForm({
    rName: "nargacuga",
    rEmail: "mario_can13@hotmail.com",
    r1Password: "250497",
    r2Password: "250497",
  });
  const { rName, rEmail, r1Password,r2Password} = rformvalues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (r1Password!==r2Password) {
        return Swal.fire('Error','las contraseñas deben ser iguales','error')
    }
dispatch(startRegister(rName, rEmail, r1Password))
  };
  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
                onChange={rhandleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={rhandleInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="r1Password"
                value={r1Password}
                onChange={rhandleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Repita la contraseña"
                name="r2Password"
                value={r2Password}
                onChange={rhandleInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
