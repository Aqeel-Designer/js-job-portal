/* =========================================================
   ADD JOBS PAGE
   ========================================================= */


/* =========================================================
   1. ELEMENTS
   ========================================================= */

const addJobForm = document.getElementById("addJobForm");

const managementTabs = document.querySelectorAll(".management-tab");
const managementTabContents =
    document.querySelectorAll(".management-tab-content");

const addedJobsList = document.getElementById("addedJobsList");
const addJobSuccess = document.getElementById("addJobSuccess");

let editingJobId = null;


/* =========================================================
   2. TAB SWITCHING
   ========================================================= */

managementTabs.forEach(function (tab) {

    tab.addEventListener("click", function () {

        // Remove active class from all tabs
        managementTabs.forEach(function (item) {
            item.classList.remove("active");
        });

        // Add active class to clicked tab
        tab.classList.add("active");


        // Hide all tab contents
        managementTabContents.forEach(function (content) {
            content.classList.remove("active");
        });


        // Get the tab content this button belongs to
        const tabId = tab.dataset.tab;

        const selectedContent =
            document.getElementById(tabId);


        // Show selected tab
        selectedContent.classList.add("active");


        // If Edit Added Jobs tab is opened,
        // refresh the jobs displayed there
        if (tabId === "editJobsTab") {
            renderAddedJobs();
        }

    });

});


/* =========================================================
   3. INPUT ELEMENTS
   ========================================================= */

const jobTitle = document.getElementById("jobTitle");
const jobCompany = document.getElementById("jobCompany");
const jobLocation = document.getElementById("jobLocation");
const jobType = document.getElementById("jobType");
const jobCategory = document.getElementById("jobCategory");
const jobSalary = document.getElementById("jobSalary");
const jobPosted = document.getElementById("jobPosted");
const jobRemote = document.getElementById("jobRemote");
const jobDescription = document.getElementById("jobDescription");
const jobRequirements = document.getElementById("jobRequirements");
const jobResponsibilities =
    document.getElementById("jobResponsibilities");


/* =========================================================
   4. CAPITALIZE FIRST CHARACTER
   ========================================================= */

function capitalizeFirstWord(value) {

    return value
        .trim()
        .replace(/^./, function (character) {
            return character.toUpperCase();
        });

}


/* =========================================================
   5. RESTRICT TEXT INPUT
   ========================================================= */

function restrictJobInput(input) {

    input.addEventListener("input", function () {

        this.value = this.value.replace(
            /[^a-zA-Z0-9\/().:+\-\s]/g,
            ""
        );

    });

}


/*
   Apply the character restriction to text fields.
*/

restrictJobInput(jobTitle);
restrictJobInput(jobCompany);
restrictJobInput(jobLocation);
restrictJobInput(jobDescription);
restrictJobInput(jobRequirements);
restrictJobInput(jobResponsibilities);


/* =========================================================
   6. GET ARRAY FROM TEXTAREA
   ========================================================= */

function convertTextareaToArray(value) {

    return value
        .split("\n")
        .map(function (item) {
            return capitalizeFirstWord(item);
        })
        .filter(function (item) {
            return item !== "";
        });

}


/* =========================================================
   7. VALIDATION
   ========================================================= */

function showFieldError(input, message) {

    const formGroup = input.closest(".form-group");

    formGroup.classList.add("invalid");

    const errorMessage =
        formGroup.querySelector(".field-error");

    errorMessage.textContent = message;

}


function clearFieldError(input) {

    const formGroup = input.closest(".form-group");

    formGroup.classList.remove("invalid");

}


function validateField(input) {

    const value = input.value.trim();

    if (value === "") {

        showFieldError(
            input,
            "This field is required."
        );

        return false;
    }

    clearFieldError(input);

    return true;

}


/* =========================================================
   8. FORM SUBMISSION
   ========================================================= */

