import { initializeApp } from 'firebase-admin/app';
import { config } from '../config.js';

initializeApp({
  credential: config.google.credential,
});
