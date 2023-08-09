const ploading = {
    currentId: null,
    lastOver: 0,
    delayed: null,
    msg: "",
    // tip: null,
    canvas: null,
    ctx: null,
    startTime: 0,
    showing: false,
    whenShow: () => "喵喵喵",
    whenHide: () => "喵喵喵",
    fadeInCompleted: false,
    fadingOut: false,
    init(canvas, whenShow, whenHide) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        if (typeof whenShow === "function") this.whenShow = whenShow;
        if (typeof whenHide === "function") this.whenHide = whenHide;
    },
    l(msg, id = 'default') {
        if (this.currentId) {
            this.show(msg);
            this.currentId = id;
        } else {
            let toDelay = false;
            const dow = () => {
                if (toDelay && id !== this.delayed) return;
                this.show(msg, true);
                this.currentId = id;
            };
            const now = new Date().getTime();
            if (now - this.lastOver <= 500) {
                setTimeout(dow, 500);
                toDelay = true;
                this.delayed = id;
            } else {
                dow();
                this.delayed = null;
            }
        }
        this.qwq();
    },
    r(id = 'default') {
        if (id === this.currentId) {
            this.hide();
            this.lastOver = new Date().getTime();
            this.currentId = null;
        }
        if (id === this.delayed) {
            this.delayed = null;
        }
    },
    show(msg, fadeIn) {
        this.msg = msg;
        if (fadeIn) {
            this.startTime = performance.now();
            this.fadeInCompleted = false;
        }
        this.showing = true;
        this.whenShow();
    },
    hide() {
        // this.showing = false;
        this.fadingOut = performance.now();
        this.fadeInCompleted = false;
        this.whenHide();
    },
    qwq() {
        if (!ploading.showing || !ploading.canvas || !ploading.ctx) return;
        const { height, width } = ploading.canvas;
        const now = performance.now();
        const t = (now - ploading.startTime) / 20;

        ploading.ctx.font = ("35px Exo");
        ploading.ctx.textAlign = "center";
        ploading.ctx.textBaseline = "middle";
        ploading.ctx.fillStyle = "black";

        const dxstxt = ploading.ctx.measureText(ploading.msg).width;

        ploading.ctx.clearRect(0, 0, width, height);
        if (!ploading.fadeInCompleted) {
            const awa = Math.tan(t / 25);
            if (awa >= 0) {
                ploading.canvas.style.opacity = awa;
            } else {
                ploading.fadeInCompleted = true;
                console.log(t)
                console.log(ploading.startTime)
            }
        } else ploading.canvas.style.opacity = 1;
        if (ploading.fadingOut) {
            const awa = Math.cos((now - ploading.fadingOut) / 400);
            if (awa >= 0) {
                ploading.canvas.style.opacity = awa;
            } else {
                ploading.fadingOut = false;
                ploading.showing = false;
                ploading.canvas.style.opacity = 0;
            }
        }

        ploading.ctx.globalCompositeOperation = "source-over";
        ploading.ctx.fillRect(0, 0, width, height);
        ploading.ctx.globalCompositeOperation = "xor";

        const hw = 20 + dxstxt / 2;
        ploading.ctx.fillRect(Math.sin(t / 20) < 0 ? Math.cos(t / 20) * hw + width / 2 : width / 2 - hw, height / 2 - 25, -Math.cos(t / 20) * hw + hw, 50);
        ploading.ctx.fillText(ploading.msg, width / 2, height / 2);

        requestAnimationFrame(ploading.qwq);
    },
};

export default ploading;