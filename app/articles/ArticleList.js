import React, {ListView, Text} from 'react-native';
import ArticleListStyleSheet from './ArticleListStyleSheet';
import HackerNews from '../api/HackerNews';

import ArticleStore from './ArticleStore';
import ArticleActions from './ArticleActions';
import ArticleRow from './ArticleRow';



class ArticleList extends React.Component {

  constructor(props) {
    super(props);

    this.articlesDataSource = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
  }

  componentWillMount() {
    this.updateArticles();
  }

  componentDidMount() {
    ArticleStore.addArticlesChangeListener(this.updateArticles.bind(this));
    ArticleActions.getArticles();
  }

  componentWillUnmount() {
    ArticleStore.removeArticlesChangeListener(this.updateArticles.bind(this));
  }

  updateArticles() {
    console.log('Update articles', ArticleStore.getArticles());
    this.setState({
      articles: this.articlesDataSource.cloneWithRows(
        ArticleStore.getArticles().slice(0, 10))
    });
  }

  renderRow(rowData, sectionID, rowID, highlightRow) {
    console.log('highlight', rowData, sectionID, rowID, highlightRow);
    return (
      <ArticleRow
        articleId={rowData}
        highlightRowFn={highlightRow} />
    );
  }

  render() {

    if (!this.state) return (<Text>Loading...</Text>);

    return (
      <ListView
        dataSource={this.state.articles}
        initialListSize={10}
        renderRow={this.renderRow} />
    )

  }


}


module.exports = ArticleList;
