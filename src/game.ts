import { Vec2 } from "./math.js"
import { RenderContext } from "./app.js"

import * as graphics from "./graphics.js"

type PhysicsBody = {
    position: Vec2
    velocity: Vec2

    size: Vec2
    mass: number
}

function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min
}

function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isRectColliding(pos1: Vec2, size1: Vec2, pos2: Vec2, size2: Vec2) {
    return (pos1.x <= pos2.x + size2.x) && (pos1.x + size1.x >= pos2.x) && (pos1.y <= pos2.y + size2.y) && (pos1.y + size1.y >= pos2.y)
}

let didInit = false

const world: PhysicsBody[] = []

export function update(deltaTime: number) {
    if (!didInit) {
        for (let i = 0; i < 50; i++) {
            const xpos = randomRange(48, window.innerWidth - 48)
            const ypos = randomRange(48, window.innerHeight - 48)

            const xvel = randomRange(-300, 300)
            const yvel = randomRange(-300, 300)

            world.push({
                position: new Vec2(xpos, ypos),
                velocity: new Vec2(xvel, yvel),

                size: new Vec2(32, 32),
                mass: randomRange(0, 10),
            })
        }

        didInit = true
    }

    // update positions
    for (const body of world) {
        body.position.add(body.velocity.copy().scale(deltaTime))

        if (body.position.x <= 0 || body.position.x >= window.innerWidth) {
            body.velocity.x = -body.velocity.x
        }

        if (body.position.y <= 0 || body.position.y >= window.innerHeight) {
            body.velocity.y = -body.velocity.y
        }
    }

    // check collision
    for (let i = 0; i < world.length - 1; i++) {
        for (let j = i + 1; j < world.length; j++) {
            const first  = world[i]
            const second = world[j]

            if (isRectColliding(first.position, first.size, second.position, second.size)) {
                first.velocity.scale(-1)
                second.velocity.scale(-1)
            }
        }
    }
}

export function render(ctx: RenderContext) {
    graphics.clearScreen(ctx, "rgb(100, 100, 100)")

    for (const body of world) {
        graphics.drawRectLines(ctx, body.position, body.size, "blue")
    }
}
