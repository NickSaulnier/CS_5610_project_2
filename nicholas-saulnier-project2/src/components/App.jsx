import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Game from './Game';
import Home from './Home';
import NavBar from './NavBar';
import Provider from './Provider';
import Rules from './Rules';

import '../styles/App.css'

export default function App() {

    return (
        <Provider>
            <div id='app-container'>
                <BrowserRouter>
                    <NavBar />
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/rules" element={<Rules/>} />
                        <Route path="/game" element={<Game/>} />
                    </Routes>
                </BrowserRouter>
            </div>
        </Provider>
    );
}
