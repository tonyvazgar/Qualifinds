const parser = require('./helpers/parser.js');

const baseUrl = "https://super.walmart.com.mx";
const urlToQuery = baseUrl + "/all-departments";


async function runWalmartScrapping() {
    const resultWalmart = await parser.parseWalmart(urlToQuery);
    console.log(resultWalmart);
}

async function runJumboScrapping(url) {
    const resultJumbo = await parser.parseJumbo(url);
    console.log(resultJumbo);
}

async function run(parameter) {
    if(parameter){
        runJumboScrapping(parameter);
    } else {
        runWalmartScrapping();
    }
}

const parameter = process.argv[2];
run(parameter);