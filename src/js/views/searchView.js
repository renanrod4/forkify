class SearchView {
	_parentElement = document.querySelector('form.search');
	_input = document.querySelector('.search__field');

	getQuery() {
		const query = this._input.value;
		this._clearInput();
		return query;
	}

	addHandlerSearch(handler) {
		this._parentElement.addEventListener('submit', e => {
			e.preventDefault();
			return handler();
		});
	}
	_clearInput() {
		this._input.value = '';
	}
	
}

export default new SearchView();
