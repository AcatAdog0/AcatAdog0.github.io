;
(function (window) {
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
        window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

    const FRAME_RATE = 60
    const PARTICLE_NUM = 2000
    const RADIUS = Math.PI * 2
    const CANVASWIDTH = 500
    const CANVASHEIGHT = 150
    const CANVASID = 'canvas'

    // let texts = ['蔚蓝星空下', '男孩独自坐望', '星海闪烁', '仿佛在问', '为什么你一个人', '我在等一个人', '一个女孩', '这个女孩', '真没什么好的', '性格很倔强', '脾气又不好',
    //     '还很强势', '但男孩觉得', '这都是表面', '在他的眼中', '女孩任性起来', '耍起混来的时候', '真的很可爱', '可是', '就是这样的她', '也非常的脆弱', '也有',
    //     '伤心难过的时候', '而男孩', '看着她', '想要做一千件事', '让她开心起来', '却总是放下', '已经攥紧的拳头', '空荡荡', '因为男孩知道', '女孩心中有个人', '那是一座女孩',
    //     '筑起的城堡', '男孩走不近', '只能呆呆望着', '其实他也知道', '这样很傻', '但是放下', '却做不到', '在城堡外', '继续等待', '男孩再次抬头', '望向星空', '嘿',
    //     '女孩', '我能成为', '你的星星吗', '小小的星光', '不过分炙热', '不会灼伤你', '让你耍赖', '给你依赖', '给你幸福', '等待着你', 'Always'
    // ]
    let texts = ['story of ly&zy', '2018.6.17', 'ly&zy缘分开始', 'ly很小心', '一点都不勇敢', '面对心动的zy', '不敢表达爱意', 'zy是勇敢的女孩', '对ly说出了爱', 'ly被zy打动', '在不知不觉中', 'ly也变得勇敢', '向zy示爱',
        '2018.6.25', 'ly&zy在一起啦', 'ly不敢想象', '一切来得太快', '两人的生活开始', '女孩zy很可爱', '性子虽然急', 'ly性格意外的好', '处处包容zy', 'ly是臭屁虫', '臭八怪', '但是zy说', 'ly笑起来最好看', '不许别的女孩说', 
        'zy是乖宝贝儿', '香宝贝儿', '后来ly发现', 'zy没有太勇敢', '她只是小女生', 'ly决定','要变得很强大', '让自己的宝贝儿', '有所依靠', '时间会说明一切', 
        '金蝉脱壳Ⅱ', '第一场电影', '第一次接吻', 'ly属实铁憨憨', '不会亲亲', '怎么亲亲', '把zy笑惨了', '从那以后', 'ly爱上了亲亲', '每时每刻都想', '直到现在', '热情未泯',
        '这个ly异常的笨', '礼物惊喜什么的','都不会准备', 'zy对此很不满',  '因为ly','是一个礼物白痴', 'ly开始学习', '目前还算有长进',
        '2019.5.28', 'zy妈妈来重庆', 'ly很紧张', '忐忑不安', '阿姨说ly很靠谱', 'ly开心了好久', '并暗自下决心', '尽快迎娶zy',
        '2019.6.25', '一周年', '很慢也很快', '到今天七夕', '已经408天', '过了一周年的坎', '一切都像加速了', '时间飞速向前', 'ly写这些的时候', '觉察到自己', '对生活的记录','太少太少', '就像zy说的',
        '今天是个转折', 'ly会好好记录', '他们的点点滴滴', '七夕快乐宝贝儿', '我爱你周子尧'
    ]

    let canvas,
        ctx,
        particles = [],
        quiver = true,
        text = texts[0],
        textIndex = 0,
        textSize = 70

    function draw() {
        ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.textBaseline = 'middle'
        ctx.fontWeight = 'bold'
        ctx.font = textSize + 'px \'SimHei\', \'Avenir\', \'Helvetica Neue\', \'Arial\', \'sans-serif\''
        ctx.fillText(text, (CANVASWIDTH - ctx.measureText(text).width) * 0.5, CANVASHEIGHT * 0.5)

        let imgData = ctx.getImageData(0, 0, CANVASWIDTH, CANVASHEIGHT)

        ctx.clearRect(0, 0, CANVASWIDTH, CANVASHEIGHT)

        for (let i = 0, l = particles.length; i < l; i++) {
            let p = particles[i]
            p.inText = false
        }
        particleText(imgData)

        window.requestAnimationFrame(draw)
    }

    function particleText(imgData) {
        // 点坐标获取
        var pxls = []
        for (var w = CANVASWIDTH; w > 0; w -= 3) {
            for (var h = 0; h < CANVASHEIGHT; h += 3) {
                var index = (w + h * (CANVASWIDTH)) * 4
                if (imgData.data[index] > 1) {
                    pxls.push([w, h])
                }
            }
        }

        var count = pxls.length
        var j = parseInt((particles.length - pxls.length) / 2, 10)
        j = j < 0 ? 0 : j

        for (var i = 0; i < pxls.length && j < particles.length; i++, j++) {
            try {
                var p = particles[j],
                    X,
                    Y

                if (quiver) {
                    X = (pxls[i - 1][0]) - (p.px + Math.random() * 10)
                    Y = (pxls[i - 1][1]) - (p.py + Math.random() * 10)
                } else {
                    X = (pxls[i - 1][0]) - p.px
                    Y = (pxls[i - 1][1]) - p.py
                }
                var T = Math.sqrt(X * X + Y * Y)
                var A = Math.atan2(Y, X)
                var C = Math.cos(A)
                var S = Math.sin(A)
                p.x = p.px + C * T * p.delta
                p.y = p.py + S * T * p.delta
                p.px = p.x
                p.py = p.y
                p.inText = true
                p.fadeIn()
                p.draw(ctx)
            } catch (e) {}
        }
        for (var i = 0; i < particles.length; i++) {
            var p = particles[i]
            if (!p.inText) {
                p.fadeOut()

                var X = p.mx - p.px
                var Y = p.my - p.py
                var T = Math.sqrt(X * X + Y * Y)
                var A = Math.atan2(Y, X)
                var C = Math.cos(A)
                var S = Math.sin(A)

                p.x = p.px + C * T * p.delta / 2
                p.y = p.py + S * T * p.delta / 2
                p.px = p.x
                p.py = p.y

                p.draw(ctx)
            }
        }
    }

    function setDimensions() {
        canvas.width = CANVASWIDTH
        canvas.height = CANVASHEIGHT
        canvas.style.position = 'absolute'
        canvas.style.left = '0px'
        canvas.style.top = '0px'
        canvas.style.bottom = '0px'
        canvas.style.right = '0px'
        canvas.style.marginTop = window.innerHeight * .15 + 'px'
    }

    function event() {
        document.addEventListener('click', function (e) {
            textIndex++
            if (textIndex >= texts.length) {
                textIndex--
                return
            }
            text = texts[textIndex]
            console.log(textIndex)
        }, false)

        document.addEventListener('touchstart', function (e) {
            textIndex++
            if (textIndex >= texts.length) {
                textIndex--
                return
            }
            text = texts[textIndex]
            console.log(textIndex)
        }, false)
    }

    function init() {
        canvas = document.getElementById(CANVASID)
        if (canvas === null || !canvas.getContext) {
            return
        }
        ctx = canvas.getContext('2d')
        setDimensions()
        event()

        for (var i = 0; i < PARTICLE_NUM; i++) {
            particles[i] = new Particle(canvas)
        }

        draw()
    }

    class Particle {
        constructor(canvas) {
            let spread = canvas.height
            let size = Math.random() * 1.2
            // 速度
            this.delta = 0.06
            // 现在的位置
            this.x = 0
            this.y = 0
            // 上次的位置
            this.px = Math.random() * canvas.width
            this.py = (canvas.height * 0.5) + ((Math.random() - 0.5) * spread)
            // 记录点最初的位置
            this.mx = this.px
            this.my = this.py
            // 点的大小
            this.size = size
            // this.origSize = size
            // 是否用来显示字
            this.inText = false
            // 透明度相关
            this.opacity = 0
            this.fadeInRate = 0.005
            this.fadeOutRate = 0.03
            this.opacityTresh = 0.98
            this.fadingOut = true
            this.fadingIn = true
        }
        fadeIn() {
            this.fadingIn = this.opacity > this.opacityTresh ? false : true
            if (this.fadingIn) {
                this.opacity += this.fadeInRate
            } else {
                this.opacity = 1
            }
        }
        fadeOut() {
            this.fadingOut = this.opacity < 0 ? false : true
            if (this.fadingOut) {
                this.opacity -= this.fadeOutRate
                if (this.opacity < 0) {
                    this.opacity = 0
                }
            } else {
                this.opacity = 0
            }
        }
        draw(ctx) {
            ctx.fillStyle = 'rgba(226,225,142, ' + this.opacity + ')'
            ctx.beginPath()
            ctx.arc(this.x, this.y, this.size, 0, RADIUS, true)
            ctx.closePath()
            ctx.fill()
        }
    }

    // setTimeout(() => {
    init()
    // }, 4000);
    // mp3.play()
})(window)
