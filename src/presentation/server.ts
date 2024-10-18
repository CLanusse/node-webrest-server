import express, { Router } from 'express'
import path from 'path';

interface Options {
    port: number
    routes: Router
    public_path?: string
}

export class Server {

    private app = express();
    private readonly port:number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor ({ port, routes, public_path = 'public'}: Options) {
        this.port = port
        this.publicPath = public_path
        this.routes = routes
    }

    async start() {

        // * Middlewares
        this.app.use( express.json() )
        this.app.use( express.urlencoded({ extended: true }) ) // x-www-form-urlencoded

        // * Public Folder
        this.app.use( express.static( this.publicPath ) )

        // * routes
        this.app.use( this.routes )
       
        // * SPA
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