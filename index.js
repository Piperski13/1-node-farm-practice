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
//   const data2 = await fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8');
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

const data = fs.readFileSync(`${__dirname}/starter/dev-data/data.json`,'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req,res)=>{
  const pathName = req.url;
  if(pathName === '/' || pathName === '/overview'){
    console.log(pathName);
    res.end('This is the OVERVIEW!');
  }else if (pathName === '/products') {
    res.end('This is the PRODUCTS!');
  }else if (pathName === '/api') {
    res.writeHead(200,{
      'Content-Type': 'application/json'
    })
    res.end(data);
  }else{
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
