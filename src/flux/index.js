import { Application } from 'marty';
import * as actions from './actions';
import * as queries from './queries';
import * as stores from './stores';
//import * as sources from './sources';
//import Api from './api';

export default class Flux extends Application {
  constructor(options) {
    super(options);

//    this.register(sources);
//    this.register('api', Api);
    this.register(actions);
    this.register(queries);
    this.register(stores);
  }
}
