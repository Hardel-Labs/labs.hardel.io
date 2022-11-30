import { AGO_SINCE } from '@libs/constant';

const randomString = (length: number) => Array.from(Array(length), () => Math.floor(Math.random() * 36).toString(36)).join('');

const removeSpaces = (str: string) => str.replace(/\s/g, '');
const removeSpecialCharacters = (str: string) => str.replace(/[^a-zA-Z_]/gi, '');
const removeSpacesAndSpecialCharacters = (str: string) => removeSpecialCharacters(removeSpaces(str));
const clx = (...args: (string | undefined)[]) => args.filter(Boolean).join(' ');

/**
 * Return object with the suffix and the value
 * @param date
 */
const timeSince = (date: Date) => {
    let element = AGO_SINCE[AGO_SINCE.length - 1];
    const seconds = Math.floor((new Date().getTime() - (date?.getTime?.() ?? 0)) / 1000);
    for (let i = 0; i < AGO_SINCE.length; i++) {
        const value = AGO_SINCE[i].value;
        if (seconds < value) {
            element = AGO_SINCE[i - 1];
            break;
        }
    }

    const time = Math.floor(seconds / element.value);
    return {
        name: element.name,
        suffix: element.suffix,
        value: time === Infinity ? seconds : time
    };
};

export { randomString, removeSpacesAndSpecialCharacters, clx, timeSince };
