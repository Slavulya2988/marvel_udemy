import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const {loading, request, error, clearError} = useHttp();

	const	_apiBase = 'https://gateway.marvel.com:443/v1/public/';
	const	_apiKey  = 'apikey=502a8f9406329dde74089757c4624e16';
	const	_baseOffset = 210;


	const getAllCharacters = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&${_apiKey}`);
		return res.data.results.map(_transformCharacter)
		}

	const getCharacter = async (id) => {
		const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
		return _transformCharacter(res.data.results[0]);
		}

	const getComics = async (id) => {
		const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
		console.log(_transformComics(res.data.results[0]));
	//	return res.data.results;
		}

	const getAllComics = async (offset = _baseOffset) => {
		const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&${_apiKey}`)
		// console.log(res.data.results.map(_transformComics));
		return res.data.results.map(_transformComics);
	}

	const _transformCharacter = (char) => {
		return {
			name: char.name,
			description: char.description ? `${char.description.slice(0,200)}...`: 'Опис відсутній ....',
			thumbnail:  char.thumbnail.path +'.'+ char.thumbnail.extension,
			homePage: char.urls[0].url,
			wiki: char.urls[1].url,
			id: char.id,
			comics: char.comics.items
		}
	}

	const _transformComics = (char) => {
		return {
			id: char.id,
			title: char.title ? char.title : 'Опис відсутній ....' ,
			thumbnail:  char.thumbnail.path +'.'+ char.thumbnail.extension,
			price: char.prices[0].price === 0 ? 'not avilable' :`${char.prices[0].price}$`
		}
	}

	return {getAllCharacters, getCharacter, loading, error, clearError, getAllComics, getComics};
}

export default useMarvelService;
