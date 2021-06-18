import WordRank from './WordRank';

const wordRank = new WordRank('#search-form', '.word-ranks', '.spinner');
wordRank.setupFormListener();
