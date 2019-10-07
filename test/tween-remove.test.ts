import { Application, Container } from "pixi.js";
import { Tweener } from "../src/tweener";

test('Tween is removed', async () => {
    const app = new Application();
    Tweener.init(app.ticker);

    const container1 = new Container();

    app.stage.addChild(container1);

    const tween1 = Tweener.add({ target: container1, duration: 10 }, { alpha: 0 });
    jest.useRealTimers();
    setTimeout(() => {
        Tweener.killTweensOf(tween1);
        expect(Tweener.tweening()).toBe(false);
    }, 100);
});
