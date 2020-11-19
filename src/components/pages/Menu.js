import { Link } from 'react-router-dom';
export default function Menu() {
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link to='/nuevo-platillo' className=" bg-gray-800 hover:bg-gray-700 rounded-sm inline-block mb-5 p-2 text-white uppercase font-bold">
        Agregar Platillo
      </Link>
    </>
  )
}
