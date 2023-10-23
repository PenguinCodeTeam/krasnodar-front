import instance from "./instance";


export const requestCreator = (params:any) => {
    return instance(params)
}
