import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDrJb4QFWh6gbh34STL3gzj0Za5LhH3eRk',
  authDomain: 'to-do-app-b5a5e.firebaseapp.com',
  projectId: 'to-do-app-b5a5e',
  storageBucket: 'to-do-app-b5a5e.appspot.com',
  messagingSenderId: '531863660162',
  appId: '1:531863660162:web:4ddfdc85fdb197e86df69b',
  measurementId: 'G-P5CG33690L',
}

const firebaseapp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseapp)

export { db }
