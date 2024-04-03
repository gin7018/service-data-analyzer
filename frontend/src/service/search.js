
export class SearchService {
    port = 'http://127.0.0.1:4000';

    constructor(http) { 
        this.http = http;

        this.headers = new Headers();

        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Accept', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    async fetchApiWithFilters({
                                  updatedYear, protocols,
                                  category, tags, rating, compare
                              }= {}) {
        let url = `${this.port}/search/api?updatedYear=${updatedYear || ''}&protocols=${protocols || ''}`;
        url += `&category=${category || ''}&tags=${tags || ''}&rating=${rating || ''}&compare=${compare || ''}`;
        return fetch(url)
            .then(response => response.json());
    }
    
    async fetchApiWithKeywords(keywords) {
        let url = `${this.port}/search/api/keywords?keywords=${keywords || ''}`;
        return fetch(url).then(response => response.json());
    }
    
    async fetchMashupWithFilters({updatedYear, apisUsed, tags} = {}) {
        let url = `${this.port}/search/mashup?updatedYear=${updatedYear || ''}&apisUsed=${apisUsed || ''}&tags=${tags || ''}`;
        return fetch(url).then(response => response.json());
    }
    
    async fetchMashupWithKeywords(keywords) {
        let url = `${this.port}/search/mashup/keywords?keywords=${keywords || ''}`;
        return fetch(url).then(response => response.json());
    }
    
    async fetchTopKApis(k) {
        let url = `${this.port}/search/api/top/${k}`;
        return fetch(url).then(response => response.json());
    }
    
    async fetchTopKMashups(k) {
        let url = `${this.port}/search/mashup/top/${k}`;
        return fetch(url).then(response => response.json());
    }

}