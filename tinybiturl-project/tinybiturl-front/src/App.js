import { useEffect, useState } from 'react'
import React from 'react'
import validator from 'validator'
import './styles/style.css'



function App() {
  const [longurl, setLongurl] = useState('')
  const [shorturl, setShorturl] = useState('')
  //const [qr, setQr] = useState('')
  const [returnLongURL, setReturnLongURL] =useState('')
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isShown, setIsShown] = useState('');
 
  useEffect(() => {
    if (longurl.length< 10) {
        setIsButtonDisabled(true);
    }
    else {
        setIsButtonDisabled(false);
    }
 }, [longurl]);
  const handleClick = e =>
  {
    alert("Welcome to my app, more features coming soon...")
  }
  const handleSubmit = e => {
    e.preventDefault()
    if(longurl.length> 10 && validator.isURL(longurl))
    {
    fetch('http://localhost:8000/tinifyurl/', {
         method: 'POST',
         body: JSON.stringify({ 'longurl': longurl }),
         headers: { 'Content-Type': 'application/json' }
       })
        .then(res => res.json())
        .then(data => {
          setShorturl(data.shorturl)
          setReturnLongURL(data.longurl)
          //setQr(data.QR)
          setLongurl('')
        })
        setIsShown(current => !current);
 
      }
      else
      {
        alert('Please enter a valid URL format')
      }
  }
  
  return (
    <div>
      <div className='header'>
        <div classname="logo">
          <p className="title">TinyBitty Url</p>
        </div>
        <div classname="navigations">
          <a className="accountfunc" href="www.google.com" onClick={e=>handleClick(e)}>Hello</a>
        </div>
      </div>

      <div style={{textAlign:'center'}} className="container">
        <div>
          <div className={`inputarea ${isShown ? 'display-none' : 'display-block'}`}>
          <input type="text" name="longurl" className='textinput'  placeholder="https://example.com" pattern="https?://.*" value={longurl} onChange={e=>setLongurl(e.target.value)}/>
          <br></br>
          <button type="submit" className='button' onClick={e=>handleSubmit(e)} disabled={isButtonDisabled}>Short This Link</button>
          <p>Enter the URL that you wish to shorten</p>
          </div>
          <div className={`resultbox ${isShown ? 'display-block' : 'display-none'}`}>
            <p>Successfully Converted Long URL: {returnLongURL} To Short URL</p>
            {/* cant work as it has to be loaded as it need require..
            it cant be loaded outside of src as well
                        <img src={`.//Images/${qr}.png`} alt="QR CODE" width="200"></img>
            <img src={`../Images/${qr}.png`} alt="QR CODE" width="200"></img>
                        <img src={require('.//Images/OUNMZ.tinybittyurl.png')} alt="QR CODE" width="200"></img> 
            */}
            <p> &lt; COPY BELOW TO USE &gt;</p>
            <p>http://localhost:8000/{shorturl}</p>
            <p>OR CLICK BELOW</p>
            <p id="link" style={{cursor: "pointer"}} onClick={()=>window.open(returnLongURL)}>{shorturl}</p>        
            <p id="convertbtn" style={{cursor: "pointer"}} onClick={()=>window.open('http://localhost:3000/')}>Convert another URL</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
