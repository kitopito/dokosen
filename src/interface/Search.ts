export interface Searchable {
    targetSentence: string;
}
/*
export interface SearchModel {
    searchResult: Array<Searchable>;
    search: (keywordInput: string, searchData: Array<Searchable>) => void;
}
*/

export class SearchModelImpl<T extends Searchable> {
    private keywordInput: string = '';
    private kewwordList: Array<string> = [];
    private _searchResult: Array<T> = [];

    get searchResult() {return this._searchResult;};

    search(keywordInput: string, searchData: Array<T>): void {
        const kewwordList = this.toWordList(keywordInput);

        const keywordExists = 
            keywordInput != '' &&
            keywordInput != null &&
            kewwordList.length != 0;

        if(keywordExists == false) {
            this._searchResult = searchData;
            return;
        }
        
        const filteredResults = searchData.filter(item => {
            const allKeywordsMatch: boolean = kewwordList.every(keyword => {
                return item.targetSentence.includes(keyword);
            });
            return allKeywordsMatch;
        });
        this._searchResult = filteredResults;
    }
    
    private toWordList(keywordInput: string): Array<string> {
        const wordList = keywordInput.replace(/[ 　]+/g, ' ').trim().split(' ');
        this.kewwordList = wordList;
        return wordList;
    }
}