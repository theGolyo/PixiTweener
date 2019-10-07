import { Application, Container } from "pixi.js";
import { Tweener } from "../src/tweener";

test('Tween is removed', async () => {
    jest.useRealTimers();

    const app = new Application();
    Tweener.init(app.ticker);

    const container1 = new Container();
    const container2 = new Container();

    app.stage.addChild(container1);
    app.stage.addChild(container2);

    const ctx = Symbol();
    const tween1 = Tweener.add({ target: container1, duration: 10, context: ctx }, { alpha: 0 });
    const tween2 = Tweener.add({ target: container1, duration: 20, context: ctx }, { alpha: 0 });

    const startTime = performance.now();
    const delayMS = 1000;

    setTimeout(() => {
        Tweener.killTweensOf(ctx);
    }, delayMS);

    await Promise.all([tween1, tween2]);
    const removalTime = performance.now();
    expect(removalTime - startTime).toBeLessThanOrEqual(delayMS + 5);
});
