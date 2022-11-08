import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { config } from '../config.js';
import * as serviceAccount from '../my-project-7a224-firebase-adminsdk-61rt8-f9f027d19d.json';
initializeApp({
  credential: applicationDefault(serviceAccount),
  projectId: 'myproject',
});
