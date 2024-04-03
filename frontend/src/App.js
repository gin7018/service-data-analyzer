import './App.css';
import {Component} from "react";
import './data/filters';
import {SearchService} from "./service/search";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            SEARCH_RESULTS: [],
            MASHUP_SEARCH_RESULTS: [],
        }

        this.searchService = new SearchService();
    }



    async fetchApisWithFilters() {
        let updatedYear = document.getElementById('updated1').value;
        let protocols = document.getElementById('protocols1').value;
        let category = document.getElementById('category1').value;
        let tags = document.getElementById('tags1').value;
        let rating = document.getElementById('rating1').value;
        console.log('values ' + {updatedYear, protocols, category, tags, rating});
        let results = await this.searchService.fetchApiWithFilters(
            {updatedYear, protocols, category, tags, rating});
        this.setState( () => ({
            SEARCH_RESULTS: results
        }));
    }

    async fetchApisWithKeywords() {
        let keywords = document.getElementById('keywords1').value;
        let results = await this.searchService.fetchApiWithKeywords(keywords);
        this.setState(() => ({
            SEARCH_RESULTS: results
        }));
    }

    async fetchMashupsWithFilters() {
        let updatedYear = document.getElementById('updated2').value;
        let apisUsed = document.getElementById('apisUsed').value;
        let tags = document.getElementById('tags2').value;

        console.log('values ' + updatedYear, tags, apisUsed);
        let results = await this.searchService.fetchMashupWithFilters(
            {updatedYear, apisUsed, tags});
        this.setState( () => ({
            MASHUP_SEARCH_RESULTS: results
        }));
    }

    async fetchMashupsWithKeywords() {
        let keywords = document.getElementById('keywords2').value;
        let results = await this.searchService.fetchMashupWithKeywords(keywords);
        this.setState(() => ({
            MASHUP_SEARCH_RESULTS: results
        }));
    }

    async fetchTopKApis() {
        let kValue = document.getElementById('topK1').value;
        let results = await this.searchService.fetchTopKApis(kValue);
        this.setState(() => ({
            SEARCH_RESULTS: results
        }));
    }

    async fetchTopKMashups() {
        let kValue = document.getElementById('topK2').value;
        let results = await this.searchService.fetchTopKMashups(kValue);
        this.setState(() => ({
            MASHUP_SEARCH_RESULTS: results
        }));
    }
    
    render() {
        return (
            <div>
                <div className="title">
                    <h2>ProgrammableWeb Catalog</h2>
                </div>

                <div className="searchApis">
                    <h2>API SEARCH</h2>
                    <form className="apiForm">
                        <label>
                            UPDATED YEAR <br/><input id="updated1" type="number"/><br/>
                        </label>
                        <label>
                            PROTOCOLS <br/><input id="protocols1" type="text" placeholder="must be comma separated"/><br/>
                        </label>
                        <label>
                            CATEGORY <br/><input id="category1" type="text" placeholder=""/><br/>
                        </label>
                        <label>
                            TAGS <br/><input id="tags1" type="text" placeholder="must be comma separated"/><br/>
                        </label>
                        <label>
                            RATING <br/><input id="rating1" type="text" placeholder="[lt, gt, eq]: <number>"/><br/>
                        </label>

                    </form>
                    <button id="submitApiSearch" onClick={() => this.fetchApisWithFilters()}>SUBMIT</button> <br/><br/>

                    <div>
                        <label>
                            KEYWORDS <input id="keywords1" type="text" placeholder="must be comma separated"/>
                            <button id="submitApiKeywordSearch" type="submit" onClick={() =>
                                this.fetchApisWithKeywords()}>SUBMIT</button> <br/>
                        </label>

                        <label>
                            TOP K APIS <input id="topK1" type="number"/>
                            <button id="submitTopKSearch" type="submit" onClick={() => this.fetchTopKApis()}>SUBMIT</button>
                        </label>
                    </div>

                    <div className="results-area">
                        <div >
                            {this.state.SEARCH_RESULTS.map(result => (<pre>{result.name}</pre>))}
                        </div>
                    </div>

                </div>

                <div className="searchMashups">
                    <h2>MASHUP SEARCH</h2>
                    <form>
                        <label>
                            UPDATED YEAR <br/> <input id="updated2" type="number"/> <br/>
                        </label>
                        <label>
                            APIS USED <br/> <input id="apisUsed" type="text" placeholder="must be comma separated"/> <br/>
                        </label>
                        <label>
                            TAGS <br/> <input id="tags2" type="text" placeholder="must be comma separated"/> <br/>
                        </label>
                    </form>
                    <button id="submitMashupSearch" onClick={() => this.fetchMashupsWithFilters()}>SUBMIT</button> <br/><br/>

                    <div className="topKeyword">
                        <label>
                            KEYWORDS <input id="keywords2" type="text" placeholder="must be comma separated"/>
                            <button id="submitMashupKeywordSearch" type="submit" onClick={() =>
                                this.fetchMashupsWithKeywords()}>SUBMIT</button>
                        </label>

                        <label>
                            TOP K MASHUPS<input id="topK2" type="number"/>
                            <button id="submitTopMashupKSearch" type="submit" onClick={() =>
                                this.fetchTopKMashups()}>SUBMIT</button>
                        </label>
                    </div>

                    <div className="results-area">
                        <div >
                            {this.state.MASHUP_SEARCH_RESULTS.map(result => (<pre>{result.name}</pre>))}
                        </div>
                    </div>

                </div>

                {/*<div className="section">*/}
                {/*    <div className="filter-bar">*/}


                {/*        <h4>PROTOCOLS</h4>*/}
                {/*        <div className="protocols">*/}
                {/*            <div >*/}
                {/*                {PROTOCOLS.map(protocol => (<p onClick={*/}
                {/*                    () => this.fetchApisWithFilters({protocols: protocol})*/}
                {/*                }>{protocol}</p>))}*/}
                {/*            </div>*/}
                {/*        </div>*/}

                {/*        <h4>CATEGORIES</h4>*/}
                {/*        <div className="categories">*/}
                {/*            <div >*/}
                {/*                {CATEGORIES.map(category => (<p onClick={*/}
                {/*                    () => this.fetchApisWithFilters({category: category})*/}
                {/*                }>{category}</p>))}*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*    </div>*/}



                {/*</div>*/}

            </div>

        );
    }


}

export default App;
