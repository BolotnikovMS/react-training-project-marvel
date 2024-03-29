import {Component} from "react";
import PropTypes from 'prop-types';

import Spinner from '../spinner/spinner'
import ErrorMessage from "../errorMessage/errorMessage";
import Skeleton from "../skeleton/skeleton";

import './charInfo.scss'

import MarvelService from "../../services/marvelService";

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.updateChar()
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar()
    }
  }

  updateChar = () => {
    const {charId} = this.props

    if (!charId) {
      return
    }

    this.onCharLoading()

    this.marvelService.getCharacter(charId).then(this.onCharLoaded).catch(this.onError)

    // this.foo.bar = 0 /// error test
  }

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false
    })
  }

  onCharLoading = () => {
    this.setState({loading: true})
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  render() {
    const {char, loading, error} = this.state

    const skeleton = char || loading || error ? null : <Skeleton/>
    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error || !char) ? <View char={char}/> : null

    return (
      <div className="char__info">
        {skeleton}
        {errorMessage}
        {spinner}
        {content}
      </div>
    )
  }
}

const View = ({char}) => {
  const {name, description, thumbnail, noImg, homepage, wiki, comics} = char

  return (
    <>
      <div className="char__basics">
        <img src={thumbnail} alt={name} style={noImg ? {objectFit: "contain"} : null} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">
        {description}
      </div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">
        {comics.length > 0 ? null : 'There is no comics for character'}
        {
          comics.map((item, i) => {
            if (i > 9) return
            return (
              <li key={i} className="char__comics-item">
                {item.name}
              </li>
            )
          })
        }
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  charId: PropTypes.number
}

export default CharInfo