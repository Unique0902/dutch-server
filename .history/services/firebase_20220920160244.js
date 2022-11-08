import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { config } from '../config.js';
const serviceAccount = require(config.google.credential);
initializeApp({
  credential: applicationDefault(serviceAccount),
  projectId: 'myproject',
});
