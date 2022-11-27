const randomString = (length: number) => Array.from(Array(length), () => Math.floor(Math.random() * 36).toString(36)).join('');

const removeSpaces = (str: string) => str.replace(/\s/g, '');
const removeSpecialCharacters = (str: string) => str.replace(/[^a-zA-Z_]/gi, '');
const removeSpacesAndSpecialCharacters = (str: string) => removeSpecialCharacters(removeSpaces(str));
const clx = (...args: (string | undefined)[]) => args.filter(Boolean).join(' ');

const timeSince = (date: Date) => {
    if (!date) return 'Unknown';

    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) {
        return Math.floor(interval) + ' years ago';
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + ' months ago';
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + ' days ago';
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + ' hours ago';
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';
};

export { randomString, removeSpacesAndSpecialCharacters, clx, timeSince };
