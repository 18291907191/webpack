import React,{ Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Nav, Link } from 'react-router-dom';
export default class App extends Component {
  render() {
    return (
      <div>这里是App组件</div>
    )
  }
  componentDidMount() {
    console.log('aaaaaaa');
    axios.get("/mock/listmore.json?pageNo=2&pageSize=15").then(({data}) => {
      console.log(data);
    })
  }
}