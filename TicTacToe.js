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
        player.moves = player.moves + 1
        this.Board.playTurn(player)
        this.check_winner(player);
        player.turn = false;
        this.Draw(player)
      }
    }
  }

  play(i){
    if (i.innerHTML === ""){
      if (this.player1.turn){
        this.add_sign(this.player1, i);
        i.classList.add("xx");
        this.player2.turn = true;
    }
      else if (this.player2.turn){
        this.add_sign(this.player2, i)
        i.classList.add("oo");
        this.player1.turn= true;
    }
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
      for (let i of Array.from(p)){
        if (count === 4 ){
          count = 1
          row = 0
          ind = 0
        }
        if (i.innerHTML === player.sign){
          row = row +1
          }
        if ((index===0 || index === 4 || index === 8) && i.innerHTML === player.sign){
          cross =  cross +1
        }
        if ((index===2 || index === 4 || index === 6) && i.innerHTML === player.sign){
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
        this.Board.show_winner(player)
        this.Winner();
        this.Board.Add_new_score(player);
        break
      }

        count++;
        index++;
        ind++;
      }
    }

  }
  AddEvents(){
    let c = document.querySelectorAll(".cube");
    c.forEach( (i) => {
      i.addEventListener("click", () => {this.play(i)})
    } )
  }

  Winner(){
    this.player1.event = false;
    this.player2.event = false;
    setTimeout(() => {this.start_Over()} , 2500)
    }

    start_Over(){
      this.Board.Reset()
      this.player1.event = true;
      this.player2.event = true;
      this.AddEvents()
    }

    Draw(player){
      if (player.moves >= 4){
        let p = document.querySelectorAll(".cube");
        let boxes_filled =0;
        for (let i of Array.from(p) ){
          if (i.innerHTML !== ""){
            boxes_filled++
        }
        console.log(boxes_filled)
      }
      if (boxes_filled === 9){
        this.Winner();
        this.Board.show_winner()
      }
    }
  }}


class GameBoard{
  constructor(){
    this.zero = "0 - 0"
    this.main = document.querySelector(".main");
  }
  make_borad(){
    for (let i=1; i<=9; i++){
      let cube = document.createElement("div");
      if (i % 3 === 0){
        cube.classList.add("end");
      }
      cube.classList.add("cube");
      this.main.append(cube);
    }
  }
  Destroy_board(){
    let c = document.querySelectorAll(".cube")
    c.forEach( (i) => {
      this.main.removeChild(i);
    })
  }

  Reset(){
    this.Destroy_board()
    this.make_borad()
    this.newTurn()
  }

  newTurn(){
    let n = document.querySelector("#current_play");
    n.innerHTML = "X's turn";
    n.style.backgroundColor = "#E88834";
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

  show_winner(player="draw"){
    let n = document.querySelector("#current_play");
    if (player.sign === "x"){
      n.style.backgroundColor = "#E88834";
      n.innerHTML =` ${player.sign} has won`
    }
    else if(player === "draw"){
      n.innerHTML =`It was a draw`
    }
    else {
      n.style.backgroundColor = "#02BAC4";
      n.innerHTML =` ${player.sign} has won`
    }
  }

  Add_new_score(player){
    let score = document.querySelector("#score");
    if (player.sign === "x"){
      let p =   Number(this.zero[0])
      p++
      let y = this.zero.replace(this.zero[0], String(p))
      score.innerHTML = y;
      this.zero = y
    }
    else if (player.sign === "x"){
        let p =   Number(this.zero[4])
        p++
        let y = this.zero.replace(this.zero[4], String(p))
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
