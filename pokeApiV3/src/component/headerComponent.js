export function headerComponent(container){
    const header = document.createElement('header');

    const navForm = document.createElement('div');
    navForm.className = 'form-search';

    const input = document.createElement('input');
    input.placeholder = 'Search a pokemon';
    input.className = 'input-search'

    const btnSearch = document.createElement('button');
    btnSearch.textContent = 'Search';
    btnSearch.className = 'btn-search';

    navForm.appendChild(input);
    navForm.appendChild(btnSearch);

    header.appendChild(navForm);

    container.appendChild(header);
}