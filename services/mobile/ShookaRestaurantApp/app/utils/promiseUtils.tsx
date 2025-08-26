export function executePromise(fetchResponse: Promise<Response>): Promise<any> {
  return new Promise((resolve, reject) => {
    fetchResponse
      .then(responseJson => {
        resolve(responseJson);
      })
      .catch(error => {
        reject(error);
      });
  });

}

