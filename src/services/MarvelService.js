import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {
	const {loading, request, error} = useHttp();

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
	return {getAllCharacters, getCharacter, loading, error};
}

export default useMarvelService;
