import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import Platillo from '../ui/Platillo';
export default function Menu() {
  const [platillos, setPlatillos] = useState([])
  const {firebase} = useContext(FirebaseContext)

  useEffect(() => {
    const obtenerPlatillos =  () => {
      firebase.db.collection('productos').onSnapshot(handleSnapshot);
      

    }
    obtenerPlatillos()
  }, [])

  // Snapshot realtime firebase
  function handleSnapshot(snapshot){
    const platillosSnap = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });
    setPlatillos(platillosSnap);
  }
  return (
    <>
      <h1 className="text-3xl font-light mb-4">Menu</h1>
      <Link to='/nuevo-platillo' className=" bg-gray-800 hover:bg-gray-700 rounded-sm inline-block mb-5 p-2 text-white uppercase font-bold">
        Agregar Platillo
      </Link>
      {
        platillos.map(platillo => (
          <Platillo 
            key={platillo.id}
            {...{platillo}}
          />
        ))
      }
    </>
  )
}
