export class PersistUntil implements ISystem {
    private system: ISystem
	private timer = 0;
	constructor(
        private checkIfTrue: () => boolean, 
        private interval: number = 0.5,
        private onDone: () => void, 
    ) {
        this.system = this;
        engine.addSystem(this.system);
    }
	public update(dt: number): void {
		this.timer += dt;
		if (this.timer > this.interval) {
			this.timer = 0;
			if (this.checkIfTrue()) {
				this.onDone();
				engine.removeSystem(this.system);
                log(`ZooTools: OnDone`)
			}
		}
	}
}