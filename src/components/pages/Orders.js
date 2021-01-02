import { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import Orden from "../ui/Orden";

export default function Orders() {
	// Context
  const { firebase } = useContext(FirebaseContext);
  const [ordenes, setOrdenes] = useState([])
	useEffect(() => {
		const obtenerOrdenes = () => {
			firebase.db
				.collection("ordenes")
				.where("completado", "==", false)
				.onSnapshot(manejarSnapshot);
		};
		obtenerOrdenes();
	}, []);
	function manejarSnapshot(snapshot) {
		const ordenesSnap = snapshot.docs.map((doc) => {
			return {
				id: doc.id,
				...doc.data(),
			};
		});
    setOrdenes(ordenesSnap)
    

	}
	return (
		<>
			<h1 className="text-3xl font-light mb-4">Ordenes</h1>
      <div className="sm:flex sm:flex-wrap -mx-3">
      {ordenes.map(orden=> (
        <Orden key={orden.id} orden={orden}/>
      ))}
      </div>
		</>
	);
}
