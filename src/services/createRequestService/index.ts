import {useQuery} from "react-query";
import {notifyRequestCreator} from "../../api/notify";

async function fetchProduct(args: any){
    const {data} = await notifyRequestCreator(args)
    return data
}
export const createGetRequestService = (data: any, dependencies:any  = []) => {
    return useQuery([data?.url, ...dependencies], () => fetchProduct(data),{
        keepPreviousData: true, // предыдущие данные будут оставаться до загрузки новых
    });
};
