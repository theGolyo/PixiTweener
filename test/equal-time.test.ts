import { Application, Container } from "pixi.js";
import { Tweener } from "../src/tweener";

test('Tweens finish at the same time', async () => {
    const app = new Application();
    Tweener.init(app.ticker);
    
    const container1 = new Container();
    const container2 = new Container();
    
    app.stage.addChild(container1, container2);

    const tween1 = Tweener.add({ target: container1, duration: 1 }, { alpha: 0 });
    const tween2 = Tweener.add({ target: container2, duration: 1 }, { alpha: 0 });
    const [time1, time2] = await Promise.all([
        tween1.then(() => Date.now()), 
        tween2.then(() => Date.now())
    ]);
    expect(time1).toEqual(time2);
});
