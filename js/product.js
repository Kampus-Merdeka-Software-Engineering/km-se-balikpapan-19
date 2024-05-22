$(document).ready(function () {
    $("#table-product").DataTable();
  });
  fetch("../final_dataset.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Network response was not ok " + response.statusText
        );
      }
      return response.json();
    })
    .then((data) => {
      if ($.fn.DataTable.isDataTable("#table-product")) {
        $("#table-product").DataTable().destroy();
      }
      $("#table-product").DataTable({
        data: data,
        columns: [
          { data: "transaction_id" },
          { data: "transaction_date" },
          { data: "transaction_time" },
          { data: "transaction_qty" },
          { data: "store_id" },
          { data: "store_location" },
          { data: "product_id" },
          { data: "unit_price" },
          { data: "product_category" },
          { data: "product_type" },
          { data: "product_detail" },
        ],
      });
    });