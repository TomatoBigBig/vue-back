let http = require('http')
let users = [
    {
        id:111,
        name:'aiwocao'
    },
    {
        id:222,
        name:'wonima'
    }
]
let server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    if(req.url === '/api/users'){
        res.end(JSON.stringify(users))
    }else{
        res.end('啥也不是hahahahahiuwdfsdfyiuyiihaha')
    }
});
server.listen(3001,() => {
    console.log('start service')
})