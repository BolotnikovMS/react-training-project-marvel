
class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public/'
  _apiKey = ''
  _baseOffset = 210

  getResource = async (url) => {
    let res = await fetch(url)

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status: ${res.status}`)
    }

    return await res.json()
  }

  getAllCharacters = async (offset = this._baseOffset) => {
    const result = await this.getResource(`${this._apiBase}characters?limit=9&offset=${offset}&${this._apiKey}`)

    // С помощью метода map создаем новый массив с модифицированными данными с помощью коллбек функции
    return result.data.results.map(this._transformCharacter)
  }

  getCharacter = async (id) => {
    const result = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`)

    // console.log(result.data.results[0])
    return this._transformCharacter(result.data.results[0])
  }

  _transformCharacter = (char) => {
     return {
       id: char.id,
       name: char.name,
       description: char.description ? `${char.description.slice(0, 210)}...` : 'There is no description for this character',
       thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
       noImg: char.thumbnail.path.slice(-19) === 'image_not_available',
       homepage: char.urls[0].url,
       wiki: char.urls[1].url,
       comics: char.comics.items
    }
  }
}

export default MarvelService