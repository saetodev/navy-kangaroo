import { RenderContext, createRenderContext } from "./graphics.js"

type AppInitFn = () => void
type AppUpdateFn = (deltaTime: number) => void
type AppRenderFn = (ctx: RenderContext) => void

const renderContext = createRenderContext()

export function runApp(initCallback: AppInitFn, updateCallback: AppUpdateFn, renderCallback: AppRenderFn) {
    let lastTime = performance.now()

    if (initCallback) {
        initCallback()
    }

    function mainLoop() {
        const nowTime = performance.now()
        let deltaTime = (nowTime - lastTime) / 1000
        lastTime = nowTime

        deltaTime = deltaTime > 0.017 ? 0.017 : deltaTime

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
    renderContext.canvas.width = window.innerWidth
    renderContext.canvas.height = window.innerHeight
})
