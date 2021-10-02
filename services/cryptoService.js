import axios from 'axios';
import moment from 'moment';

const formatSparkline = (sparklineNumber) => {
    const sevenDaysAgo = moment().subtract(7, 'days').unix();
    return sparklineNumber.map((item, index) => {
        return {
            x:  sevenDaysAgo + (index+1)*3600,
            y : item,
        }
    });
}

const formatMarketData = (data) => {
    let formattedData = [];
    data.forEach((item) => {
        const formattedSparkline = formatSparkline(item.sparkline_in_7d.price);
        const formattedItem = {
            ...item,
            sparkline_in_7d:{
                price: formattedSparkline
            }
        }
        formattedData.push(formattedItem);
    });
    return formattedData;
}
export const getMarketData = async () => {
    try {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=7d");
        const data = res.data;
        return formatMarketData(data);
       
    }catch(error){
        console.log(error.message);
    }
}