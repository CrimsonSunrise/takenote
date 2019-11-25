var resizing;
var cy;
var cx;
var cposXI, cposYI;
var resElement;
var resElementHeight;
var CmdPressed = false;;
var shiftPressed = false;
var initialReceipt;
var correctReceipt;
var mObject;
var movingObject = false;
var mOIPX, mOIPY;
var offsetDif;
var actualWidth;

function toggleTab(e) {
    $(e).toggleClass('mdi-minus');
    $(e).toggleClass('mdi-plus');
    $(e).closest('.tab-container').find('.tab-body').slideToggle('fast');
}

$('.tab-body-resize').mousedown(function(e){
    resizing = true;
    cy = e.clientY;
    resElement = $(this).closest('.tab-body');
    resElementHeight = parseInt($(resElement).css('height'));
    $(resElement).css('min-height', '38px');
    //console.log(resElementHeight)
})

$('body').mousedown(function(e){
    cposXI = e.clientX;
    cposYI = e.clientY;
});

$('body').mouseup(function(e){
    if(mObject && correctReceipt)
    {
        $(correctReceipt).find('.notes').append(mObject);
        //console.log(mObject.offset().top +', ' + correctReceipt.offset().top)
        $(mObject).css('top', offsetDif - 4);
    }

    correctReceipt = null;
    initialReceipt = null;
    resizing = false;
    CmdPressed = false;
    shiftPressed = false;
    movingObject = false;
    mObject = null;
    $('.tab-body').css('overflow', 'hidden');
    $('.note').css('z-index', '1');
    cy = null;
    $(resElement).css('min-height', '0');
    if(parseInt($(resElement).css('height')) < 38)
    {
        $(resElement).css('height', 38);
    }
    //$(resElement).css('height', 'auto');
    resElement = null;
    updateNoteCount();
    updateNotesColors();
})

$('body').mousemove(function(e){

    if(resizing){
        $(resElement).css('height', resElementHeight + (e.clientY - cy));
    }

    if(movingObject) {
        $(mObject).css('left', (mOIPX + (e.clientX - cposXI)) + 'px');
        $(mObject).css('top', (mOIPY + (e.clientY - cposYI)) + 'px');
    }

    if(movingObject == true) {
        //console.log(mObject.offset().top);
        var mobH = parseInt($(mObject).css('height'));
        $('.tab-container').find('.tab-body').each(function(){
            var tbH = parseInt($(this).css('height'));
            if(mObject.offset().top >= $(this).offset().top && mObject.offset().top <= ($(this).offset().top + tbH))
            {
                correctReceipt = $(this);
                offsetDif = mObject.offset().top - $(this).offset().top;
            }
            else
            {
                
            } 
        });
    }
})

$('body').keydown(function(e){
    if(e.which == 17)
    {
        $('.note').find('.note-options').addClass('active');
        CmdPressed = true;
    }
    
    if(e.which == 16)
    {
        shiftPressed = true;
        $('.tab-body').css('overflow', 'visible');
        $('.note').css('z-index', '2');
    }
});

$('body').keyup(function(e){
    shiftPressed = false;
    if(e.which == 17)
    {
        $('.note').find('.note-options').removeClass('active');
        CmdPressed = false;
    }

    if(e.which == 16)
    {
        shiftPressed = false;
        $('.tab-body').css('overflow', 'hidden');
        $('.note').css('z-index', '1');
    }
});

$('.add-note').click(function(){
    $(this).closest('.tab-body').find('.notes').append(newNote);
    var nn = $(this).closest('.tab-body').find('.note').length;
    $(this).closest('.tab-body').find('.note').eq(nn-1).css('left', '50%');
    updateNoteCount();
    updateNotesColors();
    //$(this).closest('.tab-body').css('height', 'auto');
});

function updateNoteCount() {
    $('.tab-container').each(function(){
        var quantity = $(this).find('.note').length;
        if(quantity == 1)
        {
            $(this).find('.notes-counter').text(quantity+' note');
        }
        else
        {
            $(this).find('.notes-counter').text(quantity+' notes');
        }

        if(quantity > 0) {
            $(this).find('.tab-organize').css('display', 'block');
        } else {
            $(this).find('.tab-organize').css('display', 'none');
        }
    })
}

function noteMouseOver(e) {
    if(CmdPressed)
    {
        $(e).find('.note-options').addClass('active');
    }
}

function noteMouseLeave(e){
    //$(e).find('.note-options').removeClass('active');
}

$('.note-option.toggle').click(function(){

});

