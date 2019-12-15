[![CircleCI](https://circleci.com/gh/theGolyo/PixiTweener.svg?style=svg)](https://circleci.com/gh/theGolyo/PixiTweener)

A lightweight tweener using Pixi's built in ticker.

## Installation

    npm install pixi-tweener

The library is exposed as an UMD module. If loaded directly with a `<script>` tag, it can be accessed under `pixiTweener.Tweener` and `pixiTweener.Easing`. 

## Usage

```
import { Tweener, Easing } from "pixi-tweener";

// ...

Tweener.init(app.ticker);

await Tweener.add({ target: bunnySprite, duration: 3, ease: Easing.easeInOutCubic }, { x: 100, alpha: 0.5});
```

## Api

### Tweener.init
Registers the tweener on a ticker. Dispose must be called before another init() call.
```
static init(ticker: Ticker): void;
```

### Tweener.dispose
```
static dispose(): void;
```
Unregisters the tweener from the ticker.

### Tweener.add
Adds a new tween to the tweener, returns a promise that fulfills when the tween completes. Tweens start automatically.
```
static add<T extends P, P extends TweenProps>(tweenParams: {
        target: T;
        context?: any;
        duration: number;
        delay?: number;
        ease?: (t: number) => number;
        onUpdate?: (t: number) => void;
    }, props: P): Promise<void>;
```

### Tweener.killTweensOf
Stop all tweens on the target context, optional parameter to skip fulfilling the promises. Context can be any object used in the creation of the tween, that can be shared by multiple tweens. By default it is the target of the tween.
```
static killTweensOf(context: any, skipComplete?: boolean) 
```
### Tweener.tweening
Returns true if there are any active tweens.
```
static tweening(): boolean;
```
