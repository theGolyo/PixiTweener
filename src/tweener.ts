import { Ticker } from "pixi.js";
import { Easing } from "./easing";

export class Tweener {
    private static ticker: Ticker;
    private static tweens: Tween<TweenProps, TweenProps>[] = [];
    private static update = () => Tweener.advance(Tweener.ticker.elapsedMS);

    public static init(ticker: any) {
        if (!Tweener.ticker) {
            Tweener.ticker = ticker;
            Tweener.ticker.add(Tweener.update);
        }
    }

    public static tweening() {
        return Tweener.tweens.length > 0;
    }

    public static dispose() {
        if (Tweener.ticker) {
            Tweener.ticker.remove(Tweener.update);
            (Tweener.ticker as unknown) = undefined;
            Tweener.tweens = [];
        }
    }
    
    public static add<T extends P, P extends TweenProps>(
        tweenParams: {
            target: T,
            context ?: any,
            duration: number,
            useTickForDuration?: boolean;
            delay?: number,
            ease?: (t: number) => number,
            onUpdate?: (t: number) => void
        }, props: P) {
        const target = tweenParams.target;
        const startingProps = Object.assign({}, ...Object.keys(props).map(key => ({ [key]: target[key] })));
        const propDeltas = Object.assign({}, ...Object.keys(props).map(key => ({ [key]: props[key] - startingProps[key] })));
        const duration = tweenParams.useTickForDuration ? tweenParams.duration : tweenParams.duration * 1000;
        return new Promise<void>(resolve => {
            const tween = {
                duration,
                useTickForDuration: tweenParams.useTickForDuration ? true : false,
                ease: tweenParams.ease || Easing.linear,
                target: tweenParams.target,
                delay: tweenParams.delay ? tweenParams.delay * 1000 : 0,
                currentTime: 0,
                props: props,
                propDeltas,
                startingProps,
                onComplete: resolve,
                onUpdate: tweenParams.onUpdate || undefined,
                context: tweenParams.context || target
            };
            Tweener.tweens.push(tween);
        });
    }

    public static killTweensOf(context: any, skipComplete?: boolean) {
        const filteredTweens: Tween<TweenProps, TweenProps>[] = [];
        Tweener.tweens.forEach(tween => {
            if (tween.context === context || tween.target === context) {
                !skipComplete && tween.onComplete();
            } else {
                filteredTweens.push(tween);
            }
        });
        Tweener.tweens = filteredTweens;
    }

    private static advance(elapsedMS: number) {
        let hasCompletedTween = false;
        for (const tween of Tweener.tweens) {
            // if tick count is used for tweening, each update call moved everything by 1 tick
            let elapsed = tween.useTickForDuration ? 1 : elapsedMS;
            if (tween.delay > 0) {
                tween.delay -= elapsed;
                if (tween.delay <= 0) {
                    elapsed = -tween.delay;
                } else {
                    continue;
                }
            }

            tween.currentTime += elapsed;
            const t = Math.min(1, tween.currentTime / tween.duration);
            const propDelta = tween.ease(t);
            for (const key of Object.keys(tween.props)) {
                tween.target[key] = tween.startingProps[key] + propDelta * tween.propDeltas[key];
            }
            if (tween.onUpdate) {
                tween.onUpdate(t);
            }
            if (tween.currentTime >= tween.duration) {
                tween.onComplete();
                hasCompletedTween = true;
            }
        }

        if (hasCompletedTween) {
            Tweener.tweens = Tweener.tweens.filter(tween => tween.currentTime < tween.duration);
        }
    }
}

interface Tween<T extends P, P extends TweenProps> {
    ease: (t: number) => number;
    useTickForDuration: boolean;
    duration: number;
    delay: number;
    currentTime: number;
    target: T;
    context: any;
    props: P;
    startingProps: P;
    propDeltas: P;
    onComplete: () => void;
    onUpdate?: (t: number) => void;
}

interface TweenProps {
    [key: string]: number;
}
