import { htmlToProps } from './utils';
import { listTemplate } from './templates';

class WorkRank {
  constructor(formElement, listElement, loadingElement) {
    this.searchForm = document.querySelector(formElement);
    this.resultsList = document.querySelector(listElement);
    this.spinner = document.querySelector(loadingElement);
  }

  setupFormListener() {
    this.searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      this.startLoading();
      this.resultsList.innerHTML = '';
      const search = this.searchForm.elements['search-input'].value;
      // console.log('search: ', search);
      fetch(`http://localhost:5000/?search=${search}`)
        .then((res) => res.json())
        .then((json) => json[1][0])
        .then((topic) => fetch(`http://localhost:5000/?titles=${topic}`))
        .then((contents) => contents.json())
        .then((res) =>
          htmlToProps(
            res?.query?.pages[Object.keys(res?.query?.pages)?.[0]].extract
          )
        )
        .then((props) => {
          this.stopLoading();
          return props.map((prop) => listTemplate(prop[0], prop[1])).join('');
        })
        .then((items) => {
          this.resultsList.innerHTML = items;
        })
        .catch(() => this.stopLoading());
    });
  }
  startLoading() {
    this.searchForm.elements['search-button'].disabled = true;
    this.spinner.classList.add('loading');
  }
  stopLoading() {
    this.searchForm.elements['search-button'].disabled = false;
    this.spinner.classList.remove('loading');
  }
}

export default WorkRank;
