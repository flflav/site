///////////////////////////////////////////////////////////////////////////////////////////
// ANIMATE HEADER
///////////////////////////////////////////////////////////////////////////////////////////

class SetHeader {
    constructor() {
        this.Elements = {
            container: document.getElementById("container_header"),
            header: document.getElementsByClassName("header"),
            headerRight: document.getElementById("header_right"),
            icons: document.getElementsByClassName("icons"),
            nameIcons: document.getElementsByClassName("name_icons"),
            redIcon: document.getElementsByClassName("icons_red")
        }
        this.Val = {
            containerSz: "var(--containerSz)",
            marginSz: "var(--marginSz)",
            whiteSolid: "var(--whiteSolid)",
            blackSolid: "var(--blackSolid)",
            red: "rgb(240, 0, 0)"
        }
        this.Keyframes = {
            container: undefined,
            header: undefined,
            headerRight: undefined,
            icons: undefined,
            iconsRed: undefined
        }
        this.Options = {
            duration: 500,
            fill: "forwards",
            easing: "ease-in-out",
            direction: "normal"
        }
        this.isClosed = true;
        this.setKeyframes();
        this.setClicks();
    }

    setKeyframes = () => {
        this.Keyframes.container = [
            {
                padding: "calc(" + this.Val.containerSz + " / 3)",
                backgroundColor: this.Val.red,
                outline: this.Val.marginSz + " solid " + this.Val.red,
            },
            {
                backgroundColor: this.Val.whiteSolid,
                padding: "0",
                outline: this.Val.marginSz + " solid " + this.Val.blackSolid,
            }
        ];
        this.Keyframes.header = [
            {
                marginLeft: "0",
                height: "0"
            },
            {
                marginLeft: this.Val.marginSz,
                height: "calc(" + this.Val.containerSz + " / 2)"
            }
        ];
        this.Keyframes.headerRight = [
            {
                marginBottom: "0"
            },
            {
                marginBottom: this.Val.marginSz
            }
        ];
        this.Keyframes.icons = [
            {
                width: "0",
                margin: "0",
                fontSize: "0",
                color: this.Val.red,
                background: this.Val.red
            },
            {
                width: "calc(" + this.Val.containerSz + " / 2)",
                margin: this.Val.marginSz + " " + this.Val.marginSz + " 0 0",
                fontSize: "calc(" + this.Val.containerSz + " / 4)",
                color: this.Val.whiteSolid,
                background: this.Val.blackSolid
            }
        ];
        this.Keyframes.iconsRed = [
            {
                width: "0",
                margin: "0"
            },
            {
                width: "calc(" + this.Val.containerSz + " / 2)",
                margin: this.Val.marginSz + " " + this.Val.marginSz + " 0 0"
            }
        ];
    }

    setClicks = () => {
        this.Elements.redIcon[0].addEventListener("pointerdown", () => {
            if (!this.isClosed) {
                this.Options.direction = "reverse";
                this.setAnimation();
            }
        });
        this.Elements.container.addEventListener("pointerdown", () => {
            if (this.isClosed) {
                this.Options.direction = "normal";
                this.setAnimation();
            }
        });
    }

    setAnimation = () => {
        this.Elements.container.animate(this.Keyframes.container, this.Options);
        this.Elements.header.forEach((e) => {
            e.animate(this.Keyframes.header, this.Options);
        });
        this.Elements.headerRight.animate(this.Keyframes.headerRight, this.Options);
        this.Elements.icons.forEach((e) => {
            e.animate(this.Keyframes.icons, this.Options);
        });
        this.Elements.nameIcons.forEach((e) => {
            e.animate(this.Keyframes.icons, this.Options);
        });
        this.Elements.redIcon[0].animate(this.Keyframes.iconsRed, this.Options);
        setTimeout(() => {
            this.isClosed = !this.isClosed;
        }, this.Options.duration);
    }
}

///////////////////////////////////////////////////////////////////////////////////////////
// ANIMATE ICONS
///////////////////////////////////////////////////////////////////////////////////////////

