import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

import "../../styles/home.css";

export const Create = () => {
  const { store, actions } = useContext(Context);
  const [data, setData] = useState({
    name: "", email: "", phone: "", address: ""
  })
  console.log(store.slug);
  const Agregar = (event) => {
    event.preventDefault();
    actions.createContact(data, store.slug); // Pasa el objeto data a createContact
  };

  const info = (event) => {
    setData({
      ...data, [event.target.name]: event.target.value
    })
  }
  return (
    <div className="text-center mt-5">

      <ul className="list-group">
        <li className="list-group-item">
          <h1 className="title">Add a new contact</h1>

          <div>
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" placeholder="Full Name" onChange={info} name="name" required value={data.name} />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input type="text" className="form-control" placeholder="Enter email" onChange={info} name="email" required value={data.email} />
          </div>
          <div>
            <label className="form-label">Phone</label>
            <input type="text" className="form-control" placeholder="Enter phone" onChange={info} name="phone" required value={data.phone} />
          </div>
          <div>
            <label className="form-label">Address</label>
            <input type="text" className="form-control" placeholder="Enter address" onChange={info} name="address" required value={data.address} />
          </div>

         
          <br />
          <div className="d-grid gap-2">
            <button className="btn btn-primary" type="button" onClick={Agregar}>
              Enviar
            </button>
          </div>
          <br />
          <Link to="/">
            <span>Or get back to contacts</span>
          </Link>

        </li>
      </ul>
    </div>
  );
};

export default Create;
