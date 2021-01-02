import {  NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="lg:w-1/3 xl:w-1/5 bg-gray-800">
      <div className='p-6'>
        <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">Restaurant App</p>
        <p className="mt-3 text-gray-500">Administra tu restaurante en las siguientes opciones</p>
        <nav className='mt-10'>
          <NavLink end activeClassName='text-blue-100' className="p-1 block text-gray-400 hover:bg-blue-300 hover:text-gray-900 rounded-sm" to="/">Ordenes</NavLink>
          <NavLink end activeClassName='text-blue-100' className="p-1 block text-gray-400 hover:bg-blue-300 hover:text-gray-900 rounded-sm" to="/menu">Menú</NavLink>
        </nav>
      </div>
    </div>
  )
}
