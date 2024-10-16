import http2 from 'http2'
import fs from 'fs'

const server = http2.createSecureServer({ 
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt')
 }, (req, res) => {
    console.log(req.url)

    // const data = {name: 'John Doe', age: 30, city: 'New York'}
    // res.writeHead(200, { 'Content-Type': 'application/json'})
    // res.end(JSON.stringify(data))

    if (req.url === '/') {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/html'})
        res.end(htmlFile)
        return
    }

    if (req.url?.endsWith('.js')) {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
        res.writeHead(200, { 'Content-Type': 'application/javascript'})
        res.end(responseContent)
        return
    }

    if (req.url?.endsWith('.css')) {
        const responseContent = fs.readFileSync(`./public${req.url}`, 'utf-8')
        res.writeHead(200, { 'Content-Type': 'text/css'})
        res.end(responseContent)
        return
    }
})

server.listen(8080, () => {
    console.log('Server running on 8080')
})