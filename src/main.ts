import {
    collectionItems,
    homeMetrics,
    sessionItems,
    timelineItems
} from "./data/dados.js";
import { mostrarConexao } from "./features/conexao.js";
import { mostrarMusica } from "./features/musica.js";
import { mostrarPlaneta } from "./features/astronomia.js";
import { getOptionalElementById } from "./utils/dom.js";

type Star = {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    twinkle: number;
    hueShift: number;
};

type DiskParticle = {
    radius: number;
    angle: number;
    speed: number;
    size: number;
    alpha: number;
    heat: number;
    wobble: number;
    phase: number;
};

type HaloParticle = {
    radius: number;
    angle: number;
    speed: number;
    size: number;
    alpha: number;
    phase: number;
};

type InfallParticle = {
    radius: number;
    angle: number;
    speed: number;
    infall: number;
    size: number;
    alpha: number;
    curve: number;
    tilt: number;
    prevX: number;
    prevY: number;
};

type Point = {
    x: number;
    y: number;
};

class BlackHoleBackground {
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;
    private readonly reducedMotion: boolean;
    private readonly stars: Star[] = [];
    private readonly diskParticles: DiskParticle[] = [];
    private readonly haloParticles: HaloParticle[] = [];
    private readonly infallParticles: InfallParticle[] = [];
    private readonly pointer = {
        targetX: 0,
        targetY: 0,
        currentX: 0,
        currentY: 0
    };

    private width = 0;
    private height = 0;
    private dpr = Math.min(window.devicePixelRatio || 1, 2);
    private frameId = 0;
    private lastTime = 0;
    private isRunning = false;

    public constructor(canvas: HTMLCanvasElement) {
        const context = canvas.getContext("2d");

        if (!context) {
            throw new Error("Nao foi possivel obter o contexto 2D do canvas.");
        }

        this.canvas = canvas;
        this.ctx = context;
        this.reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    public start(): void {
        this.handleResize();
        window.addEventListener("resize", this.handleResize, { passive: true });
        window.addEventListener("pointermove", this.handlePointerMove, { passive: true });
        document.addEventListener("visibilitychange", this.handleVisibilityChange);
        this.isRunning = true;
        this.frameId = window.requestAnimationFrame(this.render);
    }

    private readonly handleResize = (): void => {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.dpr = Math.min(window.devicePixelRatio || 1, 2);

        this.canvas.width = Math.round(this.width * this.dpr);
        this.canvas.height = Math.round(this.height * this.dpr);
        this.canvas.style.width = `${this.width}px`;
        this.canvas.style.height = `${this.height}px`;
        this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

        this.seedScene();
    };

    private readonly handlePointerMove = (event: PointerEvent): void => {
        if (this.width === 0 || this.height === 0) {
            return;
        }

        this.pointer.targetX = event.clientX / this.width - 0.5;
        this.pointer.targetY = event.clientY / this.height - 0.5;
    };

    private readonly handleVisibilityChange = (): void => {
        if (document.visibilityState === "hidden") {
            this.isRunning = false;
            window.cancelAnimationFrame(this.frameId);
            return;
        }

        if (!this.isRunning) {
            this.isRunning = true;
            this.lastTime = 0;
            this.frameId = window.requestAnimationFrame(this.render);
        }
    };

    private seedScene(): void {
        this.stars.length = 0;
        this.diskParticles.length = 0;
        this.haloParticles.length = 0;
        this.infallParticles.length = 0;

        const starCount = this.reducedMotion ? 110 : 180;
        const diskCount = this.reducedMotion ? 140 : 240;
        const haloCount = this.reducedMotion ? 16 : 28;
        const infallCount = this.reducedMotion ? 22 : 40;

        for (let index = 0; index < starCount; index += 1) {
            this.stars.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height,
                radius: 0.5 + Math.random() * 1.6,
                alpha: 0.18 + Math.random() * 0.6,
                twinkle: 0.5 + Math.random() * 2.8,
                hueShift: Math.random() * 20
            });
        }

        const innerRadius = this.getInnerRadius();
        const diskRadius = this.getDiskRadius();

        for (let index = 0; index < diskCount; index += 1) {
            this.diskParticles.push({
                radius: innerRadius * 1.4 + Math.random() * (diskRadius - innerRadius * 1.4),
                angle: Math.random() * Math.PI * 2,
                speed: 0.0025 + Math.random() * 0.009,
                size: 0.8 + Math.random() * 2.8,
                alpha: 0.18 + Math.random() * 0.48,
                heat: Math.random(),
                wobble: 2 + Math.random() * 10,
                phase: Math.random() * Math.PI * 2
            });
        }

