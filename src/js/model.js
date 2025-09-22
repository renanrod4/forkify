import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
	recipe: {},
	search: {
		query: '',
		results: [],
		page: 1,
		resultsPerPage: RESULTS_PER_PAGE,
	},
	bookmarks: [],
};

export const loadRecipe = async function (id) {
	try {
		const data = await getJSON(`${API_URL}/${id}`);

		let { recipe } = data.data;
		state.recipe = {
			id: recipe.id,
			title: recipe.title,
			publisher: recipe.publisher,
			sourceUrl: recipe.source_url,
			image: recipe.image_url,
			servings: recipe.servings,
			cookingTime: recipe.cooking_time,
			ingredients: recipe.ingredients,
		};
		if (state.bookmarks.some(bm => bm.id == state.recipe.id)) {
			state.recipe.bookmarked = true;
		}
	} catch (error) {
		throw error;
	}
};

export const loadSearchResult = async function (query) {
	try {
		state.search.query = query;
		const data = await getJSON(`${API_URL}/?search=${query}`);
		state.search.results = data.data.recipes.map(recipe => {
			return {
				id: recipe.id,
				image: recipe.image_url,
				publisher: recipe.publisher,
				title: recipe.title,
			};
		});
	} catch (error) {
		throw error;
	}
};

export const getSearchResultPage = function (page = state.search.page) {
	//page é a pagina atual do resultsView
	state.search.page = page;
	const start = (page - 1) * state.search.resultsPerPage;
	const end = page * state.search.resultsPerPage;

	return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
	state.recipe.ingredients.forEach(ing => {
		ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
	});
	state.recipe.servings = newServings;
};

export const addBookmark = function (recipe) {
	state.bookmarks.push(recipe);
	if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
};
export const removeBookmark = function (recipe) {
	const indexOfRecipe = state.bookmarks.findIndex(bm => bm.id === recipe.id);

	if (indexOfRecipe == -1) return;

	state.bookmarks.splice(indexOfRecipe, 1);

	if (recipe.id === state.recipe.id) state.recipe.bookmarked = false;
};
