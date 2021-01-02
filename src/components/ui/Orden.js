import { useContext, useState } from "react";
import { FirebaseContext } from "../../firebase";

export default function Orden({ orden }) {
  const [tiempoEntrega, setTiempoEntrega] = useState(0)
  const {firebase} = useContext(FirebaseContext)

  const definirTiempo = (id)=> {
    try {
      firebase.db.collection('ordenes').doc(id).update({
        tiempoentrega: tiempoEntrega
      })
    } catch (error) {
      console.log(error);
    }
  }
  const completarOrden = (id)=> {
    try {
      firebase.db.collection('ordenes').doc(id).update({
        completado: true
      })
    } catch (error) {
      console.log(error);
    }
  }
	return (
		<div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
			<div className="p-3 shadow-md bg-white">
				<h1 className=" text-yellow-600 text-lg font-bold">{orden.id}</h1>
				{orden.orden.map((platillo, i) => (
					<p className="text-gray-600" key={i}>
						{platillo.cantidad} {platillo.nombre}
					</p>
				))}

				<p className="text-gray-700 font-bold">
					Total a pagar: ${orden.total}
				</p>
				{orden.tiempoentrega === 0 && (
					<div className="mb-4">
						<label className='block text-gray-700 text-sm font-bold mb-2'>Tiempo de entrega</label>
            <input 
              type="number"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              min="1"
              max="40"
              placeholder="20"
              value={tiempoEntrega}
              onChange={e=> setTiempoEntrega(parseInt(e.target.value))}
            />
            <button type="submit" className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold" onClick={() => definirTiempo(orden.id)}>Definir tiempo</button>
					</div>
				)}

        {orden.tiempoentrega > 0 && (
          <p className="text-gray-700">Tiempo de entrega <span className="font-bold">{orden.tiempoentrega} minutos</span></p>
        )}

        {
          !orden.completado && orden.tiempoentrega > 0 && (
          <button type="button" onClick={() => completarOrden(orden.id)} className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white font-bold">Marcar como lista</button>
          )
        }
			</div>
		</div>
	);
}
