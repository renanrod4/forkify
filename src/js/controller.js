import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
const recipeContainer = document.querySelector('.recipe');

// if (module.hot) {
// 	module.hot.accept();
// }

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
	try {
		const id = window.location.hash.slice(1);

		if (!id) return;

		recipeView.renderSpinner();

		resultsView.update(model.getSearchResultPage());

		await model.loadRecipe(id);

		recipeView.render(model.state.recipe);
	} catch (error) {
		recipeView.renderError("We couldn't find that recipe, please try another one!");
	}
};

const controlSearchResults = async function () {
	try {
		const query = searchView.getQuery();

		if (!query) return;
		resultsView.renderSpinner();

		await model.loadSearchResult(query);

		resultsView.render(model.getSearchResultPage(1));
		paginationView.render(model.state.search);
	} catch (error) {
		console.log(error);
	}
};

const controlPagination = function () {
	resultsView.render(model.getSearchResultPage(model.state.search.page));
	paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
	model.updateServings(newServings);
	// recipeView.render(model.state.recipe);
	recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
	if (model.state.recipe.bookmarked) {
		model.removeBookmark(model.state.recipe);
	}else{
		model.addBookmark(model.state.recipe);
	}
	// model.state.recipe.bookmarked ?console.log("Bookmark adicionado"):console.log("Bookmark removido");
	recipeView.update(model.state.recipe);
	
	bookmarksView.render(model.state.bookmarks)
};

// Inicialização do site
const init = function () {
	recipeView.addHandlerRender(controlRecipes);
	recipeView.addHandlerUpdateServings(controlServings);
	searchView.addHandlerSearch(controlSearchResults);
	paginationView.addHandlerClick(controlPagination);
	recipeView.addHandlerAddBookmark(controlAddBookmark);
};
init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