addJobForm.addEventListener("submit", function (event) {

    event.preventDefault();


    /* -----------------------------------------
       Validate normal fields
       ----------------------------------------- */

    const fields = [
        jobTitle,
        jobCompany,
        jobLocation,
        jobType,
        jobCategory,
        jobSalary,
        jobPosted,
        jobRemote,
        jobDescription,
        jobRequirements,
        jobResponsibilities
    ];


    let formIsValid = true;


    fields.forEach(function (field) {

        const isValid = validateField(field);

        if (!isValid) {
            formIsValid = false;
        }

    });


    /* -----------------------------------------
       Validate salary
       ----------------------------------------- */

    if (jobSalary.value !== "") {

        const salary = Number(jobSalary.value);

        if (salary < 0 || isNaN(salary)) {

            showFieldError(
                jobSalary,
                "Please enter a valid salary."
            );

            formIsValid = false;

        }

    }


    /* -----------------------------------------
       Stop if validation failed
       ----------------------------------------- */

    if (!formIsValid) {
        return;
    }


    /* -----------------------------------------
       Convert textarea values to arrays
       ----------------------------------------- */

    const requirements =
        convertTextareaToArray(jobRequirements.value);

    const responsibilities =
        convertTextareaToArray(jobResponsibilities.value);


    /* -----------------------------------------
       Create new job object
       ----------------------------------------- */

    const newJob = {

        id: generateJobId(),

        title: capitalizeFirstWord(jobTitle.value),

        company: capitalizeFirstWord(jobCompany.value),

        location: capitalizeFirstWord(jobLocation.value),

        type: jobType.value,

        category: jobCategory.value,

        salary: Number(jobSalary.value),

        posted: jobPosted.value,

        remote: jobRemote.value === "true",

        description:
            capitalizeFirstWord(jobDescription.value),

        requirements: requirements,

        responsibilities: responsibilities

    };


    /* -----------------------------------------
       Save job
       ----------------------------------------- */

    saveJob(newJob);


    /* -----------------------------------------
       Show success message
       ----------------------------------------- */

    addJobSuccess.classList.remove("hidden");


    /* -----------------------------------------
       Reset form
       ----------------------------------------- */

    addJobForm.reset();


    /*
       Remove validation styles after reset.
    */

    fields.forEach(function (field) {
        clearFieldError(field);
    });


    /*
       Hide success message after a few seconds.
    */

    setTimeout(function () {
        addJobSuccess.classList.add("hidden");
    }, 3000);

});


/* =========================================================
   9. GENERATE JOB ID
   ========================================================= */

function generateJobId() {

    const customJobs =
        JSON.parse(
            localStorage.getItem("customJobs")
        ) || [];


    if (customJobs.length === 0) {
        return 1000;
    }


    const highestId =
        Math.max(
            ...customJobs.map(function (job) {
                return job.id;
            })
        );


    return highestId + 1;

}


/* =========================================================
   10. SAVE JOB TO LOCAL STORAGE
   ========================================================= */

function saveJob(job) {

    const customJobs =
        JSON.parse(
            localStorage.getItem("customJobs")
        ) || [];


    customJobs.push(job);


    localStorage.setItem(
        "customJobs",
        JSON.stringify(customJobs)
    );

}


/* =========================================================
   11. GET ADDED JOBS
   ========================================================= */

function getCustomJobs() {

    return JSON.parse(
        localStorage.getItem("customJobs")
    ) || [];

}


/* =========================================================
   12. DISPLAY ADDED JOBS
   ========================================================= */

function renderAddedJobs() {

    const customJobs = getCustomJobs();


    addedJobsList.innerHTML = "";


    /* -----------------------------------------
       No jobs
       ----------------------------------------- */

    if (customJobs.length === 0) {

        addedJobsList.innerHTML = `
            <div class="no-added-jobs">
                <p>No jobs have been added yet.</p>
            </div>
        `;

        return;
    }


    /* -----------------------------------------
       Create cards
       ----------------------------------------- */

    customJobs.forEach(function (job) {

        const jobCard =
            document.createElement("article");

        jobCard.className =
            "job-card added-job-card";


        jobCard.innerHTML = `

            <div class="added-job-info">

                <div class="job-card-top">

                    <div>
                        <h3 class="job-title">
                            ${job.title}
                        </h3>

                        <p class="job-company">
                            ${job.company}
                        </p>
                    </div>

                </div>


                <div class="job-meta">

                    <span>${job.location}</span>

                    <span>${job.type}</span>

                    <span>${job.category}</span>

                    <span>
                        ${job.remote ? "Remote" : "On-site"}
                    </span>

                </div>

            </div>


            <div class="added-job-actions">
                <button class="btn btn-small edit-job-btn" data-id="${job.id}">
                    Edit Job
                </button>

                <button class="btn btn-small delete-job-btn" data-id="${job.id}" >
                    Delete Job
                </button>
            </div>

        `;


        addedJobsList.appendChild(jobCard);

    });


    /* -----------------------------------------
       Delete buttons
    ----------------------------------------- */

    const deleteButtons =
        document.querySelectorAll(".delete-job-btn");


    deleteButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const jobId =
                Number(button.dataset.id);

            openDeleteModal(jobId);

        });

    });


    /* -----------------------------------------
       Edit buttons
    ----------------------------------------- */

    const editButtons =
        document.querySelectorAll(".edit-job-btn");


    editButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const jobId =
                Number(button.dataset.id);


            openEditModal(jobId);

        });

    });

}


