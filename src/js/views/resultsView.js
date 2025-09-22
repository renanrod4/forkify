import icons from 'url:../../img/icons.svg';

import View from './View';

class ResultsView extends View {
	_parentElement = document.querySelector('.results');

	_generateMarkup() {
		return this._data.map(this._generateMarkupPreview).join('');
	}
	_generateMarkupPreview(recipe) {
		const id = window.location.hash.slice(1)
        return `
            <li class="preview">
                <a class="preview__link ${id==recipe.id?"preview__link--active":''}" href="#${recipe.id}">
                    <figure class="preview__fig">
                        <img src="${recipe.image}" alt="Test" />
                    </figure>
                    <div class="preview__recipe">
                        <h4 class="preview__title">${recipe.title}</h4>
                        <p class="preview__publisher">${recipe.publisher}</p>
                    </div>
                </a>
            </li>
        `;
	}
	clear() {
		this._parentElement.innerHTML = '';
	}
}
export default new ResultsView();
