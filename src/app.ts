export type RenderContext = {
    canvas: HTMLCanvasElement
    ctx: CanvasRenderingContext2D
}

type AppUpdateFn = (deltaTime: number) => void
type AppRenderFn = (ctx: RenderContext) => void

function createRenderContext() {
    const canvas = document.createElement("canvas")

    canvas.width  = window.innerWidth
    canvas.height = window.innerHeight

    document.body.append(canvas)

    //TODO: assert this
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D

    return { canvas: canvas, ctx: ctx }
}

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
