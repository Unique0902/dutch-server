import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { config } from '../config.js';
initializeApp({
  credential: applicationDefault(serviceAccount),
  projectId: 'myproject',
});
