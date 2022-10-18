function About() {
  return `
  <main>
    <div style="direction: rtl;" class="container p-0">
      <div class="about mx-auto">
        <img src="../assets/img/ינון חתוך.png" />
        <h1 style="text-align: right;">Yinon Bar</h1>
        <h4>Full-Stack WEB Developer</h4>
        <div class="buttons">
        <button id="email" class="btn">
          Email
        </button>
        <button id="linkedin" class="btn">
          LinkedIn
        </button>
      </div>
      <div class="details">
        <h2>About</h2>
        <p>
          I am a Full-Stack WEB developer with a particular interest in making
          things simple and automating daily tasks. I try to keep up with security
          and best practices, and am always looking for new things to learn.
        </p>
      </div>
      <div class="interests">
        <h2>Interests</h2>
        <p>
          Food expert. Music scholar. Reader. Internet fanatic. Bacon buff.
          Entrepreneur. Travel geek. Pop culture ninja. Coffee fanatic.
        </p>
      </div>
        <div class="footer">
          <img width="30px" src="/assets/icons/Twitter Icon.png" alt="" srcset="" />
          <img width="30px" src="/assets/icons/Facebook Icon.png" alt="" srcset="" />
          <img width="30px" src="/assets/icons/Instagram Icon.png" alt="" srcset="" />
          <img width="30px" src="/assets/icons/GitHub Icon.png" alt="" srcset="" />
        </div>
      </div>
    </div>
  </main>
  `;
}

export default About;
