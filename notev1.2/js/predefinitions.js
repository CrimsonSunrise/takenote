var noteTitle = 'Some Title';
var noteBody = '';
var noteExpanded = false;
var newNote;
var initialNoteWidth = 200;

if(noteExpanded) {
    newNote = '<div class="note" data-width="200" onmouseover="noteMouseOver(this)" onmouseleave="noteMouseLeave(this)"><div class="note-header"><div class="note-title" contenteditable="true" spellcheck="false">'+noteTitle+'</div><div class="note-options"><div class="note-options-upper"><div class="note-option mdi mdi-minus toggle" onclick="toggleNoteBody(this)"></div><div class="note-option mdi mdi-cursor-move move hidden" onmousedown="setMoveable(this)" onmouseup="unsetMoveable(this)"></div></div><div class="note-options-bottom"><div class="note-option mdi mdi-close close" onclick="closeNote(this)"></div></div></div></div><div class="note-body"><div class="note-body-text" contenteditable="true" spellcheck="false" onkeyup="normalizeWidth(this)">'+noteBody+'</div></div></div>';
} else {
    newNote = '<div class="note" data-width="200" onmouseover="noteMouseOver(this)" onmouseleave="noteMouseLeave(this)"><div class="note-header"><div class="note-title" contenteditable="true" spellcheck="false">'+noteTitle+'</div><div class="note-options"><div class="note-options-upper"><div class="note-option mdi mdi-plus toggle" onclick="toggleNoteBody(this)"></div><div class="note-option mdi mdi-cursor-move move hidden" onmousedown="setMoveable(this)" onmouseup="unsetMoveable(this)"></div></div><div class="note-options-bottom"><div class="note-option mdi mdi-close close" onclick="closeNote(this)"></div></div></div></div><div class="note-body" style="display: none"><div class="note-body-text" contenteditable="true" spellcheck="false" onkeyup="normalizeWidth(this)">'+noteBody+'</div></div></div>';
}