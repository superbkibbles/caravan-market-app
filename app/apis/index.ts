import axios from 'axios';

// const portLocal = 'http://localhost/caravan/caravan-commerce';
const portHost = 'http://markets.pso.mmg.mybluehost.me/';
// const portHost = 'http://caravan-commerce.pso.mmg.mybluehost.me/';

export default axios.create({
  baseURL: portHost
});
