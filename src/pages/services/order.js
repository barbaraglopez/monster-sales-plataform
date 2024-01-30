import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export const createOrder = async (order) => {

    const data = await addDoc(collection(db, "Pedidos"),
    order
    )
    return data
}


