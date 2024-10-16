import express from 'express'
import path from 'path';

interface Options {
    port: number
    public_path?: string
}

export class Server {

    private app = express();
    private readonly port:number;
    private readonly publicPath: string;

    constructor ({ port, public_path = 'public'}: Options) {
        this.port = port
        this.publicPath = public_path
    }

    async start() {

        // * Middlewares

        // * Public Folder
        this.app.use( express.static( this.publicPath ) )

        // * any request
        this.app.get('*', (req, res) => {
            // console.log(req.url)
            // res.send('Hola mundo')
            const indexPath = path.join(__dirname + `../../../${this.publicPath}/index.html`)
            res.sendFile(indexPath)
        })

        this.app.listen(this.port, () => {
            console.log(`Server runing on port: ${this.port}`)
        })
    }
}