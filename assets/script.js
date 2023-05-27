const noteForm = document.getElementById('note-form');
const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('description-input');
const noteList = document.getElementById('note-list');

function createNote() {
    const titleText = titleInput.value;
    const descriptionText = descriptionInput.value;

    const note = {
        title: titleText,
        description: descriptionText
    };

    saveNoteToLocalStorage(note);

    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');
    const noteTitle = document.createElement('div');
    noteTitle.classList.add('note-title');
    const titleSymbol = document.createElement('span');
    titleSymbol.classList.add('symbol');
    titleSymbol.textContent = '>';
    const titleSpan = document.createElement('span');
    titleSpan.textContent = titleText;
    const noteContent = document.createElement('div');
    noteContent.classList.add('note-content');
    const descriptionLines = splitDescriptionText(descriptionText, 50);
    descriptionLines.forEach((line) => {
        const lineBreak = document.createElement('br');
        noteContent.appendChild(document.createTextNode(line));
        noteContent.appendChild(lineBreak);
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');

    deleteButton.addEventListener('click', function() {
        deleteNoteFromLocalStorage(note);

        noteContainer.remove();
    });

    noteTitle.addEventListener('click', function() {
        noteTitle.classList.toggle('collapsed');
        titleSymbol.textContent = noteTitle.classList.contains('collapsed') ? '>' : '>';
        noteContent.style.maxHeight = noteTitle.classList.contains('collapsed') ? `${noteContent.scrollHeight}px` : '0';
    });

    noteTitle.appendChild(titleSymbol);
    noteTitle.appendChild(titleSpan);
    noteContainer.appendChild(noteTitle);
    noteContainer.appendChild(noteContent);
    noteContainer.appendChild(deleteButton);
    noteList.appendChild(noteContainer);

    titleInput.value = '';
    descriptionInput.value = '';
}

function splitDescriptionText(text, maxLength) {
    const lines = [];
    let currentLine = '';
    for (let i = 0; i < text.length; i++) {
        currentLine += text[i];
        if (currentLine.length === maxLength) {
            lines.push(currentLine);
            currentLine = '';
        }
    }
    if (currentLine.length > 0) {
        lines.push(currentLine);
    }
    return lines;
}

function saveNoteToLocalStorage(note) {
    let notes = getNotesFromLocalStorage();
    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

function deleteNoteFromLocalStorage(note) {
    let notes = getNotesFromLocalStorage();
    const index = notes.findIndex((n) => n.title === note.title && n.description === note.description);
    if (index !== -1) {
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));
    }
}

function getNotesFromLocalStorage() {
    const notesString = localStorage.getItem('notes');
    return notesString ? JSON.parse(notesString) : [];
}

noteForm.addEventListener('submit', function(e) {
    e.preventDefault();
    createNote();
});

window.addEventListener('load', function() {
    const notes = getNotesFromLocalStorage();
    notes.forEach((note) => {
        createNoteElement(note);
    });
});

function createNoteElement(note) {
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note-container');
    const noteTitle = document.createElement('div');
    noteTitle.classList.add('note-title');
    const titleSymbol = document.createElement('span');
    titleSymbol.classList.add('symbol');
    titleSymbol.textContent = '>';
    const titleSpan = document.createElement('span');
    titleSpan.textContent = note.title;
    const noteContent = document.createElement('div');
    noteContent.classList.add('note-content');
    const descriptionLines = splitDescriptionText(note.description, 50);
    descriptionLines.forEach((line) => {
        const lineBreak = document.createElement('br');
        noteContent.appendChild(document.createTextNode(line));
        noteContent.appendChild(lineBreak);
    });
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');

    deleteButton.addEventListener('click', function() {
        deleteNoteFromLocalStorage(note);
        noteContainer.remove();
    });

    noteTitle.addEventListener('click', function() {
        noteTitle.classList.toggle('collapsed');
        titleSymbol.textContent = noteTitle.classList.contains('collapsed') ? '>' : '>';
        noteContent.style.maxHeight = noteTitle.classList.contains('collapsed') ? `${noteContent.scrollHeight}px` : '0';
    });

    noteTitle.appendChild(titleSymbol);
    noteTitle.appendChild(titleSpan);
    noteContainer.appendChild(noteTitle);
    noteContainer.appendChild(noteContent);
    noteContainer.appendChild(deleteButton);
    noteList.appendChild(noteContainer);
}
