import './App.css';
import React, { useState } from "react";

function App() {
  const [message, setMessage] = useState(""); //Hook que controla el mensaje en caso de campo vacío
  const [data, setData] = useState(""); //guarda el valor del textarea
  const [data2, setData2] = useState([]); //guarda el valor ingresado por el usuario que se renderizará 
  const [posts, setPosts] = useState([]); //guarda los mensajes de la API
  let value = ""; //variable que guarda momentáneamente el valor del textarea


  //RECOJO Y GUARDO EL VALOR DEL TEXTAREA
  const formValidation = (e) => {
    value = e.target.value;
    setData(value); //guardo el valor en data
    //console.log(value)
  }

  //Función que controla el submit del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (value === "") {
      setMessage("Debes ingresar texto en este campo");
      //console.log(message)
    } else { //si hay algo escrito en el text area
      setMessage("Muy bien");
    }
  };

  //Función activada al presionar el botón ENVIAR
  const sendMessages = (e) => {
    e.preventDefault();
    setData2(data2 => data2.concat(data));
  }


  //FUNCION DE CONEXION CON LA API
  const bringMessages = (e) => {
    e.preventDefault();
    fetch('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=2')
      .then((response) => response.json())
      .then((json) =>
        setPosts(json), //guardo los mensajes de la API
      );
  }
  //console.log("los posts traidos de la API", posts)

  //Borro los mensajes ingreados por el suaurio
  const deletePost = (index) => {
    setData2(data2 => data2.filter((item, i) => i !== index))

  }

  //EDITAR MENSAJES
  const editPost = (index) => {
    let inputPost = prompt("Escribe un mensaje");
    let array2 = [...data2]
    array2[index] = inputPost;
    setData2(array2)
    //COMO SE HARIA CON MAP?
  }

  //EDITAR MENSAJES TRAIDOS POR LA API
  const editPostApi = (id) => {
    let inputPost = prompt("Escribe tu mensaje");
    fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        title: 'Nuevo titulo',
        body: inputPost,
        userId: 1,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        //console.log(json)
        //  setPosts((posts)=>posts.concat(json))
        const newPosts = [...posts];
        let post = newPosts.find(post => post.id === id);
        post.body = json.body;
        console.log(newPosts)
        setPosts(newPosts);
      });
  }

  //BORRAR MENSAJES DE LA API
  const deleteAPIpost = (id) => {
    fetch('https://jsonplaceholder.typicode.com/posts/' + id, {
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then((json) => {
      const newPosts = [...posts];
      let post = newPosts.filter(post => post.id !== id);
      console.log(post)
      setPosts(post);
    });
  };

  return (
    <div className="App">
      <h1>Aplicación de mensajes CRUD</h1>
      <h3>Prueba a traer, enviar, editar y eliminar mensajes</h3>
      <div className='container'>

        <div className='right'>
          <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="post" id={"msg-enviar"}>Escribe un mensaje aquí</label>
            <br></br>
            <textarea name="post" id="input" cols="30" rows={3} onChange={(e) => formValidation(e)}></textarea>
            <br></br>
            <div id="img">{message}</div>
            <button type="submit" className="btn btn-info" id={"boton-derecho"} onClick={(e) => sendMessages(e)}>Enviar</button>
          </form>


          <div >
            <h3 id={"h3-right"}>Aquí están tus mensajes:</h3>
            {!!data2 && data2.length > 0 ?
              data2.map((item, index) => {
                return <> <p key={index}>{item}</p>
                  <span className="options">
                    <i className="fas fa-edit" onClick={() => editPost(index)} >Editar</i>
                    <i className="fas fa-trash-alt"
                      onClick={() => deletePost(index)}>Borrar</i>
                  </span>
                </>
              })
              : ""}
          </div>
        </div>

        <div className='left'>
          <button type="button" id={"btn-izquierdo"} className="btn btn-info" onClick={(e) => bringMessages(e)}>Traer mensajes</button>
          <h3 id={"h3-left"}> Aquí están los mensajes que trajiste:</h3>
          <div id="post">
            <div>


              {!!posts && posts.length > 0 ?
                posts.map((post, index) => {
                  return <>
                    <p key={index}>{post.body}</p>
                    <span className="options">
                      <i className="fas fa-edit" onClick={() => editPostApi(post.id)} >Editar</i>
                      <i className="fas fa-trash-alt" onClick={() => deleteAPIpost(post.id)}>Borrar</i>
                    </span>
                  </>
                })
                : ""
              }

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
