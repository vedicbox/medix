import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a unique UUID
 * @returns {string} - A unique UUID string
 */
export const generateUUID = () => {
  return uuidv4();
};

/**
 * Checks if a string is a valid UUID
 * @param {string} uuid - The string to validate
 * @returns {boolean} - True if valid UUID, false otherwise
 */
export const isValidUUID = (uuid) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}; 