import React, {Component} from "react";
//import ReactIntl from "react-intl";

import './css/style.css';
import PostHeader from './img/post-page.jpg';
import axios from "axios";
import Header from "../utils/Header";
import Helper from "../utils/Helper";

//var FormattedNumber = ReactIntl.FormattedNumber;
//https://formatjs.io/react/v1/#formatted-number

class HackathonEvent extends Component {


    constructor(props) {
        super(props);
        // console.log(props.match.params.hid);
        this.state = {
            eventId: props.match.params.hid,
            status:null,
            ifDisableRegist:false,
            registHref: '/hackathon/' + props.match.params.hid + '/join',
            subHref: '/hackathon/' + props.match.params.hid + '/submit',
            registText:"Register for this hackathon",
            subText:"Submission",
            submitButton: null,
            isJudge: false,
            isAdmin: false,
            isJoined: false,
            hackerEmail: null,
            eventName: null,
            startDate: null,
            endDate: null,
            description: null,
            registrationFee: null,
            minSize: null,
            maxSize: null,
            sponsors: [],
            isClosed: null,
            isFinalized: null,
            sponsorList:[],
            hkData: []
        }

    }

    
    
    componentDidMount() {
        // console.log(<FormattedNumber
        //     value={99.95}
        //     style="currency"
        //     currency="USD" />);
        // console.log("hid", this.state.eventId)
        var url = process.env.REACT_APP_API_URL + `/hackathon/search?hid=${this.state.eventId}`;
        if(localStorage.getItem('uid')!= null) url += '&uid='+parseInt(localStorage.getItem('uid'));
console.log("url ",url);
        axios.get(url)
            .then(res => {

                //res.data.results.map()
                const hkData = res.data;
                this.setState({ hkData });
//all running method is here.
//  console.log("hkData",this.state.hkData);
                setTimeout(1000);
                if(hkData.isJoined != null && hkData.isJoined)
                    this.setState({isJoined: hkData.isJoined});
            })
            .catch(err => {
                var eMessage = err.response.message? "\n"+err.response.message : "";
                alert(err+eMessage);
                console.error("line 45 err");
            })
        
    }
    
    checkIfJudge(){
        var judges = this.state.hkData.judges;
        var myEmail = localStorage.getItem('email');
        // console.log("checkIfJudge ", localStorage," ",this.state.hkData," ",this.state.hkData.judges);
        if(judges == null || myEmail == null)
            return;

        if(judges.indexOf(myEmail) > -1){
            var isJudge = true;
            this.state.isJudge = true ;
            // console.log("is judge ",);
        }
    }

    checkIfAdmin(){
        var role = localStorage.getItem("role");
        if(role === 'AdminUser' ){
            this.state.isAdmin = true ;
        }
    }

    parseStatus(){
        // console.log("parseStatus ",this.state);
        if(this.state.isJudge){
            this.state.status = "Judge";
            this.state.registText="Evaluate";
            this.state.registHref = "/hackathon/eval/"+this.state.eventId;
            this.state.subHref = "#";
            this.state.submitButton ="";
        }else if(this.state.hkData.isFinalized){
            this.state.status = "Finalized";
            this.state.registText="Event have finalized";
            this.state.registHref = "#";
            this.state.subText="Results";
            this.state.subHref = "/hackathon/"+this.state.eventId+"/result";
            this.state.submitButton = this.createSubmit();
        }else if(this.state.hkData.isClosed){
            this.state.status = "Closed";
            this.state.registText="Closed for registration";
            this.state.registHref = "#";
            this.state.subText="Results";
            this.state.subHref = "/hackathon/"+this.state.eventId+"/result";
            this.state.submitButton = this.createSubmit();
        }else if(this.state.isJoined){
            this.state.status = "Open Registration";
            this.state.submitButton = this.createSubmit();
        }else{
            this.state.status = "Open Registration";
            this.state.submitButton = ""
        }

        if(this.state.isAdmin){
            if(this.state.registText=="Open Registration"){
                this.state.registHref = "#";
            }
            if(!this.state.subText=="Results")
                this.state.submitButton ="";
        }
        //this.setState({ this.state.status, this.state.registHref,this.state.subHref,this.state.registText });
    }
    
