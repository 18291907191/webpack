// console.log('src->main.js');
// xhr.open('get','https://m.lagou.com/listmore.json?pageNo=2&pageSize=15');
// import axios from 'axios';
// axios.get('/m/listmore.json?pageNo=2&pageSize=15').then((data) => {
//   console.log(data);
// })
// import "./assets/css/index.css";
import './assets/sass/index.scss';
import GouWeiCao from './assets/img/gouweicao.jpg';
const myImg = new Image();
myImg.src = GouWeiCao;
document.body.appendChild(myImg);