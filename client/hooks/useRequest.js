import axios from 'axios';
import toast from 'react-hot-toast';

const useRequest = async ({ method, url, body, onSuccess, toastMsg }) => {
  try {
    const { data } = await axios({
      method,
      url,
      data: body,
    });

    console.log('USE_REQUEST_DATA', data);

    if (onSuccess) {
      toast.success(toastMsg);
      onSuccess(data);
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
