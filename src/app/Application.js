import config from '../config';
import EventEmitter from 'eventemitter3';
import { getPlanetsFromSwapi, getPlanets} from "./utils";




const EVENTS = {
  APP_READY: 'app_ready',
};

/**
 * App entry point.
 * All configurations are described in src/config.js
 */
export default class Application extends EventEmitter {
  constructor() {
    super();

    this.config = config;
    this.data = {};

    this.init();
  }

  static get events() {
    return EVENTS;
  }

  /**
   * Initializes the app.
   * Called when the DOM has loaded. You can initiate your custom classes here
   * and manipulate the DOM tree. Task data should be assigned to Application.data.
   * The APP_READY event should be emitted at the end of this method.
   */
  async init() {
    // Initiate classes and wait for async operations here.
  //   console.log("this may take a while ..");
  //   [this.data.count, this.data.planets] = await getPlanetsFromSwapi("https://swapi.dev/api/planets/",[]);
  //   console.log(this.data);
  //   // see utils for explenation of the getPlanetsFromSwapi function
  //   console.log("test");
  //  console.log("emitting ..")
 console.log(this.data);
 console.log("calling function ..");
  [this.data.count, this.data.planets] =  await getPlanets();
  console.log(this.data);
  this.emit(Application.events.APP_READY);
  }
}

