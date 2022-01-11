import axios from 'axios';
import toast from 'react-hot-toast';

const useRequest = async ({ method, url, body, onSuccess }) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: body,
    });

    if (onSuccess) {
      onSuccess(toast.success('Welcome onboard!'));
    }
    return data;
  } catch (error) {
    const errors = error.response.data.errors;
    errors.length &&
      errors.map(error => {
        toast.error(error.message);
      });
  }
};

export { useRequest };
