import { initializeApp } from 'firebase-admin/app';
import {  } from 'firebase-admin;
import { config } from '../config.js';
initializeApp({
  credential: config.google.credential,
  projectId: 'myproject',
});
