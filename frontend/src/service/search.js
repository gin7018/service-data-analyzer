
export class SearchService {
    port = 'http://127.0.0.1:4000/';

    constructor(http) { 
        this.http = http;
    }

    async fetchApiWithFilters({
                                  updatedYear, protocols,
                                  category, tags, rating, compare
                              }= {}) {
        let url = `${this.port}/search/api?updatedYear=${updatedYear}&protocols=${protocols.toString()}`;
        url += `&category=${category}&tags=${tags.toString()}&rating=${rating}&compare=${compare}`;
        return this.http.get(url);
    }
    
    async fetchApiWithKeywords(keywords) {
        let url = `${this.port}/search/api?keyword=${keywords.toString()}`;
        return this.http.get(url);
    }
    
    async fetchMashupWithFilters(updatedYear, apisUsed, tags) {
        let url = `${this.port}/search/mashup?updatedYear=${updatedYear}&apisUsed=${apisUsed}&tags=${tags}`;
        return this.http.get(url);
    }
    
    async fetchMashupWithKeywords(keywords) {
        let url = `${this.port}/search/mashup?keyword=${keywords.toString()}`;
        return this.http.get(url);
    }
    
    async fetchTopKApis(k) {
        let url = `${this.port}/search/api?k=${k}`;
        return this.http.get(url);
    }
    
    async fetchTopKMashups(k) {
        let url = `${this.port}/search/mashups?k=${k}`;
        return this.http.get(url);
    }

}