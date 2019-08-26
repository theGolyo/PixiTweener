A lightweight tweener using Pixi's built in ticker.

## Installation

    npm install pixi-tweener

## Usage

```
import { Tweener, Easing } from "pixi-tweener";

// ...

Tweener.init(app.ticker);
await Tweener.add({ target: bunnySprite, duration: 3, ease: Easing.easeInOutCubic }, 
                  { x: 100, alpha: 0.5});
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
        duration: number;
        delay?: number;
        ease?: (t: number) => number;
        onUpdate?: (t: number) => void;
    }, props: P): Promise<void>;
```

### Tweener.killTweensOf
Stop all tweens on the target, optional parameter to skip fulfilling the promises.
```
static killTweensOf(target: any, skipComplete: boolean): void;
```
### Tweener.tweening
Returns true if there are any active tweens.
```
static tweening(): boolean;
```
