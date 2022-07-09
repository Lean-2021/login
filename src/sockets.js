import { Products } from "./daos/apiProducts.js";
import author from "./DB/models/author.js";
const product = new Products();

export default (io) => {
  io.on("connection", async (socket) => {
    //conectar websocket
    console.log("cliente conectado", socket.id);
    try {
      let data = await product.getProduct(); //obtener productos
      const getMessages = await author.find({}); //obtener mensajes
      io.sockets.emit("resultData", data); //enviar información de productos a cada cliente
      io.sockets.emit("messages", getMessages); // enviar mensajes - centro de mensajes
    } catch (error) {
      console.log(error);
    }

    socket.on("newMessage", async (data) => {
      try {
        const newMessage = new author(data);
        await newMessage.save(); // guardar mensajes
        io.sockets.emit("addMessage", newMessage);
      } catch (error) {
        console.log(error);
      }
    });
  });
};
