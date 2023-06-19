import ky from 'ky';
import cookie from 'js-cookie';
const api = ky.create({
  prefixUrl: 'http://152.67.202.74:9090/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  hooks: {
    beforeRequest: [
      options => {
        const accessToken = cookie.get('accessToken');

        if (accessToken) {
          options.headers.set('Authorization', `Bearer ${accessToken}`);
        } else {
          return;
        }
      }
    ]
  }
});
export default api;
