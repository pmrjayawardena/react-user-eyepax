import { toast } from 'react-toastify';
export const Toast = (message) => {
	return toast.success(message, {
		position: 'bottom-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};
