import config from "../config.js";
import fs from "fs";
import admin from "firebase-admin";
let serviceAccount = await fs.promises.readFile(
  "../model/ecommerce-9c3f1-firebase-adminsdk-p2aqx-51d80e57f3.json",
  "utf-8"
);
serviceAccount = JSON.parse(serviceAccount);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: config.firebase.baseUrl
});
CRUD();

async function CRUD() {
  const db = admin.firestore();
  const currentCollection = db.collection("products");

  try {
    //PRODUCTS - CREACION DE DOCUMENTO
    let doc = currentCollection.doc();
    await doc.set({
      title: "Peluche Pink",
      description: "Peluche de color rosa",
      price: 122,
      thumbnail: "http://localhost:8080/images/1639083782414pelucherosa.jpg",
      codigo: "001",
      stock: 8,
      timestamp: new Date()
    });
    await doc.set({
      title: "Peluche de Osa",
      description: "Peluche con vestido.",
      price: 144,
      thumbnail: "http://localhost:8080/images/1639083716776Peluche-osa.jpg",
      codigo: "002",
      stock: 3,
      timestamp: new Date()
    });
    await doc.set({
      title: "Cellphone",
      description: "Color negro.",
      price: 1200.5,
      thumbnail:
        "https://falabella.scene7.com/is/image/FalabellaPE/882255227_1?wid=800&hei=800&qlt=70",
      codigo: "003",
      stock: 15,
      timestamp: new Date()
    });
    await doc.set({
      title: "Laptop Asus",
      description: "Alta calidad.",
      price: 3000.5,
      thumbnail:
        "https://falabella.scene7.com/is/image/FalabellaPE/882255227_1?wid=800&hei=800&qlt=70",
      codigo: "004",
      stock: 10,
      timestamp: new Date()
    });
    await doc.set({
      title: "Laptop Dell",
      description: "Alta calidad.",
      price: 2000.5,
      thumbnail:
        "https://falabella.scene7.com/is/image/FalabellaPE/882255227_1?wid=800&hei=800&qlt=70",
      codigo: "005",
      stock: 20,
      timestamp: new Date()
    });

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
