import {toast} from "react-toastify";

const notifyService = (servise: (...args: any) => Promise<any>, successMessage: string, rejectMessage: string) => {
    return async function (...args: any) {
        try{
            const request = servise(...args)
            if (successMessage) {
                toast.success(successMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            return request
        } catch (error) {
            if (rejectMessage) {
                toast.warn(rejectMessage, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            throw error
        }
    }
}

export default notifyService