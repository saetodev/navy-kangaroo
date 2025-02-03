import { Vec2, Rect } from "./math.js"

import * as graphics from "./graphics.js"

type AABB = {
    position: Vec2
    halfSize: Vec2
}

type PhysicsBody = {
    position: Vec2
    velocity: Vec2
    size: Vec2
    mass: number

    name: string
    color: string
}

type ContactPoint = {
    normal: Vec2
    penetration: number
}

type CollisionInfo = {
    first: PhysicsBody
    second: PhysicsBody
    point: ContactPoint
}

function randomRange(min: number, max: number): number {
    return Math.random() * (max - min) + min
}

function randomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isAABBColliding(a: AABB, b: AABB): boolean {
    const delta = b.position.copy().sub(a.position)
    const totalSize = a.halfSize.copy().add(b.halfSize)

    return Math.abs(delta.x) < totalSize.x && Math.abs(delta.y) < totalSize.y
}

function AABBCollisionInfo(a: AABB, b: AABB, info: CollisionInfo): boolean {
    if (!isAABBColliding(a, b)) {
        return false
    }

    const faces = [
        new Vec2(-1, 0), new Vec2(1, 0),
        new Vec2(0, -1), new Vec2(0, 1),
    ]

    const maxA = a.position.copy().add(a.halfSize)
    const minA = a.position.copy().sub(a.halfSize)

    const maxB = b.position.copy().add(b.halfSize)
    const minB = b.position.copy().sub(b.halfSize)

    const distances = [
        maxB.x - minA.x,
        maxA.x - minB.x,
        maxB.y - minA.y,
        maxA.y - minB.y,
    ]

    let penetration = Number.MAX_VALUE
    let bestAxis = new Vec2(0, 0)

    for (let i = 0; i < faces.length; i++) {
        if (distances[i] < penetration) {
            penetration = distances[i]
            bestAxis = faces[i]
        }
    }

    info.point.normal = bestAxis
    info.point.penetration = penetration

    return true
}

const world: PhysicsBody[] = []

let aDown = false
let dDown = false

let sDown = false

export function init() {
    world.push({
        position: new Vec2(window.innerWidth / 2, window.innerHeight / 2),
        velocity: new Vec2(0, 0),
        size: new Vec2(32, 32),
        mass: 60,

        name: "player",
        color: "orange",
    })

    // place walls
    world.push({
        position: new Vec2(window.innerWidth / 2, 0),
        velocity: new Vec2(0, 0),
        size: new Vec2(window.innerWidth, 0),
        mass: 0,
        name: "wall",
        color: "black",
    })

    world.push({
        position: new Vec2(window.innerWidth / 2, window.innerHeight),
        velocity: new Vec2(0, 0),
        size: new Vec2(window.innerWidth, 0),
        mass: 0,
        name: "wall",
        color: "black",
    })

    world.push({
        position: new Vec2(0, window.innerHeight / 2),
        velocity: new Vec2(0, 0),
        size: new Vec2(0, window.innerHeight),
        mass: 0,
        name: "wall",
        color: "black",
    })

    world.push({
        position: new Vec2(window.innerWidth, window.innerHeight / 2),
        velocity: new Vec2(0, 0),
        size: new Vec2(0, window.innerHeight),
        mass: 0,
        name: "wall",
        color: "black",
    })
}

export function update(deltaTime: number) {
    let player: PhysicsBody | null = null

    for (let i = 0; i < world.length; i++) {
        if (world[i].name === "player") {
            player = world[i]
        }
    }

    if (player) {
        if (sDown) {
            player.velocity.y = -100
        }

        player.velocity.x = ((dDown ? 1 : 0) - (aDown ? 1 : 0)) * 150
    }

    // update positions
    for (const body of world) {
        if (body.mass === 0) {
            continue
        }

        body.velocity.add(new Vec2(0, 980).scale(deltaTime))
        body.position.add(body.velocity.copy().scale(deltaTime))
    }

    // check collision
    for (let i = 0; i < world.length - 1; i++) {
        for (let j = i + 1; j < world.length; j++) {
            const first = world[i]
            const second = world[j]

            const info = {
                first: first,
                second: second,
                point: { normal: new Vec2(0, 0), penetration: 0 }
            }

            const result = AABBCollisionInfo(
                { position: first.position.copy(), halfSize: first.size.copy().scale(0.5) },
                { position: second.position.copy(), halfSize: second.size.copy().scale(0.5) },
                info)

            if (result) {
                const firstInvMass = first.mass != 0 ? (1.0 / first.mass) : 0
                const secondInvMass = second.mass != 0 ? (1.0 / second.mass) : 0

                const totalMass = firstInvMass + secondInvMass

                const firstPMass = totalMass != 0 ? (firstInvMass / totalMass) : 0
                const secondPMass = totalMass != 0 ? (secondInvMass / totalMass) : 0

                first.position.sub(info.point.normal.copy().scale(info.point.penetration * firstPMass))
                second.position.add(info.point.normal.copy().scale(info.point.penetration * secondPMass))

                const restitution = 0.67

                if (info.point.normal.x == 1 || info.point.normal.x == -1) {
                    first.velocity.x *= -restitution
                    second.velocity.x *= -restitution
                }

                if (info.point.normal.y == 1 || info.point.normal.y == -1) {
                    first.velocity.y *= -restitution
                    second.velocity.y *= -restitution
                }
            }
        }
    }
}

export function render(ctx: graphics.RenderContext) {
    graphics.clearScreen(ctx, "rgb(100, 100, 100)")

    for (const body of world) {
        graphics.drawRectLines(ctx, body.position, body.size, body.color)
    }
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case 'a': {
            aDown = true
            break
        }

        case 'd': {
            dDown = true
            break
        }

        case 's': {
            sDown = true
            break
        }
    }
})

document.addEventListener("keyup", (e) => {
    switch (e.key) {
        case 'a': {
            aDown = false
            break
        }

        case 'd': {
            dDown = false
            break
        }

        case 's': {
            sDown = false
            break
        }
    }
})
