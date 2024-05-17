const fs = require('fs'); //fs file system
const http = require('http');
const url = require('url');

/////////////////////////////////////////////
//FILES

// const textIn = fs.readFileSync('./starter/txt/input.txt','utf-8');
// console.log(textIn);

// const textOut = `This is what we know about avocados: ${textIn}`
// fs.writeFileSync('./starter/txt/output.txt',textOut);
// console.log('File written');

// async function readFiles(){
//   const data1 = await fs.readFile('./starter/txt/start.txt','utf-8');
//   console.log(data1);
//   const data2 = await fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8');`
//   console.log(data2);
//   const data3 = await fs.readFile(`./starter/txt/append.txt`, 'utf-8');
//   console.log(data3);
// }
// readFiles().then(()=>{
//   console.log('Will read file!');
// }).catch((error)=>{
//   console.log(error);
// })

// fs.readFile('./starter/txt/start.txt', 'utf-8',(err,data1)=>{
//   fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8',(err,data2)=>{
//     console.log(data2);
//     fs.readFile(`./starter/txt/append.txt`, 'utf-8',(err,data3)=>{
//       console.log(data3);

//     fs.writeFile('./starter/txt/final.txt',`${data2}\n${data3}`, 'utf-8', err=>{
//       console.log('File is written.');
//     })
//     });
//   });
// });
// console.log('Will read file!');

/////////////////////////////////////////////
// SERVER

const replaceTemplate = (temp,product) =>{
  let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);
  
  if(!product.organic) output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  return output;
}


const tempOverview = fs.readFileSync(`${__dirname}/starter/templates/template-overview.html`,'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/starter/templates/template-product.html`,'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/starter/templates/template-card.html`,'utf-8');

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res)=>{

  const {query, pathname} =url.parse(req.url,true)
  
  //overview page
  if(pathname === '/' || pathname === '/overview'){
    res.writeHead(200,{
      'Content-Type': 'text/html'
    });
    const cardsHtml = dataObj.map( element => replaceTemplate(tempCard,element)).join('');
    const output =  tempOverview.replace('{%PRODUCT_CARDS%}',cardsHtml);
    res.end(output);
  }
  //products page
  else if (pathname === '/product') {
    res.writeHead(200,{
      'Content-Type': 'text/html'
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct,product);
    res.end(output);
    
  }
  //api
  else if (pathname === '/api') {
    res.writeHead(200,{
      'Content-Type': 'application/json'
    });
    res.end(data);
  }
  // error
  else{
    res.writeHead(404,{
      'Content-Type': 'text/html',
      'my-own-type': 'hello-world'
    });
    res.end('<h1>Page not found</h2>');
  }
  
});

server.listen('8000','127.0.0.1', ()=>{
  console.log('Listening for requests on port 8000');
});
