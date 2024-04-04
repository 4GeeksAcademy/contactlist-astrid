import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import { Context } from "../store/appContext";

import "../../styles/demo.css";

export const Agenda = () => {
	const { store, actions } = useContext(Context);
	console.log(store.slug)
	console.log(store.searchTerm);
	const [nameAgenda, setNameAgenda] = useState("")
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate()

	
	const handleInputChange = (e) => {
		setNameAgenda(e.target.value);
	};

	const handleSearchClick = () => {
		actions.createagenda(nameAgenda);
		navigate("/create");
		// actions.GetContact()
	};
	const handleSearchAgenda = () => {
        actions.GetContact(searchTerm); // Activar la acción GetContact con el término de búsqueda del slug de la agenda
    };

	return (
		<div className="container">
			<h3>Primero crea una agenda y agregale contactos, luego Busca tu agenda por nombre y revisa tus contactos.</h3>
			<input type="text" onChange={handleInputChange}
				value={nameAgenda} placeholder="nueva agenda"></input>
			<button onClick={handleSearchClick}>crear</button>

			<input
                type="text"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="buscar mi agenda"
            />
            <button onClick={handleSearchAgenda}>buscar agenda</button>


			<ul className="list-group">
				{store.contacts.map((item, index) => (
					<div className="card mb-3" key={index}>
						<div className="row g-0">
							<div className="col-md-4">
								<img src="https://previews.123rf.com/images/jemastock/jemastock1705/jemastock170509810/78457957-cara-hombre-arte-pop-estilo-imagen-vector-ilustraci%C3%B3n.jpg" style={{ height: "200px" }} className="img-fluid rounded-start" alt="..." />
							</div>
							<div className="col-md-5">
								<div className="card-body">
									<h5 className="card-title">{item.name}</h5>
									<p className="card-text"><i className="fa-solid fa-envelope"></i> {item.email}</p>
									<p className="card-text"><i className="fa-solid fa-location-dot"></i> {item.address}</p>
									<p className="card-text"><i className="fa-solid fa-phone"></i> {item.phone}</p>
								</div>
							</div>
							<div className=" justify-content-md-end col-md-3">
								<button className="btn" type="button" onClick={() => actions.deleteContact(item.id)}><i className="fa-solid fa-trash"></i></button>
								<Link to={`/edit/${item.id}`} className="btn me-md-2">
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