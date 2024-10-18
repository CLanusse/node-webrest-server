import { envs } from "./config/envs"
import { AppRoutes } from "./presentation/routes"
import { Server } from "./presentation/server"

(() => {
    main()
})()

function main() {
    const server = new Server({
        routes: AppRoutes.routes,
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH
    })

    server.start()
}