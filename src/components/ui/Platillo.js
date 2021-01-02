import { useRef, useContext } from "react";
import { FirebaseContext } from "../../firebase";

export default function Platillo({ platillo }) {


  const existenciaRef = useRef(platillo.existencia)
  const {firebase} = useContext(FirebaseContext)
  
	const {
    id,
    nombre,
		imagen,
		existencia,
		categoria,
		precio,
		descripcion,
  } = platillo;
  
  // Modify status
  const actualizar = () => {
    const existencia = (existenciaRef.current.value === "true")
    try {
      firebase.db.collection('productos').doc(id).update({
        existencia
      })
    } catch (error) {
      
    }
  }
	return (
    <div className="w-full px-3 mb-4">
			<div className="p-5 shadow-md bg-white">
				<div className="md:flex">
					<div className="md:w-4/12 lg:w-5/12 xl:w-3/12">
						<img
							src={imagen}
							alt="imagen platillo"
							className="object-cover object-bottom w-full h-48 sm:h-72"
						/>

						<div className="sm:flex sm:-mx-2 pl-2">
							<label htmlFor="" className="block mt-5 sm:w-2/4 mb-5">
								<span className="block text-gray-800 mb-2 ">Existencia</span>
                
                <select className="shadow appearance-none border rounded w-auto py-2 px-3 leading-tight focus:outline-none focus:shadow-sm bg-white"
                  value={existencia}
                  ref={existenciaRef}
                  onChange={() => actualizar()}
                >
                  <option value="true">Disponible</option>
                  <option value="false">No Disponible</option>
                </select>
							</label>

						</div>
					</div>

					<div className="lg:w-7/12 xl:w-9/12 h-full px-2 lg:px-8 ">
						<p className="font-bold text-2xl text-yellow-600 mb-4">
							{nombre}
						</p>
						<p className="text-gray-600 mb-4">
							Categoría:{" "}
							<span className="text-gray-700 font-bold">
								{categoria.toUpperCase()}
							</span>
						</p>
						<p className="text-gray-600 mb-4">{descripcion}</p>
						<p className="text-gray-600 mb-4">
							Precio:{" "}
							<span className="text-gray-700 font-bold">${precio}</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
