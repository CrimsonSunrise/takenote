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
    //console.log(e.target.className);
    if(e.target.className.indexOf('tab-search-input')) {
        //$('.tab-search').removeClass('active');
        //$('.search-icon').css('z-index', '1')
        //$('.search-icon').css('background-color', 'rgba(0, 0, 0, 0.1)')
    }
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
    if(e.which == 18)
    {
        $('.note').find('.note-options').addClass('active');
        CmdPressed = true;
    }
    
    if(e.which == 16)
    {
        shiftPressed = true;
        //$('.tab-body').css('overflow', 'visible');
        //$('.note').css('z-index', '2');
    }

    if(e.ctrlKey && (e.which == 83)) {
        e.preventDefault();
        $('.save').click();
        return false;
    }
});

$('body').keyup(function(e){
    shiftPressed = false;
    if(e.which == 18)
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

    if(e.which == 27)
    {
        $('.note').removeClass('active');
        $('.toggle').removeClass('mdi-minus');
        $('.toggle').addClass('mdi-plus');
        $('.note-body').slideUp('fast');
    }
});

$('.add-note').click(function(){
    $(this).closest('.tab-body').find('.notes').append(newNote);
    var nn = $(this).closest('.tab-body').find('.note').length;
    $(this).closest('.tab-body').find('.note').removeClass('active');
    $(this).closest('.tab-body').find('.toggle').removeClass('mdi-minus');
    $(this).closest('.tab-body').find('.toggle').addClass('mdi-plus');
    $(this).closest('.tab-body').find('.note-body').slideUp('fast');

    $(this).closest('.tab-body').find('.note').eq(nn-1).addClass('active');
    $(this).closest('.tab-body').find('.toggle').eq(nn-1).addClass('mdi-minus');
    $(this).closest('.tab-body').find('.toggle').eq(nn-1).removeClass('mdi-plus');
    $(this).closest('.tab-body').find('.note-body').eq(nn-1).slideDown('fast');
    $(this).closest('.tab-body').find('.note-title').eq(nn-1).focus();

    //$(this).closest('.tab-body').find('.note').removeClass('active');
    updateNoteCount();
    updateNotesColors();
    //$(this).closest('.tab-body').css('height', 'auto');
});

