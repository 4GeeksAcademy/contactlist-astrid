const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {

			contacts: [],
			shoes: ["nike", "adidas"] //ejemplo
		},
		actions: {

			GetContact: (name) => {
				fetch(`https://playground.4geeks.com/apis/fake/contact/agenda/${name}`)
					.then((result) => result.json())
					.then((data) => {
						let store = getStore()
						setStore({ ...store, contacts: data });
						console.log("Contacts obtained successfully: ", data);
					})
					.catch((error) => {
						console.log("Error getting contacts: ", error);
					});

			},

			createContact: (data) => {
				console.log("Datos a enviar:", data);

				const actions = getActions();
				const URL = "https://playground.4geeks.com/apis/fake/contact/";
				const opt = {
					method: "POST",
					headers: {
						"Content-type": "Application/json",
					},
					body: JSON.stringify(data),
				};

				fetch(URL, opt)
					.then((response) => {
						console.log("Respuesta:", response);
						if (response.ok) {
							actions.GetContact();
							alert("Contacto creado con éxito");
						} else {
							alert("Error al crear contacto");
						}
					})
					.catch((error) => {
						console.log("Error:", error);
						alert("Error al crear contacto");
					});
			},


			deleteContact: (id) => {
				const actions = getActions();
				fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`, {
					method: "DELETE"
				})
					.then((response) => {
						console.log("Respuesta:", response);
						if (response.ok) {
							actions.GetContact(); // Actualizar contactos después de la eliminación.
							alert("Contacto eliminado exitosamente");
						} else {
							alert("Error al eliminar contacto");
						}
					})
					.catch((error) => {
						console.log("Error:", error);
						alert("Error al eliminar contacto");
					});
			},

			updateContact: (id, data) => {
				const actions = getActions();
				const URL = `https://playground.4geeks.com/apis/fake/contact/${id}`;
				const opt = {
					method: "PUT",
					headers: {
						"Content-type": "Application/json",
					},
					body: JSON.stringify(data),
				};
				fetch(URL, opt)
					.then((response) => {
						console.log("Respuesta:", response);
						if (response.ok) {
							actions.GetContact(); // Actualizar contactos después de la actualización.
							alert("Contacto actualizado exitosamente");
						} else {
							alert("Error al actualizar contacto");
						}
					})
					.catch((error) => {
						console.log("Error:", error);
						alert("Error al actualizar contacto");
					});
			},

			GetContactById: (id) => {
				return fetch(`https://playground.4geeks.com/apis/fake/contact/${id}`)
					.then((result) => result.json())
					.catch((error) => {
						console.log("Error getting contact details: ", error);
						throw error; // Asegura que los errores se propaguen correctamente
					});
			},


		}
	};
};

export default getState;