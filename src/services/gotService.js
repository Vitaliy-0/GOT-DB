
export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResourse = async (url) => {
        const result = await fetch(`${this._apiBase}${url}`);
    
        if(!result.ok) {
            throw new Error(`Couldn't fetch ${url}, status: ${result.status}`)
        }
    
        return await result.json();
    };  

    getAllCharacters = async () => {
        const res = await this.getResourse('/characters?page=5&pageSize=10');
        return res.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResourse(`/characters/${id}`);
        return this._transformCharacter(res);   
    }

    getAllHouses = async () => {
        const houses = await this.getResourse(`/houses?page=10`);
        return houses.map(this._transformHouse);
    }

    getHouse = async (id) => {
        const house = await this.getResourse(`/houses/${id}`);
        return this._transformHouse(house);
    }

    isSet(data) {
        if(data && data != '') {
            return data
        } else {
            return 'no data('
        }
    }

    getAllBooks = async () => {
        const res = await this.getResourse(`/books/`);
        return res.map(this._trasformBook);
    }

    getBook = async (id) => {
        const book = await this.getResourse(`/books/${id}`);
        return this._trasformBook(book);
    }

    _extractId = (item) => {
        const idRegExpression = /\/([\d]*)$/;
        return item.url.match(idRegExpression)[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died),
            culture: this.isSet(char.culture)
        }
    }

    _transformHouse = (house) => {
        return {
            id: this._extractId(house),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            founded: this.isSet(house.founded),
            titles: this.isSet(house.titles),
            overlord: this.isSet(house.overlord),
            ancestralWeapons: this.isSet(house.ancestralWeapons)
        }
    }
    
    _trasformBook = (book) => {
        return {
            id: this._extractId(book),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        }
    }
}