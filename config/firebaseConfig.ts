import { initializeApp } from 'firebase/app'
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyCVySrlR1BuEKJBSdCx7sIIiUoYyw8ORQM',
  authDomain: 'hale-trilogy-369214.firebaseapp.com',
  projectId: 'hale-trilogy-369214',
  storageBucket: 'hale-trilogy-369214.appspot.com',
  messagingSenderId: '611386856103',
  appId: '1:611386856103:web:d18bb6f162961a73394182',
  measurementId: 'G-DRMMJEFZG7'
}

const app = initializeApp(firebaseConfig)
const storage = getStorage(app)
export const profilePicRef = ref(storage, 'profilepics')
