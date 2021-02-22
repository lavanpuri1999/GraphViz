import '../App.css';
import React,{useState,useEffect} from 'react';

class Tree {
  constructor(data){
    this.val = data;
    this.left = null;
    this.right = null;
  }
}

let preIndex = 0;

function createTree(preOrder,inOrder,start,end){

  //console.log(start+ " " + end + " " + preIndex);
  if(start>end) return null;

  let root = new Tree(preOrder[preIndex++]);

  if(start===end) return root;

  let inIndex = search(inOrder,start,end,root.val);
  root.left = createTree(preOrder,inOrder,start,inIndex-1);
  root.right = createTree(preOrder,inOrder,inIndex+1,end);

  return root;

}

function search(inOrder,start,end,value){
  let i;
  for(i=start;i<=end;i++) {
    if(inOrder[i]===value) return i;
  }
}

function BinaryTree() {

  const [inOrder ,changeinOrder] = useState('');
  const [preOrder , changepreOrder ] = useState('');
  const [treeArray , assignTree ] = useState([]);
  const [treeMap, assignMap ] = useState(new Map());
  const [items, assignItems] = useState([]);
  let tree2DArray = [];
  
  //let lvl = 0;
  //const items = [];

  const constructIntitialTree = () => {
      var inOrderArray = inOrder.split(' ');
      var preOrderArray = preOrder.split(' ');
      
      let root = createTree(preOrderArray,inOrderArray,0,preOrderArray.length-1);
      assignItems([]);
      preIndex = 0;
      tree2DArray = [];
      
      let arr = []; //Array being used for level order traversal of the tree
      let levelArray = []; //Array being used to store temporary levels of tree

      arr.push(root);
      levelArray.push(root.val);
      arr.push(-1);
      tree2DArray.push(levelArray);
      levelArray = [];

      while(arr.length){
        let node = arr[0];
        //console.log(node.val);

        let child = [];
        arr.splice(0,1); 
        if(node.left!=null) { arr.push(node.left); levelArray.push(node.left.val);  child.push(node.left.val); }
        if(node.right!=null) { arr.push(node.right); levelArray.push(node.right.val); child.push(node.right.val); }

        if(child.length>0) assignMap(new Map(treeMap.set(node.val,child)));

        if(arr[0]===-1) { 
          //console.log("nl"); 
          if(levelArray.length) tree2DArray.push(levelArray); 
          levelArray=[]; 
          arr.splice(0,1); 
          arr.push(-1); 
      }
        if(arr.length===1 && arr[0]===-1) { break; } 
      }

      //console.log(tree2DArray);
      assignTree(tree2DArray);
  };
 
  const createEdges = () => {

    console.log('Starting create edges');
    const temp = [];
    [...treeMap.keys()].map((key) => {
        treeMap.get(key).map((val) => {
        let n1x,n1y,n2x,n2y;
        console.log(document.getElementById(key));
        console.log(document.getElementById(val));
        if(document.getElementById(key)) {
        n1x = document.getElementById(key).getBoundingClientRect().x;
        n1y = document.getElementById(key).getBoundingClientRect().y;
        }
        if(document.getElementById(val)) {
        n2x = document.getElementById(val).getBoundingClientRect().x;
        n2y = document.getElementById(val).getBoundingClientRect().y; 
        }
        //console.log(n1x,n1y,n2x,n2y);
        temp.push(<line x1={n1x+25} y1={n1y} x2={n2x+25} y2={n2y} stroke="#EC407A" stroke-width="4"></line>);
      });
  })
    assignItems(temp);
    //ReactDOM.render(<line x1={n1x} y1={n1y} x2={n2x} y2={n2y} stroke="red"></line>, document.getElementById('svgEdgeContainer'));
  }

  useEffect(() => {
    if(treeArray.length>0 && items.length<=0) createEdges();
  });

  return (
    <div>
      
      <div className={"svgBox"}>
      <svg className={"svgCont"} id={"svgEdgeContainer"}>   
       {items}
      </svg>
      </div>
      <div className={"tabcontent"}>
        <div className={"inputbox"}>
          <div>Enter Inorder sequence of the tree with space seperated nodes, unique nodes only (Left, Parent, Right)</div>
          <input type="text" onChange={(e) => changeinOrder(e.target.value)}/>
          <div>Enter Preorder sequence of the tree with space seperated nodes, unique nodes only (Parent, Left, Right)</div>
          <input type="text" onChange={(e) => changepreOrder(e.target.value)}/>
          <button onClick={() => constructIntitialTree()}>Generate Tree</button>
        </div>

        <div className={"treecontainer"}>
        {
        treeArray.map(elem => {
        return <li className={"treelevel"}>{elem.map(node => <button className="treenode" id={node}>{node}</button>)}</li>
        })
        }
        </div>
      </div>
    </div>
  );
}

export default BinaryTree;
