import Initializer from './Initializer';

window.addEventListener('load', init, false);

function init(e) {
  (new Initializer('game')).init();
}
