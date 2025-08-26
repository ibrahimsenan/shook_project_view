/* @flow */

type Options = {
    method?: string,
    url: string,
    params?:
        | string
        | {
        [name: string]: string,
    },
    headers?: Object,
    timeout?: number,
};

/**
 * Utility that promisifies XMLHttpRequest in order to have a nice API that supports cancellation.
 * @param method
 * @param url
 * @param params -> This is the body payload for POST requests
 * @param headers
 * @param timeout -> Timeout for rejecting the promise and aborting the API request
 * @returns {Promise}
 */

interface HttpRequestOptions{
method:string;
  url:string;
  data:Object|null;
  params?: string;
  headers: any;
  timeout: number
 
} 
export default function makeHttpRequest(
    { method = 'get', url="", params="", headers = {}, timeout = 10000 }) {
    return new Promise((resolve: any, reject: any) => {
        fetch(url, {
            method: method,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }).then(res=>{
            resolve(true)
          }).catch(err => {
            reject(false)
          });
 
    });
}