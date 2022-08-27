/* eslint-disable no-underscore-dangle */
import {
  Collider2D,
  Component,
  CoroutineIterator,
  GameObject,
  Transform,
  WaitForSeconds,
} from 'the-world-engine';
import { Vector2 } from 'three';
import GameScene from '../prefab/gamescene';
import { SnakeSegment } from '../prefab/SnakeSegment';

export default class SnakeController extends Component {
  public mapCollider2D?: Collider2D;

  private _moveTime = 0.1;
  private _moveDirection = new Vector2(1, 0);
  private _lastInputDirection = new Vector2(1, 0);

  private _spawnSegmentCountAtStart: number = 4;
  private _segments: Transform[] = [];

  private onTriggerEnter2D(collision: Collider2D) {
    if (collision.gameObject.name === 'item') {
      this.spawnSegment();
    }
    if (collision.gameObject.name === 'segment') {
      console.log('You lose');
      this.engine.scene.addChildFromBuilder(
        this.engine.instantiater.buildPrefab('gamescene', GameScene).make()
      );
      this.engine.scene.children[0].gameObject.destroy();
    }
  }

  public awake() {
    this._segments.push(this.transform);

    for (let i = 0; i < this._spawnSegmentCountAtStart; i += 1) {
      this.spawnSegment();
    }

    this.startCoroutine(this.move());
  }

  private spawnSegment() {
    const segment: GameObject = this.engine.scene.addChildFromBuilder(
      this.engine.instantiater.buildPrefab('segment', SnakeSegment).make()
    );
    const prev = this._segments[this._segments.length - 1].position;
    segment.transform.position.set(prev.x, prev.y, 0);
    this._segments.push(segment.transform);
  }

  private moveSegment() {
    this._moveDirection = this._lastInputDirection;

    for (let i = this._segments.length - 1; i > 0; i -= 1) {
      this._segments[i].position.x = this._segments[i - 1].position.x;
      this._segments[i].position.y = this._segments[i - 1].position.y;
    }

    const x = this.transform.position.x + this._moveDirection.x;
    const y = this.transform.position.y + this._moveDirection.y;
    this._segments[0].position.set(x, y, 0);
  }

  public *move(): CoroutineIterator {
    while (true) {
      this.moveSegment();

      yield new WaitForSeconds(this._moveTime);
    }
  }

  public update() {
    const inputMap = this.engine.input.map;
    if (this._moveDirection.x !== 0) {
      if (inputMap.get('ArrowUp')) this._lastInputDirection = new Vector2(0, 1);
      if (inputMap.get('ArrowDown'))
        this._lastInputDirection = new Vector2(0, -1);
    }
    if (this._moveDirection.y !== 0) {
      if (inputMap.get('ArrowLeft'))
        this._lastInputDirection = new Vector2(-1, 0);
      if (inputMap.get('ArrowRight'))
        this._lastInputDirection = new Vector2(1, 0);
    }
  }
}