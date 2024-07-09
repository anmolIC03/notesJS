document.addEventListener('DOMContentLoaded', () => {
    if (typeof marked === 'undefined') {
        console.error('Marked library is not loaded.');
        return;
    } else {
        console.log('Marked library loaded successfully.');
    }

    const notes = JSON.parse(localStorage.getItem('notes'))

    if(notes){
        notes.forEach(note => addNewNote(note))
    }

    const addButton = document.querySelector('.add');
    addButton.addEventListener('click', () => addNewNote());

    function addNewNote(text = '') {
        const note = document.createElement('div');
        note.classList.add('note');

        note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fas fa-edit"></i></button>
            <button class="delete"><i class="fas fa-trash-alt"></i></button>
        </div>
        <div class="main ${text ? '' : 'hidden'}"></div>
        <textarea class="${text ? 'hidden' : ''}"></textarea>`;

        const editButton = note.querySelector('.edit');
        const deleteButton = note.querySelector('.delete');
        const main = note.querySelector('.main');
        const textarea = note.querySelector('textarea');

        textarea.value = text;

        // Ensure that marked is available before using it
        if (typeof marked !== 'undefined') {
            main.innerHTML = marked(text);
        } else {
            console.error('Marked library is not loaded.');
        }

        deleteButton.addEventListener('click', () => {
            note.remove();
            updateLS();
        });

        editButton.addEventListener('click', () => {
            main.classList.toggle('hidden');
            textarea.classList.toggle('hidden');
        });

        textarea.addEventListener('input', (e) => {
            const { value } = e.target;
            main.innerHTML = marked(value);
            updateLS();
        });

        document.body.appendChild(note);
        updateLS();
    }

    function updateLS() {
        const notesText = document.querySelectorAll('textarea');
        const notes = [];

        notesText.forEach(note => notes.push(note.value));

        localStorage.setItem('notes', JSON.stringify(notes));
        console.log(notes);
    }
});
