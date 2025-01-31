import { RenderContext, createRenderContext } from "./graphics.js"

type AppUpdateFn = (deltaTime: number) => void
type AppRenderFn = (ctx: RenderContext) => void

const renderContext = createRenderContext()

export function runApp(updateCallback: AppUpdateFn, renderCallback: AppRenderFn) {
    let lastTime = performance.now() 

    function mainLoop() {
        const nowTime   = performance.now()
        const deltaTime = (nowTime - lastTime) / 1000
        lastTime        = nowTime

        if (updateCallback) {
            updateCallback(deltaTime)
        }

        if (renderCallback) {
            renderCallback(renderContext)
        }

        requestAnimationFrame(mainLoop)
    }

    requestAnimationFrame(mainLoop)
}

window.addEventListener("resize", () => {
    renderContext.canvas.width  = window.innerWidth
    renderContext.canvas.height = window.innerHeight 
})