    createSubmit(){
        return (<a className="button radius expand large secondary" href={this.state.subHref}
                                               disabled={this.state.ifDisableRegist}>{this.state.subText}</a>
                                               );
    }
    parseSponsorList(sponsors){
        // console.log("parseSponsorList ",sponsors);
           
        if(sponsors == null){
            // console.log("sponsors empty ",this.state);
            return
        }
         
        return sponsors.map(sponsor =>{
            return ( <span ><strong>{sponsor}&nbsp;&nbsp;&nbsp;&nbsp;</strong></span>);
            });
        // console.log("parseSponsorList ",this.state.hkData);
    }
    render(){
        // console.log("hkData ",this.state.hkData);
        this.checkIfJudge();
        setTimeout(10);
        this.checkIfAdmin();
        setTimeout(10);
        this.parseStatus();
        setTimeout(10);
        //this.parseSponsorList();
        // this.parseSponsorList();
        //Helper.executeAsynchronously([this.parseStatus,this.checkIfJudge],10);
        // setTimeout(this.parseStatus, 10);
        // setTimeout(this.checkIfJudge, 10);
        return(
            <div>
                <Header/>
                {}

                {/* Header */}

                {/*    /!* Page Header *!/*/}
                    <div id="post-header" className="page-header">
                        <div className="background-img" style={{backgroundImage: `url(${PostHeader})`}} />
                        <div className="container">
                            <div className="row">
                                <div className="col-md-10">
                                    <div className="post-meta">
                                        <a className="post-category cat-2" href="#">{this.state.status}</a>
                                        <span className="post-date">{this.state.hkData.startDate}</span>
                                    </div>
                                    <h1>{this.state.hkData.name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                {/*    /!* /Page Header *!/*/}
                {/*</header>*/}
                {/* /Header */}
                {/* section */}
                <div className="section">
                    {/* container */}
                    <div className="container">


                        {/* row */}
                        <div className="row">
                            {/* Post content */}
                            <div className="col-md-8">
                                <div className="section-row sticky-container">
                                    <div className="main-post">
                                        <h3> {this.state.hkData.name}</h3>
                                        <p>{this.state.hkData.description}</p>
                                        {/*<p>Climate change has a PR problem. It's stalled between a political issue and scientific one at a time when we can't afford to hesitate. And we know why; it's easier to stand in the middle of the latest polar vortex and scoff at a trend of global warming than it is to stand in front of people and explain scientific fact.</p>*/}
                                        {/*<p>But if there's anything we know, it's how powerful a good map can be. In this challenge, all Esri employees are invited to help us communicate the Science of Where climate change is affecting us most and how sustainability can be used to mitigate the threat. Working alone or in a group of up to four, you'll have 10 days to tell the story of climate change and sustainability through the medium of your choice. </p>*/}
                                        {/*<figure className="figure-img">*/}
                                        {/*    <img className="img-responsive" src={require('./img/post-4.jpg')} alt />*/}
                                        {/*    <figcaption>Designer TOMPHSON</figcaption>*/}
                                        {/*</figure>*/}
                                        {/*<p>We're looking for contributions of original content in the form of a map, story map, app, or workflow using the Esri platform. Winners will be considered for the Living Atlas, Story Maps site, and even Maps we Love.</p>*/}
                                        {/*<p>The event kicks off on Friday, May 3, and all submissions are due before noon on Monday, May 13.</p>*/}
                                        {/*<blockquote className="blockquote">*/}
                                        {/*    I’ve heard the argument that “lorem ipsum” is effective in wireframing or design because it helps people focus on the actual layout, or color scheme, or whatever. What kills me here is that we’re talking about creating a user experience that will (whether we like it or not) be DRIVEN by words. The entire structure of the page or app flow is FOR THE WORDS.*/}
                                        {/*</blockquote>*/}
                                        {/*<p>For important announcements and upcoming events, join e-bloc on Teams and subscribe to the Climate Change Challenge channel.</p>*/}
                                        {/*<h3>Summing up, if the copy is diverting attention from the design it’s because it’s not up to task.</h3>*/}
                                        {/*<p>Typographers of yore didn't come up with the concept of dummy copy because people thought that content is inconsequential window dressing, only there to be used by designers who can’t be bothered to read. Lorem Ipsum is needed because words matter, a lot. Just fill up a page with draft copy about the client’s business and they will actually read it and comment on it. They will be drawn to it, fiercely. Do it the wrong way and draft copy can derail your design review.</p>*/}
                                    </div>
                                    {/*<div className="post-shares sticky-shares">*/}
                                    {/*    <a href="#" className="share-facebook"><i className="fa fa-facebook" /></a>*/}
                                    {/*    <a href="#" className="share-twitter"><i className="fa fa-twitter" /></a>*/}
                                    {/*    <a href="#" className="share-google-plus"><i className="fa fa-google-plus" /></a>*/}
                                    {/*    <a href="#" className="share-pinterest"><i className="fa fa-pinterest" /></a>*/}
                                    {/*    <a href="#" className="share-linkedin"><i className="fa fa-linkedin" /></a>*/}
                                    {/*    <a href="#"><i className="fa fa-envelope" /></a>*/}
                                    {/*</div>*/}
                                </div>
                                {/* ad */}
                                {/*<div className="section-row text-center">*/}
                                {/*    <a href="#" style={{display: 'inline-block', margin: 'auto'}}>*/}
                                {/*        <img className="img-responsive" src={require('./img/ad-2.jpg')} alt />*/}
                                {/*    </a>*/}
                                {/*</div>*/}
                                {/* ad */}
                                {/* author */}



                                {/*this.parseSponsorList()*/}
                                
                                <div className="section-row sticky-container">
                                    <div className="main-post">
                                        <p><strong>Sponsors:</strong></p>
                                        {this.parseSponsorList(this.state.hkData.sponsors)}
                                    </div>
                                </div>                              

                                {/* /reply */}
                            </div>
                            {/* /Post content */}
                            {/* aside */}
                            <div className="col-md-4">
                                {/* put info here */}


                                {/*<aside id="sidebar" className="col-lg-4 push-8 columns">*/}
                                    <div id="challenge-information" className="panel">


                                        <section className="text-center">
                                            <a className="button radius expand large secondary" href={this.state.registHref}
                                               disabled={this.state.ifDisableRegist}>{this.state.registText}</a>


                                            {this.state.submitButton}
                                            

                                            <p/><p/><p/><p/><p/>
                                            <p className="text-left small">
                                                Register to receive important hackathon updates, find teammates,
                                                and submit your entry.
                                            </p>
                                        </section>
                                        <section className="info">
                                            <p><strong>Registration Fee Per Person:</strong> </p>
                                            <p>${this.state.hkData.fee}</p>
                                        </section>
                                        <section className="info">
                                            <p><strong>Registration Team size:</strong> </p>
                                            <p>{this.state.hkData.minSize} - {this.state.hkData.maxSize}</p>
                                        </section>

                                        <section className="info">
                                            <p>
                                                <strong>Opening Time</strong>
                                            </p>
                                            {this.state.hkData.startDate} - {this.state.hkData.endDate}
                                            {/*<p className="small">
                                                <a className="view-all-dates-link" href="/details/dates">view all dates</a>
                                            </p>*/}
                                        </section>
                                        {/*<section className data-add-this-buttons="true">*/}
                                        {/*    <p>*/}
                                        {/*        <strong>*/}
                                        {/*            Invite others to compete*/}
                                        {/*        </strong>*/}
                                        {/*    </p>*/}
                                        {/*    <ul className="h-nav clearfix inline-list" id="social-links">*/}
                                        {/*        <li id="promote-twitter">*/}
                                        {/*            <div className="social-icon">*/}
                                        {/*                /!*<div className="addthis_toolbox addthis_default_style addthis_32x32_style" addthis:url="http://tensorflow.devpost.com/?utm_campaign=poweredbytf-2-0-challenge.2019-02-26&utm_content=challenge_share&utm_medium=twitter&utm_source=cp" addthis:title="Check out ⚡#PoweredByTF 2.0 Challenge!" addthis:description="http://tensorflow.devpost.com/">*!/*/}
                                        {/*                    /!*<a className="addthis_button_twitter at300b" tw:count="false" tw:counturl="http://tensorflow.devpost.com/" tw:url="http://tensorflow.devpost.com/?utm_campaign=poweredbytf-2-0-challenge.2019-02-26&utm_content=challenge_share&utm_medium=twitter&utm_source=cp" tw:via="Devpost" tw:text="Check out ⚡#PoweredByTF 2.0 Challenge!" title="Twitter" href="#"><span className="at-icon-wrapper" style={{backgroundColor: 'rgb(29, 161, 242)', lineHeight: '32px', height: '32px', width: '32px'}}><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" role="img" aria-labelledby="at-svg-twitter-1" title="Twitter" alt="Twitter" className="at-icon at-icon-twitter" style={{width: '32px', height: '32px'}}><title id="at-svg-twitter-1">Twitter</title><g><path d="M27.996 10.116c-.81.36-1.68.602-2.592.71a4.526 4.526 0 0 0 1.984-2.496 9.037 9.037 0 0 1-2.866 1.095 4.513 4.513 0 0 0-7.69 4.116 12.81 12.81 0 0 1-9.3-4.715 4.49 4.49 0 0 0-.612 2.27 4.51 4.51 0 0 0 2.008 3.755 4.495 4.495 0 0 1-2.044-.564v.057a4.515 4.515 0 0 0 3.62 4.425 4.52 4.52 0 0 1-2.04.077 4.517 4.517 0 0 0 4.217 3.134 9.055 9.055 0 0 1-5.604 1.93A9.18 9.18 0 0 1 6 23.85a12.773 12.773 0 0 0 6.918 2.027c8.3 0 12.84-6.876 12.84-12.84 0-.195-.005-.39-.014-.583a9.172 9.172 0 0 0 2.252-2.336" fillRule="evenodd" /></g></svg></span>*!/*/}
                                        {/*                    /!*</a>*!/*/}
                                        {/*                    <div className="atclear" ></div>*/}
                                        {/*            </div>*/}
                                        {/*        </li>*/}
                                        {/*        <li id="promote-fb-li">*/}
                                        {/*            <div className="social-icon">*/}
                                        {/*                <div className="addthis_32x32_style addthis_toolbox addthis_default_style" addthis:url="http://tensorflow.devpost.com/" addthis:title="⚡#PoweredByTF 2.0 Challenge!" addthis:description="⚡#PoweredByTF 2.0 Challenge!">*/}
                                        {/*                    /!*<div className="custom_images">*!/*/}
                                        {/*                    /!*     <a className="addthis_button_facebook at300b" fb:like:show_faces="false" title="Facebook" href="#"><span className="at-icon-wrapper" style={{backgroundColor: 'rgb(59, 89, 152)', lineHeight: '32px', height: '32px', width: '32px'}}><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" role="img" aria-labelledby="at-svg-facebook-2" title="Facebook" alt="Facebook" className="at-icon at-icon-facebook" style={{width: '32px', height: '32px'}}><title id="at-svg-facebook-2">Facebook</title><g><path d="M22 5.16c-.406-.054-1.806-.16-3.43-.16-3.4 0-5.733 1.825-5.733 5.17v2.882H9v3.913h3.837V27h4.604V16.965h3.823l.587-3.913h-4.41v-2.5c0-1.123.347-1.903 2.198-1.903H22V5.16z" fillRule="evenodd" /></g></svg></span>*/}
                                        {/*                    // </a> *!/*/}
                                        {/*                </div>*/}
                                        {/*                <div className="atclear" ></div>*/}
                                        {/*            </div>*/}
                                        {/*        </li>*/}
                                        {/*        <li id="promote-reddit-li">*/}
                                        {/*            <div className="social-icon">*/}
                                        {/*                /!*<a className="addthis_button_reddit addthis_32x32_style at300b" addthis:url="http://tensorflow.devpost.com/?utm_campaign=poweredbytf-2-0-challenge.2019-02-26&utm_content=challenge_share&utm_medium=reddit&utm_source=cp" addthis:title="⚡#PoweredByTF 2.0 Challenge!" target="_blank" title="Reddit" href="#"><span className="at-icon-wrapper" style={{backgroundColor: 'rgb(255, 87, 0)', lineHeight: '32px', height: '32px', width: '32px'}}><svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 32 32" version="1.1" role="img" aria-labelledby="at-svg-reddit-3" title="Reddit" alt="Reddit" className="at-icon at-icon-reddit" style={{width: '32px', height: '32px'}}><title id="at-svg-reddit-3">Reddit</title><g><path d="M27 15.5a2.452 2.452 0 0 1-1.338 2.21c.098.38.147.777.147 1.19 0 1.283-.437 2.47-1.308 3.563-.872 1.092-2.06 1.955-3.567 2.588-1.506.634-3.143.95-4.91.95-1.768 0-3.403-.316-4.905-.95-1.502-.632-2.69-1.495-3.56-2.587-.872-1.092-1.308-2.28-1.308-3.562 0-.388.045-.777.135-1.166a2.47 2.47 0 0 1-1.006-.912c-.253-.4-.38-.842-.38-1.322 0-.678.237-1.26.712-1.744a2.334 2.334 0 0 1 1.73-.726c.697 0 1.29.26 1.78.782 1.785-1.258 3.893-1.928 6.324-2.01l1.424-6.467a.42.42 0 0 1 .184-.26.4.4 0 0 1 .32-.063l4.53 1.006c.147-.306.368-.553.662-.74a1.78 1.78 0 0 1 .97-.278c.508 0 .94.18 1.302.54.36.36.54.796.54 1.31 0 .512-.18.95-.54 1.315-.36.364-.794.546-1.302.546-.507 0-.94-.18-1.295-.54a1.793 1.793 0 0 1-.533-1.308l-4.1-.92-1.277 5.86c2.455.074 4.58.736 6.37 1.985a2.315 2.315 0 0 1 1.757-.757c.68 0 1.256.242 1.73.726.476.484.713 1.066.713 1.744zm-16.868 2.47c0 .513.178.95.534 1.315.356.365.787.547 1.295.547.508 0 .942-.182 1.302-.547.36-.364.54-.802.54-1.315 0-.513-.18-.95-.54-1.31-.36-.36-.794-.54-1.3-.54-.5 0-.93.183-1.29.547a1.79 1.79 0 0 0-.54 1.303zm9.944 4.406c.09-.09.135-.2.135-.323a.444.444 0 0 0-.44-.447c-.124 0-.23.042-.32.124-.336.348-.83.605-1.486.77a7.99 7.99 0 0 1-1.964.248 7.99 7.99 0 0 1-1.964-.248c-.655-.165-1.15-.422-1.486-.77a.456.456 0 0 0-.32-.124.414.414 0 0 0-.306.124.41.41 0 0 0-.135.317.45.45 0 0 0 .134.33c.352.355.837.636 1.455.843.617.207 1.118.33 1.503.366a11.6 11.6 0 0 0 1.117.056c.36 0 .733-.02 1.117-.056.385-.037.886-.16 1.504-.366.62-.207 1.104-.488 1.456-.844zm-.037-2.544c.507 0 .938-.182 1.294-.547.356-.364.534-.802.534-1.315 0-.505-.18-.94-.54-1.303a1.75 1.75 0 0 0-1.29-.546c-.506 0-.94.18-1.3.54-.36.36-.54.797-.54 1.31s.18.95.54 1.315c.36.365.794.547 1.3.547z" fillRule="evenodd" /></g></svg></span></a>*!/*/}
                                        {/*            </div>*/}
                                        {/*        </li>*/}
                                        {/*    </ul>*/}
                                        {/*</section>*/}
                                        {/*<section>*/}
                                        {/*    <p>*/}
                                        {/*        Questions?*/}
                                        {/*        <a href="mailto:webpaige@google.com">Email the hackathon manager</a>*/}
                                        {/*    </p>*/}
                                        {/*</section>*/}






                                    </div>
                                {/*</aside>*/}



                                {/*<div className="aside-widget text-center">*/}
                                {/*    <a href="#" style={{display: 'inline-block', margin: 'auto'}}>*/}
                                {/*        <img className="img-responsive" src={require('./img/ad-1.jpg')} alt />*/}
                                {/*    </a>*/}
                                {/*</div>*/}
                                {/* /ad */}
                                {/* post widget */}
                                {/*<div className="aside-widget">*/}
                                {/*    <div className="section-title">*/}
                                {/*        <h2>Most Read</h2>*/}
                                {/*    </div>*/}
                                {/*    <div className="post post-widget">*/}
                                {/*        <a className="post-img" href="/hackathonEvent"><img src={require('./img/widget-1.jpg')} alt /></a>*/}
                                {/*        <div className="post-body">*/}
                                {/*            <h3 className="post-title"><a href="/hackathonEvent">Tell-A-Tool: Guide To Web Design And Development Tools</a></h3>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="post post-widget">*/}
                                {/*        <a className="post-img" href="/hackathonEvent"><img src={require('./img/widget-2.jpg')} alt /></a>*/}
                                {/*        <div className="post-body">*/}
                                {/*            <h3 className="post-title"><a href="/hackathonEvent">Pagedraw UI Builder Turns Your Website Design Mockup Into Code Automatically</a></h3>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="post post-widget">*/}
                                {/*        <a className="post-img" href="/hackathonEvent"><img src={require('./img/widget-3.jpg')} alt /></a>*/}
                                {/*        <div className="post-body">*/}
                                {/*            <h3 className="post-title"><a href="/hackathonEvent">Why Node.js Is The Coolest Kid On The Backend Development Block!</a></h3>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="post post-widget">*/}
                                {/*        <a className="post-img" href="/hackathonEvent"><img src={require('./img/widget-4.jpg')} alt /></a>*/}
                                {/*        <div className="post-body">*/}
                                {/*            <h3 className="post-title"><a href="/hackathonEvent">Tell-A-Tool: Guide To Web Design And Development Tools</a></h3>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/* /post widget */}
                                {/* post widget */}
                                {/*<div className="aside-widget">*/}
                                {/*    <div className="section-title">*/}
                                {/*        <h2>Featured Hackathons</h2>*/}
                                {/*    </div>*/}
                                {/*    <div className="post post-thumb">*/}
                                {/*        <a className="post-img" href="/hackathonEvent"><img src={require('./img/post-2.jpg')} alt /></a>*/}
                                {/*        <div className="post-body">*/}
                                {/*            <div className="post-meta">*/}
                                {/*                <a className="post-category cat-3" href="#">Jquery</a>*/}
                                {/*                <span className="post-date">March 27, 2018</span>*/}
                                {/*            </div>*/}
                                {/*            <h3 className="post-title"><a href="/hackathonEvent">Ask HN: Does Anybody Still Use JQuery?</a></h3>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*    <div className="post post-thumb">*/}
                                {/*        <a className="post-img" href="/hackathonEvent"><img src={require('./img/post-1.jpg')} alt /></a>*/}
                                {/*        <div className="post-body">*/}
                                {/*            <div className="post-meta">*/}
                                {/*                <a className="post-category cat-2" href="#">JavaScript</a>*/}
                                {/*                <span className="post-date">March 27, 2018</span>*/}
                                {/*            </div>*/}
                                {/*            <h3 className="post-title"><a href="/hackathonEvent">Chrome Extension Protects Against JavaScript-Based CPU Side-Channel Attacks</a></h3>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/* /post widget */}
                                {/* catagories */}
                                {/*<div className="aside-widget">*/}
                                {/*    <div className="section-title">*/}
                                {/*        <h2>Catagories</h2>*/}
                                {/*    </div>*/}
                                {/*    <div className="category-widget">*/}
                                {/*        <ul>*/}
                                {/*            <ul>*/}
                                {/*                <li><a href="#" className="cat-1">Online hackathons<span>340</span></a></li>*/}
                                {/*                <li><a href="#" className="cat-2">Offline hackathons<span>74</span></a></li>*/}
                                {/*                <li><a href="#" className="cat-4">Application-based hackathons<span>41</span></a></li>*/}
                                {/*                <li><a href="#" className="cat-3">Code Sprint<span>35</span></a></li>*/}
                                {/*            </ul>*/}
                                {/*        </ul>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/* /catagories */}
                                {/* tags */}
                                {/*<div className="aside-widget">*/}
                                {/*    <div className="tags-widget">*/}
                                {/*        <ul>*/}
                                {/*            <li><a href="#">Chrome</a></li>*/}
                                {/*            <li><a href="#">CSS</a></li>*/}
                                {/*            <li><a href="#">Tutorial</a></li>*/}
                                {/*            <li><a href="#">Backend</a></li>*/}
                                {/*            <li><a href="#">JQuery</a></li>*/}
                                {/*            <li><a href="#">Design</a></li>*/}
                                {/*            <li><a href="#">Development</a></li>*/}
                                {/*            <li><a href="#">JavaScript</a></li>*/}
                                {/*            <li><a href="#">Website</a></li>*/}
                                {/*        </ul>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/* /tags */}
                                {/* archive */}
                                {/*<div className="aside-widget">*/}
                                {/*    <div className="section-title">*/}
                                {/*        <h2>Archive</h2>*/}
                                {/*    </div>*/}
                                {/*    <div className="archive-widget">*/}
                                {/*        <ul>*/}
                                {/*            <li><a href="#">January 2018</a></li>*/}
                                {/*            <li><a href="#">Febuary 2018</a></li>*/}
                                {/*            <li><a href="#">March 2018</a></li>*/}
                                {/*        </ul>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                                {/* /archive */}
                            </div>
                            {/* /aside */}
                        </div>
                        {/* /row */}
                    </div>
                    {/* /container */}
                </div>
                {/* /section */}
                {/* Footer */}
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
                {/*                                <li><a href="#">Web Design</a></li>*/}
                {/*                                <li><a href="#">JavaScript</a></li>*/}
                {/*                                <li><a href="#">Css</a></li>*/}
                {/*                                <li><a href="#">Jquery</a></li>*/}
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
                {/* /Footer */}
                {/* jQuery Plugins */}
            </div>
        );
    }


}

export default HackathonEvent;
