let gameArea;
let N = 5;
let blocksize = (500-6*20)/N;
let chosen_board;
let btop = blocksize + 20;
let bleft = blocksize + 20;
let mp = 0;
let timer = null;
let timeStr;
let lepes;

function list(eredmeny){
    let jatekos = nev = prompt("Adja meg a nevét:", "valaki");
    let listdata = chosen_board + '/' + eredmeny;
    localStorage.setItem(jatekos,listdata);
    fill_list();
}
function fill_list() {
    let data = [];
    let tmp;
    for (var i = 0; i < localStorage.length; i++) {
        tmp = localStorage.getItem(localStorage.key(i)).split("/");
        data[i] = [localStorage.key(i), tmp[0], parseInt(tmp[1])];
    }
    let darab = 0;
    for (let j = 0; j < data.length; j++) {
        if (data[j][0] !== ''){
            if( data[j][1] === chosen_board){
                $('#ranglist').append('<span class="torold">'+data[j][0] + ' - ' + data[j][2] + '<br><hr></span>');
            }
            if( darab === 8){
                break;
            }
            darab++;
        }
    }
}
function setboard(){
    for (let i = 1; i <= N; i++) {
        for (let j = 1; j <= N; j++) {
            let block = $('<div></div>');
            let id = i+'-'+j;
            block.addClass('game')
            block.addClass('off');
            block.attr('id', id);
            block.css({
                width: blocksize,
                height: blocksize,
                top: (i-1) * btop,
                left: (j-1) * bleft,
            });
            block.appendTo(gameArea);
        }
    }
}
function ido(){
    mp++;
    let date = new Date(0);
    date.setSeconds(mp);
    timeStr = date.toISOString().substring(14,19);
    $("#time").text(timeStr);
}
function reset(){
    clearInterval(timer);
    mp = 0;
}

function start(){
    timer = setInterval("ido()", 1000);
}
function board(chosen_board) {
    $('.torold').remove();
    $('#board_sound').remove();
    gameArea.append('<audio id="board_sound" controls autoplay></audio>');
    $('#board_sound').append('<source src="katt.mp3" type="audio/mpeg"/>');
    $('#board_sound').hide();
    let on_id;
    switch (chosen_board) {
        case 'board_1' :
            on_id = ['1-1','1-2','1-4','1-5','2-1','2-3','2-5','3-2','3-3','3-4','4-1','4-3','4-5','5-1','5-2','5-4','5-5'];
            break;
        case 'board_2':
            on_id = ['1-1','1-3','1-5','2-1','2-3','2-5','4-1','4-3','4-5','5-1','5-3','5-5'];
            break;
        case 'board_3':
            on_id = ['1-5','2-1','2-2','2-3','3-1','3-3','3-4','3-5','4-1','4-2','4-3','4-4','5-1','5-4'];
            break;
    }

    reset()
    start();
    $('#winpic').animate({
        height: '0',
    }, 1500);
    let temp;
    $('.be').each(function () {
        $(this).removeClass("be");
        $(this).addClass("off");
    });
    $('.off').each(function (){
        temp = $(this).attr('id');

        for (let index of on_id) {
            if( temp === index ){
                $(this).removeClass("off");
                $(this).addClass("be");
            }
        }
    });
    $('#catpic').attr('src','not_happy_cat.png');
}

function szomszed(id){
    let szomszed;
    let szomszed_x; let szomszed_y;
    let id_x = parseInt(id.slice(0,1)); let id_y = parseInt(id.slice(2));
    //Felső
    if( id_x-1 > 0 ){
        szomszed_x = id_x-1; szomszed_y = id_y;
        szomszed = $('#'+szomszed_x+'-'+szomszed_y);
        if( szomszed.attr('class') === 'game be'){
            szomszed.addClass('off');
            szomszed.removeClass('be');
        } else {
            szomszed.addClass('be');
            szomszed.removeClass('off');
        }
    }
    //Alsó
    if( id_x+1 < 26 ){
        szomszed_x = id_x+1; szomszed_y = id_y;
        szomszed = $('#'+szomszed_x+'-'+szomszed_y);
        if( szomszed.attr('class') === 'game be'){
            szomszed.addClass('off');
            szomszed.removeClass('be');
        } else {
            szomszed.addClass('be');
            szomszed.removeClass('off');
        }
    }
    //Bal
    if( id_y-1 > 0 ){
        szomszed_x = id_x; szomszed_y = id_y-1;
        szomszed = $('#'+szomszed_x+'-'+szomszed_y);
        if( szomszed.attr('class') === 'game be'){
            szomszed.addClass('off');
            szomszed.removeClass('be');
        } else {
            szomszed.addClass('be');
            szomszed.removeClass('off');
        }
    }
    //Jobb
    if( id_y+1 < 26 ){
        szomszed_x = id_x; szomszed_y = id_y+1;
        szomszed = $('#'+szomszed_x+'-'+szomszed_y);
        if( szomszed.attr('class') === 'game be'){
            szomszed.addClass('off');
            szomszed.removeClass('be');
        } else {
            szomszed.addClass('be');
            szomszed.removeClass('off');
        }
    }
}

function win(){
    $('#catpic').attr('src','happy_cat.png');
    $("#winpic") . animate ({
        height: '120px',
    }, 1500) ;
    reset();
}

$(document).ready(function (){
    //localStorage.clear();

    gameArea = $('#game_area');
    $('#kozrefog').hide();
    $('#sound').hide();
    setboard();
    gameArea.hide();
    $("#board_1").click(function () {
        lepes = 0;
        gameArea.show();
        $('#kozrefog').hide();
        chosen_board = $(this).attr('id');
        board(chosen_board);
    });
    $("#board_2").click(function () {
        lepes = 0;
        gameArea.show();
        $('#kozrefog').hide();
        chosen_board = $(this).attr('id');
        board(chosen_board);
    });
    $("#board_3").click(function () {
        lepes = 0;
        gameArea.show();
        $('#kozrefog').hide();
        chosen_board = $(this).attr('id');
        board(chosen_board);
    });
    $("#random").click(function () {
        lepes = 0;
        gameArea.show();
        $('#kozrefog').hide();
        let random = Math.random();
        if(random > 0 && random < 0.3 ){
            board('board_1');
        } else if( random > 0.3 && random < 0.6  ){
            board('board_2');
        } else {
            board('board_3');
        }
    });
    let darab;

    $( function () {

        $(".game"). click ( function () {
            darab = 0;
            if($(this).attr('class') === 'game be'){
                $(this).addClass('off');
                $(this).removeClass('be');
                let param = $(this).attr('id');
                szomszed(param);
                lepes++;

            } else if($(this).attr('class') === 'game off'){
                $(this).addClass('be');
                $(this).removeClass('off');
                let param = $(this).attr('id');
                szomszed(param);
                lepes++;
            }
            $('#steps').text(lepes);
            $('.be').each(function (){
                darab++;
            });

            if (darab === 0){
                win();
                $('#win_sound').remove();
                gameArea.append('<audio id="win_sound" controls autoplay></audio>');
                $('#win_sound').append('<source src="katt.mp3" type="audio/mpeg"/>');
                $('#win_sound').hide();
            }
        }) ;

    }) ;
    $(".list").click(function () {
        list(lepes);
        $('#kozrefog').show();
    });
    lepes = 0;

})