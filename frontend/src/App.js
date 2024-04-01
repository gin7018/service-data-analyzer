import './App.css';
import {Component} from "react";
import './data/filters';
import {CATEGORIES, PROTOCOLS} from "./data/filters";
import {SearchService} from "./service/search";

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            SEARCH_RESULTS: [
                "api # 2",
                "api # 2",
                "api # 2",
                "api # 2",
                "api # 2",
            ]
        }

        this.searchService = new SearchService();
    }

    fetchApisWithFilters({
                             updatedYear, protocols,
                             category, tags, rating, compare
                         } = {}) {
        this.result = [];
        this.setState(async () => {
            this.state.SEARCH_RESULTS = await this.searchService.fetchApiWithFilters(
                {updatedYear, protocols, category, tags, rating, compare});
        })
    }

    fetchApisWithKeywords(keywords) {
        this.result = [];
        this.searchService.fetchApiWithKeywords(keywords)
            .subscribe(results => this.result = results);
    }

    fetchMashupsWithFilters({updatedYear, apisUsed, tags} = {}) {
        this.result = [];
        this.searchService.fetchMashupWithFilters(updatedYear, apisUsed, tags)
            .subscribe(results => this.result = results);
    }

    fetchMashupsWithKeywords(keywords) {
        this.result = [];
        this.searchService.fetchMashupWithKeywords(keywords)
            .subscribe(results => this.result = results);
    }

    fetchTopKApis(k) {
        this.result = [];
        this.searchService.fetchTopKApis(k)
            .subscribe(results => this.result = results);
    }

    fetchTopKMashups(k) {
        this.result = [];
        this.searchService.fetchTopKMashups(k)
            .subscribe(results => this.result = results);
    }
    
    render() {
        return (
            <div>
                <div className="title">
                    <h2>ProgrammableWeb Catalog</h2>
                </div>
                <div className="search-bar">
                    <input className="input" placeholder="search something..." type="search"/>
                </div>
                <div className="section">
                    <div className="filter-bar">
                        <label htmlFor="updated">
                            YEAR LAST UPDATED
                            <input id="updated" className="updated" type="number"/>
                        </label>

                        <label htmlFor="tags">
                            TAG
                            <input id="tags" className="tags" type="text"/>
                        </label>

                        <label htmlFor="rating">
                            RATINGS
                            <input id="rating1" className="rating" type="button" value="HIGHER THAN"/><br/>
                            <input id="rating2" className="rating" type="button" value="EQUAL TO"/><br/>
                            <input id="rating3" className="rating" type="button" value="LOWER THAN"/><br/>
                            <input id="rating" className="rating" type="number"/><br/>
                        </label> <br/>

                        <h4>PROTOCOLS</h4>
                        <div className="protocols">
                            <div >
                                {PROTOCOLS.map(protocol => (<p onClick={
                                    () => this.fetchApisWithFilters({protocols: protocol})
                                }>{protocol}</p>))}
                            </div>
                        </div>

                        <h4>CATEGORIES</h4>
                        <div className="categories">
                            <div >
                                {CATEGORIES.map(category => (<p onClick={
                                    () => this.fetchApisWithFilters({category: category})
                                }>{category}</p>))}
                            </div>
                        </div>
                    </div>

                    <div className="results-area">
                        <div >
                            {this.state.SEARCH_RESULTS.map(result => (<p>{result}</p>))}
                        </div>
                    </div>

                </div>

            </div>

        );
    }


}

export default App;
