import {notifyRequestCreator} from "./notify";
import {createGetRequestService} from "../services/createRequestService";

export const useRequestCreator = createGetRequestService(notifyRequestCreator)