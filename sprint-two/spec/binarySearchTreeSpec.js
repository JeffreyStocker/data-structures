describe('binarySearchTree', function() {
  var binarySearchTree;

  beforeEach(function() {
    binarySearchTree = BinarySearchTree(5);
  });

  it('should have methods named "insert", "contains", and "depthFirstLog', function() {
    expect(binarySearchTree.insert).to.be.a('function');
    expect(binarySearchTree.contains).to.be.a('function');
    expect(binarySearchTree.depthFirstLog).to.be.a('function');
  });

  it.only('should insert values at the correct location in the tree', function() {

    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(6);
    expect(binarySearchTree.left.right.value).to.equal(3);
    expect(binarySearchTree.right.left.value).to.equal(6);
  });

  it('should have a working "contains" method', function() {
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect(binarySearchTree.contains(7)).to.equal(true);
    expect(binarySearchTree.contains(8)).to.equal(false);
  });

  it('should execute a callback on every value in a tree using "depthFirstLog"', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.depthFirstLog(func);
    expect(array).to.eql([5, 2, 3, 7]);
  });
  
  it ('should return the correct node when tranversing the table', function () {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    expect (binarySearchTree.traversal(7).value).to.eql(7);
  });
  
  it('should execute a callback on every value in a tree using "breadthFirstLog"', function() {
    var array = [];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(3);
    binarySearchTree.insert(2);
    binarySearchTree.insert(4);
    binarySearchTree.insert(8);
    binarySearchTree.insert(7);
    binarySearchTree.insert(9);
    binarySearchTree.breadthFirstLog(func);
    expect(array).to.eql([5, 3, 8, 2, 4, 7, 9]);
  });
    
  ////not yet used 
  //// will be used when implementing rebalance
  it('should isresizeNeeded return proper true or false as needed', function() {
    binarySearchTree.insert(3);
    binarySearchTree.insert(2);
    binarySearchTree.insert(4);
    binarySearchTree.insert(8);
    binarySearchTree.insert(7);
    binarySearchTree.insert(10);
    binarySearchTree.insert(11);
    // var BSTResizeNeededFalse = JSON.parse('{"value":5,"left":{"value":3,"left":{"value":2,"left":null,"right":null},"right":{"value":4,"left":null,"right":null}},"right":{"value":8,"left":{"value":7,"left":null,"right":null},"right":{"value":10,"left":null,"right":{"value":11,"left":null,"right":null}}},"minDepth":0,"maxDepth":0,"depthArray":[],"depthTracker":0,"maxdepth":3}');
    // console.log ('string :' + JSON.stringify(binarySearchTree));


    var test = binarySearchTree.isResizeNeeded(false);
    expect(test).to.equal(false);
    
    binarySearchTree.insert(12);
    binarySearchTree.insert(13);
    binarySearchTree.insert(14);
    binarySearchTree.insert(15);
    binarySearchTree.insert(16);
    binarySearchTree.insert(17);
    binarySearchTree.insert(18);
    // var BSTResizeNeededTrue = JSON.parse('{"value":5,"left":{"value":3,"left":{"value":2,"left":null,"right":null},"right":{"value":4,"left":null,"right":null}},"right":{"value":8,"left":{"value":7,"left":null,"right":null},"right":{"value":10,"left":null,"right":{"value":11,"left":null,"right":{"value":12,"left":null,"right":{"value":13,"left":null,"right":{"value":14,"left":null,"right":{"value":15,"left":null,"right":{"value":16,"left":null,"right":null}}}}}}}},"minDepth":0,"maxDepth":0,"depthArray":[],"depthTracker":0,"maxdepth":8}');

    var test = binarySearchTree.isResizeNeeded(true);
    expect(test).to.equal(true);
  });

  it ('should return the correct node when tranversing with callback and invoking a callback ', function () {
    var array = [];
    var expectdArray = [7];
    var func = function(value) { array.push(value); };
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.find(7, func);
    expect (array).to.eql(expectdArray);
  });

  it ('should return the correct depth when tranversing with callback and invoking a callback ', function () {
    var array = [];
    var expectdArray = [2, 3, 4, 1];
    var func = function(value, notused, depth) { array.push(depth); };
    //1st node = 5
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(9);
    binarySearchTree.insert(10);
    binarySearchTree.find(7, func);
    
    binarySearchTree.find(9, func);
    binarySearchTree.find(10, func);
    binarySearchTree.find(5, func);
    expect (array).to.eql(expectdArray);
  });

  it ('should return the value of each node that gets called with the function each', function () {
    var array = [];
    var expectdArray = [5, 2, 3, 7, 9, 10];
    var func = function(value, notused, depth) { array.push(value); };
    //1st node = 5
    binarySearchTree.insert(2);
    binarySearchTree.insert(3);
    binarySearchTree.insert(7);
    binarySearchTree.insert(9);
    binarySearchTree.insert(10);
    binarySearchTree.each(func);

    expect (array).to.eql(expectdArray);

  });
  
});
