import {Component} from "react";

import AppHeader from "../appHeader/appHeader";
import RandomChar from "../randomChar/randomChar";
import CharList from "../charList/charList";
import CharInfo from "../charInfo/charInfo";
import ErrorBoundray from "../errorBoundray/errorBoundray";

import decoration from '../../resources/img/vision.png'

class App extends Component {
  state ={
    selectedChar: null
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id
    })
  }

  render() {
    return (
      <div className="app">
        <AppHeader/>
        <main>
          <ErrorBoundray>
            <RandomChar/>
          </ErrorBoundray>
          <div className="char__content">
            <ErrorBoundray>
              <CharList onCharSelected={this.onCharSelected}/>
            </ErrorBoundray>
            <ErrorBoundray>
              <CharInfo charId={this.state.selectedChar}/>
            </ErrorBoundray>
            <img className="bg-decoration" src={decoration} alt="vision" />
          </div>
        </main>
      </div>
    )
  }
}

export default App