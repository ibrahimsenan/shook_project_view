/* @flow */
import makeHttpRequest from './makeHttpRequest';

export default function checkInternetAccess(
    timeout: number = 3000,
    url: string
): Promise<boolean> {
    return new Promise((resolve: (value: boolean) => void) => {
        makeHttpRequest({ 
        method: 'head',
        url: url,
        params: "null",
        headers: { Authorization: 'Bearer token' },
        timeout: timeout,})
                   .then(() => {
                resolve(true);
            })
            .catch(() => {
                resolve(false);
            });
    });
}