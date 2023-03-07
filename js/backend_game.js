import { Chess } from "chess.js";
const express = require('express')
const app = express()
const cors = require('cors');
const port = 3000

app.use(cors());
app.use(express.json());


const game = new Chess();
console.log(game.fen());

let current_games = {};
let game_id=0;

function NewGame(){
    let g1=new Chess();
    current_games[game_id]=g1;
    game_id++;
}

app.get('/new_game', (req, res) => {
    res.send({id: game_id});
    NewGame();
})

app.post('/move', (req, res) => {
    let mv=req.body.move;
    try{

    } catch (err){

    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
