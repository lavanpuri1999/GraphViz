import './App.css';
import React,{useState,useEffect} from 'react';
import BinaryTree from './components/binarytree';

function App() {

  const [slideState,changeSlideDir] = useState('');

  return (
    <div className="App">
      <div className={"headernav"}>
        <div className={"tabcontainer"}>
          <button className={"headertab"} onClick={() => changeSlideDir('slideanim2')}>Binary Tree</button>
          <button className={"headertab"} onClick={() => changeSlideDir('slideanim1')}>Binary Search Tree</button>
        </div>
        <div className={`sliderbar ${slideState}`}></div>
      </div>
      <div>
      <BinaryTree />
      </div>
    </div>
  );
}

export default App;
