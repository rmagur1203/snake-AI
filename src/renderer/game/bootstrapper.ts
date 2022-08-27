import {
  Bootstrapper as BaseBootstrapper,
  Camera,
  CssSpriteRenderer,
  SceneBuilder,
} from 'the-world-engine';
import { Vector3 } from 'three';
import Rotator from './scripts/rotater';

export default class Bootstrapper extends BaseBootstrapper {
  public override run(): SceneBuilder {
    return this.sceneBuilder
      .withChild(
        this.instantiater
          .buildGameObject('camera', new Vector3(0, 0, 10))
          .withComponent(Camera, (c) => {
            c.viewSize = 5;
          })
      )

      .withChild(
        this.instantiater
          .buildGameObject('test_object')
          .withComponent(CssSpriteRenderer)
          .withComponent(Rotator)
      );
  }
}
