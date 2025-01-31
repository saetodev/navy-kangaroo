import { Vec2 } from "./math.js"

export function clearScreen(ctx: RenderContext, color: string) {
    ctx.ctx.fillStyle = color
    ctx.ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export function drawRect(ctx: RenderContext, pos: Vec2, size: Vec2, color: string) { 
    const x0 = pos.x - (size.x / 2)
    const y0 = pos.y - (size.y / 2)
    
    ctx.ctx.fillStyle = color
    ctx.ctx.fillRect(x0, y0, size.x, size.y)
}

export function drawRectLines(ctx: RenderContext, pos: Vec2, size: Vec2, color: string) {
    const x0 = pos.x - (size.x / 2)
    const y0 = pos.y - (size.y / 2)

    ctx.ctx.lineWidth = 1
    
    ctx.ctx.strokeStyle = color
    ctx.ctx.strokeRect(x0, y0, size.x, size.y)
} 

export function drawLine(ctx: RenderContext, start: Vec2, end: Vec2, color: string) {
    ctx.ctx.strokeStyle = color
    ctx.ctx.lineWidth   = 1

    ctx.ctx.beginPath()
    ctx.ctx.moveTo(start.x, start.y)
    ctx.ctx.lineTo(200, 200)
    ctx.ctx.stroke()
}
