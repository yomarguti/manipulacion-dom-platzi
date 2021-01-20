/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/
const baseUrl = 'https://platzi-avo.vercel.app';

const appNode = document.querySelector('.app');

const formatPrice = (price) => {
  const newPrice = new window.Intl.NumberFormat('en-EN', {
    style: 'currency',
    currency: 'USD',
  }).format(price);

  return newPrice;
};

window
  .fetch(`${baseUrl}/api/avo`)
  .then((res) => res.json())
  .then((responseJson) => {
    const todosLosItems = [];
    responseJson.data.forEach((item) => {
      const image = document.createElement('img');
      image.src = `${baseUrl}${item.image}`;
      image.className = 'rounded-full transition transform hover:-rotate-3';

      const imageContainer = document.createElement('div');
      imageContainer.className =
        'h-24 w-24 flex-shrink-0 p-1 rounded-full bg-gradient-to-tr from-green-500 to-indigo-600';
      imageContainer.append(image);

      const title = document.createElement('h2');
      title.textContent = item.name;
      title.className = 'font-bold text-lg mb-2 text-left';

      const price = document.createElement('div');
      price.textContent = formatPrice(item.price);

      const sku = document.createElement('div');
      sku.textContent = `SKU: ${item.sku}`;
      sku.className = 'text-sm';

      const infoContainer = document.createElement('div');
      infoContainer.append(title, sku, price);
      infoContainer.className = 'flex flex-col items-start';

      const container = document.createElement('div');
      container.className =
        'flex space-x-5 p-5 rounded-md border border-gray-200 shadow-md transition transform hover:scale-105  hover:bg-gray-300 cursor-pointer';

      container.append(imageContainer, infoContainer);
      todosLosItems.push(container);
    });

    appNode.append(...todosLosItems);
  });
