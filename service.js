// let http = require('http')
// let users = [
//     {
//         id:111,
//         name:'aiwocao'
//     },
//     {
//         id:222,
//         name:'wonima'
//     }
// ]
// let server = http.createServer((req, res) => {
//     res.setHeader('Access-Control-Allow-Origin','*')
//     if(req.url === '/api/users'){
//         res.end(JSON.stringify(users))
//     }else{
//         res.end('aiwoqu 求你了！！！！！')
//     }
// });
// server.listen(3001,() => {
//     console.log('start service')
// })

let http = require('http')
let crypto = require('crypto')
const SECRET = '123456'
function sign(body){
    return `sha1=`+crypto.createHmac('sha1',SECRET).update(body).digest('hex')
}
let server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    if(req.url === '/api/users'){
        let buffers = []
        req.on('data',function(buffer){
            buffers.push(Buffer);
        })
        req.on('end',function(buffer){
            let body = Buffer.concat(buffers);
            let event = req.header['x-gitHub-event'];// event = push
            //github请求来的时候，需要传递请求体body， 另外还会传一个signature过来,你需要验证签名
            let signature = req.headers['x-hub-signature'];
            if(signature !== sign(body)){
                res.end('shayebushi')
            }
        })
        res.end(JSON.stringify({OK:true}))
    }else{
        res.end('aiwoqu 求你了！！！！！')
    }
});
server.listen(3001,() => {
    console.log('start service')
})