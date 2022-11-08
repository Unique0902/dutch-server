import { initializeApp } from 'firebase-admin/app';
import { config } from '../config.js';
console.log(config.google.credential);
initializeApp({
  credential: config.google.credential,
});