function updateNoteCount() {
    $('.tab-container').each(function(){
        var quantity = $(this).find('.note').length;
        if(quantity == 1)
        {
            $(this).find('.notes-counter').text(quantity+' item');
        }
        else
        {
            $(this).find('.notes-counter').text(quantity+' itens');
        }

        if(quantity > 1) {
            //$(this).find('.tab-organize').css('display', 'block');
            $(this).find('.tab-search').css('display', 'block');
        } else {
            //$(this).find('.tab-organize').css('display', 'none');
            $(this).find('.tab-search').css('display', 'none');
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
        $(e).closest('.note').removeClass('active');
        setTimeout(function(){
            //$(e).closest('.note').css('width', $(e).closest('.note').attr('data-width'));
        }, 200)  
    } else {
        $(e).closest('.notes').find('.note').removeClass('active');
        $(e).closest('.notes').find('.note').find('.toggle').addClass('mdi-plus');
        $(e).closest('.notes').find('.note').find('.toggle').removeClass('mdi-minus');
        $(e).closest('.notes').find('.note').find('.note-body').slideUp('fast');
        $(e).closest('.note').addClass('active');
        setTimeout(function(){
            //$(e).closest('.note').css('width', 'auto');
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
        var colorIntensity = 80;
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
            if(parseInt(lightColor[i]) + colorIntensity < 250) {
                lightColor[i] = parseInt(lightColor[i]) + colorIntensity;
            } else {
                lightColor[i] = 250;
            }
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
    $(notesContainer).find('note').removeClass('active');
    $(notesContainer).find('.note').css('position', 'static');
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

$('.search-icon').click(function(){
    if($(this).hasClass('mdi-close')) {
        $(this).closest('.tab-search').find('.tab-search-input').val('');
        $(this).closest('.tab-search').find('.tab-search-input').focus();
        $(this).removeClass('mdi-close');
        $(this).addClass('mdi-magnify');
        $(this).closest('.tab-container').find('.note').css('display', 'inline-block');
        $(this).closest('.tab-container').find('.note').removeClass('active');
        $(this).closest('.tab-container').find('.toggle').removeClass('mdi-minus');
        $(this).closest('.tab-container').find('.toggle').addClass('mdi-plus');
        $(this).closest('.tab-container').find('.note-body').slideUp('fast');
    }
});

$('.tab-search-input').keyup(function(){
    var t = document.getElementById('tab-search-input').value.trim().toLowerCase();
    if(t.length > 0 && t !== ' ' && t !== '' && t !== null) {
        $(this).closest('.tab-search').find('.search-icon').removeClass('mdi-magnify');
        $(this).closest('.tab-search').find('.search-icon').addClass('mdi-close');
        var nLength = $(this).closest('.tab-container').find('.note').length;
        //console.log(nLength)
        for(var i = 0; i < nLength; i++) {
            var note = $(this).closest('.tab-container').find('.note').eq(i);
            var tTitle = $(note).find('.note-title').text().trim().toLowerCase();
            var tBody = $(note).find('.note-body').text().trim().toLowerCase();
            if(tTitle.indexOf(t) > -1 || tBody.indexOf(t) > -1) {
                $(note).css('display', 'inline-block');
            } else {
                $(note).css('display', 'none');
            }
        }
    } else {
        $(this).closest('.tab-container').find('.note').css('display', 'inline-block');
        $(this).closest('.tab-search').find('.search-icon').addClass('mdi-magnify');
        $(this).closest('.tab-search').find('.search-icon').removeClass('mdi-close');
    }
});

$('.save').click(function(){
    if(validateInputs()) {
        var user = document.getElementById('user').value;
        var name = document.getElementById('name').value;
        var ip = document.getElementById('ip').value;
        var hostname = document.getElementById('hostname').value;
        var ramal = document.getElementById('ramal').value;
        var chamado = document.getElementById('chamado').value;
        var problem = document.getElementById('problem').value.replace(/\r\n|\r|\n/g,"<br />");
        var follow = $('.following').attr('checked');
        var title;
        var flag = '';

        var callinfo = '';

        if(user) {
            callinfo += '<b>usuário</b>: <span>' + user + '</span><br/>';
            title = user;
        }

        if(name) {
            callinfo += '<b>nome</b>: <span>' + name + '</span><br/>';
            var fullname = name.split(' ');
            if(fullname.length >= 2) {
                if(fullname[1].length > 3) {
                    title = fullname[0] + ' ' + fullname[1];
                } else {
                    if(fullname.length > 2) {
                        title = fullname[0] + ' ' + fullname[1] + ' ' + fullname[2];
                    } else {
                        title = fullname[0];
                    }
                }
            }
        }

        if(ip) {
            callinfo += '<b>IP</b>: <span>' + ip + '</span><br/>';
        }

        if(hostname) {
            callinfo += '<b>HostName</b>: <span>' + hostname + '</span><br/>';
        }

        if(ramal) {
            callinfo += '<b>ramal</b>: <span>' + ramal + '</span><br/>';
        }

        if(chamado) {
            callinfo += '<b>chamado</b>: <span>' + chamado + '</span><br/>';
        }

        if(follow == 'checked') {
            flag = '<div title="Urgente" class="note-option mdi mdi-flag flag" onclick=""></div>';
        }

        callinfo += '<b>descrição</b>:';
        //$('.note-title').html(title);
        //$('.note-body-info').html(callinfo);
        //$('.note-body-text').html(problem);
        $('.note').removeClass('active');
        $('.toggle').removeClass('mdi-minus');
        $('.toggle').addClass('mdi-plus');
        $('.note-body').slideUp('fast');
        var note = '<div class="note" data-width="250" data-flag="false" onmouseover="noteMouseOver(this)" onmouseleave="noteMouseLeave(this)">'+
                        '<div class="note-header">'+
                            '<div class="note-title" contenteditable="true" spellcheck="false">'+title+'</div>'+
                            '<div class="note-options">'+
                                '<div class="note-options-upper">'+
                                    '<div class="note-option mdi mdi-minus toggle" onclick="toggleNoteBody(this)"></div>'+
                                    flag+
                                    '<div class="note-option mdi mdi-cursor-move move hidden" onmousedown="setMoveable(this)" onmouseup="unsetMoveable(this)"></div>'+
                                '</div>'+
                                '<div class="note-options-bottom">'+
                                        '<div class="note-option mdi mdi-close close" onclick="closeNote(this)"></div>'+
                                '</div>'+
                            '</div>'+
                        '</div>'+
                        '<div class="note-body">'+
                            '<div class="note-body-info">'+callinfo+'</div>'+
                            '<div class="note-body-text" onkeyup="normalizeWidth(this)" contenteditable="true" spellcheck="false">'+
                                problem+
                            '</div>'+
                        '</div>'+
                    '</div>';
        
        $('.notes').eq(0).append(note);
        updateNoteCount();
        updateNotesColors();

        $('.note').eq($('.note').length-1).addClass('active');
        $('.note').eq($('.note').length-1).find('.note-body').slideDown('fast');
        eraseForm();
        
    } else {
        //WARNING!!!
    }
});

function validateInputs() {
    if(document.getElementById('user').value.trim().length < 1 && document.getElementById('name').value.trim().length < 1)
        return false
    if(document.getElementById('problem').value.trim().length < 1)
        return false
    return true;
}

$('.erase').click(function(){
    eraseForm();
});

function eraseForm() {
    $('.user').val('');
    $('.name').val('');
    $('.ip').val('');
    $('.hostname').val('');
    $('.ramal').val('');
    $('.chamado').val('');
    $('.problem').val('');
    $('.following').attr('checked', false);
    $('.name').focus();
}