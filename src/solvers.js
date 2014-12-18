/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  var obj = {'n' : n};
  var board = new Board({'n':n});
  var piecesOnBoard = 0;
  
  var check = function(row){
    var column = 0;
    while(board._isInBounds(row, column)){
      if(piecesOnBoard === n){
        break;
      }
      board.togglePiece(row, column);
      if(!board.hasAnyRooksConflicts()){
        piecesOnBoard++;
        check(row + 1);
      } else {
        board.togglePiece(row, column);
        column++;
      }
    }
  };
  check(0);
  return board.rows();
};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  //uncomment solutions variable to see board as matrix in output
  //var solutions = [];
  var solutionCount = 0;
  var board = new Board({'n':n});

  var check = function(row){
    row = row || 0;
    var column = 0;
    if(board.hasAnyRooksConflicts()){
      return;
    }
    if(row === n){
        //solutions.push(board.rows());
        solutionCount++;
        return;
    }
    while(board._isInBounds(row, column)){
      board.togglePiece(row, column);
      check(row + 1);
      board.togglePiece(row, column);
      column++;
    }
  };

  check();
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount/*, solutions*/);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var board = new Board({'n':n});
  var solution = null;

  //return empty board if n = 2 or 3
  if(n === 2 || n === 3){
    return board.rows();
  }

  var check = function(row){
    var column = 0;
    if (board.hasAnyQueensConflicts()){
      return;
    }
    if(row === n){
      solution = board.rows();
      return;
    }
    while(board._isInBounds(row, column)){
      //toggle piece at column index
      board.togglePiece(row, column);
      check(row+1);
      if(solution){
        return;
      }
      board.togglePiece(row, column);
      column++;
    }
  };
  check(0);
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return board.rows();
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({'n':n});
  var solutions = [];

  //return empty board if n = 2 or 3
  if(n === 2 || n === 3){
    return 0;
  }

  var check = function(row){
    var column = 0;
    if (board.hasAnyQueensConflicts()){
      return;
    }

    if(row === n){
      console.log(JSON.stringify(board.rows()), board.hasAnyQueensConflicts());
      solutions.push(board.rows());
      solutionCount++;
      return;
    }

    while(board._isInBounds(row, column)){
      //toggle piece at column index
      board.togglePiece(row, column);
      check(row+1);
      board.togglePiece(row, column);
      column++;
    }
  };

  check(0);
  console.log(JSON.stringify(solutions));
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
