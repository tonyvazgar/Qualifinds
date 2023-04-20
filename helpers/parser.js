const fetch = require('node-fetch');
const cheerio = require('cheerio');



// const urlToQuery = "https://super.walmart.com.mx/content/mascotas/alimento-para-perros/3680079_3680080";
// const testing = async() => {
//     const url = urlToQuery;
//     let config = {
//         method: 'get',
//         maxBodyLength: Infinity,
//         url,
//         headers: {
//             'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
//             'Host': 'super.walmart.com.mx',
//             'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.3 Safari/605.1.15',
//             'Accept-Language': 'en-US,en;q=0.9',
//             'Accept-Encoding': 'gzip, deflate, br',
//             'Connection': 'keep-alive'
//             }
//     };

//     const response = await fetch(url, config);
//     const body = await response.text();
//     const $ = cheerio.load(body);
//     const data = $('script#__NEXT_DATA__').html();
//     const jsonData = JSON.parse(data);
//     const jsonElement = jsonData.props.pageProps.initialTempoData.data.contentLayout.modules;
//     let datas = {};
//     const subcategories = [];
//     jsonElement.forEach(element => {
//         if (element.configs.NavPills) {
//             const configWithNavPills = element.configs.NavPills;
//             configWithNavPills.forEach(subcategory => {
//                 let Subcategory = {
//                     name: subcategory.title,
//                     url: baseUrl + subcategory.url.clickThrough.value,
//                 };
//                 subcategories.push(Subcategory);
//             });
//             datas = element.configs.NavPills;
//         }
//     });
//     return subcategories;
// }



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

    const response = await fetch(url, config);
    const body = await response.text();
    const $ = cheerio.load(body);
    const data = $('script#__NEXT_DATA__').html();
    const jsonData = JSON.parse(data);
    console.log("🚀 ~ file: parser.js:26 ~ getSubcategories ~ jsonData:", jsonData)
    const jsonElement = jsonData.props.pageProps.initialTempoData.data.contentLayout.modules;
    let datas = {};
    const subcategories = [];
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
            datas = element.configs.NavPills;
        }
    });
    return subcategories;
}

const parseJSON = (baseUrl, data) => {
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
            // console.log("🚀 ~ file: parser.js:18 ~ parseJSON ~ subcategoryUrl:", baseUrl + subcategoryUrl)
            const mySubcategories = await getSubcategories(baseUrl, subcategoryUrl);
            let Subcategory = {
                name: subcategoryName,
                url: baseUrl + subcategoryUrl,
                subcategories: mySubcategories,
            };
            subcategories.push(Subcategory);
        });
        Departament.subcategories = subcategories;
        finalCategories.push(Departament);
    });
    myResponse.categories = finalCategories;
    return myResponse;
};

module.exports = { parseJSON }