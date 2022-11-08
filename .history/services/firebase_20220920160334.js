import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { config } from '../config.js';
import  serviceAccount  from config.google.credential;
initializeApp({
  credential: applicationDefault(serviceAccount),
  projectId: 'myproject',
});
