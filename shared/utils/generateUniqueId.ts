// shared/utils/generateUniqueId.ts

// Untuk frontend, install dulu uuid:
// npm install uuid

let generateUniqueId: () => string;

if (typeof window === 'undefined') {
  // Environment Node.js (backend)
  // Import dinamis supaya ts dan bundler gak error di frontend
  const crypto = require('crypto');
  generateUniqueId = () => crypto.randomUUID();
} else {
  // Environment browser (frontend)
  // Import v4 uuid secara dinamis
  const { v4: uuidv4 } = require('uuid');
  generateUniqueId = () => uuidv4();
}

export { generateUniqueId };