        for (let index = 0; index < haloCount; index += 1) {
            this.haloParticles.push({
                radius: diskRadius * (0.9 + Math.random() * 0.45),
                angle: Math.random() * Math.PI * 2,
                speed: 0.001 + Math.random() * 0.0025,
                size: 1 + Math.random() * 2.2,
                alpha: 0.1 + Math.random() * 0.22,
                phase: Math.random() * Math.PI * 2
            });
        }

        for (let index = 0; index < infallCount; index += 1) {
            this.infallParticles.push(this.createInfallParticle());
        }
    }

    private createInfallParticle(): InfallParticle {
        const radius = this.getDiskRadius() * (0.8 + Math.random() * 0.55);
        const angle = Math.random() * Math.PI * 2;
        const tilt = 0.32 + Math.random() * 0.18;
        const point = this.projectPoint(radius, angle, tilt);

        return {
            radius,
            angle,
            speed: 0.012 + Math.random() * 0.016,
            infall: 0.28 + Math.random() * 0.34,
            size: 0.9 + Math.random() * 2.2,
            alpha: 0.25 + Math.random() * 0.5,
            curve: 0.018 + Math.random() * 0.03,
            tilt,
            prevX: point.x,
            prevY: point.y
        };
    }

    private resetInfallParticle(particle: InfallParticle): void {
        const nextParticle = this.createInfallParticle();
        particle.radius = nextParticle.radius;
        particle.angle = nextParticle.angle;
        particle.speed = nextParticle.speed;
        particle.infall = nextParticle.infall;
        particle.size = nextParticle.size;
        particle.alpha = nextParticle.alpha;
        particle.curve = nextParticle.curve;
        particle.tilt = nextParticle.tilt;
        particle.prevX = nextParticle.prevX;
        particle.prevY = nextParticle.prevY;
    }

    private getCenter(): Point {
        return {
            x: this.width * 0.5 + this.pointer.currentX * 32,
            y: this.height * 0.42 + this.pointer.currentY * 18
        };
    }

    private getInnerRadius(): number {
        return Math.max(36, Math.min(this.width, this.height) * 0.08);
    }

    private getDiskRadius(): number {
        return this.getInnerRadius() * 4.8;
    }

    private getLensRadius(): number {
        return this.getInnerRadius() * 7.2;
    }

    private projectPoint(radius: number, angle: number, tilt: number): Point {
        const center = this.getCenter();
        return {
            x: center.x + Math.cos(angle) * radius,
            y: center.y + Math.sin(angle) * radius * tilt
        };
    }

    private readonly render = (timestamp: number): void => {
        if (!this.isRunning) {
            return;
        }

        const delta = this.lastTime === 0 ? 1 : Math.min((timestamp - this.lastTime) / 16.6667, 2.2);
        const time = timestamp * 0.001;
        this.lastTime = timestamp;

        this.pointer.currentX += (this.pointer.targetX - this.pointer.currentX) * 0.06;
        this.pointer.currentY += (this.pointer.targetY - this.pointer.currentY) * 0.06;

        this.updateParticles(delta);
        this.drawScene(time);

        this.frameId = window.requestAnimationFrame(this.render);
    };

    private updateParticles(delta: number): void {
        const motionFactor = this.reducedMotion ? 0.55 : 1;

        for (const particle of this.diskParticles) {
            particle.angle += particle.speed * delta * motionFactor;
        }

        for (const particle of this.haloParticles) {
            particle.angle += particle.speed * delta * motionFactor;
        }

        for (const particle of this.infallParticles) {
            const currentPoint = this.projectPoint(particle.radius, particle.angle, particle.tilt);
            particle.prevX = currentPoint.x;
            particle.prevY = currentPoint.y;

            const pull = 1 - particle.radius / (this.getDiskRadius() * 1.4);
            particle.angle += (particle.speed + particle.curve * Math.max(pull, 0)) * delta * 8 * motionFactor;
            particle.radius -= particle.infall * (0.55 + Math.max(pull, 0) * 1.4) * delta * 3.4 * motionFactor;

            if (particle.radius <= this.getInnerRadius() * 1.15) {
                this.resetInfallParticle(particle);
            }
        }
    }

    private drawScene(time: number): void {
        const center = this.getCenter();
        const intensity = 0.65 + Math.sin(time * 0.8) * 0.08;

        this.ctx.clearRect(0, 0, this.width, this.height);
        this.drawBackdrop(center, intensity);
        this.drawStars(time, center);
        this.drawFieldGlow(center, intensity);
        this.drawDiskBase(time, center, intensity);
        this.drawDiskParticles(time, center, false);
        this.drawInfallParticles(center);
        this.drawPhotonRing(center, intensity);
        this.drawEventHorizon(center);
        this.drawDiskParticles(time, center, true);
        this.drawHaloParticles(time, center);
        this.drawOuterVignette(center);
    }

    private drawBackdrop(center: Point, intensity: number): void {
        const gradient = this.ctx.createRadialGradient(
            center.x,
            center.y,
            this.getInnerRadius() * 0.6,
            center.x,
            center.y,
            Math.max(this.width, this.height) * 0.85
        );

        gradient.addColorStop(0, `rgba(255, 165, 92, ${0.04 * intensity})`);
        gradient.addColorStop(0.18, `rgba(48, 38, 68, ${0.2 * intensity})`);
        gradient.addColorStop(0.46, "rgba(9, 14, 28, 0.56)");
        gradient.addColorStop(1, "rgba(2, 4, 10, 0.98)");

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    private drawStars(time: number, center: Point): void {
        const lensRadius = this.getLensRadius();

        for (const star of this.stars) {
            const dx = star.x - center.x;
            const dy = star.y - center.y;
            const distance = Math.hypot(dx, dy);
            const influence = distance < lensRadius ? (1 - distance / lensRadius) ** 2 : 0;
            const angle = Math.atan2(dy, dx);
            const displacement = influence * (14 + star.radius * 12);
            const drawX = star.x + Math.cos(angle) * displacement;
            const drawY = star.y + Math.sin(angle) * displacement;
            const twinkle = 0.65 + Math.sin(time * star.twinkle + star.x * 0.01) * 0.35;
            const alpha = Math.max(0.04, star.alpha * twinkle + influence * 0.25);

            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(${240 + star.hueShift}, ${224 + star.hueShift}, 255, ${alpha})`;
            this.ctx.arc(drawX, drawY, star.radius + influence * 0.8, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }

    private drawFieldGlow(center: Point, intensity: number): void {
        const glow = this.ctx.createRadialGradient(
            center.x,
            center.y,
            this.getInnerRadius(),
            center.x,
            center.y,
            this.getDiskRadius() * 1.3
        );

        glow.addColorStop(0, "rgba(255, 170, 82, 0)");
        glow.addColorStop(0.28, `rgba(255, 181, 101, ${0.08 * intensity})`);
        glow.addColorStop(0.6, `rgba(255, 102, 34, ${0.06 * intensity})`);
        glow.addColorStop(1, "rgba(255, 102, 34, 0)");

        this.ctx.fillStyle = glow;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }

    private drawDiskBase(time: number, center: Point, intensity: number): void {
        const diskRadius = this.getDiskRadius();

        this.ctx.save();
        this.ctx.translate(center.x, center.y);
        this.ctx.scale(1, 0.34);

        const bandGlow = this.ctx.createRadialGradient(0, 0, this.getInnerRadius() * 0.8, 0, 0, diskRadius);
        bandGlow.addColorStop(0, "rgba(255, 208, 153, 0)");
        bandGlow.addColorStop(0.26, `rgba(255, 206, 124, ${0.12 * intensity})`);
        bandGlow.addColorStop(0.56, `rgba(255, 123, 31, ${0.12 * intensity})`);
        bandGlow.addColorStop(1, "rgba(255, 123, 31, 0)");

        this.ctx.fillStyle = bandGlow;
        this.ctx.beginPath();
        this.ctx.ellipse(0, 0, diskRadius, diskRadius * 0.9, 0, 0, Math.PI * 2);
        this.ctx.fill();

        const ringOffsets = [0.96, 1.18, 1.36];
        ringOffsets.forEach((multiplier, index) => {
            this.ctx.beginPath();
            this.ctx.lineWidth = 4 - index * 0.8;
            this.ctx.strokeStyle = `rgba(255, 214, 145, ${0.12 - index * 0.02})`;
            this.ctx.shadowColor = "rgba(255, 170, 80, 0.3)";
            this.ctx.shadowBlur = 24;
            this.ctx.ellipse(
                0,
                0,
                this.getInnerRadius() * (multiplier + Math.sin(time * 0.6 + index) * 0.02),
                this.getInnerRadius() * (multiplier + Math.sin(time * 0.6 + index) * 0.02),
                0,
                0,
                Math.PI * 2
            );
            this.ctx.stroke();
        });

        this.ctx.restore();
    }

    private drawDiskParticles(time: number, center: Point, frontLayer: boolean): void {
        this.ctx.save();
        this.ctx.translate(center.x, center.y);
        this.ctx.scale(1, 0.34);
        this.ctx.globalCompositeOperation = "screen";

        for (const particle of this.diskParticles) {
            const isFront = Math.sin(particle.angle) >= 0;

            if (isFront !== frontLayer) {
                continue;
            }

            const radius = particle.radius + Math.sin(time * 1.4 + particle.phase) * particle.wobble;
            const x = Math.cos(particle.angle) * radius;
            const y = Math.sin(particle.angle) * radius;
            const brightness = 0.5 + particle.heat * 0.5;
            const coreAlpha = particle.alpha * (0.6 + Math.sin(time * 2 + particle.phase) * 0.14);
            const glowAlpha = particle.alpha * (0.22 + brightness * 0.34);

            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, particle.size * (3.6 + brightness * 2));
            gradient.addColorStop(0, `rgba(255, 252, 240, ${coreAlpha})`);
            gradient.addColorStop(0.35, `rgba(255, ${210 - particle.heat * 34}, ${125 - particle.heat * 22}, ${glowAlpha})`);
            gradient.addColorStop(1, "rgba(255, 110, 20, 0)");

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.ellipse(
                x,
                y,
                particle.size * (2 + brightness * 1.5),
                particle.size,
                particle.angle + Math.PI / 2,
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    private drawInfallParticles(center: Point): void {
        this.ctx.save();
        this.ctx.globalCompositeOperation = "screen";

        for (const particle of this.infallParticles) {
            const point = {
                x: center.x + Math.cos(particle.angle) * particle.radius,
                y: center.y + Math.sin(particle.angle) * particle.radius * particle.tilt
            };

            this.ctx.beginPath();
            this.ctx.strokeStyle = `rgba(255, 209, 145, ${particle.alpha * 0.42})`;
            this.ctx.lineWidth = particle.size * 0.65;
            this.ctx.moveTo(particle.prevX, particle.prevY);
            this.ctx.lineTo(point.x, point.y);
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(255, 243, 224, ${particle.alpha})`;
            this.ctx.arc(point.x, point.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    private drawPhotonRing(center: Point, intensity: number): void {
        this.ctx.save();
        this.ctx.translate(center.x, center.y);
        this.ctx.scale(1, 0.62);
        this.ctx.beginPath();
        this.ctx.lineWidth = Math.max(2, this.getInnerRadius() * 0.09);
        this.ctx.strokeStyle = `rgba(255, 234, 200, ${0.48 * intensity})`;
        this.ctx.shadowColor = "rgba(255, 185, 95, 0.4)";
        this.ctx.shadowBlur = 20;
        this.ctx.ellipse(0, 0, this.getInnerRadius() * 1.08, this.getInnerRadius() * 1.08, 0, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.restore();
    }

    private drawEventHorizon(center: Point): void {
        const shadow = this.ctx.createRadialGradient(
            center.x,
            center.y,
            this.getInnerRadius() * 0.1,
            center.x,
            center.y,
            this.getInnerRadius() * 2.2
        );

        shadow.addColorStop(0, "rgba(0, 0, 0, 1)");
        shadow.addColorStop(0.42, "rgba(0, 0, 0, 1)");
        shadow.addColorStop(0.74, "rgba(2, 4, 10, 0.82)");
        shadow.addColorStop(1, "rgba(2, 4, 10, 0)");

        this.ctx.fillStyle = shadow;
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, this.getInnerRadius() * 2.2, 0, Math.PI * 2);
        this.ctx.fill();

        this.ctx.fillStyle = "#000000";
        this.ctx.beginPath();
        this.ctx.arc(center.x, center.y, this.getInnerRadius(), 0, Math.PI * 2);
        this.ctx.fill();
    }

    private drawHaloParticles(time: number, center: Point): void {
        this.ctx.save();
        this.ctx.globalCompositeOperation = "screen";

        for (const particle of this.haloParticles) {
            const wobble = 1 + Math.sin(time * 1.6 + particle.phase) * 0.05;
            const point = {
                x: center.x + Math.cos(particle.angle) * particle.radius * wobble,
                y: center.y + Math.sin(particle.angle) * particle.radius * 0.38 * wobble
            };

            this.ctx.beginPath();
            this.ctx.fillStyle = `rgba(255, 216, 160, ${particle.alpha})`;
            this.ctx.arc(point.x, point.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        }

        this.ctx.restore();
    }

    private drawOuterVignette(center: Point): void {
        const vignette = this.ctx.createRadialGradient(
            center.x,
            center.y,
            this.getDiskRadius() * 0.75,
            this.width * 0.5,
            this.height * 0.5,
            Math.max(this.width, this.height) * 0.78
        );

        vignette.addColorStop(0, "rgba(0, 0, 0, 0)");
        vignette.addColorStop(0.72, "rgba(0, 0, 0, 0.16)");
        vignette.addColorStop(1, "rgba(0, 0, 0, 0.52)");

        this.ctx.fillStyle = vignette;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
}

function renderMetrics(): void {
    const container = getOptionalElementById<HTMLDivElement>("heroMetrics");

    if (!container) {
        return;
    }

    container.innerHTML = homeMetrics
        .map(
            (item) => `
                <article class="metric-card">
                    <span class="metric-value">${item.value}</span>
                    <span class="metric-label">${item.label}</span>
                    <span class="metric-note">${item.note}</span>
                </article>
            `
        )
        .join("");
}

function renderTimeline(): void {
    const container = getOptionalElementById<HTMLDivElement>("timelineGrid");

    if (!container) {
        return;
    }

    container.innerHTML = timelineItems
        .map(
            (item) => `
                <article class="timeline-card" data-reveal>
                    <span class="timeline-phase">${item.phase}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </article>
            `
        )
        .join("");
}

function renderCollections(): void {
    const container = getOptionalElementById<HTMLDivElement>("contentGrid");

    if (!container) {
        return;
    }

    container.innerHTML = collectionItems
        .map(
            (item) => `
                <article class="collection-card" data-reveal>
                    <span class="collection-category">${item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                    <span class="collection-meta">${item.meta}</span>
                </article>
            `
        )
        .join("");
}

function renderSessions(): void {
    const container = getOptionalElementById<HTMLDivElement>("sessionGrid");

    if (!container) {
        return;
    }

    container.innerHTML = sessionItems
        .map(
            (item) => `
                <article class="session-card" data-reveal>
                    <span class="session-label">${item.label}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </article>
            `
        )
        .join("");
}

function setupFactCards(): void {
    const musicButton = getOptionalElementById<HTMLButtonElement>("btnMusica");
    const astronomyButton = getOptionalElementById<HTMLButtonElement>("btnPlaneta");
    const connectionButton = getOptionalElementById<HTMLButtonElement>("btnConexao");

    if (musicButton) {
        musicButton.addEventListener("click", mostrarMusica);
        mostrarMusica();
    }

    if (astronomyButton) {
        astronomyButton.addEventListener("click", mostrarPlaneta);
        mostrarPlaneta();
    }

    if (connectionButton) {
        connectionButton.addEventListener("click", mostrarConexao);
        mostrarConexao();
    }
}

function highlightCurrentNavigation(): void {
    const currentPage = document.body.dataset.page;

    if (!currentPage) {
        return;
    }

    document.querySelectorAll<HTMLAnchorElement>("[data-nav]").forEach((link) => {
        if (link.dataset.nav === currentPage) {
            link.setAttribute("aria-current", "page");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

function setupRevealAnimations(): void {
    const revealElements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (revealElements.length === 0) {
        return;
    }

    const observer = new IntersectionObserver(
        (entries, currentObserver) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    currentObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -10% 0px"
        }
    );

    revealElements.forEach((element) => observer.observe(element));
}

function setFooterYear(): void {
    const footerYear = getOptionalElementById<HTMLSpanElement>("footerYear");

    if (footerYear) {
        footerYear.textContent = String(new Date().getFullYear());
    }
}

document.addEventListener("DOMContentLoaded", () => {
    renderMetrics();
    renderTimeline();
    renderCollections();
    renderSessions();
    setupFactCards();
    highlightCurrentNavigation();
    setupRevealAnimations();
    setFooterYear();

    const canvas = getOptionalElementById<HTMLCanvasElement>("blackhole");

    if (canvas) {
        const background = new BlackHoleBackground(canvas);
        background.start();
    }
});
