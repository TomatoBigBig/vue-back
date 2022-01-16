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
let {spawn} = require('child_process')
const SECRET = '123456'
function sign(body){
    return `sha1=`+crypto.createHmac('sha1',SECRET).update(body).digest('hex')
}
let server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*')
    if(req.url === '/api/users'){
        let buffers = []
        req.on('data',function(buffer){
            buffers.push(buffer);
            // console.log('buffers'+buffers)
        })
        req.on('end',function(buffer){
            let body = Buffer.concat(buffers);
            // console.log('body'+body)
            let event = req.headers['x-gitHub-event'];// event = push
            //github请求来的时候，需要传递请求体body， 另外还会传一个signature过来,你需要验证签名
            let signature = req.headers['x-hub-signature'];
            if(signature !== sign(body)){
                res.end('shayebushi')
            }
            
            let child = spawn('sh',['./learning.sh']);
            
            res.end(JSON.stringify({OK:true}))
            // if(event == 'push'){
            //     let buffers = [];
            //     child.stdout.on('data', function(buffer){
            //         buffers.push(buffer)
            //     })
            //     child.stdout.on('end', function(buffer){
            //         let log = Buffer.concat(buffers);
            //         console.log(log)
                    
            //     })
            // }
        })
        
    }else{
        res.end('aiwoqu 求你了！！！！！')
    }
});
server.listen(3001,() => {
    console.log('start service')
})