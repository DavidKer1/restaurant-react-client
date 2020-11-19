import app from 'firebase/app';
import firebaseConfig from './config';
import 'firebase/storage'
import 'firebase/firestore'
class Firebase {
  constructor(){
    app.initializeApp(firebaseConfig)
    this.db = app.firestore()
    this.storage = app.storage()
  }
}



const firebase = new Firebase();

export default firebase;