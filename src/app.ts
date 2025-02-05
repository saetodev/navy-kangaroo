import { RenderContext, createRenderContext } from "./graphics.js"
import { assert } from "./util.js"

type AppInitFn = () => void
type AppUpdateFn = (deltaTime: number) => void
type AppRenderFn = (ctx: RenderContext) => void

type AppState = {
    renderContext: RenderContext
    keysDown: boolean[]
}

const state = {
    renderContext: createRenderContext(),
    keysDown: [] as boolean[]
}

export function isKeyDown(key: string): boolean {
    const res = state.keysDown[key.charCodeAt(0)]
    return res ? res : false
}

export function runApp(initCallback: AppInitFn, updateCallback: AppUpdateFn, renderCallback: AppRenderFn) {
    assert(!!initCallback, "no init callback")
    assert(!!updateCallback, "no update callback")
    assert(!!renderCallback, "no render callback")
    
    let lastTime = performance.now()

    //NOTE: user init
    initCallback()

    function mainLoop() {
        const nowTime = performance.now()
        let deltaTime = (nowTime - lastTime) / 1000
        lastTime = nowTime

        //TODO: war crime right here
        deltaTime = deltaTime > 0.017 ? 0.017 : deltaTime

        //NOTE: user update and render
        updateCallback(deltaTime)
        renderCallback(state.renderContext)

        requestAnimationFrame(mainLoop)
    }

    requestAnimationFrame(mainLoop)
}

window.addEventListener("resize", () => {
    state.renderContext.canvas.width = window.innerWidth
    state.renderContext.canvas.height = window.innerHeight
})

document.addEventListener("keydown", (e) => {
    state.keysDown[e.key.charCodeAt(0)] = true
})

document.addEventListener("keyup", (e) => {
    state.keysDown[e.key.charCodeAt(0)] = false
})
