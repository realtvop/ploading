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
    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
    },
    l(msg, id = 'default') {
        if (this.currentId) {
            this.msg = msg;
            this.currentId = id;
            this.showing = true;
        } else {
            let toDelay = false;
            const dow = () => {
                if (toDelay && id !== this.delayed) return;
                this.msg = msg;
                this.currentId = id;
                this.showing = true;
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
            this.showing = false;
            this.lastOver = new Date().getTime();
            this.currentId = null;
        }
        if (id === this.delayed) {
            this.delayed = null;
        }
    },
    qwq() {
        if (!ploading.showing || !ploading.canvas || !ploading.ctx) return;
        const { height, width } = ploading.canvas;
        ploading.startTime = ploading.startTime || performance.now();
        const now = performance.now();
        const t = (now - ploading.startTime) / 20;
        ploading.ctx.font = ("35px Exo");
        ploading.ctx.textAlign = "center";
        ploading.ctx.textBaseline = "middle";
        const dxstxt = ploading.ctx.measureText(ploading.msg).width;
        ploading.ctx.globalCompositeOperation = "source-over";
        ploading.ctx.fillRect(0, 0, width, height);
        ploading.ctx.globalCompositeOperation = "xor";
        ploading.ctx.fillStyle = "black";
        const hw = 20 + dxstxt / 2;
        ploading.ctx.fillRect(Math.sin(t / 20) < 0 ? Math.cos(t / 20) * hw + width / 2 : width / 2 - hw, height / 2 - 25, -Math.cos(t / 20) * hw + hw, 50);
        ploading.ctx.fillText(ploading.msg, width / 2, height / 2);
        requestAnimationFrame(ploading.qwq);
    },
};

export default ploading;