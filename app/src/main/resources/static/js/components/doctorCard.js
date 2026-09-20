import { showBookingOverlay } from "./loggedPatient.js";
import { deleteDoctor } from "./doctorServices.js";
import { getPatientDetails } from "./patientServices.js";


/*
 * Creates and returns a DOM element for a single doctor card.
 */
export function createDoctorCard(doctor) {

    // Create the main doctor card container
    const card = document.createElement("div");
    card.classList.add("doctor-card");

    // Get the current user's role
    const role = localStorage.getItem("userRole");

    // Create doctor information container
    const doctorInfo = document.createElement("div");
    doctorInfo.classList.add("doctor-info");


    // Doctor Name
    const doctorName = document.createElement("h3");
    doctorName.textContent = doctor.name;

    // Doctor Specialization
    const specialization = document.createElement("p");
    specialization.textContent =
        `Specialization: ${doctor.specialization}`;

    // Doctor Email
    const email = document.createElement("p");
    email.textContent =
        `Email: ${doctor.email}`;


    // Available Appointment Times
    const appointmentTitle = document.createElement("p");
    appointmentTitle.textContent = "Available Appointments:";

    const appointmentList = document.createElement("ul");
    appointmentList.classList.add("appointment-list");

    if (doctor.availableTimes && doctor.availableTimes.length > 0) {

        doctor.availableTimes.forEach(time => {

            const appointmentTime = document.createElement("li");
            appointmentTime.textContent = time;

            appointmentList.appendChild(appointmentTime);
        });

    } else {

        const noAppointments = document.createElement("li");
        noAppointments.textContent = "No available appointments";

        appointmentList.appendChild(noAppointments);
    }


    // Add doctor information to the information container
    doctorInfo.appendChild(doctorName);
    doctorInfo.appendChild(specialization);
    doctorInfo.appendChild(email);
    doctorInfo.appendChild(appointmentTitle);
    doctorInfo.appendChild(appointmentList);


    // Create action buttons container
    const actions = document.createElement("div");
    actions.classList.add("card-actions");


    /*
     * ================================
     * ADMIN ROLE ACTIONS
     * ================================
     */
    if (role === "admin") {

        // Create Delete button
        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete Doctor";
        deleteButton.classList.add("delete-btn");

        // Handle doctor deletion
        deleteButton.addEventListener("click", async () => {

            const confirmation = confirm(
                `Are you sure you want to delete Dr. ${doctor.name}?`
            );

            if (!confirmation) {
                return;
            }

            // Get admin token
            const token = localStorage.getItem("token");

            if (!token) {
                alert("Admin session expired. Please log in again.");
                window.location.href = "/";
                return;
            }

            try {

                // Call delete doctor API
                const result = await deleteDoctor(doctor.id, token);

                if (result) {

                    alert("Doctor deleted successfully.");

                    // Remove doctor card from the page
                    card.remove();

                } else {

                    alert("Failed to delete doctor.");

                }

            } catch (error) {

                console.error("Error deleting doctor:", error);

                alert("An error occurred while deleting the doctor.");
            }
        });

        // Add delete button to actions
        actions.appendChild(deleteButton);
    }


    /*
     * =========================================
     * PATIENT - NOT LOGGED IN
     * =========================================
     */
    else if (role === "patient") {

        // Create Book Now button
        const bookButton = document.createElement("button");

        bookButton.textContent = "Book Now";
        bookButton.classList.add("book-btn");

        // Handle booking attempt
        bookButton.addEventListener("click", () => {

            alert("Please log in to book an appointment.");

        });

        // Add button to actions
        actions.appendChild(bookButton);
    }


    /*
     * =========================================
     * LOGGED-IN PATIENT
     * =========================================
     */
    else if (role === "loggedPatient") {

        // Create Book Now button
        const bookButton = document.createElement("button");

        bookButton.textContent = "Book Now";
        bookButton.classList.add("book-btn");


        // Handle booking
        bookButton.addEventListener("click", async () => {

            // Get patient token
            const token = localStorage.getItem("token");

            // Redirect if token is missing
            if (!token) {

                alert("Session expired. Please log in again.");

                localStorage.removeItem("userRole");

                window.location.href = "/";

                return;
            }


            try {

                // Fetch patient details
                const patient = await getPatientDetails(token);

                if (!patient) {

                    alert("Unable to retrieve patient details.");

                    return;
                }


                // Show booking overlay
                showBookingOverlay(
                    doctor,
                    patient
                );

            } catch (error) {

                console.error(
                    "Error fetching patient details:",
                    error
                );

                alert(
                    "Unable to retrieve patient information. Please try again."
                );
            }
        });


        // Add button to actions
        actions.appendChild(bookButton);
    }


    /*
     * Append doctor information and actions
     * to the doctor card.
     */
    card.appendChild(doctorInfo);
    card.appendChild(actions);


    // Return the completed doctor card
    return card;
}
/*
Import the overlay function for booking appointments from loggedPatient.js

  Import the deleteDoctor API function to remove doctors (admin role) from docotrServices.js

  Import function to fetch patient details (used during booking) from patientServices.js

  Function to create and return a DOM element for a single doctor card
    Create the main container for the doctor card
    Retrieve the current user role from localStorage
    Create a div to hold doctor information
    Create and set the doctor’s name
    Create and set the doctor's specialization
    Create and set the doctor's email
    Create and list available appointment times
    Append all info elements to the doctor info container
    Create a container for card action buttons
    === ADMIN ROLE ACTIONS ===
      Create a delete button
      Add click handler for delete button
     Get the admin token from localStorage
        Call API to delete the doctor
        Show result and remove card if successful
      Add delete button to actions container
   
    === PATIENT (NOT LOGGED-IN) ROLE ACTIONS ===
      Create a book now button
      Alert patient to log in before booking
      Add button to actions container
  
    === LOGGED-IN PATIENT ROLE ACTIONS === 
      Create a book now button
      Handle booking logic for logged-in patient   
        Redirect if token not available
        Fetch patient data with token
        Show booking overlay UI with doctor and patient info
      Add button to actions container
   
  Append doctor info and action buttons to the car
  Return the complete doctor card element
*/
