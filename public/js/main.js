const socket = io();
const show = document.getElementById("showResult");
const email = document.getElementById("email");
const nombre = document.getElementById("nombre");
const apellido = document.getElementById("apellido");
const edad = document.getElementById("edad");
const alias = document.getElementById("alias");
const avatar = document.getElementById("avatar");
const text = document.getElementById("text");
const showMessage = document.getElementById("showMessage");
const formChat = document.getElementById("formChat");
const btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener("click", () => {
  location.href = "/logout";
});

const showProducts = (data) => {
  if (data.length === 0) {
    //mostrar mansaje no hay productos cuanto esta vacio el array
    show.innerHTML = `
      <div class="container mt-4">
        <h4>No hay productos en la lista</h3>
      </div>
    `;
  } else {
    //mostrar productos en tabla
    show.innerHTML = `
      <div class="row mt-5">
        <div class="col-md-6 offset-md-3">
          <table class="table table-container">
            <thead class="table-head">
              <tr>
                  <th>Producto</th>
                  <th>Precio</th>
                  <th>Imágen</th>
              </tr>
            </thead>
            <tbody id="product"></tbody>
          </table>
        </div>
      </div>  
    `;
    const product = document.getElementById("product");
    product.innerHTML = data
      .map((product) => {
        //actualizar los productos en cada cliente
        return `      
          <tr>
            <td class="table-description">
            ${product.title}
            </td>
            <td class="table-description">
            $ ${product.price}
            </td>
            <td class="table-description"><img src="${product.thumbnail}"
            alt="imagen producto"class="table-image" width="60"height="50">
            </td>
          </tr>     
        `;
      })
      .join(" ");
  }
};

socket.on("resultData", async (data) => {
  // Escuchar evento cuando se agrega un nuevo producto
  try {
    await fetch("http://localhost:8080/api/productos-test");
    showProducts(data);
  } catch (error) {
    console.log("error al obtener datos");
  }
});

// centro de mensajes

formChat.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("hiciste click en enviar");
  //objeto con los datos del mensaje
  let newMessage = {
    email: email.value,
    nombre: nombre.value,
    apellido: apellido.value,
    edad: edad.value,
    alias: alias.value,
    avatar: avatar.value,
    text: text.value,
  };
  socket.emit("newMessage", newMessage); //enviar mensajes al servidor
});

socket.on("messages", (message) => {
  //recibir mensajes del servidor
  if (message.length === 0) {
    // si no hay mensajes mostrar texto "no hay mensajes"
    showMessage.innerHTML = "<h6>No hay mensajes</h6>";
  } else {
    // si hay mensjaes, mostrarlos
    showMessage.innerHTML = message
      .map((user) => {
        return `<p>
          <b class="message-email">${user.email}</b>
          <span class="message-dateTime">[${user.createdAt}]</span>: 
          <i class="message">${user.text}</i>
          <img src="${user.avatar}" alt="avatar autor"class="message-avatar">
        </p>`;
      })
      .join("");
  }
});

socket.on("addMessage", (message) => {
  console.log(message);
  //recibir nuevos mensajes
  showMessage.innerHTML +=
    //mostrar mensajes en el centro de mensajes
    `<p>
        <b class="message-email">${message.email}</b>
        <span class="message-dateTime">[${message.createdAt}]</span>: 
        <i class="message">${message.text}</i>
        <img src="${message.avatar}"alt="avatar autor"class="message-avatar">
      </p>`;
});
