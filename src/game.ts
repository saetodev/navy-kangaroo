import { Vec2, Rect } from "./math.js"
import { isKeyDown } from "./app.js"

import * as graphics from "./graphics.js"
import * as physics from "./physics.js"

const world: physics.World = {
    gravity: new Vec2(0, 980),
    entities: []
}

function findEntityName(world: physics.World, name: string): physics.Entity | null {
    for (const entity of world.entities) {
        if (entity.name === name) {
            return entity
        }
    }

    return null
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
        restitution: 0,
    })

    world.entities.push({
        id: 0,

        name: "wall",
        color: "black",

        position: new Vec2(window.innerWidth / 2, window.innerHeight),
        velocity: new Vec2(0, 0),
        
        size: new Vec2(window.innerWidth, 0),
        mass: 0,
        restitution: 0,
    })
    
    world.entities.push({
        id: 0,

        name: "wall",
        color: "black",

        position: new Vec2(0, window.innerHeight / 2),
        velocity: new Vec2(0, 0),
        
        size: new Vec2(0, window.innerHeight),
        mass: 0,
        restitution: 0,
    })
    
    world.entities.push({
        id: 0,

        name: "wall",
        color: "black",

        position: new Vec2(window.innerWidth, window.innerHeight / 2),
        velocity: new Vec2(0, 0),
        
        size: new Vec2(0, window.innerHeight),
        mass: 0,
        restitution: 0,
    })

    world.entities.push({
        id: 0,

        name: "wall",
        color: "black",

        position: new Vec2(window.innerWidth / 2, window.innerHeight - 16),
        velocity: new Vec2(0, 0),

        size: new Vec2(128, 32),
        mass: 0,
        restitution: 0.1,
    })
    
    world.entities.push({
        id: 0,

        name: "wall",
        color: "black",

        position: new Vec2(window.innerWidth / 2 + 150, window.innerHeight - 16 - 64),
        velocity: new Vec2(0, 0),

        size: new Vec2(128, 32),
        mass: 0,
        restitution: 0.1,
    })
}

let justJumped = false

export function update(deltaTime: number) {
    const player = findEntityName(world, "player")

    if (player) {
        player.velocity.x = ((isKeyDown('d') ? 1 : 0) - (isKeyDown('a') ? 1 : 0)) * 150
    
        if (isKeyDown(' ') && !justJumped) {
            justJumped = true
            player.velocity.y = -700
        }

        if (!isKeyDown(' ') && justJumped) {
            justJumped = false
        } 
    } 

    physics.step(world, deltaTime)
    physics.maybeResolveCollisions(world)
}

export function render(ctx: graphics.RenderContext) {
    graphics.clearScreen(ctx, "rgb(100, 100, 100)")

    for (const entity of world.entities) {
        graphics.drawRect(ctx, entity.position, entity.size, entity.color)
    }
}
