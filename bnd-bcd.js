const BCD_DATA_URL = `https://raw.githubusercontent.com/mdn/browser-compat-data/main/`;

class bndBCD extends HTMLElement {
  constructor() {
    super();
    this.data = {};
  }

  connectedCallback() {
    const path = this.getAttribute("path").split("/");
    window
      .fetch(BCD_DATA_URL + this.getAttribute("path") + ".json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((response) => {
        // this.data = response;
        this.data = path.reduce((acc, key) => acc[key], response)["__compat"][
          "support"
        ];
        this.render();
      });
  }

  render() {
    this.innerHTML = JSON.stringify(this.data);
  }
}

customElements.define("bnd-bcd", bndBCD);
