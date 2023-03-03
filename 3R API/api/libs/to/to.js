/**
 * If the promise resolves, return an array with null as the first element and the resolved value as
 * the second element. If the promise rejects, return an array with the error as the first element and
 * null as the second element.
 * @param promise - The promise that you want to convert to a tuple.
 * @returns [null, data]
 */
const to = (promise) => {
    return promise
        .then(data => {
            return [null, data];
        })
        .catch(err => [err, null]);
}

exports.to = to;
