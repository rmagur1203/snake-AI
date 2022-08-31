import {
  Bootstrapper as BaseBootstrapper,
  Physics2DLoader,
  SceneBuilder,
} from 'the-world-engine';
import { Vector3 } from 'three/src/Three';
import GameScene from './prefab/gamescene';
import { AIController } from './scripts/AI';

export class Bootstrapper extends BaseBootstrapper {
  public run(): SceneBuilder {
    this.setting.physics.loader(Physics2DLoader);

    return this.sceneBuilder
      .withChild(this.instantiater.buildPrefab('gamescene', GameScene).make())
      .withChild(
        this.instantiater
          .buildGameObject('AI', new Vector3(0, 0, 0))
          .withComponent(AIController)
      );
  }
}
