import { useContext, useState } from "react";
import { useFormik } from "formik";
import { FirebaseContext } from "../../firebase";
import * as yup from "yup";
import cn from "classnames";
import { useNavigate } from "react-router-dom";
import FileUploader from "react-firebase-file-uploader";

export default function NewServing() {
	// Image State
	const [subiendo, setSubiendo] = useState(false);
	const [progreso, setProgreso] = useState(0);
	const [urlImagen, setUrlImagen] = useState("");
	// Firebase Context
	const { firebase } = useContext(FirebaseContext);
	// Redirection hook
	const navigate = useNavigate();

	const formik = useFormik({
		initialValues: {
			nombre: "",
			precio: "",
			categoria: "",
			imagen: "",
			descripcion: "",
		},
		validationSchema: yup.object({
			nombre: yup
				.string()
				.required("El nombre del platillo es requerido")
				.min(3, "Los platillos deben tener al menos 3 caracteres"),
			precio: yup
				.number()
				.required("El precio del platillo es requerido")
				.min(1, "Debes agregar un número"),
			categoria: yup.string().required("La categoría es obligatoria"),
			descripcion: yup
				.string()
				.required("La descripción del platillo es requerido")
				.min(10, "La descripción debe ser más larga"),
		}),
		onSubmit: (platillo) => {
			try {
				platillo.existencia = true;
				platillo.imagen = urlImagen;
				firebase.db.collection("productos").add(platillo);

				// Redirection
				navigate("/menu");
			} catch (error) {
				console.log(error);
			}
		},
	});

	// Image Functions

	const handleUploadStart = () => {
		setProgreso(0);
		setSubiendo(true);
	};
	const handleUploadError = (error) => {
		setSubiendo(false);
	};
	const handleUploadSuccess = async (nombre) => {
		setProgreso(100);
		setSubiendo(false);

		try {
			// Almacenar la url de destino
			const url = await firebase.storage
				.ref("productos")
				.child(nombre)
				.getDownloadURL();
			setUrlImagen(url);
		} catch (error) {
		}
	};
	const handleProgress = (progreso) => {
		setProgreso(progreso);
	};

	let inputCssClass =
		"shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-none";
	function validationCN(inputName) {
		let inputClass = cn({
			[inputCssClass]: true,
			"bg-red-100 placeholder-red-300":
				formik.errors[inputName] && formik.touched[inputName],
		});

		return inputClass;
	}
	return (
		<>
			<h1 className="text-3xl font-light mb-4">Agregar platillo</h1>
			<div className="flex justify-center mt-10">
				<div className="w-full max-w-3xl">
					<form onSubmit={formik.handleSubmit}>
						<div className="mb-4">
							<label
								htmlFor="nombre"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Nombre
							</label>
							<input
								id="nombre"
								className={validationCN("nombre")}
								type="text"
								placeholder="Nombre Platillo"
								value={formik.values.nombre}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							<p className="block h-4 text-xs pl-2 pt-2 text-red-400">
								{formik.errors.nombre}
							</p>
						</div>
						<div className="mb-4">
							<label
								htmlFor="precio"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Precio
							</label>
							<input
								id="precio"
								className={validationCN("precio")}
								type="number"
								placeholder="$0"
								value={formik.values.precio}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							/>
							<p className="block h-4 text-xs pl-2 pt-2 text-red-400">
								{formik.errors.precio}
							</p>
						</div>
						<div className="mb-4">
							<label
								htmlFor="categoria"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Categoria
							</label>
							<select
								className={validationCN("categoria")}
								id="categoria"
								name="categoria"
								value={formik.values.categoria}
								onChange={formik.handleChange}
							>
								<option value="">-- Seleccione --</option>
								<option value="desayuno">Desayuno</option>
								<option value="comida">Comida</option>
								<option value="cena">Cena</option>
								<option value="bebida">Bebidas</option>
								<option value="postre">Postre</option>
								<option value="ensalada">Ensaladas</option>
							</select>
							<p className="block h-4 text-xs pl-2 pt-2 text-red-400">
								{formik.errors.categoria}
							</p>
						</div>

						<div className="mb-4">
							<label
								htmlFor="imagen"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Imagen
							</label>

							<FileUploader
								name="imagen"
								className={inputCssClass}
								id="imagen"
								accept="image/*"
								randomizeFilename
								storageRef={firebase.storage.ref("productos")}
								onUploadSuccess={handleUploadSuccess}
								onUploadStart={handleUploadStart}
								onUploadError={handleUploadError}
								onProgress={handleProgress}
							/>
							<div
								className="h-10 mt-2 bg-green-400 w-full border relative"
								style={{ width: `${progreso}%` }}
							>
								{subiendo ? (
									<div className="absolute left-0 top-0 text-white flex items-center h-10 px-2 text-sm ">
										{progreso}%
									</div>
								) : (
									<div className="text-white h-10 items-center flex justify-center">
										{urlImagen && "La imagen se subió correctamente"}
									</div>
								)}
							</div>

							
						</div>
						<div className="mb-4">
							<label
								htmlFor="descripcion"
								className="block text-gray-700 text-sm font-bold mb-2"
							>
								Descripción
							</label>
							<textarea
								id="descripcion"
								className={validationCN("descripcion")}
								placeholder="Descripcion del Platillo"
								value={formik.values.descripcion}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
							></textarea>
							<p className="block h-4 text-xs pl-2 pt-2 text-red-400">
								{formik.errors.descripcion}
							</p>
						</div>

						<input
							type="submit"
							className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
							value="Agregar platillo"
						/>
					</form>
				</div>
			</div>
		</>
	);
}
