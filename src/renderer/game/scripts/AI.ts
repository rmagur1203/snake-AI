import { Component, GameObject, Transform } from 'the-world-engine';

export class AIController extends Component {
  private snakeHead?: GameObject;
  private snakeNeck?: GameObject;
  private snakeSegments: GameObject[] = [];
  private item?: GameObject;
  private gameScene?: Transform;

  public updateObjects() {
    this.snakeHead = undefined;
    this.snakeNeck = undefined;
    this.snakeSegments = [];
    this.item = undefined;
    this.gameScene = undefined;
    this.engine.scene.iterateChild((scene) => {
      console.log('find: ', scene.gameObject.name);
      if (scene.gameObject.name.startsWith('gamescene')) {
        scene.iterateChild((transform) => {
          console.log(transform.gameObject.name);
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
        return false;
      }
      return true;
    });
  }

  // public awake() {
  //   this.updateObjects();
  // }

  public update() {
    console.log(this.snakeHead?.transform.parent?.gameObject.name);
  }
}
