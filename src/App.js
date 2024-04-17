import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// Spoiler

const Spoiler = ({header="+", open = true, children}) => {
    const [isOpen, setOpen] = useState(open)

    const changeOpen = () => setOpen(!isOpen)

    return (
        <div>
            <div onClick={changeOpen} style={{cursor: "pointer"}}>{header}</div>
            {isOpen && <div>{children}</div>}
        </div>
    )
}

// RangeInput

const RangeInput = ({min, max, ...otherProps}) => {
    const [range, setRange] = useState('')
    
    return(
        <input {...otherProps}
            style={{borderColor: (range >= min && range <= max ? '' : 'red')}}
            onChange={event => setRange(event.target.value.length)}
        />
    )
}

// LoginForm

const LoginForm = ({onLogin = () => console.log('onLogin does\'nt work')}) => {
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    return(
        <div>
            <input
            type='text'
            placeholder='Login'
            value={login} 
            onChange={event => setLogin(event.target.value)}
            />

            <input
            type='password'
            placeholder='Password'
            value={password} 
            onChange={event => setPassword(event.target.value)}
            />
            
            <button
            disabled={(login.length >= 3 && login.length <= 20 && password.length >= 6 && password.length <= 20 ? false : true)}
            onClick={() => onLogin({login, password})}>Log in</button>
        </div>
    )
}

// PasswordConfirm

const PasswordConfirm = ({min}) => {
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')

    return(
        <div>
            <input
            type='password'
            placeholder='Password'
            style={{borderColor: (password1 === password2) && (password1.length >= min) ? '' : 'red'}}
            value={password1} 
            onChange={event => setPassword1(event.target.value)}
            />
            <input
            type='password'
            placeholder='Confirm password'
            style={{borderColor: (password1 === password2) && (password2.length >= min) ? '' : 'red'}}
            value={password2} 
            onChange={event => setPassword2(event.target.value)}
            />
        </div>
    )
}

// Carousel

const Carousel = ({images}) => {
    const [currentImage, setCurrentImage] = useState(0);

    const goToPreviousImage = () => setCurrentImage((currentImage - 1 + images.length) % images.length)

    const goToNextImage = () => setCurrentImage((currentImage + 1) % images.length)

    return (
<div>
    <div id='carousel'>
        <img src={images[currentImage]} style={{ maxWidth: '100%'}}/>
        <div id='goToPreviousImage' onClick={goToPreviousImage}>{'❮'}</div>
        <div id='goToNextImage' onClick={goToNextImage} >{'❯'}</div>
    </div>
    <Thumbnails images={images} current={currentImage} onChange={index => setCurrentImage(index)} />
</div>
    )
}

const Thumbnails = ({images, current, onChange}) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            {images.map((image, index) => (
                <img
                    src={image}
                    style={{ width: '50px', height: '50px', margin: '0 5px', border: index === current ? '2px solid red' : 'none', cursor: 'pointer' }}
                    onClick={() => onChange(index)}
                />
            ))}
        </div>
    )
}

// Pagination

const Content = ({page}) => 
<div style={{fontSize: '5em'}}>
    Сторінка №{page}
</div>

const Color = ({page}) =>
<div style={{color: `rgb(${page*16},${page*16},${page*16})`}}>
    {page}
</div>

const Pagination = ({max, render}) => {
    const [page, setPage] = useState(1)
    
    const Render = render

    const pages = []

    for(let i = 1; i <= max; i++){
        pages.push(<button disabled={page === i} onClick={() => setPage(i)}>{i}</button>)
    }

    return(
        <div>
            <Render page={page} />
            <button disabled={page === 1} onClick={() => setPage(1)}>{'<<'}</button>
            <button disabled={page === 1} onClick={() => setPage(page - 1)}>{'<'}</button>
            {pages}
            <button disabled={page === max} onClick={() => setPage(page + 1)}>{'>'}</button>
            <button disabled={page === max} onClick={() => setPage(max)}>{'>>'}</button>
        </div>
    )
}

function App() {
    return (
        <div className="App">
            <Spoiler header={<h1>Заголовок</h1>} open>
                Контент 1
                <p>
                    лорем іпсум тралівалі і тп.
                </p>
            </Spoiler>
            <Spoiler>
                <h2>Контент 2</h2>
                <p>
                    лорем іпсум тралівалі і тп.
                </p>
            </Spoiler>
            <hr/>
            <RangeInput min={2} max={10}/>
            <hr/>
            <LoginForm onLogin={obj => console.log(obj)}/>
            <hr/>
            <PasswordConfirm min={2}/>
            <hr/>
            <Carousel images={["https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-1.jpg",
          "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-2.jpg",
          "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-3.jpg",
          "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-4.jpg",
          "https://ukrainetrek.com/blog/wp-content/uploads/2016/12/top-10-photos-ukrainian-nature-2016-5.jpg"]} />
            <hr/>
            <Pagination max={10} render={Content} />
            <Pagination max={16} render={Color} />
        </div>
    );
}

export default App;
