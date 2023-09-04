import isNull from "lodash/isNull";
import isNaN from "lodash/isNaN";
import isUndefined from "lodash/isUndefined";
function groupByObjectArrayByProperty(objectArray: any, property: any) {
  return objectArray.reduce(function (acc: any, obj: any) {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
}
function isValidParam(param: any) {
  let isValid = false;
  try {
    if (!isNull(param) && !isNaN(param) && !isUndefined(param)) {
      isValid = true;
    }
  } catch (error) {
    console.error("isValidParam()':" + error);
  }
  return isValid;
}

function getNumber(value:any){
  let _number = 0;
  try {
    _number = Number(value);
    if (!isNull(_number) && !isNaN(_number) && !isUndefined(_number)) {
      _number = _number;
    }else{
      _number = 0;
    }
} catch (error) {
  console.error("getParams()':" + error);
}
return _number;
}

function getParams(array:any){
  let params:any = {};
  try {
array.forEach((obj: any) => 
{
  let value :any;
  if(obj.type == "number"){
    value = getNumber(obj.defaultValue);
  }else{
    value = obj.defaultValue;
  }
  params= {...params ,[obj.name]:value};
});
} catch (error) {
  console.error("getParams()':" + error);
}
return params;
}


function setParams(array:any[],value:any){
  let _array:any = [];
  try {
array.forEach((obj: any) => 
{
  if(!isNaN(value[obj.name]) && !isUndefined(value[obj.name])){
    obj.defaultValue = value[obj.name];
  }
  _array.push(obj);
});
console.log(_array)
console.log(value)
} catch (error) {
  console.error("setParams()':" + error);
}
return _array;
}


export { groupByObjectArrayByProperty, isValidParam,getNumber,getParams,setParams };
