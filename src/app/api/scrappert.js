const axios = require('axios');
const cheerio = require('cheerio');

const scrapeEcommerceWebsite = async (url) => {
  
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const products = [];

    // Replace the following selectors with the relevant selectors for the e-commerce website you want to scrape
    $(selectorForProductContainer).each((index, element) => {
      const productName = $(element).find(selectorForProductName).text().trim();
      const productPrice = $(element).find(selectorForProductPrice).text().trim();
      const productCategory = $(element).find(selectorForProductCategory).text().trim();
      const imageUrl = $(element).find(selectorForImageUrl).attr('src');

      products.push({
        productName,
        productPrice,
        productCategory,
        imageUrl,
      });
    });

    return products;
  } catch (error) {
    console.error('Error scraping the website:', error);
    return [];
  }
};

module.exports = scrapeEcommerceWebsite;