/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useRef, useEffect, useState } from "react";
import Typed from "typed.js";
import { createClient } from "@supabase/supabase-js";
import { useGetIdentity, useNotify, useRedirect } from "react-admin";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import video from "./vid/mockvid.mp4";
import ImageCard from "./components/cards/imageCard";
import { ArrowOutwardOutlined, Search, Security } from "@mui/icons-material";
import {
  // LongTextInput,
  Chip,
  Stack,
  Box,
  Grid,
  useMediaQuery,
  InputAdornment,
} from "@mui/material";
import CenteredTab from "./components/tabs/centeredTab";
import favicon from "./components/images/favicon.ico";
import ImageTile from "./components/cards/imageTile";
// Replace 'YOUR_SUPABASE_URL' and 'YOUR_SUPABASE_KEY' with your Supabase URL and key
const supabase = createClient(
  import.meta.env.VITE_BASE_URL,
  import.meta.env.VITE_ANON_KEY
);

const Landing = () => {
  const el = useRef(null);
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [message, setMessage] = useState(null);
  const notify = useNotify();
  const redirect = useRedirect();
  // const identity = useGetIdentity();
  const home_ref = useRef(null);
  const about_ref = useRef(null);
  const blog_ref = useRef(null);
  const services_ref = useRef(null);
  const partnership_ref = useRef(null);
  const contact_us = useRef(null);
  // const inputF1 = useRef(null);

  const scrollTo = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearText = async () => {
    document.getElementById("email_input").value = "";
    document.getElementById("name_input").value = "";
    document.getElementById("message_input").value = "";
    setName("");
    setEmail("");
    setMessage("");
  };

  const handleSave = async () => {
    // Save the email to Supabase
    const { data, error } = await supabase
      .from("interested_emails")
      .upsert({ name: name.text, email: email.text, message: message.text });

    if (error) {
      notify("Error saving email: " + error.message, { type: "error" });
      console.error("Error saving email:", error);
    } else {
      notify("Email saved successfully", { type: "success" });
      console.log("Email saved successfully:", data);
      // Redirect to the list view after saving
      // props.history.push('/emails');
    }
    clearText();
  };

  useEffect(() => {}, []);

  // useEffect(() => {
  //   console.log(identity);
  // }, [identity]);
  useEffect(() => {
    const typed = new Typed(el.current, {
      strings: [
        "We Envision The Africa where technology",
        "marries culture in all its diversity",
      ],
      startDelay: 300,
      typeSpeed: 50,
      backSpeed: 100,
      backDelay: 500,
      loop: true,
      showCursor: true,
      cursorChar: "_",
    });

    /*==================== SHOW MENU ====================*/
    const showMenu = (toggleId, navId) => {
      const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

      // Validate that variables exist
      if (toggle && nav) {
        toggle.addEventListener("click", () => {
          // We add the show-menu class to the div tag with the nav__menu class
          nav.classList.toggle("show-menu");
        });
      }
    };
    showMenu("nav-toggle", "nav-menu");

    /*==================== REMOVE MENU MOBILE ====================*/
    const navLink = document.querySelectorAll(".nav__link");

    function linkAction() {
      const navMenu = document.getElementById("nav-menu");
      // When we click on each nav__link, we remove the show-menu class
      navMenu.classList.remove("show-menu");
    }
    navLink.forEach((n) => n.addEventListener("click", linkAction));

    /*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
    const sections = document.querySelectorAll("section[id]");

    function scrollActive() {
      const scrollY = window.pageYOffset;

      sections.forEach((current) => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        let sectionId = current.getAttribute("id");

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          document
            .querySelector(".nav__menu a[href*=" + sectionId + "]")
            .classList.add("active-link");
        } else {
          document
            .querySelector(".nav__menu a[href*=" + sectionId + "]")
            .classList.remove("active-link");
        }
      });
    }
    window.addEventListener("scroll", scrollActive);

    /*==================== CHANGE BACKGROUND HEADER ====================*/
    function scrollHeader() {
      const nav = document.getElementById("header");
      // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
      if (this.scrollY >= 200) nav.classList.add("scroll-header");
      else nav.classList.remove("scroll-header");
    }
    window.addEventListener("scroll", scrollHeader);

    /*==================== SHOW SCROLL TOP ====================*/
    function scrollTop() {
      const scrollTop = document.getElementById("scroll-top");
      // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
      if (this.scrollY >= 560) scrollTop.classList.add("show-scroll");
      else scrollTop.classList.remove("show-scroll");
    }
    window.addEventListener("scroll", scrollTop);

    /*==================== DARK LIGHT THEME ====================*/
    const themeButton = document.getElementById("theme-button");
    const darkTheme = "dark-theme";
    const iconTheme = "bx-sun";

    // Previously selected topic (if user selected)
    const selectedTheme = localStorage.getItem("selected-theme");
    const selectedIcon = localStorage.getItem("selected-icon");

    // We obtain the current theme that the interface has by validating the dark-theme class
    const getCurrentTheme = () =>
      document.body.classList.contains(darkTheme) ? "dark" : "light";
    const getCurrentIcon = () =>
      themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

    // We validate if the user previously chose a topic
    if (selectedTheme) {
      // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
      document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
        darkTheme
      );
      themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
        iconTheme
      );
    }

    // Activate / deactivate the theme manually with the button
    themeButton.addEventListener("click", () => {
      // Add or remove the dark / icon theme
      document.body.classList.toggle(darkTheme);
      themeButton.classList.toggle(iconTheme);
      // We save the theme and the current icon that the user chose
      localStorage.setItem("selected-theme", getCurrentTheme());
      localStorage.setItem("selected-icon", getCurrentIcon());
    });

    return () => {
      typed.destroy();
    };

    // /*==================== SCROLL REVEAL ANIMATION ====================*/
    // const sr = ScrollReveal({
    //   origin: 'top',
    //   distance: '30px',
    //   duration: 2000,
    //   reset: true
    // });

    // sr.reveal(`.home__data, .home__img,
    //           .about__data, .about__img,
    //           .services__content, .menu__content,
    //           .app__data, .app__img,
    //           .contact__data, .contact__button,
    //           .footer__content`, {
    //   interval: 200
    // })
  });
  return (
    <div>
      {/*========== SCROLL TOP ==========*/}
      <a href="#" className="scrolltop" id="scroll-top">
        <i className="bx bx-chevron-up scrolltop__icon" />
      </a>
      {/*========== HEADER ==========*/}
      <header className="l-header" id="header">
        <nav className="nav bd-container">
          <a
            href="#"
            class="nav__logo"
            style={{
              height: "initial",
              width: "initial",
              fontWeight: "bold",
              color: "var(--text-color)",
              filter: "initial",
            }}
          >
            AfroTech
          </a>
          {/* <img class="group-134-V7V" src="./assets/group-134-CyV.png"/> */}
          {/* <img
            className="nav__logo"
            id="nav__logo"
            src="./assets/group-134-CyV.png"
          /> */}
          <div className="nav__menu" id="nav-menu">
            <ul className="nav__list">
              <li className="nav__item">
                <div
                  className="nav__link active-link"
                  onClick={() => {
                    scrollTo(home_ref);
                  }}
                >
                  Home
                </div>
              </li>
              <li className="nav__item">
                <div
                  className="nav__link"
                  onClick={() => {
                    scrollTo(about_ref);
                  }}
                >
                  About
                </div>
              </li>
              {/* <li className="nav__item">
                <a href="https://blog.haulway.online" className="nav__link">
                  Blog
                </a>
              </li> */}
              <li className="nav__item">
                <a
                  className="nav__link"
                  onClick={() => {
                    scrollTo(contact_us);
                  }}
                >
                  Contact us
                </a>
              </li>
              <li className="nav__item">
                <a
                  className="nav__link button signup"
                  onClick={() => {
                    redirect("/admin/login");
                  }}
                >
                  Sign Up
                </a>
              </li>
              <li>
                <i className="bx bx-moon change-theme" id="theme-button" />
              </li>
            </ul>
          </div>
          <div className="nav__toggle" id="nav-toggle">
            <i className="bx bx-menu" />
          </div>
        </nav>
      </header>
      <main className="l-main">
        {/*========== HOME ==========*/}
        <section className="home bg_gray" id="home" ref={home_ref}>
          <div className="home__container bd-container bd-grid">
            <div className="home__data">
              <p className="home__titlex">Introducing</p>
              <p className="haulway-img-title">Afriomarkets</p>
              <br />
              {/* <img
                className="haulway-img-line"
                src="./assets/rectangle-157-oMH.png"
              /> */}
              {/* <div>

                  </div> */}
              {/* <h1>
                      <span class="typer home__title" id="main" data-colors="hsl(357, 86%, 57%)" data-words="RELIABLE,AFFORDABLE,SEAMLESS,EASY TO USE" data-delay="100" data-deleteDelay="1000"></span>
                      <span class="cursor home__title" data-owner="main"></span>
                  </h1> */}
              <h3 className="home__subtitle">
                A Tech-Culture fusion <br /> across diverse African trades
              </h3>
              <span style={{ display: "inline-flex" }}>
                <p
                  ref={el}
                  className="home__description typer"
                  id="main"
                  data-delim="-"
                  data-colors="none"
                  data-words=" "
                  data-delay={50}
                  data-deletedelay={500}
                />
                <p className="cursor home__description" data-owner="main" />
              </span>
              <br />
              <button
                type="button"
                className="button get-started special-button"
                onClick={() => {
                  scrollTo(contact_us);
                }}
              >
                Get in Touch
              </button>
              <br />
              <br />
              <strong className="home__description">Connect With Us</strong>
              <div>
                <a
                  // href="https://instagram.com/haulwayglobal?igshid=NGVhN2U2NjQ0Yg=="
                  className="footer__social"
                >
                  <i className="bx bxl-instagram" />
                </a>
                <a
                  // href="https://x.com/haulwayglobal?t=obIxDbhj43cWvjcpDUsWPg&s=09"
                  className="footer__social"
                >
                  <i className="bx bxl-twitter" />
                </a>
              </div>
            </div>
            <div className="home__slides">
              <Splide
                options={{
                  rewind: true,
                  autoplay: false,
                  arrows: false,
                  pagination: false,
                }}
                aria-label="Haulway"
              >
                <SplideSlide>
                  <Grid
                    gridTemplateColumns={"max-content max-content max-content"}
                    // gridTemplateRows={'1fr 1fr'}
                    gap={1}
                    width={"100%"}
                    className="disap"
                    direction={"row"}
                    justifyContent={"center"}
                    alignContent={"center"}
                    // gridAutoFlow={'column'}
                    display={"grid"}
                    margin={0}
                  >
                    <ImageCard
                      img_width={"170px"}
                      img_height={"140px"}
                      tran_color={"var(--section-color)"}
                      cont_color={"var(--body-color)"}
                      notch={"false"}
                      subtitle={"Transforming African trade globally."}
                      title={"Trade"}
                    />
                    <Box
                      className="disappear"
                      width={"20px"}
                      height={"20px"}
                      bgcolor={"transparent"}
                    ></Box>
                    <ImageCard
                      img_width={"170px"}
                      img_height={"140px"}
                      tran_color={"var(--section-color)"}
                      cont_color={"var(--body-color)"}
                      notch={"false"}
                      subtitle={
                        "Innovation at the core: Reshaping African commerce."
                      }
                      title={"Technology"}
                    />
                    <Box
                      className="disappear"
                      width={"20px"}
                      height={"20px"}
                      bgcolor={"transparent"}
                    ></Box>
                    <Stack
                      className="disappear"
                      width={"60px"}
                      height={"60px"}
                      bgcolor={"transparent"}
                      justifyContent={"center"}
                      alignItems={"center"}
                    >
                      <Stack
                        className="card"
                        borderRadius="100%"
                        width={`calc(100% - 2px)`}
                        height={`calc(100% - 2px)`}
                        margin={0}
                        border={"3px solid var(--text-color)"}
                        bgcolor={"transparent"}
                        justifyContent={"center"}
                        alignItems={"center"}
                        padding={"8px"}
                      >
                        {/* <img alt="true" src={favicon} width={30} style={{ filter: 'var(--logo-filter)' }} /> */}
                        <p
                          className="haulway-img-title"
                          style={{ fontSize: "2rem" }}
                        >
                          A
                        </p>
                      </Stack>
                    </Stack>
                    <Box
                      className="disappear"
                      width={"20px"}
                      height={"20px"}
                      bgcolor={"transparent"}
                    ></Box>
                    <ImageCard
                      img_width={"170px"}
                      img_height={"140px"}
                      tran_color={"var(--section-color)"}
                      cont_color={"var(--body-color)"}
                      notch={"false"}
                      subtitle={
                        "Tech meets tradition: Evolves African business culture."
                      }
                      title={"Culture"}
                    />
                    <Box
                      className="disappear"
                      width={"20px"}
                      height={"20px"}
                      bgcolor={"transparent"}
                    ></Box>
                    <ImageCard
                      img_width={"170px"}
                      img_height={"140px"}
                      tran_color={"var(--section-color)"}
                      cont_color={"var(--body-color)"}
                      notch={"false"}
                      subtitle={
                        "Empowering locals: Leading Africa into the digital era."
                      }
                      title={"Empowerment"}
                    />
                  </Grid>
                </SplideSlide>
              </Splide>
            </div>
          </div>
        </section>
        {/*========== ABOUT ==========*/}
        <section className="about section" id="about" ref={about_ref}>
          <div className="about__container  bd-grid bd-container">
            <div className="about__data">
              <span className="section-subtitle about__initial">About</span>
              <h2 className="section-title about__initial">Afriomarkets</h2>
              <p className="about__description">
                We are a dynamic and forward-thinking entity, committed to
                driving innovation and leveraging technology to empower African
                local traders in their daily business operations, regardless of
                their size or capacity.
              </p>
              {/* <a href="#menu" class="button get-started bd_radius">Get Started</a> */}
            </div>
            <Splide
              className="about__img__section "
              options={{
                rewind: true,
                autoplay: true,
                arrows: false,
                pagination: false,
              }}
              aria-label="AF"
            >
              <SplideSlide>
                <img
                  src="assets/marrakesh.jpg"
                  alt
                  className="home__img "
                  style={{ maxWidth: "100%" }}
                />
              </SplideSlide>
              <SplideSlide>
                <img
                  src="assets/market1.jpg"
                  alt
                  className="home__img "
                  style={{ maxWidth: "100%" }}
                />
              </SplideSlide>
            </Splide>
          </div>
        </section>

        {/*========== SERVICES ==========*/}
        <section className="services section" id="services" ref={services_ref}>
          {/* <span className="section-subtitle">Incase Your Wondering</span> */}
          {/* <h2 className="section-title">Why Choose Haulway?</h2> */}
          <CenteredTab
            children={[
              {
                label: "Our Mission",
                child: (
                  <div
                    className="services section"
                    style={{ paddingTop: "5px" }}
                  >
                    <div className="services__container  bd-grid bd-container gap-2rem">
                      <div
                        className="about__data mt-5rem"
                        style={{ width: "calc(100% - 2rem)" }}
                      >
                        <span class="section-subtitle about__initial">
                          Our mission
                        </span>
                        <h2 class="section-title about__initial">
                          At L.M Afro Technologies
                        </h2>
                        <p className="about__description">
                          is to make a meaningful and lasting impact on
                          communities across Africa. We firmly believe that
                          technology is a powerful enabler and can be harnessed
                          to uplift local businesses and create sustainable
                          change. We are dedicated to helping African traders,
                          irrespective of the scale and capacity of their
                          operations, leverage innovative technological
                          solutions to thrive in the modern business landscape.
                        </p>

                        {/* <a href="#menu" className="button get-started bd_radius">
                          Join now
                        </a> */}
                      </div>

                      <div
                        className="about__img__section "
                        style={{ width: "calc(100% - 2rem)" }}
                      >
                        <Splide
                          options={{
                            rewind: true,
                            autoplay: true,
                            arrows: false,
                            pagination: false,
                          }}
                          aria-label="Haulway"
                        >
                          <SplideSlide>
                            <img
                              src="assets/african1.jpg"
                              alt
                              className="home__img "
                              style={{ maxWidth: "100%" }}
                            />
                          </SplideSlide>
                          <SplideSlide>
                            <Grid
                              gridTemplateColumns={"max-content"}
                              // gridTemplateRows={'1fr 1fr'}
                              gap={1}
                              width={"calc(100% - 2rem)"}
                              // className="home__img"
                              direction={"row"}
                              justifyContent={"center"}
                              alignContent={"center"}
                              // gridAutoFlow={'column'}
                              display={"grid"}
                              margin={"10px 20px"}
                            >
                              <ImageTile
                                img_width={"300px"}
                                img_height={"115px"}
                                tran_color={"var(--container-color)"}
                                title={"Tech Empowerment for African Traders"}
                                subtitle={
                                  "We aim to lead technological transformation for local African traders, ensuring businesses of all sizes can compete globally."
                                }
                              />
                              <ImageTile
                                img_width={"300px"}
                                img_height={"115px"}
                                tran_color={"var(--container-color)"}
                                title={"Advancing Africa through Technology"}
                                subtitle={
                                  "Beyond business, We envision building a more resilient Africa with technological advancements, fostering opportunities and improving the quality of life."
                                }
                              />
                              <ImageTile
                                img_width={"300px"}
                                img_height={"115px"}
                                tran_color={"var(--container-color)"}
                                title={
                                  "Collaborative Progress for Tech-Empowered Africa"
                                }
                                subtitle={
                                  "We emphasize collaboration to build a technologically advanced and thriving Africa, driven by shared prosperity, empowerment, and transformation."
                                }
                              />
                            </Grid>
                          </SplideSlide>
                        </Splide>
                      </div>
                    </div>
                  </div>
                ),
              },
              {
                label: "Our Vision",
                child: (
                  <div
                    className="services section"
                    style={{ paddingTop: "5px" }}
                  >
                    <div className="services__container  bd-grid bd-container gap-2rem">
                      <div
                        className="about__data mt-5rem"
                        style={{ width: "calc(100% - 2rem)" }}
                      >
                        <span class="section-subtitle about__initial">
                          Our vision
                        </span>
                        <h2 class="section-title about__initial">
                          At L.M Afro Technologies
                        </h2>
                        <p className="about__description">
                          is to be at the forefront of driving technological
                          transformation for African local traders. We envision
                          a future where every business, regardless of its size
                          or location, has the tools and resources it needs to
                          compete effectively on the global stage. We see a
                          continent where innovative technology solutions are
                          accessible to all, leveling the playing field and
                          empowering businesses to thrive amidst the challenges
                          and opportunities of the African continent.
                        </p>
                        {/* <a href="#menu" className="button get-started bd_radius">
                          Join now
                        </a> */}
                      </div>

                      <div
                        className="about__img__section "
                        style={{ width: "calc(100% - 2rem)" }}
                      >
                        <Splide
                          options={{
                            rewind: true,
                            autoplay: true,
                            arrows: false,
                            pagination: false,
                          }}
                          aria-label="AF"
                        >
                          <SplideSlide>
                            <img
                              src="assets/african6.jpg"
                              alt
                              className="home__img "
                              style={{ maxWidth: "100%" }}
                            />
                          </SplideSlide>

                          <SplideSlide>
                            <Grid
                              gridTemplateColumns={"max-content"}
                              // gridTemplateRows={'1fr 1fr'}
                              gap={1}
                              width={"calc(100% - 2rem)"}
                              // className="home__img"
                              direction={"row"}
                              justifyContent={"center"}
                              alignContent={"center"}
                              // gridAutoFlow={'column'}
                              display={"grid"}
                              margin={"10px 20px"}
                            >
                              <ImageTile
                                img_width={"300px"}
                                img_height={"105px"}
                                tran_color={"var(--container-color)"}
                                title={"Tech Empowerment for African Traders"}
                                subtitle={
                                  "We strive to empower African traders with innovative technology solutions, enhancing business capabilities across all scales"
                                }
                              />
                              <ImageTile
                                img_width={"300px"}
                                img_height={"105px"}
                                tran_color={"var(--container-color)"}
                                title={"Digital Inclusion for AfCFTA Growth"}
                                subtitle={
                                  "Committed to the African Continental Free Trade Area, We bridge the digital divide, making advanced technologies accessible to businesses of all sizes in diverse African markets."
                                }
                              />
                              <ImageTile
                                img_width={"300px"}
                                img_height={"105px"}
                                tran_color={"var(--container-color)"}
                                title={
                                  "Beyond Business: Tech for Social Progress"
                                }
                                subtitle={
                                  "Going beyond business, view our mission as a commitment to social responsibility, contributing to sustainable development by empowering local businesses and fostering societal progress"
                                }
                              />
                            </Grid>
                          </SplideSlide>
                        </Splide>
                      </div>
                    </div>
                  </div>
                ),
              },
            ]}
          />
        </section>

        {/*========== ABOUT ==========*/}
        <section
          className="about bg_gray section"
          id="about"
          ref={partnership_ref}
        >
          <div className="about__container  bd-grid bd-container">
            <div className="about__data">
              {/* <span class="section-subtitle about__initial">About us</span> */}
              <h2 className="section-title about__initial">
                We're Not Just Offering Technology
              </h2>
              <p className="about__description">
                we are empowering dreams, unlocking potential, and paving the
                way for a brighter future for African local traders. Join us on
                this transformative journey as we strive to create a thriving
                digital landscape for businesses across the continent. Together,
                we can build a stronger and more resilient Africa, powered by
                technology and innovation.
              </p>
              <button
                type="button"
                className="button get-started special-button"
                onClick={() => {
                  scrollTo(contact_us);
                }}
              >
                Join us Today
              </button>
            </div>
            <img
              src="assets/commerce2.jpg"
              alt
              className="about__img home__img reverse__order"
              style={{ margin: "30px 10px" }}
            />
          </div>
        </section>

        {/* ===== APP ======= */}
        {/* <section class="app section bd-container">
          <div class="app__container bd-grid">
              <div class="app__data">
                  <span class="section-subtitle app__initial">App</span>
                  <h2 class="section-title app__initial">Exciting Times Ahead!</h2>
                  <p class="app__description">Our App is Coming soon, Enabling You to Shop at Beloved Stores, Promote Products Earn Rewards and More!</p>
                  <div class="app__stores">
                      <a href="#"><img src="assets/img/app1.png" alt="" class="app__store"></a>
                      <a href="#"><img src="assets/img/app2.png" alt="" class="app__store"></a>
                  </div>
              </div>

              <img src="assets/mockup1.png" alt="" class="app__img home__img">
          </div>
      </section> */}
        {/*========== CONTACT US ==========*/}
        <section
          className="contact section bd-container"
          id="contact"
          ref={contact_us}
        >
          <div className="contact__container bd-grid bd-container">
            <div className="contact__data">
              <span className="section-subtitle contact__initial">
                Excited yet?
              </span>
              <h2 className="section-title contact__initial">Let's talk</h2>
              {/* <p className="contact__description">
                {" "}
                As we grow, we'll introduce you to our team and invite you to
                join us on this exciting journey toward a brighter future. Are
                you ready to take the next step? Let's have a chat and explore
                the possibilities together.
              </p> */}
              <div className="app__stores">
                <input
                  className="card frm_width"
                  style={{
                    color: "var(--text-color)",
                    background: "var(--container-color)",
                    boxShadow: "0 2px 20px hsla(0, 0%, 0%, 0.06)",
                    border: "none",
                    fontSize: "var(--small-font-size)",
                  }}
                  type="email"
                  id="name_input"
                  placeholder="Name"
                  name="name"
                  onChange={(e) => setName({ ...name, text: e.target.value })}
                />
                <input
                  className="card frm_width"
                  style={{
                    color: "var(--text-color)",
                    background: "var(--container-color)",
                    boxShadow: "0 2px 20px hsla(0, 0%, 0%, 0.06)",
                    border: "none",
                    fontSize: "var(--small-font-size)",
                  }}
                  type="email"
                  id="email_input"
                  placeholder="Email Address"
                  name="email"
                  onChange={(e) => setEmail({ ...email, text: e.target.value })}
                />
                <textarea
                  rows={4}
                  className="card frm_width"
                  style={{
                    color: "var(--text-color)",
                    background: "var(--container-color)",
                    boxShadow: "0 2px 20px hsla(0, 0%, 0%, 0.06)",
                    border: "none",
                    fontSize: "var(--small-font-size)",
                    margin: "8px 3px",
                    fontFamily: `Montserrat, 'Source Sans Pro'`,
                    // minWidth: '60%',
                    display: "inline-block",
                    boxSizing: "border-box",
                    paddingInline: "20px",
                    paddingBlock: "16px",
                    resize: "none",
                  }}
                  type="email"
                  id="message_input"
                  placeholder="Message"
                  name="message"
                  onChange={(e) =>
                    setMessage({ ...message, text: e.target.value })
                  }
                />
              </div>
              <button
                type="button"
                className="button special-button"
                onClick={handleSave}
              >
                Send
              </button>
            </div>
            <img
              src="assets/commerce1.jpg"
              alt
              className="about__img home__img"
            />
          </div>
        </section>
      </main>
      {/*========== FOOTER ==========*/}
      <footer className="footer section bd-container">
        <div className="footer__container bd-grid">
          <div className="footer__content">
            <a href="#" className="footer__logo">
              Follow Us
            </a>
            {/* <span class="footer__description">Telecom</span>
              <span class="footer__description">Services</span> */}
            <div>
              <a
                // href="https://instagram.com/haulwayglobal?igshid=NGVhN2U2NjQ0Yg=="
                className="footer__social"
              >
                <i className="bx bxl-instagram" />
              </a>
              <a
                // href="https://x.com/haulwayglobal?t=obIxDbhj43cWvjcpDUsWPg&s=09"
                className="footer__social"
              >
                <i className="bx bxl-twitter" />
              </a>
            </div>
          </div>
          <div className="footer__content">
            <h3 className="footer__title">Quick Links</h3>
            <ul>
              <li>
                <a href="#" className="footer__link">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__content">
            <h3 className="footer__title">Explore</h3>
            <ul>
              <li>
                <a href="#" className="footer__link">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="footer__link">
                  Contact us
                </a>
              </li>
            </ul>
          </div>
          <div className="footer__content">
            <h3 className="footer__title">Subscribe</h3>
            {/* <div className="app__stores">
              <input
                type="email"
                id="email_input1"
                placeholder="Email Address"
                name="email"
                onChange={(e) => setEmail({ ...email, email: e.target.value })}
              />
              
            </div> */}
            <ul></ul>
          </div>
        </div>
        <p className="footer__copy">© 2023 L.M AfroTech. All right reserved</p>
      </footer>
      {/*========== SCROLL REVEAL ==========*/}
      {/*========== MAIN JS ==========*/}
      {/*========== MAIN JS ==========*/}
      {/*========== Typer JS ==========*/}
    </div>
  );
};

export default Landing;
