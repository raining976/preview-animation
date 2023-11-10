const cvs = document.getElementById('particleAnimation')
const ctx = cvs.getContext('2d')

function init() {
    cvs.backgroundColor = '#333'
    cvs.width = window.innerWidth * devicePixelRatio
    cvs.height = window.innerHeight * devicePixelRatio
}


class Point {
    constructor() {
        this.r = 6
        this.x = getRandom(0, cvs.width - this.r / 2)
        this.y = getRandom(0, cvs.height - this.r / 2)
        this.xSpeed = getRandom(-50, 50)            // x方向运动速度
        this.ySpeed = getRandom(-50, 50)            // y方向运动速度
        this.lastDrawTime = null    // 上次画的时间
    }

    draw() {
        if (this.lastDrawTime) {
            this.calculateNewCoord()
        }
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.fillStyle = 'rgba(200,200,200)'
        ctx.fill()
        this.lastDrawTime = Date.now()
    }
    // 计算新的坐标
    calculateNewCoord() {
        // 计算新的坐标
        const duration = (Date.now() - this.lastDrawTime) / 1000
        let xDis = this.xSpeed * duration,
            yDis = this.ySpeed * duration
        let x = this.x + xDis,
            y = this.y + yDis
        // 如果超过边界就反向 
        if (x > cvs.width - this.r / 2) {
            x = cvs.width - this.r / 2
            this.xSpeed = -this.xSpeed
        } else if (x < 0) {
            x = 0
            this.xSpeed = -this.xSpeed
        }
        if (y > cvs.height - this.r / 2) {
            y = cvs.height - this.r / 2
            this.ySpeed = -this.ySpeed
        } else if (y < 0) {
            y = 0
            this.ySpeed = -this.ySpeed
        }
        this.x = x
        this.y = y
    }
}


class Graph {
    /**
     * 
     * @param {*} pointNumber // 点的个数
     * @param {*} maxDis 两个点之间的最大距离 超过就就不画线
     */
    constructor(pointNumber = 30, maxDis = 500) {
        this.points = new Array(pointNumber).fill(0).map(() => new Point())
        this.maxDis = maxDis 
    }

    draw() {
        requestAnimationFrame(() => {
            this.draw()
        })
        this.clearBefore()
        for (let i = 0; i < this.points.length; i++) {
            const p1 = this.points[i];
            p1.draw()
            for (let j = i + 1; j < this.points.length; j++) {
                const p2 = this.points[j]
                const d = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
                if (d > this.maxDis) continue
                ctx.beginPath()
                ctx.moveTo(p1.x, p1.y)
                ctx.lineTo(p2.x, p2.y)
                ctx.linWidth = 10 * devicePixelRatio
                ctx.closePath()
                ctx.strokeStyle = `rgba(200,200,200,${1 - d / this.maxDis})`
                ctx.stroke()

            }
        }
    }

    /**
     *  擦除之前画的
     */
    clearBefore() {
        ctx.clearRect(0, 0, cvs.width, cvs.height)
    }
}

/**
 * 返回 min 到 max 的随机数
 * 
 * @param {*} min 
 * @param {*} max 
 * @returns {Number}
 */

function getRandom(min, max) {
    return Math.floor(Math.random() * (max + 1 - min) + min)
}



init()


const g = new Graph(80,400)
g.draw()