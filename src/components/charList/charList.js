import {Component} from "react";
import PropTypes from 'prop-types';

import Spinner from '../spinner/spinner'
import ErrorMessage from "../errorMessage/errorMessage";

import './charList.scss'

import MarvelService from "../../services/marvelService";

class CharList extends Component {
  state = {
    characters: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 210,
    charEnded: false
  }

  marvelService = new MarvelService()

  componentDidMount() {
    this.onRequest()
  }

  onRequest = (offset) => {
    this.onCharListLoading()
    this.marvelService.getAllCharacters(offset).then(this.onCharactersLoaded).catch(this.onError)
  }

  onCharListLoading = () => {
    this.setState({
      newItemLoading:  true
    })
  }

  onCharactersLoaded = (newCharacters) => {
    let ended = false

    if (newCharacters.length < 9) {
      ended = true
    }

    this.setState(({offset, characters}) => ({
      characters: [...characters, ...newCharacters],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended
    }))
  }

  onError = () => {
    this.setState({
      loading: false,
      error: true
    })
  }

  itemRef = []

  setSelectedCardRef = ref => {
    this.itemRef.push(ref)
  }

  focusCard = (indexChar) => {
    this.itemRef.filter((item, i) => {
      if (i === indexChar) {
        item.classList.add('char__item_selected')
      } else {
        item.classList.remove('char__item_selected')
      }
    })

    this.itemRef[indexChar].focus()
  }

  renderItems(arr) {
    const items = arr.map((item, i) => {
      let imgStyle = {'objectFit' : 'cover'};
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'unset'};
      }

      return (
        <li
          className="char__item"
          key={item.id}
          tabIndex={0}
          ref={this.setSelectedCardRef}
          onClick={() => {
            this.props.onCharSelected(item.id)
            this.focusCard(i)
          }}
          onKeyPress={(e) => {
           if (e.key === ' ' || e.key === 'Enter') {
             this.props.onCharSelected(item.id)
             this.focusCard(i)
           }
          }}
        >
          <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
          <div className="char__name">{item.name}</div>
        </li>
      )
    });
    // А эта конструкция вынесена для центровки спиннера/ошибки
    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }

  render() {
    const {characters, loading, error, offset, newItemLoading, charEnded} = this.state

    const items = this.renderItems(characters)

    const errorMessage = error ? <ErrorMessage/> : null
    const spinner = loading ? <Spinner/> : null
    const content = !(loading || error) ? items : null

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long" disabled={newItemLoading} style={{'display': charEnded ? 'none' : 'block'}} onClick={() => this.onRequest(offset)}>
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired
}

export default CharList

// const CardChar = ({character, onCharSelected}) => {
//   const {name, thumbnail, noImg} = character
//
//   return (
//     <li className="char__item " onClick={onCharSelected}>
//       <img src={thumbnail} alt={name} style={noImg ? {objectFit: "unset"} : null}/>
//       <div className="char__name">{name}</div>
//     </li>
//   )
// }
//
// const ListCardsChars = ({characters, onCharSelected}) => {
//   const listChar = characters.map(character => {
//     const id = character.id
//     return (
//       <CardChar key={character.id} id={id} character={character} onCharSelected={() => onCharSelected(id)}/>
//     )
//   })
//
//   return (
//     <ul className="char__grid">
//       {listChar}
//     </ul>
//   )
// }