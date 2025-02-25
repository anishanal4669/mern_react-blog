import React from 'react';
import i18n from '../i18n';
import PropTypes from 'prop-types';
import {Translation} from 'react-i18next';
import {Link} from 'react-router-dom';

/* eslint-disable */
export default class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toggleNavState: false,
            dropdownState:  false,
            language:       'English'
        };
    }

    componentDidMount = () => {
        let pathname = window.location.pathname;
        let index = pathname.lastIndexOf('/');
        let nav = pathname.substr(1);

        if (index > 0) {
            nav = pathname.substr(1, index - 1);
        }

        if (nav === '') {
            nav = 'home';
        }
        this.clearActive(nav);
    }

    showCollapsedMenu = () => {
        this.setState(previousState => ({
            toggleNavState: !previousState.toggleNavState
        }), () => {

            if (this.state.toggleNavState) {
                document.getElementById('navbarTogglerDemo03').classList.add('show');
            } else {
                document.getElementById('navbarTogglerDemo03').classList.remove('show');
            }
        });
    };

    showDropDown = () => {
        this.setState(previousState => ({
            dropdownState: !previousState.dropdownState
        }), () => {

            if (this.state.dropdownState) {
                document.getElementById('dropdownMenu').classList.add('show');
            } else {
                document.getElementById('dropdownMenu').classList.remove('show');
            }
        });
    };

    changeLanguage = (lng) => {
        let language = '';
        switch (lng) {
            case 'en': {
                language = 'English';
                break;
            }
            case 'ma': {
                language = 'Marathi';
                break;
            }
            case 'hi': {
                language = 'Hindi';
                break;
            }
            default: {
                language = 'English';
                break;
            }
        }

        this.setState(previousState => ({
            language,
            dropdownState: !previousState.dropdownState
        }));
        i18n.changeLanguage(lng);
        document.getElementById('dropdownMenu').classList.remove('show');
    };

    clearLoggedIn = () => {
        this.clearActive('home');
        this.props.clearLoggedIn();
    }

    setActiveLink = event => {
        let domElements = document.getElementsByClassName('nav-link');
        for (let i = 0; i < domElements.length; i++) {
            domElements[i].className = 'nav-link';
        }
        event.target.className = event.target.className.concat(' active');
    };

    clearActive = id => {
        let currentNavEle = document.getElementById(id);
        let domElements = document.getElementsByClassName('nav-link');
        for (let i = 0; i < domElements.length; i++) {
            domElements[i].className = 'nav-link';
        }
        currentNavEle.className = 'nav-link active';
    };

    render = () => {
        const translate = word => (<Translation>{t => t(word)}</Translation>);
        let navbarContent =
            <>
                <li className="nav-item">
                    <Link className="nav-link" id="home" onClick={this.setActiveLink} to="/">{translate('nav-bar.home')}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" id="login" onClick={this.setActiveLink} to="/login">{translate('nav-bar.log-in')}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" id="signup" onClick={this.setActiveLink} to="/signup">{translate('nav-bar.sign-up')}</Link>
                </li>
            </>;
        if (this.props.loggedin) {
            navbarContent =
            <>
                <li className="nav-item">
                    <Link className="nav-link" id="home" onClick={this.setActiveLink} to="/">{translate('nav-bar.home')}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" id="create-post" onClick={this.setActiveLink} to="/create-post">{translate('nav-bar.new-post')}</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" onClick={this.clearLoggedIn} to="/">{translate('nav-bar.log-out')}</Link>
                </li>
            </>;
        }
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <button
                        className="navbar-toggler"
                        onClick={this.showCollapsedMenu}
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarTogglerDemo03"
                        aria-controls="navbarTogglerDemo03"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            {navbarContent}
                        </ul>
                        <form className="form-inline">
                            <svg xmlns="http://www.w3.org/2000/svg" style={{marginBottom: '5px'}} width="25" height="25" viewBox="0 0 25 25">
                                <path d="M0 0h24v24H0z" fill="none"></path>
                                <path d=" M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z " className="css-c4d79v"></path>
                            </svg>
                            <div className="dropdown">
                                <button
                                    className="btn btn-transparent dropdown-toggle"
                                    onClick={this.showDropDown}
                                    type="button"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false">
                                    {this.state.language}
                                </button>
                                <div className="dropdown-menu" id="dropdownMenu" aria-labelledby="dropdownMenuButton">
                                    <a className="dropdown-item" onClick={() => this.changeLanguage('en')} href="#">English</a>
                                    <a className="dropdown-item" onClick={() => this.changeLanguage('ma')} href="#">Marathi</a>
                                    <a className="dropdown-item" onClick={() => this.changeLanguage('hi')} href="#">Hindi</a>
                                </div>
                            </div>
                        </form>
                    </div>
                </nav>
            </div>
        );
    }
}

NavBar.propTypes = {
    loggedin:      PropTypes.bool,
    clearLoggedIn: PropTypes.func
};
