import {requestCreator} from "./index";
import notifyService from "../services/notifyService";

export const notifyRequestCreator = notifyService(requestCreator,'','')