class SetIcons {
    constructor(instance) {
        this.Elements = {
            body: document.getElementsByTagName("body")[0],
            header: document.getElementsByClassName("header"),
            container: document.getElementById("container_header"),
            icons: document.getElementsByClassName("icons"),
            name: document.getElementsByClassName("name"),
            links: document.getElementsByTagName("a"),
            info: document.getElementById("info")
        }
        this.Val = {
            containerSz: "var(--containerSz)",
            marginSz: "var(--marginSz)",
            whiteSolid: "var(--whiteSolid)",
            blackSolid: "var(--blackSolid)",
            infoPosition: undefined
        }
        this.Keyframes = {
            icons: undefined,
            name: undefined,
            nameIcons: undefined,
        }
        this.Options = {
            duration: 300,
            easing: "step-start"
        }
        this.isVisible = false;
        this.setKeyframes();
        this.setClicks(instance);
    }

    setKeyframes = () => {
        this.Keyframes.icons = [
            {
                fontSize: "calc(" + this.Val.containerSz + " / 4)",
                color: this.Val.whiteSolid,
                background: this.Val.blackSolid,
                outline: "none"
            },
            {
                fontSize: "calc(" + this.Val.containerSz + " / 2.5)",
                color: this.Val.blackSolid,
                background: this.Val.whiteSolid,
                outline: this.Val.marginSz + " solid " + this.Val.blackSolid
            }
        ];
        this.Keyframes.name = [
            {
                fontSize: "calc(" + this.Val.containerSz + " / 4)",
                color: this.Val.whiteSolid,
                background: this.Val.blackSolid,
                outline: "none"
            },
            {
                fontSize: "calc(" + this.Val.containerSz + " / 2.5)",
                color: this.Val.blackSolid,
                background: this.Val.whiteSolid,
                outline: this.Val.marginSz + " solid " + this.Val.blackSolid
            }
        ];
        this.Keyframes.nameIcons = [
            {
                fontSize: "calc(" + this.Val.containerSz + " / 4)",
                color: this.Val.whiteSolid,
                background: this.Val.blackSolid,
            },
            {
                fontSize: "calc(" + this.Val.containerSz + " / 2.5)",
                color: this.Val.blackSolid,
                background: this.Val.whiteSolid,
            }
        ];
    }

    setClicks = (instance) => {
        this.Elements.icons.forEach((e, i) => {
            e.addEventListener("pointerdown", () => {
                if (i != Global.currentPg) {
                    instance.loop();
                    setTimeout(() => {
                        Global.destroyCss = true;
                    }, 500);
                    if (e.innerText == "Z") {
                        this.setAnimation(e, this.Keyframes.icons);
                        this.Elements.body.style.overflow = "auto";
                        setTimeout(() => {
                            this.Elements.info.style.display = "block";
                        }, (Math.random() * 2000));
                    } else {
                        this.setAnimation(e, this.Keyframes.icons);
                        setTimeout(() => {
                            this.Elements.links[i].click();
                        }, 2000);
                    }
                    this.Elements.header.forEach((e) => {
                        e.style.pointerEvents = "none";
                    });
                }
            });
        });
        this.Elements.name.forEach((e, i) => {
            e.addEventListener("pointerdown", (p) => {
                this.setAnimation(e, this.Keyframes.name);
                e.children.forEach((e) => {
                    this.setAnimation(e, this.Keyframes.nameIcons);
                });
                setTimeout(() => {
                    if (i == 0) this.setInfo(p.pageY - 70);
                    else this.setInfo(p.pageY - 120);
                }, this.Options.duration + 60);
            })
        });
        // this.Elements.info.addEventListener("pointerdown", () => {
        //     this.Elements.info.style.display = "none";
        //     this.isVisible = !this.isVisible;
        // });
        document.addEventListener("pointerdown", () => {
            if (this.isVisible) {
                this.Elements.info.style.display = "none";
                this.isVisible = !this.isVisible;
            }
        });
    }

    setAnimation = (elt, keyframes) => {
        elt.animate(keyframes, this.Options);
    }

