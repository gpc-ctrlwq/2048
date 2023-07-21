import * as main from './main';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d');

main.init();

console.log(ctx);
