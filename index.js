const axios = require("axios");
const cheerio = require('cheerio');
const parser = require('./helpers/parser.js');

const baseUrl = "https://super.walmart.com.mx";
const urlToQuery = baseUrl + "/all-departments";


const parseWeb = async (url) => {
    try {
        const response = await axios.get(urlToQuery);
        const html = response.data;
        const $ = cheerio.load(html);
        const data = $('script#__NEXT_DATA__').html();
        const jsonData = JSON.parse(data);
        const jsonConfig = jsonData.props.pageProps.initialData.contentLayout.modules[0].configs;
        const jsonCategories = jsonConfig.categories;
        const answer = parser.parseJSON(baseUrl, jsonCategories);
        return JSON.stringify(answer);
    } catch (error) {
        console.log(error);
        return {};
    }
}

async function run() {
    const result = await parseWeb(urlToQuery);
    
    console.log(result);
}

run();