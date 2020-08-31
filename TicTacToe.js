class  Game{
  constructor(player1, player2){
    this.player1=player1
    this.player2= player2
    //this.board = board
  }
  add_sign(player,i){
    if (i.innerHTML == ''){
      i.innerHTML = player.sign;
  }
}

  play(i){
    if (this.player1.turn){
      this.add_sign(this.player1, i)
      this.player1.turn = false;
      this.player2.turn = true;
      this.player1.moves = this.player1.moves + 1
      this.check_winner(this.player1);
      i.classList.add("xx");
    }
    else if (this.player2.turn){
      this.add_sign(this.player2, i)
      this.player2.turn= false;
      this.player1.turn= true;
      this.player2.moves = this.player2.moves + 1
      this.check_winner(this.player2);
      i.classList.add("oo");
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
        console.log({count, ind})
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
        else if ((index===2 || index === 4 || index === 8) && i.innerHTML === player.sign){
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
        console.log(`${player.sign} has won`)
        console.log(row ,cross, h1 , h2 , h3, cross_o)
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
      i.addEventListener("click", () => {this.play(i) })
      } )
      }



}



class GameBoard{

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


}

class Player{
  constructor(sign,moves=0){
    this.sign= sign;
    this.moves= moves;
    this.turn = false;
  }
}



function main(){
  let board = new GameBoard();
  play1 = new Player("x");
  play2 = new Player("o");
  play1.turn = true;
  board.make_borad()
  let TicTacToe = new Game(play1, play2);
  TicTacToe.AddEvents()
    }

main()
