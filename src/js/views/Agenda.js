import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Agenda = () => {
	const { store, actions } = useContext(Context);
	console.log(store.contacts)
	const [nameAgenda, setNameAgenda] = useState("")

	useEffect(() => {
		actions.GetContact()
	}, [])
	return (
		<div className="container">
			<h3>Primero crea un contacto y luego Busca tu agenda por nombre:</h3>
			<input type="text" onChange={(e) => actions.GetContact(e.target.value)} placeholder="David"></input>
			<ul className="list-group">
				{store.contacts.map((item, index) => (


					<div className="card mb-3" key={index}
					//  style={{ maxWidth: "540px;" }}
					 >

						<div className="row g-0">
							<div className="col-md-4">
								<img src="https://previews.123rf.com/images/jemastock/jemastock1705/jemastock170509810/78457957-cara-hombre-arte-pop-estilo-imagen-vector-ilustraci%C3%B3n.jpg" style={{ height: "200px" }} className="img-fluid rounded-start" alt="..." />
							</div>
							<div className="col-md-5">
								<div className="card-body">
									<h5 className="card-title">{item.full_name}</h5>
									<p className="card-text"><i className="fa-solid fa-envelope"></i> {item.email}</p>
									<p className="card-text"><i className="fa-solid fa-location-dot"></i> {item.address}</p>
									<p className="card-text"><i className="fa-solid fa-phone"></i> {item.phone}</p>

								</div>
							</div>

							
							<div className=" justify-content-md-end col-md-3">

								<button className="btn   " type="button" onClick={() => actions.deleteContact(item.id)}><i className="fa-solid fa-trash"></i></button>
								<Link to={`/demoid/${item.id}`} className="btn me-md-2">
									<button className="btn me-md-2" type="button" ><i className="fa-solid fa-pen-to-square"></i></button>
								</Link>

							</div>
						</div>


					</div>

				))}
			</ul>

			
		</div>
	);
};