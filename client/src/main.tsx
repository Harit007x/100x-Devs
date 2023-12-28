import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Spline from '@splinetool/react-spline';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <div>
        {/* <Spline
            style={{
                width:'100%',
                position:'fixed',
                zIndex:'-10',
                left:'0',
                right:'0',
            }}
            scene="https://prod.spline.design/R69JaJlmb3a13iN8/scene.splinecode" 
        /> */}
        <App />
    </div>
)
