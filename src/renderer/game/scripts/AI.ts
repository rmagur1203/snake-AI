import { Component, GameObject, Transform } from 'the-world-engine';

export class AIController extends Component {
  private snakeHead?: GameObject;
  private snakeNeck?: GameObject;
  private snakeSegments: GameObject[] = [];
  private item?: GameObject;
  private gameScene?: Transform;

  get score() {
    return this.snakeSegments.length;
  }

  public updateObjects() {
    this.snakeHead = undefined;
    this.snakeNeck = undefined;
    this.snakeSegments = [];
    this.item = undefined;
    this.gameScene = undefined;
    this.engine.scene.iterateChild((scene) => {
      if (scene.gameObject.name === 'gamescene') {
        this.gameScene = scene;
        scene.iterateChild((transform) => {
          switch (transform.gameObject.name) {
            case 'snake':
              this.snakeHead = transform.gameObject;
              break;
            case 'neck':
              this.snakeNeck = transform.gameObject;
              break;
            case 'segment':
              this.snakeSegments.push(transform.gameObject);
              break;
            case 'item':
              this.item = transform.gameObject;
              break;
            default:
              break;
          }
          return true;
        });
      }
      return true;
    });
  }

  // public awake() {
  //   this.updateObjects();
  // }

  public update() {
    this.snakeSegments =
      this.gameScene?.children
        .filter((transform) => transform.gameObject.name === 'segment')
        .map((transform) => transform.gameObject) || [];

    console.log(this.score);
  }
}
