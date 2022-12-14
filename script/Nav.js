function Nav() {
  return `
  <nav class="d-flex justify-content-between">
  <div
    class="btn-group"
    role="group"
    aria-label="Basic radio toggle button group"
  >
    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="home"
      autocomplete="off"
      checked="checked"
    />
    <label class="btn btn-outline-primary" for="home">Home</label>
    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="reports"
      disabled=""
      autocomplete="off"
    />
    <label class="btn btn-outline-primary" for="reports"
      >Live Reports</label
    >
    <input
      type="radio"
      class="btn-check"
      name="btnradio"
      id="about"
      autocomplete="off"
    />
    <label class="btn btn-outline-primary" for="about">About</label>
  </div>
  <form class="d-flex">
    <input
      id="searchTxt"
      class="me-sm-2 form-control bg-dark text-light"
      type="text"
      placeholder="Search"
    />
    <button id="find" class="btn btn-secondary w-50" >
      Find Coin
    </button>
  </form>
</nav>
  `;
}

export default Nav;
