import axios from "axios";
import moment from "moment";

const headers = {
  token: process.env.REACT_APP_BASE_TOKEN,
};

const baseUrl = process.env.REACT_APP_API_BASE_URL;

const getEventData = async (startDate: string,endDate: string) => {
  
  console.log(moment().startOf("day").format('X'), moment().endOf("day").format('X'));
  
  const url = `${baseUrl}/api/calendar-events` //`${baseUrl}/api/v1/events/projects?startDate=${startDate}&endDate=${endDate}` // `${baseUrl}/api/calendar-events`
  console.log('calendar Data URL : ', url);
  const resp = await axios.get(url); // { headers: headers }
  
  let resultsArray = [] as any
  const responseDataArray = resp?.data && resp?.data?.data?.forEach((item: any, index: any) => {
    resultsArray.push({_id:item?.attributes?.id, start: new Date(Number(moment(item?.attributes?.startDate).format('X')) * 1000), end: new Date(Number(moment(item?.attributes?.endDate).format("X")) * 1000), title: item?.attributes?.name, resources: item, colorCode:"#ff0071"})
    
    // if(dateCheck(startDate, endDate, Number(moment(item?.attributes?.startDate).format('X')))){
    //   resultsArray.push({_id:item?.attributes?.id, start: new Date(Number(moment(item?.attributes?.startDate).format('X')) * 1000), end: new Date(Number(moment(item?.attributes?.endDate).format("X")) * 1000), title: item?.attributes?.name, resources: item, colorCode:"#ff0071"})
    // }
    // else if(dateCheck(startDate, endDate, Number(moment(item?.attributes?.endDate).format('X')))){
    //   resultsArray.push({_id:item?.attributes?.id, start: new Date(Number(moment(item?.attributes?.startDate).format('X')) * 1000), end: new Date(Number(moment(item?.attributes?.endDate).format("X")) * 1000), title: item?.attributes?.name, resources: item, colorCode:"#ff0071"})
    // }

  }) || []
  
  console.log('resultsArray: ', resultsArray, responseDataArray);

  return resultsArray;
};

function dateCheck(from: any,to: any,check: any) {

  var fDate,lDate,cDate;
  fDate = Number(from) //Date.parse(from);
  lDate = Number(to) //Date.parse(to);
  cDate = Number(check) //Date.parse(check);
  console.log('fDate', fDate, lDate, cDate)
  if((cDate <= lDate && cDate >= fDate)) {
      return true;
  }
  return false;
}

const getEventDetailsById = async (detailId: any) => {
  const resp = await axios.get(
    `${baseUrl}/api/v1/events/${
      detailId ? detailId : null
    }`,
    { headers: headers }
  );
  return resp;
};
export { getEventData, getEventDetailsById };
