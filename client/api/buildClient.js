import axios from 'axios';

const buildClient = ({ req }) => {
  /** Determine if Request is on Server or on Client */
  if (typeof window === 'undefined') {
    // Server Side Requests
    return axios.create({
      baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
      headers: req.headers,
    });
  } else {
    // Client(Browser) Side Requests
    return axios.create({
      baseURL: '/',
    });
  }
};

export { buildClient };
