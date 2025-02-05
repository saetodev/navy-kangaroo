import { Vec2, Rect } from "./math.js"

import * as graphics from "./graphics.js"
import * as physics from "./physics.js"

function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min
}

function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const world: physics.World = {
    gravity: new Vec2(0, 9800),
    entities: []
}

export function init() {
    // place player
    world.entities.push({
        id: 0,

        name: "player",
        color: "orange",

        position: new Vec2(window.innerWidth / 2, window.innerHeight / 2),
        velocity: new Vec2(0, 0),
        
        size: new Vec2(32, 32),
        mass: 60,
        restitution: 0.67,
    })

    // place walls
    world.entities.push({
        id: 0,

        name: "wall",
        color: "black",

        position: new Vec2(window.innerWidth / 2, 0),
        velocity: new Vec2(0, 0),
        
        size: new Vec2(window.innerWidth, 0),
        mass: 0,
        restitution: 1,
    })

    world.entities.push({
        id: 0,

        name: "wall",
        color: "black",

        position: new Vec2(window.innerWidth / 2, window.innerHeight),
        velocity: new Vec2(0, 0),
        
        size: new Vec2(window.innerWidth, 0),
        mass: 0,
        restitution: 1,
    })
    
    world.entities.push({
        id: 0,

        name: "wall",
        color: "black",

        position: new Vec2(0, window.innerHeight / 2),
        velocity: new Vec2(0, 0),
        
        size: new Vec2(0, window.innerHeight),
        mass: 0,
        restitution: 1,
    })
    
    world.entities.push({
        id: 0,

        name: "wall",
        color: "black",

        position: new Vec2(window.innerWidth, window.innerHeight / 2),
        velocity: new Vec2(0, 0),
        
        size: new Vec2(0, window.innerHeight),
        mass: 0,
        restitution: 1,
    })
}

export function update(deltaTime: number) {
    physics.step(world, deltaTime)
    physics.maybeResolveCollisions(world)
}


export function render(ctx: graphics.RenderContext) {
    graphics.clearScreen(ctx, "rgb(100, 100, 100)")

    for (const entity of world.entities) {
        graphics.drawRect(ctx, entity.position, entity.size, entity.color)
    }

    let totalK = 0
    let totalP = 0

    for (const entity of world.entities) {
        totalK += 0.5 * entity.mass * entity.velocity.dot(entity.velocity)
        totalP += world.gravity.y * entity.mass * (window.innerHeight - entity.position.y)
    }

    const totalE = totalK + totalP

    ctx.ctx.font = "16px Arial"
    ctx.ctx.fillStyle = "black"
    ctx.ctx.fillText("Total Kinetic Energy: " + totalK, 32, 32)
    ctx.ctx.fillText("Total Potential Energy " + totalP, 32, 64)
    ctx.ctx.fillText("Total Energy: " + totalE, 32, 96)
}
