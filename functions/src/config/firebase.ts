import * as admin from 'firebase-admin';
import { config } from './config';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import firebaseAccountCredentials from './key.json';
const serviceAccount = firebaseAccountCredentials as admin.ServiceAccount;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'onlineattendance-84370.appspot.com',
});

firebase.initializeApp(config);

const db = admin.firestore();

export { db, firebase, admin };
