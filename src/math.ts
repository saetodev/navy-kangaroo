export class Vec2 {
    public x: number
    public y: number

    constructor(x: number, y: number) {
        this.x = x
        this.y = y
    }
    
    public length(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y))
    }

    public toArray(): number[] {
        return [ this.x, this.y ]
    }

    public copy(): Vec2 {
        return new Vec2(this.x, this.y)
    }

    public add(v: Vec2): Vec2 {
        this.x += v.x
        this.y += v.y
        return this
    }

    public sub(v: Vec2): Vec2 {
        this.x -= v.x
        this.y -= v.y
        return this
    }

    public scale(s: number): Vec2 {
        this.x *= s
        this.y *= s
        return this
    }

    public dot(v: Vec2): number {
        return (this.x * v.x) + (this.y * v.y)
    }

    public normalized(): Vec2 {
        const len = this.length()

        if (len === 0) {
            return new Vec2(0, 0);
        }

        return new Vec2(this.x / len, this.y / len)
    }
}

export class Vec3 {
    public x: number
    public y: number
    public z: number

    constructor(x: number, y: number, z: number) {
        this.x = x
        this.y = y
        this.z = z
    }

    public length(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z))
    }

    public toArray(): number[] {
        return [ this.x, this.y, this.z ]
    }

    public copy(): Vec3 {
        return new Vec3(this.x, this.y, this.z)
    }

    public add(v: Vec3): Vec3 {
        this.x += v.x
        this.y += v.y
        this.z += v.z
        return this
    }

    public sub(v: Vec3): Vec3 {
        this.x -= v.x
        this.y -= v.y
        this.z -= v.z
        return this
    }

    public scale(s: number): Vec3 {
        this.x *= s
        this.y *= s
        this.z *= s
        return this
    }

    public dot(v: Vec3): number {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z)
    }

    normalized(): Vec3 {
        const len = this.length()

        if (len === 0) {
            return new Vec3(0, 0, 0)
        }

        return new Vec3(this.x / len, this.y / len, this.z / len)
    }
}

export class Vec4 {
    public x: number
    public y: number
    public z: number
    public w: number

    constructor(x: number, y: number, z: number, w: number) {
        this.x = x
        this.y = y
        this.z = z
        this.w = w
    }

    public length(): number {
        return Math.sqrt((this.x * this.x) + (this.y * this.y) + (this.z * this.z) + (this.w * this.w))
    }

    public toArray(): number[] {
        return [ this.x, this.y, this.z, this.w ]
    }

    public copy(): Vec4 {
        return new Vec4(this.x, this.y, this.z, this.w)
    }

    public add(v: Vec4): Vec4 {
        this.x += v.x
        this.y += v.y
        this.z += v.z
        this.w += v.w
        return this
    }

    public sub(v: Vec4): Vec4 {
        this.x -= v.x
        this.y -= v.y
        this.z -= v.z
        this.w -= v.w
        return this
    }

    public scale(s: number): Vec4 {
        this.x *= s
        this.y *= s
        this.z *= s
        this.w *= s
        return this
    }

    public dot(v: Vec4): number {
        return (this.x * v.x) + (this.y * v.y) + (this.z * v.z) + (this.w * v.w)
    }

    public normalized(): Vec4 {
        const len = this.length()

        if (len === 0) {
            return new Vec4(0, 0, 0, 0)
        }

        return new Vec4(this.x / len, this.y / len, this.z / len, this.w / len)
    }
}

export class Mat4 {
    public r0: Vec4
    public r1: Vec4
    public r2: Vec4
    public r3: Vec4

    constructor(r0: Vec4, r1: Vec4, r2: Vec4, r3: Vec4) {
        this.r0 = r0
        this.r1 = r1
        this.r2 = r2
        this.r3 = r3
    }

    public static identity(): Mat4 {
        return new Mat4(
            new Vec4(1, 0, 0, 0),
            new Vec4(0, 1, 0, 0),
            new Vec4(0, 0, 1, 0),
            new Vec4(0, 0, 0, 1))
    }

    public toArray(): number[] {
        return [
            this.r0.x, this.r0.y, this.r0.z, this.r0.w,
            this.r1.x, this.r1.y, this.r1.z, this.r1.w,
            this.r2.x, this.r2.y, this.r2.z, this.r2.w,
            this.r3.x, this.r3.y, this.r3.z, this.r3.w,
        ]
    }

    public transposed(): Mat4 {
        return new Mat4(
            new Vec4(this.r0.x, this.r1.x, this.r2.x, this.r3.x),
            new Vec4(this.r0.y, this.r1.y, this.r2.y, this.r3.y),
            new Vec4(this.r0.z, this.r1.z, this.r2.z, this.r3.z),
            new Vec4(this.r0.w, this.r1.w, this.r2.w, this.r3.w))
    }

    public mul(m: Mat4): Mat4 {
        const mT = m.transposed()

        return new Mat4(
            new Vec4(this.r0.dot(mT.r0), this.r0.dot(mT.r1), this.r0.dot(mT.r2), this.r0.dot(mT.r3)),
            new Vec4(this.r1.dot(mT.r0), this.r1.dot(mT.r1), this.r1.dot(mT.r2), this.r1.dot(mT.r3)),
            new Vec4(this.r2.dot(mT.r0), this.r2.dot(mT.r1), this.r2.dot(mT.r2), this.r2.dot(mT.r3)),
            new Vec4(this.r3.dot(mT.r0), this.r3.dot(mT.r1), this.r3.dot(mT.r2), this.r3.dot(mT.r3)))
    }

    public mulv(v: Vec4): Vec4 {
        return new Vec4(
            this.r0.dot(v),
            this.r1.dot(v),
            this.r2.dot(v),
            this.r3.dot(v))
    }

    public mulv2(v: Vec2): Vec2 {
        const res = this.mulv(new Vec4(v.x, v.y, 0, 0))
        return new Vec2(res.x, res.y)
    }

    public mulv3(v: Vec3): Vec3 {
        const res = this.mulv(new Vec4(v.x, v.y, v.z, 0))
        return new Vec3(res.x, res.y, res.z)
    }

    public scaled(s: Vec3): Mat4 {
        const sm = new Mat4(
            new Vec4(s.x, 0, 0, 0),
            new Vec4(0, s.y, 0, 0),
            new Vec4(0, 0, s.z, 0),
            new Vec4(0, 0, 0, 1))

        return sm.mul(this)
    }

    public translated(p: Vec3): Mat4 {
        const tm = new Mat4(
            new Vec4(1, 0, 0, p.x),
            new Vec4(0, 1, 0, p.y),
            new Vec4(0, 0, 1, p.z),
            new Vec4(0, 0, 0, 1))

        return tm.mul(this)
    }
}

export function createOrtho(left: number, right: number, bottom: number, top: number, near: number, far: number) {
    return new Mat4(
        new Vec4(2 / (right - left), 0, 0, -(right + left) / (right - left)),
        new Vec4(0, 2 / (top - bottom), 0, -(top + bottom) / (top - bottom)),
        new Vec4(0, 0, -2 / (far - near), -(far + near) / (far - near)),
        new Vec4(0, 0, 0, 1))
}
