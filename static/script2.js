// Define API endpoint
//var apiUrl2 = "https://example.com/api/records";
var apiUrl2 = "https://jsonplaceholder.typicode.com/users"

// Function to load records from API and populate table
function loadRecords() {
  $.ajax({
    url: apiUrl2,
    method: "GET",
    success: function(data) {
      var rows = "";
      $.each(data, function(index, record) {
        rows += "<tr>";
        rows += "<td>" + record.id + "</td>";
        rows += "<td>" + record.name + "</td>";
        rows += "<td>" + record.username + "</td>";
        rows += "<td>" + record.email + "</td>";
        rows += "<td>" + record.website + "</td>";
        rows += "<td>";
        rows += "<button class='btn btn-sm btn-primary edit-btn mr-2' data-bs-toggle=\"modal\" data-bs-target=\"#edit-modal\"  data-id='" + record.id + "'>Edit</button>";
        rows += "<button class='btn btn-sm btn-danger delete-btn' data-id='" + record.id + "'>Delete</button>";
        rows += "</td>";
        rows += "</tr>";
      });
      $("#table-body").html(rows);
    }, error: function(xhr, status, error) {
      alert("Error retrieving records: " + error);
    }
  });
}

// A $( document ).ready() block.
$( document ).ready(function() {
    // console.log( "ready!" );
    loadRecords();
});



// Function to handle form submission
$("#record-form").submit(function(event) {
  event.preventDefault();

  // Get form data
  var formData = $(this).serialize();

  // Submit form data via AJAX
  $.ajax({
    url: apiUrl2,
    method: "POST",
    data: formData,
    success: function(data) {
      alert("Record added successfully!");
      // Reset form fields
      $("#record-form")[0].reset();
      // Refresh record list
      loadRecords();
    },
    error: function(xhr, status, error) {
      alert("Error adding record: " + error);
    }
  });
});

// Function to handle edit button click
$(document).on("click", ".edit-btn", function() {
  var recordId = $(this).data("id");
  // Get record data via AJAX
  $.ajax({
    url: apiUrl2 + "/" + recordId,
    method: "GET",
    success: function(data) {
      // Populate form fields with record data
      $("#record-id").val(data.id);
      $("#title").val(data.title);
      $("#author").val(data.author);
      $("#year").val(data.year);
      $("#publisher").val(data.publisher);
      $("#record-modal").modal("show");
    },
    error: function(xhr, status, error) {
      alert("Error retrieving record: " + error);
    }
  });
});

// Function to handle delete button click
$(document).on("click", ".delete-btn", function() {
  var recordId = $(this).data("id");
  if (confirm("Are you sure you want to delete this record?")) {
    // Delete record via AJAX
    $.ajax({
      url: apiUrl2 + "/" + recordId,
      method: "DELETE",
      success: function(data) {
        alert("Record deleted successfully!");
        // Refresh record list
        loadRecords();
      },
      error: function(xhr, status, error) {
        alert("Error deleting record: " + error);
      }
    });
  }
});
