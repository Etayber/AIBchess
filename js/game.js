var cnt = 0;
var move = [2];
let game_id;

var pieces_image_path = {
    'R': "img/wR.png",
    'N': "img/wN.png",
    'B': "img/wB.png",
    'Q': "img/wQ.png",
    'K': "img/wK.png",
    'P': "img/wP.png",
    'r': "img/bR.png",
    'n': "img/bN.png",
    'b': "img/bB.png",
    'q': "img/bQ.png",
    'k': "img/bK.png",
    'p': "img/bP.png"
};

var image_path_to_pieces = {
    "img/wR.png": 'R',
    "img/wN.png": 'N',
    "img/wB.png": 'B',
    "img/wQ.png": 'Q',
    "img/wK.png": 'K',
    "img/wP.png": 'P',
    "img/bR.png": 'r',
    "img/bN.png": 'n',
    "img/bB.png": 'b',
    "img/bQ.png": 'q',
    "img/bK.png": 'k',
    "img/bP.png": 'p'
}
function NewGame()
{
    fetch('http://localhost:3000/').then(res => res.json()).then(res =>{
        console.log("ID: "+res.body.id);
        game_id=res.body.id;
    });
}

function Move(move)
{
    let data = {id: game_id,move: move};
    fetch('http://localhost:3000/move', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}


function clear_sq(id) {
    let temp_element = document.getElementById(id);
    if (temp_element.children.length !== 0)
        temp_element.removeChild(temp_element.firstChild);
}

function createPiece(pieceChar, position) {
    let piece = document.createElement("img");

    piece.id = pieceChar + position;
    piece.src = pieces_image_path[pieceChar];

    return piece;
}

function updateBoard(fen) {
    console.log("FEN: "+fen);
    let row = 8;
    let col = "a";
    let currentSquare;
    for (const fenChar of fen) {
        currentSquare = document.getElementById(col + row);

        switch (fenChar) {
            case "r":
            case "n":
            case "b":
            case "q":
            case "k":
            case "p":
            case "R":
            case "N":
            case "B":
            case "Q":
            case "K":
            case "P":
                clear_sq(col + row);
                currentSquare.appendChild(createPiece(fenChar, col + row));
                col = String.fromCharCode(col.charCodeAt(0) + 1);
                break;
            case "/":
                row -= 1;
                col = "a";
                break;
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
                for (let i = 0; i < parseInt(fenChar); i++) {
                    clear_sq(col + row);
                    col = String.fromCharCode(col.charCodeAt(0) + 1);
                }
                break;
        }
    }
}

function clearBoard() {
    var element_id = "a1";
    for (let i = 1; i <= 8; i++) {
        element_id = element_id.replaceAt(1, i.toString());
        element_id = element_id.replaceAt(0, "a");
        console.log(element_id);
        for (let r = 'a'.charCodeAt(0); r <= 'h'.charCodeAt(0); r++) {
            element_id = element_id.replaceAt(0, String.fromCharCode(r));
            clear_sq(element_id);
            console.log(element_id);
        }
    }
}

String.prototype.replaceAt = function (index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}

function resetBoard() {
    update_board_FEN("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
}

function get_board_FEN() {
    let col='a';
    let row=8;

    let fen = "";

    for (let i = 8; i >= 1; i--) {
        row=i;
        col='a';
        let empty = 0;
        while(col!=='i')
        {
            let temp_element = document.getElementById(col+row);
            if (temp_element.children.length !== 0)
            {
                if(empty!=0)
                    fen = fen.concat(empty);
                fen = fen.concat(temp_element.children[0].id[0]);
                empty=0;
                console.log(fen);
            }else {
                empty++;
            }
            col = String.fromCharCode(col.charCodeAt(0) + 1);
        }
        if(empty!=0)
            fen = fen.concat(empty);
        fen = fen.concat('/');
    }


    return fen;
}

function IsPiece(c) {
    if (c == 'r' || c == 'n' || c == 'b' || c == 'q' || c == 'k' || c == 'p' || c == 'R' || c == 'N' || c == 'B' || c == 'Q' || c == 'K' || c == 'P')
        return true;
    else
        return false;
}

function update_board_FEN(fen) {
    var element_id = "a1";
    var temp_element = document.getElementById(element_id);
    var d = 0;
    var num = 0;
    for (i = 8; i >= 8 && d < fen.length; i--) {
        element_id = element_id.replaceAt(1, i.toString());
        element_id = element_id.replaceAt(0, "a");
        num = 0;
        for (let r = 'a'.charCodeAt(0); r <= 'h'.charCodeAt(0) && d < fen.length; r++) {
            element_id = element_id.replaceAt(0, String.fromCharCode(r));
            temp_element = document.getElementById(element_id);


            if (IsPiece(fen[d])) {
                clear_sq(element_id);
                console.log("is a piece");
                img_path = pieces_image_path[fen[d]];
                piece_element = document.createElement("img");
                piece_element.id = fen[d].concat(element_id);
                piece_element.src = img_path;
                temp_element.appendChild(piece_element);
            }
        }
    }
}

function MovePiece(current_sq, target_sq) {
    if (current_sq.length <= 2)
        return;
    var start = document.getElementById(current_sq);
    var end = document.getElementById(target_sq);
    if (target_sq.length >= 3) {
        end.remove();
        target_sq = target_sq.slice(1);
        console.log(target_sq);
        end = document.getElementById(target_sq);
    }
    start.id = start.id[0];
    start.id = start.id.concat(target_sq);
    end.appendChild(start);

}

const onClick = (event) => {

    //showImage();
    console.log(event.srcElement.id);
    move[cnt] = event.srcElement.id;
    console.log(move);
    cnt++;
    if (cnt >= 2) {
        cnt = 0;
        MovePiece(move[0], move[1]);
        move = [2];
    }

}

for (const element of document.getElementsByClassName("square")) {
    element.addEventListener("click", onClick)
}



