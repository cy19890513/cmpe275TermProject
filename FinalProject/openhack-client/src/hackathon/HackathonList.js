import React, { Component } from "react";

import './css/style.css';
//import './css/bootstrap.min.css';
//import './css/font-awesome.min.css';
import './img/about-1.jpg';
import './img/about-2.jpg';
import './img/ad-1.jpg';
import './img/ad-2.jpg';
import './img/author.png';
import './img/avatar.png';
import './img/logo.png';
import './img/post-1.jpg';
import './img/post-2.jpg';
import './img/post-3.jpg';
import './img/post-4.jpg';
import './img/post-5.jpg';
import './img/post-6.jpg';
import './img/post-6.jpg';
import './img/post-page.jpg';
import './img/widget-1.jpg';
import './img/widget-2.jpg';
import './img/widget-3.jpg';
import './img/widget-4.jpg';




class HackathonList extends Component{


    constructor(props) {
        super(props);
        console.log(props);
    }

    componentDidMount() {
        //
        axios.get("http://localhost:8080/api/all_hackathons")
            .then(res => {
                const hackathons = res.data;
                // const suggestions = hackathons.map(suggestion => ({
                //     value: suggestion._id,
                //     label: suggestion._id
                //}));
               // this.setState({ suggestions: suggestions.sort((a, b) => (a.value > b.value) ? 1 : -1) });
            })
            .catch(err => {
                console.error("err");
            });
    }

