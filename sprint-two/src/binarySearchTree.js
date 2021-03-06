var BinarySearchTree = function(value) {
  var bst = Object.create(BinarySearchTree.prototype);
  // bst[value] = BSTnode(value);
  // bst.rootNode = bst[value];
  
  //sets the bst as the first node with value, left, right
  bst.value = value;
  bst.left = null;
  bst.right = null;
  bst.minDepth = 0;
  bst.maxDepth = 0;
  bst.depthArray = [1];
  bst.depthTracker = 0;
  
  return bst;
};

BinarySearchTree.prototype.insert = function (value) {
  //refactoring to accrount for callback inside in the traversal function

  // create newNode with value
  var nodeToInsert = BSTnode(value);

  this.find (value, function (foundvalue, node, depth) { //get node to work on from helper function
    // console.log ('node to insert:', nodeToInsert);
    // var node = this.traversal(value); // val === node.value 
    if (nodeToInsert.value === node.value) { //node already exist!!
      console.debug('This node already exists'); //if value < root node and previousNode.left is null
    } else if (nodeToInsert.value < node.value) { // newNode is previousNode.left
      node.left = nodeToInsert;  //else (if value > root node) and previousNode.right is null
      this.adjustDepthArray(depth);
    } else if (nodeToInsert.value > node.value) {     // newNode is previousNode.right
      node.right = nodeToInsert;   // else can't find anything
      this.adjustDepthArray(depth);
    } else {    //console log error
      console.error('Can\'t find the correct place to put the node');
    }
  }.bind(this));
};

BinarySearchTree.prototype.adjustDepthArray = function (depth) {
  //adjusts the deptharray;
  if (this.depthArray [depth + 1 ]) {
    this.depthArray [depth + 1 ] += 1;
  } else {
    this.depthArray [depth + 1 ] = 1;
  }

  if (depth > this.maxDepth) {
    this.maxDepth = depth;
    this.isResizeNeeded() && this.rebalance(); //if true then rebalance the array
  }
};

BinarySearchTree.prototype.rebalance = function () {

  var oldBts = this.bts;
  var storageOfEachItem = [];
  // go through each item in the seach Node
    //while doing this, remove the links left and right to the node
  // 
  var nodes = this.each(function (value, node, depth) {

  });


};

BinarySearchTree.prototype.insertOldNoCallbackInvoked = function (value) {
   
  // create newNode with value
  var nodeToInsert = BSTnode(value);
  //get node to work on from helper function
  var foundNode = this.traversal(value);
  // val === node.value 
  if (nodeToInsert.value === foundNode.value) {
    //node already exist!!
    console.debug('This node already exists');
  //if value < root node and previousNode.left is null
  } else if (nodeToInsert.value < foundNode.value) {
    // newNode is previousNode.left
    foundNode.left = nodeToInsert;
  //else (if value > root node) and previousNode.right is null
  } else if (nodeToInsert.value > foundNode.value) {
    // newNode is previousNode.right
    foundNode.right = nodeToInsert;
  // else can't find anything
  } else {
    //console log error
    console.error('Can\'t find the correct place to put the node');
  }
};

BinarySearchTree.prototype.contains = function (value) {
  // use the traverse helper function and evaluate if it return the value
  if (this.traversal(value).value === value) {
    //return true
    return true;
  }
  //return false
  return false;
};

BinarySearchTree.prototype.depthFirstLog = function (callback, current) {
  // sets current to this or passed in value
  current = current || this;
  // callback the node
  callback(current.value);
  //if there is a left
  if (current.left) {
    // recoursive the left branch
    this.depthFirstLog(callback, current.left);
  }
  //if there is a right branch
  if (current.right) {
    //recoursive the right branch
    this.depthFirstLog(callback, current.right);
  }
};

BinarySearchTree.prototype.breadthFirstLog = function (callback, current) {
  // make a queue array with the root node as it's only value
  // while the queue isn't empty
  // set store var to unshift of queue (index 0)
  // callback on the store var
  // if store var has a left, push to queue
  // if store var has a right, push to queue

  var queue = [this];
  
  while (queue.length) { // may need queue.lentgh > 0
    var currentNode = queue.shift();
    callback (currentNode.value);
    if (currentNode.left) {
      queue.push(currentNode.left);
    }
    if (currentNode.right) {
      queue.push(currentNode.right);
    }
  }
};

BinarySearchTree.prototype.each = function (callback, current, depth) {



  //sets current as a passed in value or this
  current = current || this;

  //callback on each node
  callback(current.value, current, depth);
  
  //if the value is less than node and left isn't empty
  if (current.left) {
    // recoursive into the left nodeS
    this.each(callback, current.left, depth + 1);
  // if the value is greater than ndoe and right isn't empty
  }
  if (current.right) {
    //recousive into the right now
    this.each(callback, current.right, depth + 1);
  }
};

BinarySearchTree.prototype.traversal = function (value, current, depth = 0) {
  //sets current as a passed in value or this
  current = current || this;
  //sets the tracker to false
  var foundNode = false;
  
  //if the value is less than node and left isn't empty
  if (value < current.value && current.left !== null) {
    // recoursive into the left node
    this.depthTracker = this.depthTracker < depth + 1;
    foundNode = this.traversal(value, current.left);
  // if the value is greater than ndoe and right isn't empty
  } else if (value > current.value && current.right !== null) {
    //recousive into the right now
    foundNode = this.traversal(value, current.right);
  //else 
  } else {
    // set the tracker as the current node
    foundNode = current;
  }
  
  //return the tracker, to allow the information to go backup the recoursive
  return foundNode;
};

//// this is not done, it is a orphin function right now
//// needs to be incorperated into resizing the binary tree
BinarySearchTree.prototype.isResizeNeeded = function() {
  // use detphArray to determine if resize needed
  var depthArray = this.depthArray;
  // depthArray = [1, 2, 4, 1, 1, 1, 1, 1];
  var minDepth = 0;
  for (var i = 0; i < depthArray.length; i++) {
    if (depthArray[i] < Math.pow(2, i) || i === depthArray.length - 1) {
      minDepth = i + 1;
      break;
    }
  }
  if (Math.floor(depthArray.length) > Math.floor(minDepth) * 2) {
    return true;
  }
  return false;
};


BinarySearchTree.prototype.find = function (value, callback, current, depth = 1) {
  //// a refactored version of traverse that wil be utalizing a callback function
  
  //sets current as a passed in value or this

  current = current || this;
  // console.log (`${current.value} & ${depth}`);
  
  //if the value is less than node and left isn't empty
  if (value < current.value && current.left) {
    // recoursive into the left nodeS
    this.find(value, callback, current.left, depth + 1);
  // if the value is greater than ndoe and right isn't empty
  } else if (value > current.value && current.right !== null) {
    //recousive into the right now
    this.find(value, callback, current.right, depth + 1);
  //if is correct node
  } else {
    // calls callback
    // callback(current.value, value, current, depth);
    callback(current.value, current, depth);
  }
  
  //invokes the callback, to allow the information to go backup the recoursive
  // return foundNode;
};



var BSTnode = function (value) {
  var node = {};
  
  //each node will have a value, right and left
  node.value = value;
  node.left = null;
  node.right = null;
  
  return node;
};

/*
 * Complexity: What is the time complexity of the above functions?
 * insert: O(1) - note we used traversal for this
 * contains: O(1) - note we used traversal for this
 * depthFirstLog: O(n)
 * breadthFirstLog: O(n)
 * travesal: O(log n)
 */
