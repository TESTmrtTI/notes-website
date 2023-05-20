    const noteForm = document.getElementById('note-form');
    const titleInput = document.getElementById('title-input');
    const descriptionInput = document.getElementById('description-input');
    const noteList = document.getElementById('note-list');

    function createNote() {
    	const titleText = titleInput.value;
    	const descriptionText = descriptionInput.value;
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
    	const descriptionLines = splitDescriptionText(descriptionText, 50); // Adjust the line length as per your preference
    	descriptionLines.forEach((line) => {
    		const lineBreak = document.createElement('br');
    		noteContent.appendChild(document.createTextNode(line));
    		noteContent.appendChild(lineBreak);
    	});
    	const deleteButton = document.createElement('button');
    	deleteButton.textContent = 'Delete';
    	deleteButton.classList.add('delete');

    	deleteButton.addEventListener('click', function() {
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

    noteForm.addEventListener('submit', function(e) {
    	e.preventDefault();
    	createNote();
    });
