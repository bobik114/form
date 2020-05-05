import React, {useState} from 'react'
import Linki from './Linki/Linki'
import styles from './Form.module.scss'

function Form() {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [type, setType] = useState('')
  const [imgUrl, setImgUrl] = useState('')
  const [imgUrlList, setImgUrlList] = useState([])
  const [link, setLink] = useState('')

  const handleUrlAdd = (e) => {
    e.preventDefault()
    
    if(imgUrl !== '') {
      setImgUrlList(prevState => [...prevState, imgUrl])
      setImgUrl('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const review = {  
      title: title,
      descr: description,
      price: price,
      type: type,
      imgUrl: imgUrlList,
      link: link,
    }
  
    fetch('https://reviews-sarasarna.firebaseio.com/reviews.json', {
        method: 'POST',
        body: JSON.stringify(review),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            console.log('Operation completed!');
        } else if (data.status === "error") {
            console.log(data.errors[0].msg);
        }
    })
    .catch(error => {
        console.log(error);
    })
    .then(alert("Przesłano"))
    .then(window.location.reload())

  }
  
  const handleInputChange = (e) => {
    
    switch(e.currentTarget.name) {
      case 'title': {
        setTitle(e.currentTarget.value)
        break
      }
      case 'description': {
        setDescription(e.currentTarget.value)
        break
      }
      case 'price': {
        setPrice(e.currentTarget.value)
        break
      }
      case 'type': {
        setType(e.currentTarget.value)
        break
      }
      case 'imgUrl': {
        setImgUrl(e.currentTarget.value)
        break
      }
      case 'link': {
        setLink(e.currentTarget.value)
        break
      }
      default: {
        console.log("Error, wrong type in switch statement")
      }
    }
  }

  return (
    <div className="App">
      <h1 className={styles.header}>Dodaj nową recenzję</h1>
      <form className={styles.form}>
        <div className={styles.inputs_wrapper}>
          <div className={styles.inputs_section}>
            <label>
              Tytuł:
              <input name="title" type="text" value={title} onChange={handleInputChange}/>
            </label>
            <label>
              Opis:
              <textarea name="description" value={description} type="text" onChange={handleInputChange}/>
            </label>
            <label>
              Cena:
              <input name="price" type="text" value={price} onChange={handleInputChange} />
            </label>
            <label>
              Typ: 
              <select name="type" onChange={handleInputChange}>
                <option value="dress">Sukienka</option>
                <option value="schoes">Buty</option>
                <option value="coat">Płaszcz</option>
                <option value="others">Inne</option>
                <option value="scarf">Szale</option>
                <option value="fitness">Fitness</option>
                <option value="jewelery">Biżuteria</option>
                <option value="makeup">MakeUp</option>
                <option value="vest">Kamizelki</option>
                <option value="jacket">Kurtki</option>
                <option value="sweater">Swetry</option>
                <option value="blazer">Marynarki</option>
                <option value="skirt">Spódniczki</option>
                <option value="swimsuit">Stroje kąpielowe</option>
                <option value="jacket">Kurtki</option>
                <option value="bags">Torebki</option>
                <option value="pyjama">Piżamy</option>
                <option value="romper">Kombinezon</option>
              </select>
            </label>
          </div>
          <div className={styles.inputs_section}>
            <Linki imgUrlList={imgUrlList}/>
            <label>
              Link do zdjęcia:
              <input name="imgUrl" value={imgUrl} type="text" onChange={handleInputChange} />
            </label>
            <button onClick={handleUrlAdd} >Dodaj url</button>
            <label>
              reflink:
              <input name="link" type="text" value={link} onChange={handleInputChange} />
            </label>
          </div>
        </div>
        <input className={styles.submit} type="submit" onClick={handleSubmit} />
      </form>
    </div>
  )
}

export default Form
