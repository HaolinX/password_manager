// Built-in Node.js module for cryptographic operations
const crypto = require('crypto');

// Define encryption algorithm (AES with 256-bit key in CBC mode)
const algorithm = 'aes-256-cbc';

// Load the secret encryption key from .env (must be a 64-character hex string = 32 bytes)
const secretKey = Buffer.from(process.env.VIEW_KEY, 'hex');

// Initialization vector (IV) for AES, using a zeroed 16-byte buffer
const iv = Buffer.alloc(16, 0); // For AES-256-CBC, IV must be 16 bytes

// Encrypt plain text using AES-256-CBC
function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted; // Returns hex-encoded string
}

// Decrypt AES-encrypted text (in hex) back to plain text
function decrypt(encryptedText) {
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// Export both functions for use in other files
module.exports = { encrypt, decrypt };