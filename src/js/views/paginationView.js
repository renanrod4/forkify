import icons from 'url:../../img/icons.svg';

import View from './View';
import { RESULTS_PER_PAGE } from '../config';

class Pagination extends View {
	_parentElement = document.querySelector('.pagination');
	_generateMarkup() {
		const numPages = Math.ceil(this._data.results.length / RESULTS_PER_PAGE);
		if (this._data.page == 1 && numPages > 1) {
			return `
                <button class="btn--inline pagination__btn--next" )>
                    <span>Page ${this._data.page + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>

            `;
		}
		if (this._data.page > 1 && numPages > this._data.page) {
			return `
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${this._data.page - 1}</span>
                </button>
                <button class="btn--inline pagination__btn--next" )>
                    <span>Page ${this._data.page + 1}</span>
                    <svg class="search__icon">
                        <use href="${icons}#icon-arrow-right"></use>
                    </svg>
                </button>
            
            `;
		}
		if (this._data.page > 1 && numPages === this._data.page) {
			return `
                <button class="btn--inline pagination__btn--prev">
                    <svg class="search__icon">
                    <use href="${icons}#icon-arrow-left"></use>
                    </svg>
                    <span>Page ${this._data.page - 1}</span>
                </button>

            
            `;
		}
		return '';
	}

	addHandlerClick(handler) {
		this._parentElement.addEventListener('click',e => {
			const btn = e.target.closest('.btn--inline');
            if(!btn)return
			btn.className.includes('pagination__btn--prev') ? (this._data.page -= 1) : (this._data.page += 1)
           handler()
            
		});
	}
}
export default new Pagination();