    //get random element
    //var item = items[Math.floor(Math.random()*items.length)];
    render(){
        return(
            <div>
                {/*<meta charSet="utf-8" />*/}
                {/*<meta httpEquiv="X-UA-Compatible" content="IE=edge" />*/}
                {/*<meta name="viewport" content="width=device-width, initial-scale=1" />*/}
                {/*/!* The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags *!/*/}
                {/*<title>WebMag HTML Template</title>*/}
                {/*/!* Google font *!/*/}
                {/*<link href="https://fonts.googleapis.com/css?family=Nunito+Sans:700%7CNunito:300,600" rel="stylesheet" />*/}
                {/*/!* Bootstrap *!/*/}
                {/*<link type="text/css" rel="stylesheet" href="css/bootstrap.min.css" />*/}
                {/*/!* Font Awesome Icon *!/*/}
                {/*<link rel="stylesheet" href="css/font-awesome.min.css" />*/}
                {/*/!* Custom stlylesheet *!/*/}
                {/*<link type="text/css" rel="stylesheet" href="css/style.css" />*/}
                {/*/!* HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries *!/*/}
                {/*/!* WARNING: Respond.js doesn't work if you view the page via file:// *!/*/}
                {/*[if lt IE 9]>


		<![endif]*/}

                {/*<header id="header">*/}
                {/*    /!* Nav *!/*/}
                {/*    <div id="nav">*/}
                {/*        /!* Main Nav *!/*/}
                {/*        <div id="nav-fixed">*/}
                {/*            <div className="container">*/}
                {/*                /!* logo *!/*/}
                {/*                <div className="nav-logo">*/}
                {/*                    <a href="index.html" className="logo"><img src={require('./img/logo.png')} alt /></a>*/}
                {/*                </div>*/}
                {/*                /!* /logo *!/*/}
                {/*                /!* nav *!/*/}
                {/*                <ul className="nav-menu nav navbar-nav">*/}
                {/*                    <li class="nav-item"><a href="category.html">News</a></li>*/}
                {/*                    <li class="nav-item"><a href="category.html">Popular</a></li>*/}
                {/*                    <li className="nav-item cat-1 "><a href="category.html">Web Design</a></li>*/}
                {/*                    <li className="nav-item cat-2"><a href="category.html">JavaScript</a></li>*/}
                {/*                    <li className="nav-item cat-3"><a href="category.html">Css</a></li>*/}
                {/*                    <li className="nav-item cat-4"><a href="category.html">Jquery</a></li>*/}
                {/*                </ul>*/}
                {/*                /!* /nav *!/*/}
                {/*                /!* search & aside toggle *!/*/}
                {/*                <div className="nav-btns">*/}
                {/*                    <button className="aside-btn"><i className="fa fa-bars" /></button>*/}
                {/*                    <button className="search-btn"><i className="fa fa-search" /></button>*/}
                {/*                    <div className="search-form">*/}
                {/*                        <input className="search-input" type="text" name="search" placeholder="Enter Your Search ..." />*/}
                {/*                        <button className="search-close"><i className="fa fa-times" /></button>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                /!* /search & aside toggle *!/*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        /!* /Main Nav *!/*/}


                {/*        */}

                {/*        /!* Aside Nav *!/*/}
                {/*        <div id="nav-aside">*/}
                {/*            /!* nav *!/*/}
                {/*            <div className="section-row">*/}
                {/*                <ul className="nav-aside-menu">*/}
                {/*                    <li><a href="index.html">Home</a></li>*/}
                {/*                    <li><a href="about.html">About Us</a></li>*/}
                {/*                    <li><a href="#">Join Us</a></li>*/}
                {/*                    <li><a href="#">Advertisement</a></li>*/}
                {/*                    <li><a href="contact.html">Contacts</a></li>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*            /!* /nav *!/*/}
                {/*            /!* widget posts *!/*/}
                {/*            <div className="section-row">*/}
                {/*                <h3>Recent Posts</h3>*/}
                {/*                <div className="post post-widget">*/}
                {/*                    <a className="post-img" href="blog-post.html"><img src={require('./img/widget-2.jpg')} alt /></a>*/}
                {/*                    <div className="post-body">*/}
                {/*                        <h3 className="post-title"><a href="blog-post.html">Pagedraw UI Builder Turns Your Website Design Mockup Into Code Automatically</a></h3>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div className="post post-widget">*/}
                {/*                    <a className="post-img" href="blog-post.html"><img src={require('./img/widget-3.jpg')} alt /></a>*/}
                {/*                    <div className="post-body">*/}
                {/*                        <h3 className="post-title"><a href="blog-post.html">Why Node.js Is The Coolest Kid On The Backend Development Block!</a></h3>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*                <div className="post post-widget">*/}
                {/*                    <a className="post-img" href="blog-post.html"><img src={require('./img/widget-4.jpg')} alt /></a>*/}
                {/*                    <div className="post-body">*/}
                {/*                        <h3 className="post-title"><a href="blog-post.html">Tell-A-Tool: Guide To Web Design And Development Tools</a></h3>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            /!* /widget posts *!/*/}
                {/*            /!* social links *!/*/}
                {/*            <div className="section-row">*/}
                {/*                <h3>Follow us</h3>*/}
                {/*                <ul className="nav-aside-social">*/}
                {/*                    <li><a href="#"><i className="fa fa-facebook" /></a></li>*/}
                {/*                    <li><a href="#"><i className="fa fa-twitter" /></a></li>*/}
                {/*                    <li><a href="#"><i className="fa fa-google-plus" /></a></li>*/}
                {/*                    <li><a href="#"><i className="fa fa-pinterest" /></a></li>*/}
                {/*                </ul>*/}
                {/*            </div>*/}
                {/*            /!* /social links *!/*/}
                {/*            /!* aside nav close *!/*/}
                {/*            <button className="nav-aside-close"><i className="fa fa-times" /></button>*/}
                {/*            /!* /aside nav close *!/*/}
                {/*        </div>*/}
                {/*        /!* Aside Nav *!/*/}
                {/*    </div>*/}
                {/*    /!* /Nav *!/*/}
                {/*</header>*/}

                {/* section */}
                <div className="section">
                    {/* container */}
                    <div className="container">
                        {/* row */}
                        <div className="row">
                            {/* post */}
                            <div className="col-md-6">
                                <div className="post post-thumb">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-1.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-2" href="category.html">Judge</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">Chrome Extension Protects Against JavaScript-Based CPU Side-Channel Attacks</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                            {/* post */}
                            <div className="col-md-6">
                                <div className="post post-thumb">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-2.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-3" href="category.html">Open</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">Ask HN: Does Anybody Still Use JQuery?</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                        </div>
                        {/* /row */}
                        {/* row */}
                        <div className="row">
                            {/* post */}
                            <div className="col-md-6">
                                <div className="post post-thumb">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-1.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-2" href="category.html">Judge</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">Chrome Extension Protects Against JavaScript-Based CPU Side-Channel Attacks</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                            {/* post */}
                            <div className="col-md-6">
                                <div className="post post-thumb">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-2.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-3" href="category.html">Finalized</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">Ask HN: Does Anybody Still Use JQuery?</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                        </div>
                        {/* /row */}
                        {/* row */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-title">
                                    <h2>Recent Hackathons</h2>
                                </div>
                            </div>
                            {/* post */}
                            <div className="col-md-4">
                                <div className="post">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-3.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-1" href="category.html">Web Design</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">Pagedraw UI Builder Turns Your Website Design Mockup Into Code Automatically</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                            {/* post */}
                            <div className="col-md-4">
                                <div className="post">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-4.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-2" href="category.html">JavaScript</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">Chrome Extension Protects Against JavaScript-Based CPU Side-Channel Attacks</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                            {/* post */}
                            <div className="col-md-4">
                                <div className="post">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-5.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-3" href="category.html">Jquery</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">Ask HN: Does Anybody Still Use JQuery?</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                            <div className="clearfix visible-md visible-lg" />
                            {/* post */}
                            <div className="col-md-4">
                                <div className="post">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-6.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-2" href="category.html">JavaScript</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">Why Node.js Is The Coolest Kid On The Backend Development Block!</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                            {/* post */}
                            <div className="col-md-4">
                                <div className="post">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-1.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-4" href="category.html">Css</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">CSS Float: A Tutorial</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                            {/* post */}
                            <div className="col-md-4">
                                <div className="post">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-2.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-1" href="category.html">Web Design</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">Tell-A-Tool: Guide To Web Design And Development Tools</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                        </div>
                        {/* /row */}
                        {/* row */}
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    {/* post */}
                                    <div className="col-md-12">
                                        <div className="post post-thumb">
                                            <a className="post-img" href="blog-post.html"><img src={require('./img/post-2.jpg')} alt /></a>
                                            <div className="post-body">
                                                <div className="post-meta">
                                                    <a className="post-category cat-3" href="category.html">Jquery</a>
                                                    <span className="post-date">March 27, 2018</span>
                                                </div>
                                                <h3 className="post-title"><a href="blog-post.html">Ask HN: Does Anybody Still Use JQuery?</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /post */}
                                    {/* post */}
                                    <div className="col-md-6">
                                        <div className="post">
                                            <a className="post-img" href="blog-post.html"><img src={require('./img/post-1.jpg')} alt /></a>
                                            <div className="post-body">
                                                <div className="post-meta">
                                                    <a className="post-category cat-4" href="category.html">Css</a>
                                                    <span className="post-date">March 27, 2018</span>
                                                </div>
                                                <h3 className="post-title"><a href="blog-post.html">CSS Float: A Tutorial</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /post */}
                                    {/* post */}
                                    <div className="col-md-6">
                                        <div className="post">
                                            <a className="post-img" href="blog-post.html"><img src={require('./img/post-2.jpg')} alt /></a>
                                            <div className="post-body">
                                                <div className="post-meta">
                                                    <a className="post-category cat-1" href="category.html">Web Design</a>
                                                    <span className="post-date">March 27, 2018</span>
                                                </div>
                                                <h3 className="post-title"><a href="blog-post.html">Tell-A-Tool: Guide To Web Design And Development Tools</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /post */}
                                    <div className="clearfix visible-md visible-lg" />
                                    {/* post */}
                                    <div className="col-md-6">
                                        <div className="post">
                                            <a className="post-img" href="blog-post.html"><img src={require('./img/post-4.jpg')} alt /></a>
                                            <div className="post-body">
                                                <div className="post-meta">
                                                    <a className="post-category cat-2" href="category.html">JavaScript</a>
                                                    <span className="post-date">March 27, 2018</span>
                                                </div>
                                                <h3 className="post-title"><a href="blog-post.html">Chrome Extension Protects Against JavaScript-Based CPU Side-Channel Attacks</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /post */}
                                    {/* post */}
                                    <div className="col-md-6">
                                        <div className="post">
                                            <a className="post-img" href="blog-post.html"><img src={require('./img/post-5.jpg')} alt /></a>
                                            <div className="post-body">
                                                <div className="post-meta">
                                                    <a className="post-category cat-3" href="category.html">Jquery</a>
                                                    <span className="post-date">March 27, 2018</span>
                                                </div>
                                                <h3 className="post-title"><a href="blog-post.html">Ask HN: Does Anybody Still Use JQuery?</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /post */}
                                    <div className="clearfix visible-md visible-lg" />
                                    {/* post */}
                                    <div className="col-md-6">
                                        <div className="post">
                                            <a className="post-img" href="blog-post.html"><img src={require('./img/post-3.jpg')} alt /></a>
                                            <div className="post-body">
                                                <div className="post-meta">
                                                    <a className="post-category cat-1" href="category.html">Web Design</a>
                                                    <span className="post-date">March 27, 2018</span>
                                                </div>
                                                <h3 className="post-title"><a href="blog-post.html">Pagedraw UI Builder Turns Your Website Design Mockup Into Code Automatically</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /post */}
                                    {/* post */}
                                    <div className="col-md-6">
                                        <div className="post">
                                            <a className="post-img" href="blog-post.html"><img src={require('./img/post-4.jpg')} alt /></a>
                                            <div className="post-body">
                                                <div className="post-meta">
                                                    <a className="post-category cat-2" href="category.html">JavaScript</a>
                                                    <span className="post-date">March 27, 2018</span>
                                                </div>
                                                <h3 className="post-title"><a href="blog-post.html">Chrome Extension Protects Against JavaScript-Based CPU Side-Channel Attacks</a></h3>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /post */}
                                </div>
                            </div>
                            <div className="col-md-4">
                                {/* post widget */}
                                <div className="aside-widget">
                                    <div className="section-title">
                                        <h2>Most Read</h2>
                                    </div>
                                    <div className="post post-widget">
                                        <a className="post-img" href="blog-post.html"><img src={require('./img/widget-1.jpg')} alt /></a>
                                        <div className="post-body">
                                            <h3 className="post-title"><a href="blog-post.html">Tell-A-Tool: Guide To Web Design And Development Tools</a></h3>
                                        </div>
                                    </div>
                                    <div className="post post-widget">
                                        <a className="post-img" href="blog-post.html"><img src={require('./img/widget-2.jpg')} alt /></a>
                                        <div className="post-body">
                                            <h3 className="post-title"><a href="blog-post.html">Pagedraw UI Builder Turns Your Website Design Mockup Into Code Automatically</a></h3>
                                        </div>
                                    </div>
                                    <div className="post post-widget">
                                        <a className="post-img" href="blog-post.html"><img src={require('./img/widget-3.jpg')} alt /></a>
                                        <div className="post-body">
                                            <h3 className="post-title"><a href="blog-post.html">Why Node.js Is The Coolest Kid On The Backend Development Block!</a></h3>
                                        </div>
                                    </div>
                                    <div className="post post-widget">
                                        <a className="post-img" href="blog-post.html"><img src={require('./img/widget-4.jpg')} alt /></a>
                                        <div className="post-body">
                                            <h3 className="post-title"><a href="blog-post.html">Tell-A-Tool: Guide To Web Design And Development Tools</a></h3>
                                        </div>
                                    </div>
                                </div>
                                {/* /post widget */}
                                {/* post widget */}
                                <div className="aside-widget">
                                    <div className="section-title">
                                        <h2>Featured Posts</h2>
                                    </div>
                                    <div className="post post-thumb">
                                        <a className="post-img" href="blog-post.html"><img src={require('./img/post-2.jpg')} alt /></a>
                                        <div className="post-body">
                                            <div className="post-meta">
                                                <a className="post-category cat-3" href="category.html">Jquery</a>
                                                <span className="post-date">March 27, 2018</span>
                                            </div>
                                            <h3 className="post-title"><a href="blog-post.html">Ask HN: Does Anybody Still Use JQuery?</a></h3>
                                        </div>
                                    </div>
                                    <div className="post post-thumb">
                                        <a className="post-img" href="blog-post.html"><img src={require('./img/post-1.jpg')} alt /></a>
                                        <div className="post-body">
                                            <div className="post-meta">
                                                <a className="post-category cat-2" href="category.html">JavaScript</a>
                                                <span className="post-date">March 27, 2018</span>
                                            </div>
                                            <h3 className="post-title"><a href="blog-post.html">Chrome Extension Protects Against JavaScript-Based CPU Side-Channel Attacks</a></h3>
                                        </div>
                                    </div>
                                </div>
                                {/* /post widget */}
                                {/* ad */}
                                <div className="aside-widget text-center">
                                    <a href="#" style={{display: 'inline-block', margin: 'auto'}}>
                                        <img className="img-responsive" src={require('./img/ad-1.jpg')} alt />
                                    </a>
                                </div>
                                {/* /ad */}
                            </div>
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                </div>
                {/* /section */}
                {/* section */}
                <div className="section section-grey">
                    {/* container */}
                    <div className="container">
                        {/* row */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="section-title text-center">
                                    <h2>Featured Posts</h2>
                                </div>
                            </div>
                            {/* post */}
                            <div className="col-md-4">
                                <div className="post">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-4.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-2" href="category.html">JavaScript</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">Chrome Extension Protects Against JavaScript-Based CPU Side-Channel Attacks</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                            {/* post */}
                            <div className="col-md-4">
                                <div className="post">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-5.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-3" href="category.html">Jquery</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">Ask HN: Does Anybody Still Use JQuery?</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                            {/* post */}
                            <div className="col-md-4">
                                <div className="post">
                                    <a className="post-img" href="blog-post.html"><img src={require('./img/post-3.jpg')} alt /></a>
                                    <div className="post-body">
                                        <div className="post-meta">
                                            <a className="post-category cat-1" href="category.html">Web Design</a>
                                            <span className="post-date">March 27, 2018</span>
                                        </div>
                                        <h3 className="post-title"><a href="blog-post.html">Pagedraw UI Builder Turns Your Website Design Mockup Into Code Automatically</a></h3>
                                    </div>
                                </div>
                            </div>
                            {/* /post */}
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                </div>
                {/* /section */}
                {/* section */}
                <div className="section">
                    {/* container */}
                    <div className="container">
                        {/* row */}
                        <div className="row">
                            <div className="col-md-8">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="section-title">
                                            <h2>Most Read</h2>
                                        </div>
                                    </div>
                                    {/* post */}
                                    <div className="col-md-12">
                                        <div className="post post-row">
                                            <a className="post-img" href="blog-post.html"><img src={require('./img/post-4.jpg')} alt /></a>
                                            <div className="post-body">
                                                <div className="post-meta">
                                                    <a className="post-category cat-2" href="category.html">JavaScript</a>
                                                    <span className="post-date">March 27, 2018</span>
                                                </div>
                                                <h3 className="post-title"><a href="blog-post.html">Chrome Extension Protects Against JavaScript-Based CPU Side-Channel Attacks</a></h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /post */}
                                    {/* post */}
                                    <div className="col-md-12">
                                        <div className="post post-row">
                                            <a className="post-img" href="blog-post.html"><img src={require('./img/post-6.jpg')} alt /></a>
                                            <div className="post-body">
                                                <div className="post-meta">
                                                    <a className="post-category cat-2" href="category.html">JavaScript</a>
                                                    <span className="post-date">March 27, 2018</span>
                                                </div>
                                                <h3 className="post-title"><a href="blog-post.html">Why Node.js Is The Coolest Kid On The Backend Development Block!</a></h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /post */}
                                    {/* post */}
                                    <div className="col-md-12">
                                        <div className="post post-row">
                                            <a className="post-img" href="blog-post.html"><img src={require('./img/post-1.jpg')} alt /></a>
                                            <div className="post-body">
                                                <div className="post-meta">
                                                    <a className="post-category cat-4" href="category.html">Css</a>
                                                    <span className="post-date">March 27, 2018</span>
                                                </div>
                                                <h3 className="post-title"><a href="blog-post.html">CSS Float: A Tutorial</a></h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /post */}
                                    {/* post */}
                                    <div className="col-md-12">
                                        <div className="post post-row">
                                            <a className="post-img" href="blog-post.html"><img src={require('./img/post-2.jpg')} alt /></a>
                                            <div className="post-body">
                                                <div className="post-meta">
                                                    <a className="post-category cat-3" href="category.html">Jquery</a>
                                                    <span className="post-date">March 27, 2018</span>
                                                </div>
                                                <h3 className="post-title"><a href="blog-post.html">Ask HN: Does Anybody Still Use JQuery?</a></h3>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...</p>
                                            </div>
                                        </div>
                                    </div>
                                    {/* /post */}
                                    <div className="col-md-12">
                                        <div className="section-row">
                                            <button className="primary-button center-block">Load More</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                {/* ad */}
                                <div className="aside-widget text-center">
                                    <a href="#" style={{display: 'inline-block', margin: 'auto'}}>
                                        <img className="img-responsive" src={require('./img/ad-1.jpg')} alt />
                                    </a>
                                </div>
                                {/* /ad */}
                                {/* catagories */}
                                <div className="aside-widget">
                                    <div className="section-title">
                                        <h2>Catagories</h2>
                                    </div>
                                    <div className="category-widget">
                                        <ul>
                                            <li><a href="#" className="cat-1">Web Design<span>340</span></a></li>
                                            <li><a href="#" className="cat-2">JavaScript<span>74</span></a></li>
                                            <li><a href="#" className="cat-4">JQuery<span>41</span></a></li>
                                            <li><a href="#" className="cat-3">CSS<span>35</span></a></li>
                                        </ul>
                                    </div>
                                </div>
                                {/* /catagories */}
                                {/* tags */}
                                <div className="aside-widget">
                                    <div className="tags-widget">
                                        <ul>
                                            <li><a href="#">Chrome</a></li>
                                            <li><a href="#">CSS</a></li>
                                            <li><a href="#">Tutorial</a></li>
                                            <li><a href="#">Backend</a></li>
                                            <li><a href="#">JQuery</a></li>
                                            <li><a href="#">Design</a></li>
                                            <li><a href="#">Development</a></li>
                                            <li><a href="#">JavaScript</a></li>
                                            <li><a href="#">Website</a></li>
                                        </ul>
                                    </div>
                                </div>
                                {/* /tags */}
                            </div>
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                </div>
                {/* /section */}
                {/*/!* Footer *!/*/}
                {/*<footer id="footer">*/}
                {/*    /!* container *!/*/}
                {/*    <div className="container">*/}
                {/*        /!* row *!/*/}
                {/*        <div className="row">*/}
                {/*            <div className="col-md-5">*/}
                {/*                <div className="footer-widget">*/}
                {/*                    <div className="footer-logo">*/}
                {/*                        <a href="index.html" className="logo"><img src={require('./img/logo.png')} alt /></a>*/}
                {/*                    </div>*/}
                {/*                    <ul className="footer-nav">*/}
                {/*                        <li><a href="#">Privacy Policy</a></li>*/}
                {/*                        <li><a href="#">Advertisement</a></li>*/}
                {/*                    </ul>*/}
                {/*                    <div className="footer-copyright">*/}
                {/*    <span>© /!* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. *!/*/}
                {/*        Copyright © All rights reserved | This template is made with <i className="fa fa-heart-o" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank">Colorlib</a>*/}
                {/*        /!* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. *!/</span>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-md-4">*/}
                {/*                <div className="row">*/}
                {/*                    <div className="col-md-6">*/}
                {/*                        <div className="footer-widget">*/}
                {/*                            <h3 className="footer-title">About Us</h3>*/}
                {/*                            <ul className="footer-links">*/}
                {/*                                <li><a href="about.html">About Us</a></li>*/}
                {/*                                <li><a href="#">Join Us</a></li>*/}
                {/*                                <li><a href="contact.html">Contacts</a></li>*/}
                {/*                            </ul>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                    <div className="col-md-6">*/}
                {/*                        <div className="footer-widget">*/}
                {/*                            <h3 className="footer-title">Catagories</h3>*/}
                {/*                            <ul className="footer-links">*/}
                {/*                                <li><a href="category.html">Web Design</a></li>*/}
                {/*                                <li><a href="category.html">JavaScript</a></li>*/}
                {/*                                <li><a href="category.html">Css</a></li>*/}
                {/*                                <li><a href="category.html">Jquery</a></li>*/}
                {/*                            </ul>*/}
                {/*                        </div>*/}
                {/*                    </div>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*            <div className="col-md-3">*/}
                {/*                <div className="footer-widget">*/}
                {/*                    <h3 className="footer-title">Join our Newsletter</h3>*/}
                {/*                    <div className="footer-newsletter">*/}
                {/*                        <form>*/}
                {/*                            <input className="input" type="email" name="newsletter" placeholder="Enter your email" />*/}
                {/*                            <button className="newsletter-btn"><i className="fa fa-paper-plane" /></button>*/}
                {/*                        </form>*/}
                {/*                    </div>*/}
                {/*                    <ul className="footer-social">*/}
                {/*                        <li><a href="#"><i className="fa fa-facebook" /></a></li>*/}
                {/*                        <li><a href="#"><i className="fa fa-twitter" /></a></li>*/}
                {/*                        <li><a href="#"><i className="fa fa-google-plus" /></a></li>*/}
                {/*                        <li><a href="#"><i className="fa fa-pinterest" /></a></li>*/}
                {/*                    </ul>*/}
                {/*                </div>*/}
                {/*            </div>*/}
                {/*        </div>*/}
                {/*        /!* /row *!/*/}
                {/*    </div>*/}
                {/*    /!* /container *!/*/}
                {/*</footer>*/}
                {/*/!* /Footer *!/*/}
                {/* jQuery Plugins */}
            </div>

        );
    }
}



export default HackathonList;



