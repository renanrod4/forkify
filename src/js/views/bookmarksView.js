import icons from 'url:../../img/icons.svg';

import View from './View';

class BookMarksView extends View {
	_parentElement = document.querySelector('.bookmarks__list');
	_errorMessage = 'No bookmarks yet, find a nice recipe and bookmark it ;)';

	_generateMarkup() {
		if (!Array.isArray(this._data)) {
			return [this._data].map(this._generateMarkupPreview).join('');
		}
		return this._data.map(this._generateMarkupPreview).join('');
	}
	_generateMarkupPreview(preview) {
		return `
            <li class="preview">
                <a class="preview__link" href="#${preview.id}">
                <figure class="preview__fig">
                    <img src="${preview.image}" alt="${preview.title}" />
                </figure>
                <div class="preview__data">
                    <h4 class="preview__name">
                    ${preview.title}
                    </h4>
                    <p class="preview__publisher">${preview.publisher}</p>
                </div>
                </a>
            </li>
        `;
	}
	clear() {
		this._parentElement.innerHTML = '';
	}
}
export default new BookMarksView();
