import scrapeEcommerceWebsite from '@/app/api/scrappert';

export default async function handler(req, res) {
    // console.log('req',req)
  // const { url } = req.query;

  // if (!url) {
  //   res.status(400).json({ error: 'URL parameter is missing' });
  //   return;
  // }

  const products = await scrapeEcommerceWebsite(req.url);
  // console.log('xx',products);
  res.json(products);
}