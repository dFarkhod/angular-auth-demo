import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(
    backend: MockBackend, 
    options: BaseRequestOptions) {
        
  let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluam9uIiwiYWRtaW4iOnRydWV9.xOWtKszEmndNEk_AcVo8k_2r5jMtXdnJHWFQ-NkwAKg';
    
  backend.connections.subscribe((connection: MockConnection) => {
    // setTimeout() funksiyasini serverga 1-sekunda yakunlanuvchi 
    // asinxron so'rov jo'natishni simulyatsiya qilish uchun ishlatyapmiz.
    setTimeout(() => {
      //
      // /api/authenticate ning qalbaki implementatsiyasi
      //
      if (connection.request.url.endsWith('/api/authenticate') &&
        connection.request.method === RequestMethod.Post) {
        let body = JSON.parse(connection.request.getBody());

        if (body.login === 'admin' && body.password === 'admin') {
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: { token: token }
           })));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 200 })
          ));
        }
      }



       // 
       // /api/lessons ning fake implementatsiyasi
       //
       if (connection.request.url.endsWith('/api/lessons') && 
           connection.request.method === RequestMethod.Get) {
         if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: ['Angular Asoslari', 'NodeJS', 'Java Script'] })
         ));
       } else {
           connection.mockRespond(new Response(
             new ResponseOptions({ status: 401 })
           ));
       }
    }



    }, 1000);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};