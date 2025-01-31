import { Vec2 } from "./math.js"
import { RenderContext } from "./app.js"

/**
 * Clears the entire canvas with a given color
 *
 * @param {RenderContext} ctx the canvas context to use
 * @param {string} color the color to clear with
 */
export function clearScreen(ctx: RenderContext, color: string) {
    ctx.ctx.fillStyle = color
    ctx.ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

/**
 * Draws a solid rectangle
 *
 * @param {RenderContext} ctx the canvas context to use
 * @param {Vec2} pos the position of the center of the rect
 * @param {Vec2} size the size of the rect
 * @param {string} color the color to use
 */
export function drawRect(ctx: RenderContext, pos: Vec2, size: Vec2, color: string) { 
    const x0 = pos.x - (size.x / 2)
    const y0 = pos.y - (size.y / 2)
    
    ctx.ctx.fillStyle = color
    ctx.ctx.fillRect(x0, y0, size.x, size.y)
}

/**
 * Draws the outline of a rectangle
 *
 * @param {RenderContext} ctx the canvas context to use
 * @param {Vec2} pos the position of the center of the rect
 * @param {Vec2} size the size of the rect
 * @param {string} color the color to use
 */
export function drawRectLines(ctx: RenderContext, pos: Vec2, size: Vec2, color: string) {
    const x0 = pos.x - (size.x / 2)
    const y0 = pos.y - (size.y / 2)

    ctx.ctx.lineWidth = 1
    
    ctx.ctx.strokeStyle = color
    ctx.ctx.strokeRect(x0, y0, size.x, size.y)
} 

/**
 * Draws a line
 *
 * @param {RenderContext} ctx then canvas context to use
 * @param {Vec2} start the start position of the line
 * @param {Vec2} end the end position of the line
 * @param {string} color the color to use
 */
export function drawLine(ctx: RenderContext, start: Vec2, end: Vec2, color: string) {
    ctx.ctx.strokeStyle = color
    ctx.ctx.lineWidth   = 1

    ctx.ctx.beginPath()
    ctx.ctx.moveTo(start.x, start.y)
    ctx.ctx.lineTo(200, 200)
    ctx.ctx.stroke()
}
