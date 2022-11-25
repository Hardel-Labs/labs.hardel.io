const randomString = (length: number) => Array.from(Array(length), () => Math.floor(Math.random() * 36).toString(36)).join('');

const removeSpaces = (str: string) => str.replace(/\s/g, '');
const removeSpecialCharacters = (str: string) => str.replace(/[^a-zA-Z_]/gi, '');
const removeSpacesAndSpecialCharacters = (str: string) => removeSpecialCharacters(removeSpaces(str));

export { randomString, removeSpacesAndSpecialCharacters };
