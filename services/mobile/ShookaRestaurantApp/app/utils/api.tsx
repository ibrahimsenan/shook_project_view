import { ACCESS_TOKEN } from "./app_utils";

interface RequestObject {
  method: string;
  headers: {
    Accept: string;
    "Content-Type": string;
    access_token: string;
  };
  body: any;
}

class API {

  static API_BASE_URL: string = "http://192.168.0.247:5000";

  static RequestForm(type: string, body: any): RequestObject {

    let requestObj: RequestObject = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        access_token: ACCESS_TOKEN
      },
      body: body ? JSON.stringify(body) : null,
    };

    switch (type) {
      case "POST":
        requestObj = {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            access_token: ACCESS_TOKEN
          },
          body: body ? JSON.stringify(body) : null, // Change to null
        };
        break;
      case "PUT":
        requestObj = {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            access_token: ACCESS_TOKEN
          },
          body: body ? JSON.stringify(body) : null, // Change to null
        };
        break;
      case "PATCH":
        requestObj = {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            access_token: ACCESS_TOKEN
          },
          body: body ? JSON.stringify(body) : null, // Change to null
        };
        break;
      case "DELETE":
        requestObj = {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            access_token: ACCESS_TOKEN
          },
          body: body ? JSON.stringify(body) : null, // Change to null
        };
        break;
    }
    return requestObj;
  }

  static fetch(api: string, request: any, body?: any | null): Promise<Response> {
    const requestForm = API.RequestForm(request, body)
    const fetchReturn: Promise<Response> = fetch(`${API.API_BASE_URL}${api}`, requestForm);
    return fetchReturn;
  }

  static executeFetchAsPromise(fetchResponse: Promise<Response>): Promise<any> {
    return new Promise((resolve, reject) => {
      fetchResponse
        .then((response: any) => response.json())
        .then((responseJson: any) => {
          resolve(responseJson);
        })
        .catch((error: any) => {
          reject(error);
        });
    });

  }
}


export default API