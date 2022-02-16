/**
 * 
 * @param {object} object The object to extract allowed properties from
 * @param {string[]} allowed The array of allowed properties names
 * @returns {object} A serialized object containing only the allowed properties
 */
export default function allow(object, allowed) {
    let serialized = {}
    for (const property of allowed) {
        serialized[property] = object[property]
    }
    return serialized
}