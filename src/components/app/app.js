import AppHeader from "../appHeader/appHeader";
import RandomChar from "../randomChar/randomChar";
import CharList from "../charList/charList";
import CharInfo from "../charInfo/charInfo";

import decoration from '../../resources/img/vision.png'

const App = () => {
  return (
    <div className="app">
      <AppHeader/>
      <main>
        <RandomChar/>
        <div className="char__content">
          <CharList/>
          <CharInfo/>
          <img className="bg-decoration" src={decoration} alt="vision" />
        </div>
      </main>
    </div>
  )
}

export default App