    setInfo = (y) => {
        if (!this.isVisible) {
            this.Val.infoPosition = y;
            this.Elements.info.style.top = String(this.Val.infoPosition) + "px";
            this.Elements.info.style.display = "flex";
        } else {
            this.Elements.info.style.display = "none";
        }
        this.isVisible = !this.isVisible;
    }

    resetInfo = () => {}
}

///////////////////////////////////////////////////////////////////////////////////////////
// DESTROY CSS
///////////////////////////////////////////////////////////////////////////////////////////

class SetDestroy {
    constructor() {
        this.Var = {
            windowW: window.innerWidth,
            windowH: window.innerHeight,
            propertiesLength: undefined
        }
        this.Elements = {
            body: document.getElementsByTagName("body"),
            selectors: []
        }
        this.Properties = {
            margin: "margin",
            padding: "padding",
            width: "width",
            height: "height",
            left: "left",
            right: "right",
            top: "top",
            bottom: "bottom",
            fontSize: "font-size",
            lineHeight: "line-height",
            zIndex: "z-index",
            color: "color",
            backgroundColor: "background-color",
            outline: "outline",
            position: "position",
            display: "display",
            flexDirection: "flex-direction"
        }
        this.Values = {
            margin: [0, this.Var.windowW / 15],
            padding: [0, this.Var.windowW / 15],
            width: [0, this.Var.windowW / 2],
            height: [0, this.Var.windowH / 2],
            left: [0, this.Var.windowW / 3],
            right: [0, this.Var.windowW / 3],
            top: [0, this.Var.windowH / 3],
            bottom: [0, this.Var.windowH / 3],
            fontSize: [5, 150],
            lineHeight: [5, 200],
            zIndex: [-2, 2],
            color: [0, 255],
            backgroundColor: [0, 255],
            outline: [0, this.Var.windowW / 15],
            position: ["absolute", "relative", "fixed"],
            display: ["block", "inline", "flex"],
            flexDirection: ["row", "column"],
        }
        this.Var.propertiesLength = Object.keys(this.Properties).length;
        this.getSelectors();
    }

    getSelectors = () => {
        this.Elements.selectors.push(this.Elements.body[0]);
        this.pushSelectors(this.Elements.body[0]);
    }

    pushSelectors = (elt) => {
        if (elt.length != undefined) {
            elt = elt[0];
        }
        if (elt.children.length == 0) {
            return;
        } else {
            elt.children.forEach((e) => {
                this.pushSelectors(e);
                if (e.localName === "div" && e.className !== "name" && e.className !== "icons_name") this.Elements.selectors.push(e);
            });
        }
    }

    destroy = () => {
        this.selSelector = this.getRandom(0, this.Elements.selectors.length - 1);
        this.selProperty = this.getRandom(0, this.Var.propertiesLength - 1);
        this.selector = this.Elements.selectors[this.selSelector];
        this.property = Object.values(this.Properties)[this.selProperty];
        this.values = Object.values(this.Values)[this.selProperty];
        this.cssValue = "";
        if (typeof this.values[0] === "string") {
            this.index = this.getRandom(0, this.values.length - 1);
            this.cssValue = this.values[this.index];
        } else {
            if (this.selProperty < 11) {
                this.cssValue = String(this.getRandom(this.values[0], this.values[1]));
                if (this.selProperty != 10) this.cssValue += "px";
            } else if (this.selProperty > 10) {
                this.r = this.getRandom(this.values[0], this.values[1]);
                this.g = this.getRandom(this.values[0], this.values[1]);
                this.b = this.getRandom(this.values[0], this.values[1]);
                this.a = Math.random();
                if (this.selProperty == 13) {
                    this.outlineDimensions = this.getRandom(this.values[0], this.values[1]);
                    this.cssValue = String(this.outlineDimensions) + "px solid ";
                }
                this.cssValue += "rgba(" + String(this.r) + ", " + String(this.g) + ", " + String(this.b) + ", " + String(this.a) + ")";
            }
            this.selector.style.setProperty(this.property, this.cssValue);
        }
    }

    getRandom = (min, max) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}