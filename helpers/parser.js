const fetch = require('node-fetch');

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
        elementSubcategories.forEach(elementSubcategory => {
            const linkSubcategory = elementSubcategory.subCategoryLink;
            const subcategoryName = linkSubcategory.title;
            const subcategoryUrl = linkSubcategory.clickThrough.value;
            console.log("🚀 ~ file: parser.js:18 ~ parseJSON ~ subcategoryUrl:", baseUrl + subcategoryUrl)
            let Subcategory = {
                name: subcategoryName,
                url: baseUrl + subcategoryUrl,
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