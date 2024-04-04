const apiUrl = 'https://playground.4geeks.com/contact/agendas/';
const contactsUrl = '/contacts';

const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: [],
            slug: "",
            
        },
        actions: {
            createContact: (data, slug) => {
                console.log(slug)
                console.log(data);
                const URL = `${apiUrl}${slug}${contactsUrl}`;
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
                            actions.GetContact(slug); // Actualizar contactos después de la creación.
                            alert("Contacto creado exitosamente");
                        } else {
                            alert("Error al crear contacto");
                        }
                    })
                    .catch((error) => {
                        console.log("Error:", error);
                        alert("Error al crear contacto");
                    });
            },

            createagenda: (slug) => {
                console.log("Datos a enviar:", slug);

                const URL = `${apiUrl}${slug}/`;
                const opt = {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ slug: slug }),
                };

                fetch(URL, opt)
                    .then((response) => {
                        console.log("Respuesta:", response);
                        if (response.ok) {
                            actions.GetContact();
                            const store = getStore();
                            setStore({ ...store, slug: slug })
                            alert("agenda creado con éxito");
                        } else {
                            alert("Error al crear agenda");
                        }
                    })
                    .catch((error) => {
                        console.log("Error:", error);
                        alert("Error al crear agenda");
                    });
            },

            GetContact: (searchTerm) => {
                console.log(searchTerm);
                
                fetch(`${apiUrl}${searchTerm}${contactsUrl}`)
                    .then((result) => result.json())
                    .then((data) => {
                        let store = getStore();
                        setStore({ ...store, contacts: data.contacts, slug: searchTerm }); // Actualiza el estado incluyendo el slug
                        console.log("Contacts obtained successfully: ", data);
                    })
                    .catch((error) => {
                        console.log("Error getting contacts: ", error);
                    });
            },

            deleteContact: (id) => {
                const store = getStore();
                const { slug } = store;
                fetch(`${apiUrl}${slug}${contactsUrl}/${id}`, {
                    method: "DELETE"
                })
                .then((response) => {
                    console.log("Respuesta:", response);
                    if (response.ok) {
                        actions.GetContact(slug); // Actualizar contactos después de la eliminación.
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
                const store = getStore();
                const { slug } = store;
                const URL = `${apiUrl}${slug}${contactsUrl}/${id}`;
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
                            actions.GetContact(slug); // Actualizar contactos después de la actualización.
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
                const store = getStore();
                return fetch(`https://playground.4geeks.com/contact/${id}`)
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