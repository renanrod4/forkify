import icons from 'url:../../img/icons.svg';

export default class View {
	_data;
	_errorMessage = 'Something went wrong, try another recipe';
	render(data) {
		if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();

		this._data = data;
		const markup = this._generateMarkup();
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	update(data) {
		
		this._data = data;
		const newmarkup = this._generateMarkup();

		const newDOM = document.createRange().createContextualFragment(newmarkup);
		const newElements = Array.from(newDOM.querySelectorAll('*'));
		const curElements = Array.from(this._parentElement.querySelectorAll('*'));
		newElements.forEach((el, i) => {
			let curEl = curElements[i];
			if (!el.isEqualNode(curEl) && el.firstChild?.nodeValue.trim() != '') {
				curEl.textContent = el.textContent;
			}
			if (!el.isEqualNode(curEl)) {
				Array.from(el.attributes).forEach(attr => {
					curEl.setAttribute(attr.name, attr.value);
				});
			}
		});
	}

	_clear() {
		this._parentElement.innerHTML = '';
	}
	renderSpinner() {
		const markup = `
        <div class="spinner">
        <svg>
        <use href="${icons}#icon-loader"></use>
        </svg>
        </div>
        `;
		this._parentElement.innerHTML = '';
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}
	renderError(message = this._errorMessage) {
		const markup = `
            <div class="error">
                <div>
                    <svg>
                        <use href="${icons}#icon-alert-triangle"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}

	renderMessage(message) {
		const markup = `
            <div class="message">
                <div>
                    <svg>
                        <use href="${icons}#icon-smile"></use>
                    </svg>
                </div>
                <p>${message}</p>
            </div>
        `;
		this._clear();
		this._parentElement.insertAdjacentHTML('afterbegin', markup);
	}
}
