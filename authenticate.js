//import modules and declare variables
const http = require (`http`);
const {findUser} = require (`./db.function.js`);
const PORT = 9000;
const HOSTNAME = `localhost`;

//Get body function
function getBodyFromStream(req){
    return new Promise((resolve, reject)=>{
        const data =[];
        req.on(`data`, (chunk)=>{
            data.push(chunk);
        });
        req.on(`end`, ()=>{
            const body =Buffer.concat(data).toString();
            if (body){
                resolve(JSON.parse(body));
                return;
            }
            resolve({});
        });
        req.on(`error`, (err)=>{
            reject(err);
        });
    });
}
// Authentication function
function authenticate(req, res, next){
    const {username, password} = req.body;
    console.log(`authenticate`, req.body);
    const user = findUser(username);
    if(!user){
        res.statusCode= 401;
        res.end();
        return;
    }
    next(req, res);
}

//Get books function
function getBooks(req, res){
    console.log (`getBooks`, req.body);
    res.setHeader(`Content-Type`, `application/json`);
    res.end(JSON.stringify({ books: [{title: `The Oldman and the Sea`}]}));
}

//Get authors function
function getAuthors(req, res){
    console.log (`postAuthors`, req.body);
    res.setHeader(`Content-Type`, `application/json`);
    res.end(JSON.stringify({ authors: [{name: `John Doe`}]}));
}

//Post books function
function postBooks(req, res){
    console.log (`postBooks`, req.body);
    res.setHeader(`Content-Type`, `application/json`);
    res.end(JSON.stringify({ books: [{title: `The Oldman and the Sea`}]}));
}

//Post authors function
function postAuthors(req, res){
    console.log (`postAuthors`, req.body);
    res.setHeader(`Content-Type`, `application/json`);
    res.end(JSON.stringify({ authors: [{name: `John Doe`}]}));
}

//Put books function
function putBooks(req, res){
    console.log (`putBooks`, req.body);
    res.setHeader(`Content-Type`, `application/json`);
    res.end(JSON.stringify({ books: [{title: `The Oldman and the Sea`}]}));
}

//Put authors function
function putAuthors(req, res){
    console.log (`putAuthors`, req.body);
    res.setHeader(`Content-Type`, `application/json`);
    res.end(JSON.stringify({ authors: [{name: `John Doe`}]}));
}

//Patch books function
function patchBooks(req, res){
    console.log (`patchBooks`, req.body);
    res.setHeader(`Content-Type`, `application/json`);
    res.end(JSON.stringify({ books: [{title: `The Oldman and the Sea`}]}));
}

//Patch authors function
function patchAuthors(req, res){
    console.log (`patchAuthors`, req.body);
    res.setHeader(`Content-Type`, `application/json`);
    res.end(JSON.stringify({ authors: [{name: `John Doe`}]}));
}

//Delete books function
function deleteBooks(req, res){
    console.log (`deleteBooks`, req.body);
    res.setHeader(`Content-Type`, `application/json`);
    res.end(JSON.stringify({ books: [{title: `The Oldman and the Sea`}]}));
}

//Delete authors function
function deleteAuthors(req, res){
    console.log (`deleteAuthors`, req.body);
    res.setHeader(`Content-Type`, `application/json`);
    res.end(JSON.stringify({ authors: [{name: `John Doe`}]}));
}

//Create http server
const server = http.createServer(async(req, res)=>{
    try{const body = await getBodyFromStream(req);
    req.body=body;
    if(req.method===`GET` && req.url===`/books`){
        authenticate(req, res, getBooks);
    }else if(req.method===`GET` && req.url===`/authors`){
        authenticate(req, res, getAuthors);}
    else if(req.method===`POST` && req.url===`/books`){
        authenticate(req, res, postBooks);}
    else if(req.method===`POS` && req.url===`/authors`){
        authenticate(req, res, postAuthors);}
    else if(req.method===`PUT` && req.url===`/books`){
        authenticate(req, res, putBooks);}
    else if(req.method===`PUT` && req.url===`/authors`){
        authenticate(req, res, putAuthors);}
    else if(req.method===`PATCH` && req.url===`/books`){
        authenticate(req, res, patchBooks);}
    else if(req.method===`PATCH` && req.url===`/authors`){
        authenticate(req, res, patchAuthors);}
    else if(req.method===`DELETE` && req.url===`/books`){
        authenticate(req, res, deleteBooks);}
    else if(req.method===`DELETE` && req.url===`/authors`){
        authenticate(req, res, deleteAuthors);}
    }
    catch(error){
        res.statusCode = 500;
        res.end(error.message);
    }
});

//listen to the server on the declared port
server.listen(PORT, HOSTNAME, ()=>{
    console.log(`server is running succesfully at http://${HOSTNAME}:${PORT}`);
});