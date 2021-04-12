import React, { Component } from 'react';
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import emailjs from 'emailjs-com';

const gCaptcha = <div id="googlecaptcha1" className="g-recaptcha-class" class="g-recaptcha" data-sitekey="6Lefbo0aAAAAAOObFcErCdDVm8PMb3cYmN9ALgm4"></div>
const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-0 text-center md:text-left`;

const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8 bg-green-600`;
const submitButtonText = "Send"
class Contact extends Component {

   constructor(props) {
      super(props);

      this.state = {
         name: '',
         email: '',
         subject: '',
         message: ''
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.isEnabled = false;
   }

   handleChange(event, string) {
      switch (string) {
         case "name":
            this.setState({
               name: event.target.value
            });
            break;
         case "email":
            this.setState({
               email: event.target.value
            });
            break;
         case "subject":
            this.setState({
               subject: event.target.value
            });
            break;
         case "message":
            this.setState({
               message: event.target.value
            });
            break;
         default: break;

      }
   }

   handleSubmit(event) {


      event.preventDefault();
      console.log(this.state);

      //formatting check
      var goodtosend = ((this.state.email.length > 0) && (this.state.subject.length > 0) && (this.state.message.length > 0))

      if (!goodtosend) {
         alert("Please follow the requested email format!");
         return;


      }
      const msg = {
         to: "nfteeze@gmail.com",
         from: this.state.email,
         subject: this.state.subject,
         text: this.state.message,
         html: '<strong>and easy to do anywhere, even with Node.js!</strong>',
      };

      var service_id = "service_y5i9z5k";
      // var template_id = "template_rtgo442n"; //contactme
      var template_id = "template_xps75xa"; //contactme

      emailjs.sendForm(service_id, template_id, "#contactForm", "user_BuRzG4bvF9l62m2iYRu6Q").then((response) => {
         console.log('SUCCESS!', response.status, response.text);
         console.log(response);
         alert("Email Sent!");
         document.getElementById("contactForm").reset();
         this.setState({
            name: '',
            email: '',
            subject: '',
            message: ''
         });
      }, function (error) {
         console.log('FAILED...', error);
         alert("Email Not Sent! Looks to be an external problem. Make sure you have filled out the Captcha, otherwise try to reload the page");

         return false;
      });

      return false;

   }

   render() {

      if (this.props.data) {

         var name = this.props.data.name;
         var street = this.props.data.address.street;
         var city = this.props.data.address.city;
         var state = this.props.data.address.state;
         var zip = this.props.data.address.zip;
         var phone = this.props.data.phone;
         var email = this.props.data.email;
         var message = this.props.data.contactmessage;
      }

      return (
         <section id="contact" >

            <div className="row section-head">

               <div className="ten columns">

                  <p className="lead">{message}</p>

               </div>

            </div>

            <div className="row">
               <div className="eight columns">

                  <form enctype="multipart/form-data" onSubmit={this.handleSubmit} id="contactForm" name="contactForm">
                     <fieldset>
                        <div>
                           <Input type='hidden' name="contactName" value='something' />
                           <label htmlFor="contactName">Name <span className="required">*</span></label>
                           <Input pattern=".{3,}" value={this.state.name} type="text" size="35" id="contactName" name="contactName" onChange={(e) => {
                              this.handleChange(e, "name");
                           }} />
                        </div>

                        <div>
                           <label htmlFor="contactEmail" name="contactEmail">Email <span className="required">*</span></label>
                           <Input pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={this.state.email} type="email" size="35" id="contactEmail" name="contactEmail" onChange={(e) => {
                              this.handleChange(e, "email");
                           }} />
                        </div>

                        <div>
                           <label htmlFor="contactSubject" name="contactSubject">Subject <span className="required">*</span></label>
                           <Input pattern=".{3,}" value={this.state.value} type="text" value={this.state.subject} size="35" id="contactSubject" name="contactSubject" onChange={(e) => {
                              this.handleChange(e, "subject");
                           }} />
                        </div>

                        <div>
                           <label htmlFor="contactMessage" name="contactMessage">Message <span className="required">*</span></label>
                           <Textarea pattern=".{3,}" value={this.state.message} cols="50" rows="15" id="contactMessage" name="contactMessage" onChange={(e) => {
                              this.handleChange(e, "message");
                           }}></Textarea>
                        </div>

                        <div>
                           <label>Attach file: &nbsp;</label>
                           <Input type="file" name="contactImage" />
                        </div>

                        <br />

                        <div>
                           {/* <button onSubmit={this.handleSubmit} className="submit">Submit</button> */}

                           {/* <div className="g-recaptcha-class" class="g-recaptcha" data-sitekey="6LfCXL8UAAAAAN17cfWjv6Z3iGEIJZXmQ_Xs1LsK"></div> */}
                           <div id="captcha-container" className="captcha-container">
                              {gCaptcha}
                           </div>

                           <br />
                           <SubmitButton type="submit" value="Submit" >{submitButtonText}</SubmitButton>
                           <span id="image-loader">
                              <img alt="" src="images/loader.gif" />
                           </span>
                        </div>
                     </fieldset>

                  </form>

                        {/* <div id="message-warning"> Error boy</div>
                        <div id="message-success">
                           <i className="fa fa-check"></i>Your message was sent, thank you!<br />
                        </div> */}
               </div>


                     <aside className="four columns footer-widgets">
                        <div className="widget widget_contact">

                           {/* <h4>Contact</h4> */}
                           <p className="address">
                              {name}<br />
                              {email}<br />
                              {/* {street} <br />
                        {city}, {state} {zip}<br /> */}
                              {/* <span>{phone}</span> */}
                           </p>
                        </div>

                        {/* <div className="widget widget_tweets">
                     <h4 className="widget-title">Latest Tweets</h4>
                     <ul id="twitter">
                        <li>
                           <span>
                              This is Photoshop's version  of Lorem Ipsum. Proin gravida nibh vel velit auctor aliquet.
                              Aenean sollicitudin, lorem quis bibendum auctor, nisi elit consequat ipsum
                        <a href="#">http://t.co/CGIrdxIlI3</a>
                           </span>
                           <b><a href="#">2 Days Ago</a></b>
                        </li>
                        <li>
                           <span>
                              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam,
                              eaque ipsa quae ab illo inventore veritatis et quasi
                        <a href="#">http://t.co/CGIrdxIlI3</a>
                           </span>
                           <b><a href="#">3 Days Ago</a></b>
                        </li>
                     </ul>
                  </div> */}
                     </aside>
            </div>
         </section>
      );
   }
}

export default Contact;
