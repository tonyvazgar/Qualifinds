const fetch = require('node-fetch');
const cheerio = require('cheerio');
const axios = require("axios");


const getSubcategories = async(baseUrl, path) => {
    const url = baseUrl + path;
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url,
        headers: {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Host': 'super.walmart.com.mx',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15',
            'Accept-Language': 'en-US,en;q=0.9',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive'
            }
    };
    const subcategories = [];
    let response;
    try {
        response = await fetch(url, config);
    } catch (error) {
        return subcategories;
    }
    if (response?.ok) {
        let jsonElement;
        try {
            const body = await response.text();
            const $ = cheerio.load(body);
            const data = $('script#__NEXT_DATA__').html();
            const jsonData = JSON.parse(data);
            jsonElement = jsonData.props.pageProps.initialTempoData.data.contentLayout.modules;
        } catch (error) {
            return [];
        }
        
        jsonElement.forEach(element => {
            if (element.configs.NavPills) {
                const configWithNavPills = element.configs.NavPills;
                configWithNavPills.forEach(subcategory => {
                    let Subcategory = {
                        name: subcategory.title,
                        url: baseUrl + subcategory.url.clickThrough.value,
                    };
                    subcategories.push(Subcategory);
                });
            }
        });
        
        return subcategories;
    } else {
        return subcategories;
    }
}

const parseJSON = async (baseUrl, data) => {
    let myResponse = {};
    let finalCategories = [];

    data.forEach(element => {
        const categoryName = element.name.title;
        const categoryUrl = element.name.clickThrough.value;
        let Departament = {
            departament: categoryName,
            url: baseUrl + categoryUrl,
        };
        const subcategories = [];
        const elementSubcategories = element.subcategories;
        elementSubcategories.forEach(async elementSubcategory => {
            const linkSubcategory = elementSubcategory.subCategoryLink;
            const subcategoryName = linkSubcategory.title;
            const subcategoryUrl = linkSubcategory.clickThrough.value;
            const mySubcategories = await getSubcategories(baseUrl, subcategoryUrl);
            let Subcategory = {
                name: subcategoryName,
                url: baseUrl + subcategoryUrl,
            };
            // Subcategory.other = mySubcategories;
            subcategories.push(Subcategory);
        });
        Departament.subcategories = subcategories;
        finalCategories.push(Departament);
    });
    myResponse.categories = finalCategories;
    return myResponse;
};

const parseJumbo = async(url) => {
    try {
        const response = await axios.get(url);
        const html = response.data;
        $ = cheerio.load(html);
        let myFistDiv;
        let mySecondDiv;
        let myThridDiv;
        let myFourDiv;
        let myFiveDiv;
        let finalItems = [];

        $('div').each(function(i, elem) {
            const classDiv = String($(this).attr('class'));
            if (classDiv.includes('render-container')) {
                myFistDiv = $(this).html();
                $ = cheerio.load(myFistDiv);

                $('div').each(function(i, elem) {
                    const classDiv = $(this).attr('class');
                    if (classDiv === 'render-provider') {
                        mySecondDiv = $(this).html();
                        $ = cheerio.load(mySecondDiv);

                        $('div').each(function(i, elem) {
                            const classDiv = $(this).attr('class');
                            if (classDiv === 'vtex-store__template bg-base') {
                                myThridDiv = $(this).html();
                                $ = cheerio.load(myThridDiv);
        
                                $('div').each(function(i, elem) {
                                    const classDiv = $(this).attr('class');
                                    if (classDiv === 'flex flex-column min-vh-100 w-100') {
                                        myFourDiv = $(this).html();
                                        $ = cheerio.load(myFourDiv);
                                        $('script').each(function(i, elem) {
                                            const typeScript = $(this).attr('type');
                                            if (typeScript === 'application/ld+json') {
                                                myFiveDiv = $(this).html();
                                                finalItems = parseJumboJSON(myFiveDiv);
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });

            }
        });
        const answer = {
            url,
            products: finalItems
        }
        return answer;
    } catch (error) {
        return {};
    }
}

const parseJumboJSON = (data) => {
    const jsonData = JSON.parse(data);
    const itemsList = jsonData.itemListElement;

    const items = [];
    itemsList.forEach(itemElement => {
        const itemName = itemElement.item.name;
        const itemDesciption = itemElement.item.description;
        const itemPrice = itemElement.item.offers.lowPrice;

        const newItem = {
            name: itemName,
            description: itemDesciption,
            price: itemPrice,
        }
        items.push(newItem);
    });
    return items;
}

module.exports = { parseJSON, parseJumbo }