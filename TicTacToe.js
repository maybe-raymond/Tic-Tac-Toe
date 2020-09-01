class  Game{
  constructor(player1, player2, board){
    this.player1=player1
    this.player2= player2
    this.Board = board
  }
  add_sign(player,i){
    if (player.event){
      if (i.innerHTML == ''){
        i.innerHTML = player.sign;
        this.Board.playTurn(player)

    }
  }
}

  play(i){
    try{
    if (this.player1.turn){
      this.add_sign(this.player1, i);
      i.classList.add("xx");
      this.player1.turn = false;
      this.player2.turn = true;
      this.player1.moves = this.player1.moves + 1
      this.check_winner(this.player1);
    }
    else if (this.player2.turn){
      this.add_sign(this.player2, i)
      i.classList.add("oo");
      this.player2.turn= false;
      this.player1.turn= true;
      this.player2.moves = this.player2.moves + 1
      this.check_winner(this.player2);
    }
  }
  catch (e){
    throw e
  }
  }

  check_winner(player){
    if (player.moves >= 3){
      let p = document.querySelectorAll(".cube");
      let ind = 0;
      let index = 0;
      let count = 1;
      let row = 0;
      let cross = 0;
      let cross_o = 0;
      let h1=0
      let h2=0
      let h3=0
      p.forEach( (i) =>{
        if (count === 4 ){
          count = 1
          row = 0
          ind = 0
        }
        if (i.innerHTML === player.sign){
          row = row +1
          }
        if ((index===0 || index === 4 || index === 6) && i.innerHTML === player.sign){
          cross =  cross +1
        }
        if ((index===2 || index === 4 || index === 8) && i.innerHTML === player.sign){
          cross_o = cross_o +1
        }
      if (i.innerHTML === player.sign && ind === 0){
        h1++
      }
      else if (i.innerHTML === player.sign && ind === 1){
        h2++

      }
      else if (i.innerHTML === player.sign && ind === 2){
        h3++
      }

      if (row >=  3 || cross >= 3 || h1 >= 3 || h2 >= 3|| h3 >=  3 || cross_o >= 3){
        this.Winner(player.sign);
        this.Board.Add_new_score(player);
        throw "for each breaker"
      }
        count++;
        index++;
        ind++;
      })
    }

  }

  AddEvents(){
    let c = document.querySelectorAll(".cube");
    c.forEach( (i) => {
      i.addEventListener("click", () => {this.play(i)})
    } )
  }

  Winner(player){
    this.player1.event = false;
    this.player2.event = false;
    this.Board.show_winner(player)

  }
}



class GameBoard{
  constructor(){
    this.zero = "0 - 0"
  }
  make_borad(){
    let board = document.querySelector(".main");
    for (let i=1; i<=9; i++){
      let cube = document.createElement("div");
      if (i % 3 === 0){
        cube.classList.add("end");
      }
      cube.classList.add("cube");
      board.append(cube);
    }

  }
  Destroy_board(){
    let c = document.querySelectorAll(".cube")
    c.forEach( (i) => {
      this.Board.removeChild(i);
    })
  }

  Reset(){
    this.Destroy_board()
    this.make_borad()
  }
  playTurn(player){
    let n = document.querySelector("#current_play");
    if (player.sign === "x"){
      n.innerHTML = "O's turn";
      n.style.backgroundColor = "#02BAC4";
    }
    else{
      n.innerHTML = "X's turn";
      n.style.backgroundColor = "#E88834";
    }
  }
  show_winner(player){
    let n = document.querySelector("#current_play");
    n.innerHTML = ` ${player} has won`
  }
  Add_new_score(player){
    let score = document.querySelector("#score");
    if (player.sign === "x"){
      let p =   Number(this.zero[0])
      p++
      let y = this.zero.replace(this.zero[0], String(p))
      score.innerHTML = y;
      this.zero = y
      console.log(y)
    }
    else{
        let p =   Number(zero[4])
        p++
        let y = this.zero.replace(zero[4], String(p))
        score.innerHTML = y
        this.zero = y
      }
    }
  }

class Player{
  constructor(sign,moves=0){
    this.sign= sign;
    this.moves= moves;
    this.turn = false;
    this.event = true
  }
}



function main(){
  let board = new GameBoard();
  play1 = new Player("x");
  play2 = new Player("o");
  play1.turn = true;
  board.make_borad()
  let TicTacToe = new Game(play1, play2, board);
  TicTacToe.AddEvents()
    }

main()
