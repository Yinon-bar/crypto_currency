import { addToArrReports } from "./script.js";

function CoinTable(array) {
  $("#coinSec").html(`
  <div class="coinTable d-flex flex-column align-items-center mx-auto">
  <h2>The selected value have to be between 1 to 5 coins</h2>
    <table class="table table-hover">
      <thead>
        <tr>
        <th scope="col">Coin</th>
        <th scope="col">Remove / Add</th>
        </tr>
      </thead>
      <tbody id="body">
      
      </tbody>
    </table>
  </div>
  `);

  for (let coin of array) {
    $("#body").append(`<tr>
    <th id="cName" scope="row">${coin}</th>
    <td><div
    class="form-check d-flex justify-content-end col-3 form-switch"
    >
    <input
    data-objid='${coin}'
    class="form-check-input"
    type="checkbox"
    id="flexSwitchCheckDefault"
    style="font-size: 1.5rem;"
    checked=""
    />
    </div>
    </td>
    </tr>`);
  }
  console.log(array);
  addToArrReports(array, 1);
}

export default CoinTable;
