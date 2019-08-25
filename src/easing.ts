export class Easing {
    public static linear = (pos: number) => pos;

    public static easeInQuad = (pos: number) => Math.pow(pos, 2);

    public static easeOutQuad = (pos: number) => -(Math.pow(pos - 1, 2) - 1);

    public static easeInOutQuad = (pos: number) =>
        (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 2) : -0.5 * ((pos -= 2) * pos - 2);

    public static easeInCubic = (pos: number) => Math.pow(pos, 3);

    public static easeOutCubic = (pos: number) => Math.pow(pos - 1, 3) + 1;

    public static easeInOutCubic = (pos: number) =>
        (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 3) : 0.5 * (Math.pow(pos - 2, 3) + 2);

    public static easeInQuart = (pos: number) => Math.pow(pos, 4);

    public static easeOutQuart = (pos: number) => -(Math.pow(pos - 1, 4) - 1);

    public static easeInOutQuart = (pos: number) =>
        (pos /= 0.5) < 1
            ? 0.5 * Math.pow(pos, 4)
            : -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);

    public static easeInQuint = (pos: number) => Math.pow(pos, 5);

    public static easeOutQuint = (pos: number) => Math.pow(pos - 1, 5) + 1;

    public static easeInOutQuint = (pos: number) =>
        (pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 5) : 0.5 * (Math.pow(pos - 2, 5) + 2);

    public static easeInSine = (pos: number) => -Math.cos(pos * (Math.PI / 2)) + 1;

    public static easeOutSine = (pos: number) => Math.sin(pos * (Math.PI / 2));

    public static easeInOutSine = (pos: number) => -0.5 * (Math.cos(Math.PI * pos) - 1);

    public static easeInExpo = (pos: number) => (pos === 0 ? 0 : Math.pow(2, 10 * (pos - 1)));

    public static easeOutExpo = (pos: number) => (pos === 1 ? 1 : -Math.pow(2, -10 * pos) + 1);

    public static easeInOutExpo = (pos: number) => {
        if (pos === 0) {
            return 0;
        }

        if (pos === 1) {
            return 1;
        }

        if ((pos /= 0.5) < 1) {
            return 0.5 * Math.pow(2, 10 * (pos - 1));
        }

        return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
    };

    public static easeInCirc = (pos: number) => -(Math.sqrt(1 - pos * pos) - 1);

    public static easeOutCirc = (pos: number) => Math.sqrt(1 - Math.pow(pos - 1, 2));

    public static easeInOutCirc = (pos: number) =>
        (pos /= 0.5) < 1
            ? -0.5 * (Math.sqrt(1 - pos * pos) - 1)
            : 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);

    public static easeOutBounce = (pos: number) => {
        if (pos < 1 / 2.75) {
            return 7.5625 * pos * pos;
        } else if (pos < 2 / 2.75) {
            return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
        } else if (pos < 2.5 / 2.75) {
            return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
        } else {
            return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
        }
    };

    public static easeInBack = (pos: number) => {
        const s = 1.70158;
        return pos * pos * ((s + 1) * pos - s);
    };

    public static easeOutBack = (pos: number) => {
        const s = 1.70158;
        return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
    };

    public static easeInOutBack = (pos: number) => {
        let s = 1.70158;
        if ((pos /= 0.5) < 1) {
            return 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s));
        }
        return 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
    };

    public static elastic = (pos: number) =>
        -1 * Math.pow(4, -8 * pos) * Math.sin(((pos * 6 - 1) * (2 * Math.PI)) / 2) +
        1;

    public static swingFromTo = (pos: number) => {
        let s = 1.70158;
        return (pos /= 0.5) < 1
            ? 0.5 * (pos * pos * (((s *= 1.525) + 1) * pos - s))
            : 0.5 * ((pos -= 2) * pos * (((s *= 1.525) + 1) * pos + s) + 2);
    };

    public static swingFrom = (pos: number) => {
        const s = 1.70158;
        return pos * pos * ((s + 1) * pos - s);
    };

    public static swingTo = (pos: number) => {
        const s = 1.70158;
        return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
    };

    public static bounce = (pos: number) => {
        if (pos < 1 / 2.75) {
            return 7.5625 * pos * pos;
        } else if (pos < 2 / 2.75) {
            return 7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75;
        } else if (pos < 2.5 / 2.75) {
            return 7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375;
        } else {
            return 7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375;
        }
    };

    public static bouncePast = (pos: number) => {
        if (pos < 1 / 2.75) {
            return 7.5625 * pos * pos;
        } else if (pos < 2 / 2.75) {
            return 2 - (7.5625 * (pos -= 1.5 / 2.75) * pos + 0.75);
        } else if (pos < 2.5 / 2.75) {
            return 2 - (7.5625 * (pos -= 2.25 / 2.75) * pos + 0.9375);
        } else {
            return 2 - (7.5625 * (pos -= 2.625 / 2.75) * pos + 0.984375);
        }
    };

    public static easeFromTo = (pos: number) =>
        (pos /= 0.5) < 1
            ? 0.5 * Math.pow(pos, 4)
            : -0.5 * ((pos -= 2) * Math.pow(pos, 3) - 2);

    public static easeFrom = (pos: number) => Math.pow(pos, 4);

    public static easeTo = (pos: number) => Math.pow(pos, 0.25);
}
