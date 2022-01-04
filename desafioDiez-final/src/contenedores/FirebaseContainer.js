import config from "../config.js";
import admin from "firebase-admin";
const serviceAccount = require("../model/ecommerce-9c3f1-firebase-adminsdk-p2aqx-51d80e57f3.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebase.baseUrl
});
CRUD();

async function CRUD() {
  const db = admin.firestore();
  const currentCollection = db.collection("products");

  try {
    //CREACION DE DOCUMENTO
    //let doc = currentCollection.doc();
    //await doc.set({ name: "Mariana", last_name: "Trabelo" });
    //LECTURA de todos los documentos existentes de students
    //const data = await currentCollection.get();
    //const personitas = data.docs;
    //const personitasFormateadas = personitas.map((documento) =>
    //documento.data())
    //console.log(personitasFormateadas);
    /*
    //LECTURA DE UN SOLO DOCUMENT
    let id = "PaiJwLBZjn5jRTRTcVYD";
    const doc = currentCollection.doc(id);
    let student = await doc.get();
    console.log(student.data());
    */
    //ACTUALIZAR CON UPDATE
    //let id = "PaiJwLBZjn5jRTRTcVYD";
    //const doc = currentCollection.doc(id);
    //await doc.update({name: "Sara"})
    //ACTUALIZAR CON SET
    //let id = "PaiJwLBZjn5jRTRTcVYD";
    //const doc = currentCollection.doc(id);
    //await doc.set({ name: "Soledad", last_name: "Perez" });
    //DELETE
    //let id = "5e4CcLUJELGgXBxLkzwu";
    //const doc = currentCollection.doc(id);
    //await doc.delete();
  } catch (err) {
    console.log(err);
  }
}
