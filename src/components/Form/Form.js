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
      <form className={styles.form}>
        <div>
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
            <input name="type" type="text" value={type} onChange={handleInputChange} />
          </label>
        </div>
        <div>
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
        <input className={styles.submit} type="submit" onClick={handleSubmit} />
      </form>
    </div>
  )
}

export default Form