function toggleNoteBody(e) {
    if($(e).hasClass('mdi-minus')) {
        setTimeout(function(){
            $(e).closest('.note').css('width', $(e).closest('.note').attr('data-width'));
        }, 200)  
    } else {
        setTimeout(function(){
            $(e).closest('.note').css('width', 'auto');
        }, 200)        
    }
    $(e).toggleClass('mdi-plus');
    $(e).toggleClass('mdi-minus');
    $(e).closest('.note').find('.note-body').slideToggle('fast');
}

function closeNote(e) {
    var n = $(e).closest('.note');
    $(e).closest('.note').remove();
    updateNoteCount();
    updateNotesColors();
}

function setMoveable(e) {
    initialReceipt = $(e).closest('.tab-body');
    mObject = $(e).closest('.note');
    $(mObject).closest('.tab-body').css('overflow', 'visible');
    $(mObject).css('z-index', '2');
    mOIPY = parseInt($(mObject).css('top'));
    mOIPX = parseInt($(mObject).css('left'));
    movingObject = true;
}

function unsetMoveable(e) {
    
}

function moveObject(e) {
    
}

$('.tab-body').mousemove(function(e){
    //if(movingObject)
        //$(this).addClass('receptible')
});

$('.tab-body').mouseleave(function(e){
    //if(movingObject)
        //$(this).removeClass('receptible')
});

function updateNotesColors() {
    $('.tab-container').each(function(){
        var mainColor = $(this).find('.tab-header').css('background-color');
        $(this).find('.note-header').css('background-color', mainColor);
        $(this).find('.add-note').css('background-color', mainColor);
        //$(this).find('.tab-body-resize').css('background-color', mainColor);
        $(this).find('.tab-body-resize').hover(function(e){
            $(this).css("background-color",e.type === "mouseenter"?mainColor:"transparent")
        });
        var lightColor = mainColor.substring(4, mainColor.length-1).replace(/ /g, '').split(',');
        for(var i = 0; i < 3; i++)
        {
            if(parseInt(lightColor[i]) + 20 < 250) lightColor[i] = parseInt(lightColor[i]) + 20
        }
        $(this).find('.note-body').css('background-color', 'rgb(' + lightColor + ')');
    })
}

function changeNoteParent(e) {
    //$('.tab-body').eq(2).append(e);

    //updateNotesColors();
    //updateNoteCount();
}

$('.tab-body').each(function(){
    //console.log($(this).offset().top + parseInt($(this).css('height')))
});

function organizeTab (e) {
    var notesContainer = $(e).closest('.tab-container').find('.notes');
    $(notesContainer).find('.note').css('position', 'sticky');
    $(notesContainer).find('.note').css('display', 'inline-block');
    $(notesContainer).find('.note').css('top', 'auto');
    $(notesContainer).find('.note').css('left', 'auto');

    var ndifsx = [];
    var ndifsy = [];
    $(notesContainer).find('.note').each(function(){
        var tol = $(this).offset().left;
        var col = $(this).closest('.notes').offset().left;
        var tot = $(this).offset().top;
        var cot = $(this).closest('.notes').offset().top;
        var ofdifx = tol - col;
        var ofdify = tot - cot;
        ndifsx.push(ofdifx);
        ndifsy.push(ofdify);
    });

    setTimeout(function(){
            
            for(var i = 0; i < $(notesContainer).find('.note').length; i++) {
                $(notesContainer).find('.note').eq(i).css('position', 'absolute');
                $(notesContainer).find('.note').eq(i).css('left', ndifsx[i] + 7);
                $(notesContainer).find('.note').eq(i).css('top', ndifsy[i] + 7);
                $(notesContainer).find('.note').eq(0).css('left', ndifsx[0] + 7);
            }

            ndifsx = [];
            ndifsy = [];
    }, 10)

    var objToRetrieve;

    function retrievePos() {
        console.log('asd');
    }

    
    //$(notesContainer).find('.note').css('top', $(notesContainer).find('.note').css('margin-top'));
    //$(notesContainer).find('.note').css('left', 'auto');
    //$(notesContainer).find('.note').css('position', 'absolute');
    //$(notesContainer).find('.note').css('display', 'block');
    
}

function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

$('.note-body-text').keyup(function(){
    actualWidth = parseInt($(this).closest('.note').css('width'));
    if(actualWidth > initialNoteWidth) {
        $(this).closest('.note').attr('data-width', actualWidth);
    } else {
        $(this).closest('.note').attr('data-width', 200);
    }
});

function normalizeWidth(e) {
    actualWidth = parseInt($(e).closest('.note').css('width'));
    if(actualWidth > initialNoteWidth) {
        $(e).closest('.note').attr('data-width', actualWidth);
    } else {
        $(e).closest('.note').attr('data-width', 200);
    }
}