/* =========================================================
   13. DELETE JOB
   ========================================================= */

function deleteJob(jobId) {

    const customJobs = getCustomJobs();


    const updatedJobs =
        customJobs.filter(function (job) {

            return job.id !== jobId;

        });


    localStorage.setItem(
        "customJobs",
        JSON.stringify(updatedJobs)
    );


    renderAddedJobs();

}

/* =========================================================
   DELETE CONFIRMATION MODAL
========================================================= */

function openDeleteModal(jobId) {

    const customJobs = getCustomJobs();

    const job = customJobs.find(function (job) {
        return job.id === jobId;
    });


    if (!job) {
        return;
    }


    const modal = document.createElement("div");

    modal.className = "modal-overlay";
    modal.id = "deleteJobModal";


    modal.innerHTML = `

        <div class="modal-box delete-confirm-modal">

            <button
                type="button"
                class="modal-close"
                id="closeDeleteModal"
            >
                ×
            </button>


            <h2>Delete Job?</h2>

            <p class="delete-confirm-text">
                Are you sure you want to delete
                <strong>${job.title}</strong>
                at
                <strong>${job.company}</strong>?
            </p>


            <div class="modal-footer delete-confirm-actions">

                <button
                    type="button"
                    class="btn btn-outline"
                    id="cancelDeleteJob"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="btn delete-confirm-btn"
                    id="confirmDeleteJob"
                >
                    Yes, Delete
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(modal);


    /* -----------------------------------------
       Cancel button
    ----------------------------------------- */

    document
        .getElementById("cancelDeleteJob")
        .addEventListener("click", function () {

            closeDeleteModal();

        });


    /* -----------------------------------------
       Close button
    ----------------------------------------- */

    document
        .getElementById("closeDeleteModal")
        .addEventListener("click", function () {

            closeDeleteModal();

        });


    /* -----------------------------------------
       Confirm delete
    ----------------------------------------- */

    document
        .getElementById("confirmDeleteJob")
        .addEventListener("click", function () {

            deleteJob(jobId);

            closeDeleteModal();

        });


    /* -----------------------------------------
       Click outside modal
    ----------------------------------------- */

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            closeDeleteModal();

        }

    });

}

/* Close when pressing the ESC key */
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeDeleteModal();
    }
});


/* =========================================================
   CLOSE DELETE MODAL
========================================================= */

function closeDeleteModal() {

    const modal =
        document.getElementById("deleteJobModal");


    if (modal) {

        modal.remove();

    }

}

/* =========================================================
   14. EDIT JOB MODAL
========================================================= */

function openEditModal(jobId) {

    const customJobs = getCustomJobs();

    const job = customJobs.find(function (job) {
        return job.id === jobId;
    });


    if (!job) {
        return;
    }


    editingJobId = jobId;


    const modal = document.createElement("div");

    modal.className = "modal-overlay";
    modal.id = "editJobModal";


    modal.innerHTML = `

        <div class="modal-box edit-job-modal">

            <button
                type="button"
                class="modal-close"
                id="closeEditModal"
            >
                ×
            </button>


            <h2>Edit Job</h2>

            <p class="modal-company-line">
                Update the information for this job.
            </p>


            <form id="editJobForm" novalidate>

                <!-- Job Title -->

                <div class="form-group">

                    <label for="editJobTitle">
                        Job Title
                    </label>

                    <input
                        type="text"
                        id="editJobTitle"
                        value="${job.title}"
                    >

                    <div class="field-error">
                        Please enter the job title.
                    </div>

                </div>


                <!-- Company -->

                <div class="form-group">

                    <label for="editJobCompany">
                        Company
                    </label>

                    <input
                        type="text"
                        id="editJobCompany"
                        value="${job.company}"
                    >

                    <div class="field-error">
                        Please enter the company name.
                    </div>

                </div>


                <!-- Location -->

                <div class="form-group">

                    <label for="editJobLocation">
                        Location
                    </label>

                    <input
                        type="text"
                        id="editJobLocation"
                        value="${job.location}"
                    >

                    <div class="field-error">
                        Please enter the job location.
                    </div>

                </div>


                <!-- Job Type -->

                <div class="form-group">

                    <label for="editJobType">
                        Job Type
                    </label>

                    <select id="editJobType">

                        <option value="">
                            Select job type
                        </option>

                        <option value="Full time">
                            Full time
                        </option>

                        <option value="Part time">
                            Part time
                        </option>

                        <option value="Contract">
                            Contract
                        </option>

                        <option value="Internship">
                            Internship
                        </option>

                    </select>

                    <div class="field-error">
                        Please select a job type.
                    </div>

                </div>


                <!-- Category -->

                <div class="form-group">

                    <label for="editJobCategory">
                        Category
                    </label>

                    <select id="editJobCategory">

                        <option value="">
                            Select category
                        </option>

                        <option value="Development">
                            Development
                        </option>

                        <option value="Design">
                            Design
                        </option>

                        <option value="Marketing">
                            Marketing
                        </option>

                        <option value="Sales">
                            Sales
                        </option>

                        <option value="Finance">
                            Finance
                        </option>

                        <option value="Human Resources">
                            Human Resources
                        </option>

                    </select>

                    <div class="field-error">
                        Please select a category.
                    </div>

                </div>


                <!-- Salary -->

                <div class="form-group">

                    <label for="editJobSalary">
                        Salary
                    </label>

                    <input
                        type="number"
                        id="editJobSalary"
                        value="${job.salary}"
                        min="0"
                    >

                    <div class="field-error">
                        Please enter a valid salary.
                    </div>

                </div>


                <!-- Posted Date -->

                <div class="form-group">

                    <label for="editJobPosted">
                        Posted Date
                    </label>

                    <input
                        type="date"
                        id="editJobPosted"
                        value="${job.posted}"
                    >

                    <div class="field-error">
                        Please select a posted date.
                    </div>

                </div>


                <!-- Work Type -->

                <div class="form-group">

                    <label for="editJobRemote">
                        Work Type
                    </label>

                    <select id="editJobRemote">

                        <option value="">
                            Select work type
                        </option>

                        <option value="true">
                            Remote
                        </option>

                        <option value="false">
                            On-site
                        </option>

                    </select>

                    <div class="field-error">
                        Please select the work type.
                    </div>

                </div>


                <!-- Description -->

                <div class="form-group">

                    <label for="editJobDescription">
                        Description
                    </label>

                    <textarea
                        id="editJobDescription"
                    >${job.description}</textarea>

                    <div class="field-error">
                        Please enter a job description.
                    </div>

                </div>


                <!-- Requirements -->

                <div class="form-group">

                    <label for="editJobRequirements">
                        Requirements
                    </label>

                    <textarea
                        id="editJobRequirements"
                    >${job.requirements.join("\n")}</textarea>

                    <div class="field-error">
                        Please enter at least one requirement.
                    </div>

                    <small class="form-help">
                        Write each requirement on a separate line.
                    </small>

                </div>


                <!-- Responsibilities -->

                <div class="form-group">

                    <label for="editJobResponsibilities">
                        Responsibilities
                    </label>

                    <textarea
                        id="editJobResponsibilities"
                    >${job.responsibilities.join("\n")}</textarea>

                    <div class="field-error">
                        Please enter at least one responsibility.
                    </div>

                    <small class="form-help">
                        Write each responsibility on a separate line.
                    </small>

                </div>


                <!-- Modal Buttons -->

                <div class="modal-footer">

                    <button
                        type="button"
                        class="btn btn-outline"
                        id="cancelEditJob"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="btn btn-primary"
                    >
                        Save Changes
                    </button>

                </div>

            </form>

        </div>

    `;


    document.body.appendChild(modal);


    /* Set selected values */

    document.getElementById("editJobType").value =
        job.type;

    document.getElementById("editJobCategory").value =
        job.category;

    document.getElementById("editJobRemote").value =
        String(job.remote);


    setupEditModal();
}

function setupEditModal() {

    const modal =
        document.getElementById("editJobModal");

    const closeButton =
        document.getElementById("closeEditModal");

    const cancelButton =
        document.getElementById("cancelEditJob");

    const editForm =
        document.getElementById("editJobForm");


    /* Close button */

    closeButton.addEventListener("click", function () {

        closeEditModal();

    });


    /* Cancel button */

    cancelButton.addEventListener("click", function () {

        closeEditModal();

    });


    /* Save changes */

    editForm.addEventListener("submit", function (event) {

        event.preventDefault();

        updateEditedJob();

    });


    /* Close when clicking outside the modal */

    modal.addEventListener("click", function (event) {

        if (event.target === modal) {

            closeEditModal();

        }

    });

    /* Close when pressing the ESC key */
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
        closeEditModal();
    }
});


    /* Restrict text inputs */

    restrictJobInput(
        document.getElementById("editJobTitle")
    );

    restrictJobInput(
        document.getElementById("editJobCompany")
    );

    restrictJobInput(
        document.getElementById("editJobLocation")
    );

    restrictJobInput(
        document.getElementById("editJobDescription")
    );

    restrictJobInput(
        document.getElementById("editJobRequirements")
    );

    restrictJobInput(
        document.getElementById("editJobResponsibilities")
    );

}

function updateEditedJob() {

    const editJobTitle =
        document.getElementById("editJobTitle");

    const editJobCompany =
        document.getElementById("editJobCompany");

    const editJobLocation =
        document.getElementById("editJobLocation");

    const editJobType =
        document.getElementById("editJobType");

    const editJobCategory =
        document.getElementById("editJobCategory");

    const editJobSalary =
        document.getElementById("editJobSalary");

    const editJobPosted =
        document.getElementById("editJobPosted");

    const editJobRemote =
        document.getElementById("editJobRemote");

    const editJobDescription =
        document.getElementById("editJobDescription");

    const editJobRequirements =
        document.getElementById("editJobRequirements");

    const editJobResponsibilities =
        document.getElementById("editJobResponsibilities");


    /* -----------------------------------------
       Fields to validate
    ----------------------------------------- */

    const fields = [
        editJobTitle,
        editJobCompany,
        editJobLocation,
        editJobType,
        editJobCategory,
        editJobSalary,
        editJobPosted,
        editJobRemote,
        editJobDescription,
        editJobRequirements,
        editJobResponsibilities
    ];


    let formIsValid = true;


    fields.forEach(function (field) {

        const isValid =
            validateField(field);

        if (!isValid) {

            formIsValid = false;

        }

    });


    /* -----------------------------------------
       Validate salary
    ----------------------------------------- */

    if (editJobSalary.value !== "") {

        const salary =
            Number(editJobSalary.value);


        if (salary < 0 || isNaN(salary)) {

            showFieldError(
                editJobSalary,
                "Please enter a valid salary."
            );

            formIsValid = false;

        }

    }


    /* -----------------------------------------
       Stop if validation failed
    ----------------------------------------- */

    if (!formIsValid) {

        return;

    }


    /* -----------------------------------------
       Convert textarea values
       to arrays
    ----------------------------------------- */

    const requirements =
        convertTextareaToArray(
            editJobRequirements.value
        );


    const responsibilities =
        convertTextareaToArray(
            editJobResponsibilities.value
        );


    /* -----------------------------------------
       Get existing custom jobs
    ----------------------------------------- */

    const customJobs =
        getCustomJobs();


    /* -----------------------------------------
       Update matching job
    ----------------------------------------- */

    const updatedJobs =
        customJobs.map(function (job) {

            if (job.id !== editingJobId) {

                return job;

            }


            return {

                ...job,

                title:
                    capitalizeFirstWord(
                        editJobTitle.value
                    ),

                company:
                    capitalizeFirstWord(
                        editJobCompany.value
                    ),

                location:
                    capitalizeFirstWord(
                        editJobLocation.value
                    ),

                type:
                    editJobType.value,

                category:
                    editJobCategory.value,

                salary:
                    Number(editJobSalary.value),

                posted:
                    editJobPosted.value,

                remote:
                    editJobRemote.value === "true",

                description:
                    capitalizeFirstWord(
                        editJobDescription.value
                    ),

                requirements:
                    requirements,

                responsibilities:
                    responsibilities

            };

        });


    /* -----------------------------------------
       Save updated jobs
       to localStorage
    ----------------------------------------- */

    localStorage.setItem(
        "customJobs",
        JSON.stringify(updatedJobs)
    );


    /* -----------------------------------------
       Close modal
    ----------------------------------------- */

    closeEditModal();


    /* -----------------------------------------
       Refresh displayed jobs
    ----------------------------------------- */

    renderAddedJobs();

}

function closeEditModal() {

    const modal =
        document.getElementById("editJobModal");


    if (modal) {

        modal.remove();

    }


    editingJobId = null;

}


/* =========================================================
   15. INITIAL LOAD
   ========================================================= */

renderAddedJobs();