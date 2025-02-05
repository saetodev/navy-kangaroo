import { Vec2 } from "./math.js"

export type Entity = {
    id: number

    name: string
    color: string

    position: Vec2
    velocity: Vec2

    size: Vec2
    mass: number
    restitution: number
}

export type World = {
    gravity: Vec2
    entities: Entity[]
}

type AABB = {
    position: Vec2
    halfSize: Vec2
}

type ContactPoint = {
    normal: Vec2
    penetration: number
}

function isAABBColliding(a: AABB, b: AABB): boolean {
    const delta = b.position.copy().sub(a.position)
    const totalSize = a.halfSize.copy().add(b.halfSize)

    return Math.abs(delta.x) < totalSize.x && Math.abs(delta.y) < totalSize.y
}

 function AABBCollisionInfo(a: AABB, b: AABB): { colliding: boolean, point: ContactPoint | null } {
    if (!isAABBColliding(a, b)) {
        return { colliding: false, point: null }
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

    return { colliding: true, point: { normal: bestAxis, penetration: penetration }}
}

function resolveImpulseAABBCollision(a: Entity, b: Entity, point: ContactPoint) {
    const aInvMass = a.mass !== 0 ? 1 / a.mass : 0
    const bInvMass = b.mass !== 0 ? 1 / b.mass : 0

    const totalMass = aInvMass + bInvMass

    const aPMass = totalMass !== 0 ? aInvMass / totalMass : 0
    const bPMass = totalMass !== 0 ? bInvMass / totalMass : 0

    a.position.sub(point.normal.copy().scale(point.penetration * aPMass))
    b.position.add(point.normal.copy().scale(point.penetration * bPMass))

    const effectiveRestitution = Math.sqrt(a.restitution * b.restitution)

    const relativeVelocity  = a.velocity.copy().sub(b.velocity)
    const collisionVelocity = relativeVelocity.copy().scale(-(1 + effectiveRestitution)).dot(point.normal)
    
    const impulse = collisionVelocity / totalMass

    a.velocity.add(point.normal.copy().scale(impulse * aInvMass)) 
    b.velocity.sub(point.normal.copy().scale(impulse * bInvMass)) 
}

export function step(world: World, deltaTime: number) {
    for (const entity of world.entities) {
        if (entity.mass === 0) {
            continue
        }

        entity.velocity.add(world.gravity.copy().scale(deltaTime))
        entity.position.add(entity.velocity.copy().scale(deltaTime))
    }
}

export function maybeResolveCollisions(world: World) {
    for (let i = 0; i < world.entities.length - 1; i++) {
        for (let j = i + 1; j < world.entities.length; j++) {
            const a = world.entities[i]
            const b = world.entities[j]

            const result = AABBCollisionInfo(
                { position: a.position.copy(), halfSize: a.size.copy().scale(0.5) },
                { position: b.position.copy(), halfSize: b.size.copy().scale(0.5) })

            if (!result.colliding || result.point == null) {
                continue
            }

            resolveImpulseAABBCollision(a, b, result.point)
        }
    }
}
