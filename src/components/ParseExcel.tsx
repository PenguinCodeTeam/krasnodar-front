import React, {useEffect, useState} from "react";
import { UploadOutlined, DeliveredProcedureOutlined, NodeIndexOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import EditTable from "./EditTable";
import {notifyRequestCreator} from "../api/notify";
const XLSX = require('xlsx');

interface DataType {
    "key": string,
    "address": string,
    "connected_at": string,
    "is_delivered": boolean | string,
    "days_after_delivery": number,
    "accepted_requests": number,
    "completed_requests": number
}
class dataType implements DataType {
    "key" = "string";
    "address" = "string";
    "connected_at" = "string";
    "is_delivered" = true;
    "days_after_delivery" = 0;
    "accepted_requests" = 0;
    "completed_requests" = 0;
}

const ParseExcel: React.FunctionComponent = () => {
    const [excel, setExcel] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [fileName, setName] = useState<string>("");
    const [columns, setColumns] = useState<any>([]);
    const encodeFile=(_file: File): Promise<String> => {
        return new Promise((resolve) => {
            let fileReader = new FileReader();
            fileReader.onload = (event: any) => {
                let file_body = event.target.result;
                resolve(btoa(file_body));
            };
            fileReader.onerror = () => {
                resolve('');
            };
            fileReader.readAsBinaryString(_file);
        });
    }
    const startTasks = ()=>{}
    const addRow = () => {
        let newData: any = [...excel];
        let row: DataType = {
            "key": (newData.length+1).toString(),
            "address": "",
            "connected_at": "",
            "is_delivered": "нет",
            "days_after_delivery": 0,
            "accepted_requests": 0,
            "completed_requests": 0
        }
        newData.push(row)
        setExcel(newData);
    }

    const onDownloadDoc = ($event: any, accept?:'') => {
        let _shadow_input = document.createElement('input');
        _shadow_input.type = 'file';
        if (accept) _shadow_input.accept = accept;
        _shadow_input.onchange = (e:any) => {
            let _file = e.target.files[0];
            encodeFile(e?.target?.files[0]).then((event)=>{
                let workbook = XLSX.read(event, {});
                const ws = workbook.Sheets[workbook.SheetNames[0]]; // get the first worksheet
                const data: any[] = XLSX.utils.sheet_to_json(ws);
                setName(_file.name);
                let _cols:any=[];
                type TableKeys = Array<keyof DataType>;
                const keyOfData: TableKeys =
                Object.keys(new dataType()) as TableKeys;
                Object.keys(data[0]).forEach((key,i)=>{
                        _cols.push({
                            title: key,
                            key: keyOfData[i],
                            dataIndex: keyOfData[i],
                            editable: i!==0,
                        });
                });
                let _data = data.map((el)=>{
                    Object.keys(el).forEach((key,ikey)=>{
                            if(ikey===0)el[key].toString();
                            el[keyOfData[ikey]]=el[key];
                            delete el[key];
                    })
                    return el;
                })
                setColumns(_cols);
                setExcel(_data);
            })
            _shadow_input.remove();
        };
        _shadow_input.click();
    }

    const saveExcel = async () => {
            const response = await notifyRequestCreator(Object.assign({},
                { data: { input_data: [...excel].map(el=>{
                    el.is_delivered = el.is_delivered === 'да' ;
                    delete el.key;
                            return el;
                })}}, {
                url: 'manager/input_data',
                method: 'post'
            }))
            return response.data
        }

    return (
            <div className={'TableTasks'}>
                <div style={{width: '100%', margin: '0 0 20px 0', textAlign: 'right'}}>
                    <Button icon={<NodeIndexOutlined />} onClick={()=>startTasks()}>Запустить распределение</Button><Button icon={<UploadOutlined />} onClick={($event)=>onDownloadDoc($event)}>Загрузить файл</Button><Button icon={<DeliveredProcedureOutlined />} disabled={excel.length===0} onClick={()=>saveExcel()}>Сохранить файл</Button><Button icon={<PlusOutlined />} onClick={()=>addRow()} disabled={excel.length===0}>Добавить строку</Button>
                </div>
            {excel.length ?
                <EditTable originData={excel} columns={columns}></EditTable>:<></>
            }
            </div>
    );

}

export default ParseExcel
