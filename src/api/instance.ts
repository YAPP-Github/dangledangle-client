import ky from 'ky';

const api = ky.create({
  prefixUrl: 'http://152.67.202.74:9090/v1'
});

export default api;
