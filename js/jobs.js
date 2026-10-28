//This file contains all the code that will provide functioanlity to each code


//selecting elements from index.html

const featuredJobsContainer = document.getElementById("featuredJobs");
const heroSearchForm = document.getElementById("heroSearchForm");
const heroSearchInput = document.getElementById("heroSearchInput");
const heroLocationInput = document.getElementById("heroLocationInput");
const statJobsEl = document.getElementById("statJobs");
const statCompaniesEl = document.getElementById("statCompanies");
const statCategoriesEl = document.getElementById("statCategories");
const statRemoteEl = document.getElementById("statRemote");
const searchError = document.getElementById("searchError");

//slecting elements from other html pages

const jobsListEl = document.getElementById("jobsList");
const loadingStateEl = document.getElementById("loadingState");
const emptyStateEl = document.getElementById("emptyState");
const resultsCountEl = document.getElementById("resultsCount");
const paginationEl = document.getElementById("pagination");
const searchInputEl = document.getElementById("searchInput");
const categoryFilterSelect = document.getElementById("categoryFilter");
const locationFilterSelect = document.getElementById("locationFilter");
const remoteFilterCheckbox = document.getElementById("remoteFilter");
const salaryRangeInput = document.getElementById("salaryRange");
const salaryRangeValueEl = document.getElementById("salaryRangeValue");
const sortSelectEl = document.getElementById("sortSelect");
const clearFiltersBtn = document.getElementById("clearFiltersBtn");
const jobTypeCheckboxes = document.querySelectorAll(".jobtype-checkbox");

//elements for modal

const modalOverlay = document.getElementById("modalOverlay");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const jobDetailsViewEl = document.getElementById("jobDetailsView");
const modalJobTitleEl = document.getElementById("modalJobTitle");
const modalCompanyLineEl = document.getElementById("modalCompanyLine");
const modalMetaEl = document.getElementById("modalMeta");
const modalDescriptionEl = document.getElementById("modalDescription");
const modalRequirementsEl = document.getElementById("modalRequirements");
const modalResponsibilitiesEl = document.getElementById("modalResponsibilities");
const modalSaveBtn = document.getElementById("modalSaveBtn");
const applyNowBtn = document.getElementById("applyNowBtn");
const applyFormViewEl = document.getElementById("applyFormView");
const applyJobTitleEl = document.getElementById("applyJobTitle");
const applyCompanyLineEl = document.getElementById("applyCompanyLine");
const applyFormEl = document.getElementById("applyForm");
const fullNameInput = document.getElementById("fullName");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const coverLetterInput = document.getElementById("coverLetter");
const cvUploadInput = document.getElementById("cvUpload");
const backToDetailsBtn = document.getElementById("backToDetailsBtn");
const successViewEl = document.getElementById("successView");
const successJobTitleEl = document.getElementById("successJobTitle");
const successCompanyEl = document.getElementById("successCompany");
const successCloseBtn = document.getElementById("successCloseBtn");

//field groups was used as class in the apply form, with an id of each input. here we make a field group constant that will be used to manage errors

const fieldGroups = {
    fullName: document.getElementById("fieldGroup-fullName"),
    email: document.getElementById("fieldGroup-email"),
    phone: document.getElementById("fieldGroup-phone"),
    coverLetter: document.getElementById("fieldGroup-coverLetter"),
    cv: document.getElementById("fieldGroup-cv")
};

//elements from jobs-details page

const detailsLoadingEl = document.getElementById("detailsLoading");
const detailsNotFoundEl = document.getElementById("detailsNotFound");
const detailsContentEl = document.getElementById("detailsContent");
const detailsTitleEl = document.getElementById("detailsTitle");
const detailsCompanyLineEl = document.getElementById("detailsCompanyLine");
const detailsMetaEl = document.getElementById("detailsMeta");
const detailsDescriptionEl = document.getElementById("detailsDescription");
const detailsRequirementsEl = document.getElementById("detailsRequirements");
const detailsResponsibilitiesEl = document.getElementById("detailsResponsibilities");
const detailsSaveBtn = document.getElementById("detailsSaveBtn");
const detailsApplyBtn = document.getElementById("detailsApplyBtn");

//selecting body
const bodyEl = document.body;

//storage constants for local storage 
const JOBS_PER_PAGE = 6;
const SAVED_JOBS_KEY = "jobfinder-saved-jobs";
const APPLICATIONS_KEY = "jobfinder-applications";
const DRAFT_KEY = "jobfinder-apply-draft";
const CUSTOM_JOBS_KEY = "customJobs";  //addition : for custom jobs

//addition : this fucnction returns all jobs
function getAllJobs() {
    const customJobs =
        JSON.parse(localStorage.getItem(CUSTOM_JOBS_KEY)) || [];

    return [...jobs, ...customJobs];
}

//changeable variables
let currentPage = 1;
let currentJobIdInModal = null; // which job the modal is currently showing

//Section 1 : functionality that will be shared by all the files/sections


//1=> managing dates and showing them as "posted 2 days ago"
function formatPostedDate(dateString) {
    const postedDate = new Date(dateString);
    const today = new Date();

    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.round((today - postedDate) / msPerDay);

    if (diffDays <= 0) {
        return "Posted today";
    } else if (diffDays === 1) {
        return "Posted 1 day ago";
    } else {
        return "Posted " + diffDays + " days ago";
    }
}

//2=> this functions finds the job from the array in data.js bt its id
// function findJobById(jobId) {
//     for (let i = 0; i < jobs.length; i++) {
//         if (jobs[i].id === jobId) {
//             return jobs[i];
//         }
//     }
//     return null;
// }

//addition: the above function is updated to this because now we have to deal with cutsom jobs too
function findJobById(jobId) {
    const allJobs = getAllJobs();

    for (let i = 0; i < allJobs.length; i++) {
        if (allJobs[i].id === jobId) {
            return allJobs[i];
        }
    }

    return null;
}

//3=>adds li to exisiting ul. used in modal requirements and responsibilies
function fillListElement(listEl, items) {
    let html = "";
    for (let i = 0; i < items.length; i++) {
        html += "<li>" + items[i] + "</li>";
    }
    listEl.innerHTML = html;
}

//4=> checks if joblist belongs to browse,save or applied page
function isJobsListingPage() {
    return jobsListEl !== null;
}

//this function gets the job source by data-job-source attribute. for jobs.html it is set to all
function getJobSource() {
    return bodyEl.getAttribute("data-job-source") || "all";
}

//5=> debounce functionality
function debounce(fn, delayMs) {
    let timerId = null;
    return function () {
        clearTimeout(timerId);
        timerId = setTimeout(fn, delayMs);
    };
}

//6=> Attaching a click handler to the save button so that each new button in modal has a event listerner
function attachSaveButtonListeners(container) {
    const saveButtons = container.querySelectorAll(".save-btn");
    saveButtons.forEach(function (btn) {

        const isListStyle = btn.textContent.indexOf("Save") !== -1;    //this checks if the button contains the text "save"

        btn.addEventListener("click", function () {
            const jobId = Number(btn.getAttribute("data-save-id"));

            const nowSaved = toggleSavedJob(jobId);      //toggleSavedJob will be defined later in Saved Jos section

            //When a job is unsaved, we re-render the whole list, so the job is removed and the UI is updated instantly
            if (getJobSource() === "saved") {
                updateJobsListing();    //updateJobListing will be defined later in Saved Jos section
                return;
            }

            btn.classList.toggle("saved", nowSaved);
            if (isListStyle) {
                btn.textContent = nowSaved ? "♥ Saved" : "♡ Save Job";
            } else {
                btn.textContent = nowSaved ? "♥" : "♡";
            }
        });
    });
}

//attaches a click handler to view job in the job created by JS , and opens the modal
function attachViewButtonListeners(container) {
    const viewButtons = container.querySelectorAll("[data-view-id]");
    viewButtons.forEach(function (btn) {
        btn.addEventListener("click", function () {
            const jobId = Number(btn.getAttribute("data-view-id"));
            openJobModal(jobId);       // openJobModal() is defined later in the MODAL section
        });
    });
}

//Restriction form input
function restrictSearchInput(input) {
    input.addEventListener("input", function () {
        this.value = this.value.replace(
            /[^a-zA-Z0-9\/().:+\-\s]/g,
            ""
        );
    });
}


//Section 2 : Homepage Featured Jobs and Search
//1=> builds grid-style card for featured jobs
function buildFeaturedCardHTML(job) {

    const saved = isJobSaved(job.id);
    return (
        '<div class="job-card" data-job-id="' + job.id + '">' +
        '<div class="job-card-top">' +
        '<div>' +
        '<h3 class="job-title"><a href="job-details.html?id=' + job.id + '">' + job.title + '</a></h3>' +
        '<p class="job-company">' + job.company + '</p>' +
        '</div>' +
        '<button class="save-btn' + (saved ? ' saved' : '') + '" data-save-id="' + job.id + '" aria-label="Save job">' +
        (saved ? '♥' : '♡') +
        '</button>' +
        '</div>' +
        '<div class="job-meta">' +
        '<span>' + job.location + '</span>' +
        '<span>' + job.type + '</span>' +
        (job.remote ? '<span>Remote</span>' : '') +
        '</div>' +
        '<p class="job-desc">' + job.description + '</p>' +
        '<div class="job-card-footer">' +
        '<span class="job-salary">$' + job.salary.toLocaleString() + '</span>' +
        '<span class="job-posted">' + formatPostedDate(job.posted) + '</span>' +
        '</div>' +
        '<button class="btn btn-outline btn-small btn-block" data-view-id="' + job.id + '">View Job</button>' +
        '</div>'
    );
}

//show the latest 6 jobs in the featured jobs section 
function renderFeaturedJobs() {
    if (!featuredJobsContainer) {
        return; // not on the homepage
    }

    // const sortedByNewest = jobs.slice().sort(function (a, b) {   //creates a copy of the array of jobs with the sort function

    //addition : the above line was upadted to this to deal with getallJobs() instead of only jpbs
    const sortedByNewest = getAllJobs().slice().sort(function (a, b) {
        return new Date(b.posted) - new Date(a.posted);
    });
    const featured = sortedByNewest.slice(0, 6);     //extracts only the first 6

    let html = "";
    for (let i = 0; i < featured.length; i++) {
        html += buildFeaturedCardHTML(featured[i]);   //using loop to build the html cards for the 6 jobs
    }
    featuredJobsContainer.innerHTML = html;

    attachSaveButtonListeners(featuredJobsContainer);   //finds the save button on the new elmeent and add a evnt listener to it
    attachViewButtonListeners(featuredJobsContainer);
}

//2=>this is a URL parameter code for redirecting the user to the jobs page
function setupHeroSearch() {
    if (!heroSearchForm) {
        return; // not on the homepage
    }

    heroSearchForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const searchValue = heroSearchInput.value.trim();
        const locationValue = heroLocationInput.value.trim();

        //this part is to make sure atleast one input is filled before the user press search
        if (searchValue === "" && locationValue === "") {
            searchError.textContent = "Please enter a job or location.";
            searchError.style.display = "block";
            return;
        }

        searchError.textContent = "";
        searchError.style.display = "none";

        const params = new URLSearchParams();
        if (searchValue) {
            params.set("search", searchValue);
        }
        if (locationValue) {
            params.set("location", locationValue);
        }

        window.location.href = "jobs.html?" + params.toString();
    });
}


//3=> This is a function that suggests and auto complete the search input while the user is typing
function setupAutocomplete() {
    const jobInput = document.getElementById("heroSearchInput");
    const locationInput = document.getElementById("heroLocationInput");

    const jobSuggestions = document.getElementById("jobSuggestions");
    const locationSuggestions = document.getElementById("locationSuggestions");

    if (!jobInput || !locationInput) {
        return;
    }

    //we passed the parameters here becuase this is where the jobInput and locationInput are being defined
    restrictSearchInput(jobInput);
    restrictSearchInput(locationInput);

    // Job title suggestions
    jobInput.addEventListener("input", function () {
        const searchText = jobInput.value.trim().toLowerCase();

        jobSuggestions.innerHTML = "";

        if (searchText === "") {
            jobSuggestions.style.display = "none";
            return;
        }



        const matchingTitles = [
            ...new Set(
                // jobs
                getAllJobs()   //addition , jobs was changed to get al jobs
                    .filter(job =>
                        job.title.toLowerCase().includes(searchText)
                    )
                    .map(job => job.title)
            )
        ];

        if (matchingTitles.length === 0) {
            jobSuggestions.style.display = "none";
            return;
        }

        matchingTitles.slice(0, 6).forEach(title => {
            const suggestion = document.createElement("div");

            suggestion.className = "suggestion-item";
            suggestion.textContent = title;

            suggestion.addEventListener("click", function () {
                jobInput.value = title;
                jobSuggestions.style.display = "none";
            });

            jobSuggestions.appendChild(suggestion);
        });

        jobSuggestions.style.display = "block";
    });


    // Location suggestions
    locationInput.addEventListener("input", function () {
        const searchText = locationInput.value.trim().toLowerCase();

        locationSuggestions.innerHTML = "";

        if (searchText === "") {
            locationSuggestions.style.display = "none";
            return;
        }

        const matchingLocations = [
            ...new Set(
                // jobs
                getAllJobs()   //addition , jobs was changed to get al jobs
                    .filter(job =>
                        job.location.toLowerCase().includes(searchText)
                    )
                    .map(job => job.location)
            )
        ];

        if (matchingLocations.length === 0) {
            locationSuggestions.style.display = "none";
            return;
        }

        matchingLocations.slice(0, 6).forEach(location => {
            const suggestion = document.createElement("div");

            suggestion.className = "suggestion-item";
            suggestion.textContent = location;

            suggestion.addEventListener("click", function () {
                locationInput.value = location;
                locationSuggestions.style.display = "none";
            });

            locationSuggestions.appendChild(suggestion);
        });

        locationSuggestions.style.display = "block";
    });
    // Close suggestions when ESC is pressed
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            jobSuggestions.style.display = "none";
            locationSuggestions.style.display = "none";
        }
    });


    // Close suggestions when clicking outside
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".autocomplete")) {
            jobSuggestions.style.display = "none";
            locationSuggestions.style.display = "none";
        }
    });
}


//Section 3 : Modals => for view job and Apply Job

//1=> opening the modal
function openJobModal(jobId) {
    const job = findJobById(jobId);
    if (!job) {
        return;
    }

    currentJobIdInModal = jobId;   //tellss the modal which job are we reading


    modalJobTitleEl.textContent = job.title;
    modalCompanyLineEl.textContent = job.company + " — " + job.location;
    modalDescriptionEl.textContent = job.description;

    modalMetaEl.innerHTML =
        "<span>" + job.type + "</span>" +
        "<span>$" + job.salary.toLocaleString() + "</span>" +  //toLocaleString() fomrats the numbers by adding commas at the right places
        "<span>" + job.category + "</span>" +
        (job.remote ? "<span>Remote</span>" : "") +
        "<span>" + formatPostedDate(job.posted) + "</span>";    //add a remote tag only if the job is remote

    fillListElement(modalRequirementsEl, job.requirements);    //we built this function to item as bllet point in the ul container, here we fill it
    fillListElement(modalResponsibilitiesEl, job.responsibilities);

    const saved = isJobSaved(job.id);     //wil be defined later
    modalSaveBtn.textContent = saved ? "♥ Saved" : "♡ Save Job";
    modalSaveBtn.classList.toggle("saved", saved);    //we do this to show the previously saved jobs as saved

    // checks if the user has applied to this job across ANY page
    const applied = hasAppliedToJob(job.id);

    if (applied) {
        applyNowBtn.textContent = "✓ Applied";
        applyNowBtn.disabled = true;
    } else {
        applyNowBtn.textContent = "Apply Now";
        applyNowBtn.disabled = false;
    }




    // only show the details modal and hides the apply adn success message
    showModalView(jobDetailsViewEl);

    modalOverlay.classList.remove("hidden");
    bodyEl.style.overflow = "hidden"; // stop the page scrolling behind the modal
}

function closeJobModal() {               //hiding the modal 
    modalOverlay.classList.add("hidden");
    bodyEl.style.overflow = "";
    currentJobIdInModal = null;
}


//2=> making sure that only one modal is open while the other two are hidden
function showModalView(viewToShow) {
    const allViews = [jobDetailsViewEl, applyFormViewEl, successViewEl];
    allViews.forEach(function (view) {
        view.classList.toggle("hidden", view !== viewToShow);
    });
}

//adding the closing functionality to the modals
function setupModalEventListeners() {
    if (!modalOverlay) {
        return; // this page has no modal
    }

    modalCloseBtn.addEventListener("click", closeJobModal);
    successCloseBtn.addEventListener("click", closeJobModal);

    // click outside the modal box to closes it
    modalOverlay.addEventListener("click", function (event) {
        if (event.target === modalOverlay) {
            closeJobModal();
        }
    });

    // ESC key closes it
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
            closeJobModal();
        }
    });

    modalSaveBtn.addEventListener("click", function () {
        // toggleSavedJob() and updateJobsListing() are both defined later
        const nowSaved = toggleSavedJob(currentJobIdInModal);
        modalSaveBtn.textContent = nowSaved ? "♥ Saved" : "♡ Save Job";
        modalSaveBtn.classList.toggle("saved", nowSaved);

        // If we in the jobs pages, it will update the list according to the action , if we on index, it will render teh featured jobs again (after closing a modal)
        if (isJobsListingPage()) {
            updateJobsListing();
        } else {
            renderFeaturedJobs();
        }
    });
    //triger on clicking apply now insde a mdoal

    applyNowBtn.addEventListener("click", function () {
        const job = findJobById(currentJobIdInModal);     //gets current job ID
        applyJobTitleEl.textContent = job.title;
        applyCompanyLineEl.textContent = "at " + job.company;
        showModalView(applyFormViewEl);       //hides the other modals and show the apply form modal
        loadDraftIntoForm();     //checks local storage for pre stored data and loads it if present
    });
    //back button on the modal

    backToDetailsBtn.addEventListener("click", function () {
        showModalView(jobDetailsViewEl);
    });

    setupApplyForm();     //attach event listener to the form and also for the validation
}

//3=> Apply form (validadtion , submitting , draft data)

function setupApplyForm() {
    if (!applyFormEl) {
        return;
    }

    //saves the form data in local storage so a refresh doesnot lose the form data

    [fullNameInput, emailInput, phoneInput, coverLetterInput].forEach(function (input) {
        input.addEventListener("input", saveDraftFromForm);      //input event listener tracks text changes
    });

    applyFormEl.addEventListener("submit", function (event) {
        event.preventDefault(); // prevents the page from reloading, we handle submission with JS

        const formValues = {
            fullName: fullNameInput.value,
            email: emailInput.value,
            phone: phoneInput.value,
            coverLetter: coverLetterInput.value,
            cvFileName: cvUploadInput.files.length > 0 ? cvUploadInput.files[0].name : ""
        };

        // Errors (validateApplyForm() comes from validation.js)
        const errors = validateApplyForm(formValues);
        showFormErrors(errors);

        const hasErrors = Object.keys(errors).length > 0;  //if there are errors (object i sused here becuse validate form returns a key value pair object)
        if (hasErrors) {
            return; // stop here, don't submit
        }

        submitApplication(formValues);
    });
}

/* Shows/hides the little red error message under each field */
function showFormErrors(errors) {
    const fieldNames = ["fullName", "email", "phone", "coverLetter", "cv"];

    fieldNames.forEach(function (name) {
        const group = fieldGroups[name];
        const errorText = group.querySelector(".field-error");

        if (errors[name]) {
            group.classList.add("invalid");
            errorText.textContent = "❌ " + errors[name];
        } else {
            group.classList.remove("invalid");
            errorText.textContent = "";
        }
    });
}

//Submitting the apply form
function submitApplication(formValues) {
    const job = findJobById(currentJobIdInModal);

    const application = {
        jobId: job.id,
        jobTitle: job.title,
        company: job.company,
        fullName: formValues.fullName,
        email: formValues.email,
        phone: formValues.phone,
        coverLetter: formValues.coverLetter,
        cvFileName: formValues.cvFileName,
        submittedAt: new Date().toISOString()
    };

    // saveApplicationRecord() is defined later in the applied jobs section
    saveApplicationRecord(application);

    // clear the saved draft now that the form was submitted
    localStorage.removeItem(DRAFT_KEY);

    // reset the form + errors for next time
    applyFormEl.reset();
    showFormErrors({});

    // show the success view
    successJobTitleEl.textContent = job.title;
    successCompanyEl.textContent = job.company;
    showModalView(successViewEl);

    // Refresh the list in the background 
    if (isJobsListingPage()) {
        updateJobsListing();    //updateJobsListing() is defined later in the save jobs section
    }
}

//save the current form data as draft in the local storage
function saveDraftFromForm() {
    const draft = {
        jobId: currentJobIdInModal,
        fullName: fullNameInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
        coverLetter: coverLetterInput.value
    };
    localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

//load the form data in the local storage for the form
function loadDraftIntoForm() {
    const stored = localStorage.getItem(DRAFT_KEY);
    if (!stored) {
        return;
    }
    const draft = JSON.parse(stored);

    // only restore the draft if it belongs to the job currently being applied to
    if (draft.jobId !== currentJobIdInModal) {
        return;
    }

    fullNameInput.value = draft.fullName || "";
    emailInput.value = draft.email || "";
    phoneInput.value = draft.phone || "";
    coverLetterInput.value = draft.coverLetter || "";
}


//Section 4 : Homepage Stats 


function renderHomepageStats() {
    if (!statJobsEl) {
        return; // not on the homepage
    }


    const allJobs = getAllJobs();  //addition : a constant added to deal with all jobs including the custom jobs

    // use plain objects becuase we are dealing with keys that has to be counted to give a resut in the stat
    const uniqueCompanies = {};
    const uniqueCategories = {};
    let remoteCount = 0;

    // for (let i = 0; i < jobs.length; i++) {
    //     uniqueCompanies[jobs[i].company] = true;
    //     uniqueCategories[jobs[i].category] = true;
    //     if (jobs[i].remote) {
    //         remoteCount++;
    //     }
    // }


    // addition : the above if condition has been updated to this becuase now we are dealing with all the jobs
    for (let i = 0; i < allJobs.length; i++) {
        uniqueCompanies[allJobs[i].company] = true;
        uniqueCategories[allJobs[i].category] = true;

        if (allJobs[i].remote) {
            remoteCount++;
        }
    }

    // statJobsEl.textContent = jobs.length;     //from jobs to all jobs
    statJobsEl.textContent = allJobs.length;
    statCompaniesEl.textContent = Object.keys(uniqueCompanies).length;
    statCategoriesEl.textContent = Object.keys(uniqueCategories).length;
    statRemoteEl.textContent = remoteCount;
}


//Section 5 : Save Jobs

//1=> getting and setting saved jobs
function getSavedJobIds() {
    const stored = localStorage.getItem(SAVED_JOBS_KEY);
    if (!stored) {
        return [];
    }
    return JSON.parse(stored);
}

function saveSavedJobIds(idsArray) {
    localStorage.setItem(SAVED_JOBS_KEY, JSON.stringify(idsArray));
}

//checks if a job is saved
function isJobSaved(jobId) {
    const savedIds = getSavedJobIds();
    return savedIds.indexOf(jobId) !== -1;
}

//add the job to saved list if it is not there , oherwise removes it
function toggleSavedJob(jobId) {
    let savedIds = getSavedJobIds();     //gets the saved job id

    if (savedIds.indexOf(jobId) !== -1) {       //job exist
        savedIds = savedIds.filter(function (id) {
            return id !== jobId;
        });
        saveSavedJobIds(savedIds);       //Persists the updated array back to localStorage
        return false;
    } else {
        savedIds.push(jobId);       //if the job is not there, push it to the array
        saveSavedJobIds(savedIds);
        return true;
    }
}

//Setion 6:  the job-listing engine (earch, filters, sorting, pagination and rendering used on all pages )
//1=> bulding horizaontal job list card for other pages
function buildJobListItemHTML(job) {
    const saved = isJobSaved(job.id);

    // on the Applied Jobs page, show when the application was submitted.
    let appliedBadge = "";
    if (getJobSource() === "applied") {
        // getLatestApplicationForJob() is defined later in the applied jobs section
        const application = getLatestApplicationForJob(job.id);
        if (application) {
            const appliedDate = new Date(application.submittedAt);
            appliedBadge = '<span>Applied on ' + appliedDate.toLocaleDateString() + '</span>';
        }
    }

    return (
        '<div class="job-card" data-job-id="' + job.id + '">' +
        '<div class="job-info">' +
        '<div class="job-card-top">' +
        '<div>' +
        '<h3 class="job-title"><a href="job-details.html?id=' + job.id + '">' + job.title + '</a></h3>' +
        '<p class="job-company">' + job.company + ' &middot; ' + job.category + '</p>' +
        '</div>' +
        '</div>' +
        '<div class="job-meta">' +
        '<span>' + job.location + '</span>' +
        '<span>' + job.type + '</span>' +
        (job.remote ? '<span>Remote</span>' : '') +
        '<span>' + formatPostedDate(job.posted) + '</span>' +
        appliedBadge +
        '</div>' +
        '<p class="job-desc">' + job.description + '</p>' +
        '</div>' +
        '<div class="job-card-actions">' +
        '<span class="job-salary">$' + job.salary.toLocaleString() + '</span>' +
        '<button class="save-btn' + (saved ? ' saved' : '') + '" data-save-id="' + job.id + '" aria-label="Save job">' +
        (saved ? '♥ Saved' : '♡ Save Job') +
        '</button>' +
        '<button class="btn btn-primary btn-small" data-view-id="' + job.id + '">View Job</button>' +
        '</div>' +
        '</div>'
    );
}

//2=> we will be using the getbasejob function in the filter sort and pagination function below
function getBaseJobs() {
    const source = getJobSource();     //see what page the user is on to show the  right jobs
    const allJobs = getAllJobs();     //addition : an all job constant

    // if (source === "saved") {
    //     const savedIds = getSavedJobIds();      //gets the saved job ids
    //     return jobs.filter(function (job) {
    //         return savedIds.indexOf(job.id) !== -1;    // returns true if job.id is in savedIds
    //     });
    // }

    // if (source === "applied") {
    //     // hasAppliedToJob() is defined later in applied jobs section 
    //     return jobs.filter(function (job) {
    //         return hasAppliedToJob(job.id);     //return the jobs that has been applied
    //     });
    // }

    //addition : the two if conditions above are being updated because we now are dealing with custom jobs 
    if (source === "saved") {
        const savedIds = getSavedJobIds();              //gets the saved job ids

        return allJobs.filter(function (job) {
            return savedIds.indexOf(job.id) !== -1;       // returns true if job.id is in savedIds
        });
    }

    if (source === "applied") {
        return allJobs.filter(function (job) {
            return hasAppliedToJob(job.id);              //return the jobs that has been applied
        });
    }

    return allJobs; // all jobs for the job page
}

//3=> showing the relevant things in the filter drop down
function populateFilterDropdowns() {
    const baseJobs = getBaseJobs(); // only offer filter options relevant to this page's jobs

    const uniqueCategories = {};
    const uniqueLocations = {};

    for (let i = 0; i < baseJobs.length; i++) {
        uniqueCategories[baseJobs[i].category] = true;
        uniqueLocations[baseJobs[i].location] = true;
    }

    Object.keys(uniqueCategories).sort().forEach(function (category) {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categoryFilterSelect.appendChild(option);
    });

    Object.keys(uniqueLocations).sort().forEach(function (location) {
        const option = document.createElement("option");
        option.value = location;
        option.textContent = location;
        locationFilterSelect.appendChild(option);
    });
}

//reading the current value of the filter
function readFiltersFromControls() {
    const selectedTypes = [];
    jobTypeCheckboxes.forEach(function (box) {
        if (box.checked) {
            selectedTypes.push(box.value);
        }
    });

    return {
        search: searchInputEl.value.trim().toLowerCase(),
        category: categoryFilterSelect.value,
        location: locationFilterSelect.value,
        remoteOnly: remoteFilterCheckbox.checked,
        minSalary: Number(salaryRangeInput.value),
        jobTypes: selectedTypes
    };
}

//finally take the list of jobs and return the one that matches the current filter
function applyFilters(filters, baseJobs) {   //ake the list of jobs and the selected filter
    return baseJobs.filter(function (job) {     //sees if the matches are true or false
        const matchesSearch =
            filters.search === "" ||
            job.title.toLowerCase().indexOf(filters.search) !== -1 ||
            job.company.toLowerCase().indexOf(filters.search) !== -1 ||
            job.description.toLowerCase().indexOf(filters.search) !== -1;

        const matchesCategory = filters.category === "all" || job.category === filters.category;
        const matchesLocation = filters.location === "all" || job.location === filters.location;
        const matchesRemote = !filters.remoteOnly || job.remote === true;
        const matchesSalary = job.salary >= filters.minSalary;
        const matchesType = filters.jobTypes.length === 0 || filters.jobTypes.indexOf(job.type) !== -1;

        return matchesSearch && matchesCategory && matchesLocation && matchesRemote && matchesSalary && matchesType;
    });
}

//4=>ths does the sorting and gives a new array
function applySort(jobList, sortValue) {
    const sorted = jobList.slice();      //so the deafult data is not disturbed

    if (sortValue === "newest") {
        sorted.sort(function (a, b) {
            return new Date(b.posted) - new Date(a.posted);    //If b - a is positive, b is placed before a (descending order $\rightarrow$ newest first).
        });
    } else if (sortValue === "oldest") {
        sorted.sort(function (a, b) {
            return new Date(a.posted) - new Date(b.posted);      //asscendind order
        });
    } else if (sortValue === "salary-high") {
        sorted.sort(function (a, b) {
            return b.salary - a.salary;      //same as the date, gives the highest first ( desceding)
        });
    } else if (sortValue === "salary-low") {
        sorted.sort(function (a, b) {
            return a.salary - b.salary;       //asscending
        });
    }

    return sorted;
}

//5=> this function redraws the job list after fiter and sort
function updateJobsListing() {
    loadingStateEl.classList.remove("hidden");   //shows the loading screen
    jobsListEl.classList.add("hidden");    //hides the job list
    emptyStateEl.classList.add("hidden");     //hides the empty state

    // short network delay so the "Loading jobs..." state is visible
    setTimeout(function () {
        const baseJobs = getBaseJobs();

        // if there are no jobs in the data.js we show the 0 job message
        if (baseJobs.length === 0) {
            loadingStateEl.classList.add("hidden");    //hides loading stage
            jobsListEl.classList.add("hidden");     //hides joblist
            paginationEl.innerHTML = "";
            resultsCountEl.textContent = "0 jobs found";     //shows this message
            showEmptyState(getEmptyStateForNoBaseJobs());
            return;
        }

        //6=>invoking the filter functions
        const filters = readFiltersFromControls();
        const filtered = applyFilters(filters, baseJobs);
        const sorted = applySort(filtered, sortSelectEl.value);

        loadingStateEl.classList.add("hidden");

        if (sorted.length === 0) {     //no matching job 
            showEmptyState({
                icon: "🔍",
                html: "<strong>No jobs found.</strong><br />Try changing your search or filters."
            });
            jobsListEl.classList.add("hidden");
            resultsCountEl.textContent = "0 jobs found";
            paginationEl.innerHTML = "";
            return;
        }

        // Pagination math
        const totalPages = Math.ceil(sorted.length / JOBS_PER_PAGE);    //gives the total page count
        if (currentPage > totalPages) {
            currentPage = totalPages;
        }
        const startIndex = (currentPage - 1) * JOBS_PER_PAGE;    //Calculates array index offset (e.g., Page 2 starts at index (2 - 1) * 6 = 6).
        const pageItems = sorted.slice(startIndex, startIndex + JOBS_PER_PAGE);   //extracts only 6 itmes, i.e if from 6, 6 to 12

        let html = "";
        for (let i = 0; i < pageItems.length; i++) {    //goes through each item and builds the horizontal html layout
            html += buildJobListItemHTML(pageItems[i]);
        }
        jobsListEl.innerHTML = html;    //shows the bulilt html
        jobsListEl.classList.remove("hidden");    //removes hidden class from joblistel to show it

        resultsCountEl.textContent = sorted.length + (sorted.length === 1 ? " job found" : " jobs found");

        attachSaveButtonListeners(jobsListEl);     //evenlistener to the new buttons
        attachViewButtonListeners(jobsListEl);
        renderPagination(totalPages);     //generates pagination page number buttons
    }, 250);
}

//7=> appropriate  state messages
function getEmptyStateForNoBaseJobs() {
    const source = getJobSource();

    if (source === "saved") {
        return {
            icon: "🤍",
            html: "<strong>You haven't saved any jobs yet.</strong><br />Browse jobs and tap the heart icon to save one for later."
        };
    }

    if (source === "applied") {
        return {
            icon: "📄",
            html: "<strong>You haven't applied to any jobs yet.</strong><br />Find a job you like and hit Apply Now."
        };
    }

    return {
        icon: "🔍",
        html: "<strong>No jobs found.</strong><br />Try changing your search or filters."
    };
}

function showEmptyState(state) {
    emptyStateEl.querySelector(".state-icon").textContent = state.icon;
    emptyStateEl.querySelector("p").innerHTML = state.html;
    emptyStateEl.classList.remove("hidden");
}

//8=> Rendering Pagination
function renderPagination(totalPages) {
    paginationEl.innerHTML = "";

    if (totalPages <= 1) {
        return;
    }

    const prevBtn = document.createElement("button");    //create the previous button
    prevBtn.textContent = "‹";
    prevBtn.disabled = currentPage === 1;      //disable it on page 1
    prevBtn.addEventListener("click", function () {
        currentPage--;
        updateJobsListing();
        window.scrollTo({ top: 0, behavior: "smooth" });    //on clicking , decrease the page number and do this
    });
    paginationEl.appendChild(prevBtn);

    for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
        const pageBtn = document.createElement("button");    //craete the number in pagination
        pageBtn.textContent = pageNum;      //no. of pages are calculated and given to the page button
        if (pageNum === currentPage) {      //when on current page
            pageBtn.classList.add("active");      //add the active class
        }
        pageBtn.addEventListener("click", function () {     //on clicking the page btn
            currentPage = pageNum;                            //current page will be the page number clicked
            updateJobsListing();        //upadte job list
            window.scrollTo({ top: 0, behavior: "smooth" });     //scroll to top
        });
        paginationEl.appendChild(pageBtn);
    }

    const nextBtn = document.createElement("button");    //create the next button
    nextBtn.textContent = "›";
    nextBtn.disabled = currentPage === totalPages;     //when current page is equal to the total pages we disbale the button
    nextBtn.addEventListener("click", function () {      //click funcionality
        currentPage++;
        updateJobsListing();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    paginationEl.appendChild(nextBtn);
}

//9=> url params for filters
function syncFiltersToURL() {
    const filters = readFiltersFromControls();
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.category !== "all") params.set("category", filters.category);
    if (filters.location !== "all") params.set("location", filters.location);
    if (filters.remoteOnly) params.set("remote", "true");

    const newURL = window.location.pathname + (params.toString() ? "?" + params.toString() : "");
    window.history.replaceState(null, "", newURL);
}

//reading the filters passed in the url into the filter controls so we get them lets say when we move from home page to jobs page
function applyFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);

    const search = params.get("search");
    const category = params.get("category");
    const location = params.get("location");
    const remote = params.get("remote");

    if (search) {
        searchInputEl.value = search;
    }
    if (category) {
        categoryFilterSelect.value = category;
    }
    if (location) {
        locationFilterSelect.value = location;
    }
    if (remote === "true") {
        remoteFilterCheckbox.checked = true;
    }
}

// Any filter change resets us back to page 1 and re-renders
function setupFilterEventListeners() {
    //which resets pagination back to page 1, updates the browser URL parameters and re-renders the job listings   
    function onFilterChange() {
        currentPage = 1;
        syncFiltersToURL();
        updateJobsListing();
    }

    // Search box uses debounce so it doesn't refilter on every keystroke
    const debouncedFilterChange = debounce(onFilterChange, 300);
    searchInputEl.addEventListener("input", debouncedFilterChange);

    categoryFilterSelect.addEventListener("change", onFilterChange);
    locationFilterSelect.addEventListener("change", onFilterChange);
    remoteFilterCheckbox.addEventListener("change", onFilterChange);
    sortSelectEl.addEventListener("change", onFilterChange);

    jobTypeCheckboxes.forEach(function (checkbox) {
        checkbox.addEventListener("change", onFilterChange);
    });

    salaryRangeInput.addEventListener("input", function () {
        // update the little label live as the user drags the slider
        salaryRangeValueEl.textContent = salaryRangeInput.value;
    });
    salaryRangeInput.addEventListener("change", onFilterChange);

    clearFiltersBtn.addEventListener("click", function () {      //clears all the filters
        searchInputEl.value = "";
        categoryFilterSelect.value = "all";
        locationFilterSelect.value = "all";
        remoteFilterCheckbox.checked = false;
        salaryRangeInput.value = 0;
        salaryRangeValueEl.textContent = "0";
        jobTypeCheckboxes.forEach(function (checkbox) {
            checkbox.checked = false;
        });
        onFilterChange();
    });
}


//Section 7 Applied Jobs local storage code

//1=>get application
function getApplications() {
    const stored = localStorage.getItem(APPLICATIONS_KEY);
    return stored ? JSON.parse(stored) : [];
}

//set application
function saveApplicationRecord(application) {
    const applications = getApplications();
    applications.push(application);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(applications));
}

//2=>returns the jobs that the user has applied for
function hasAppliedToJob(jobId) {
    const applications = getApplications();
    return applications.some(function (app) {
        return app.jobId === jobId;
    });
}

//returning the most latest job or handling null
function getLatestApplicationForJob(jobId) {
    const applications = getApplications().filter(function (app) {
        return app.jobId === jobId;
    });
    if (applications.length === 0) {
        return null;
    }
    // the most recently submitted one is the last one in the array since saveApplicationRecord() always pushes onto the end
    return applications[applications.length - 1];
}


//Section 8 job-details page for the url param concept

function setupJobDetailsPage() {
    if (!detailsContentEl) {
        return; // not on job-details.html
    }

    const params = new URLSearchParams(window.location.search);
    const jobId = Number(params.get("id"));
    const job = findJobById(jobId);

    detailsLoadingEl.classList.add("hidden");

    if (!job) {
        detailsNotFoundEl.classList.remove("hidden");
        return;
    }

    detailsTitleEl.textContent = job.title;
    detailsCompanyLineEl.textContent = job.company + " — " + job.location;
    detailsDescriptionEl.textContent = job.description;

    detailsMetaEl.innerHTML =
        "<span>" + job.type + "</span>" +
        "<span>$" + job.salary.toLocaleString() + "</span>" +
        "<span>" + job.category + "</span>" +
        (job.remote ? "<span>Remote</span>" : "") +
        "<span>" + formatPostedDate(job.posted) + "</span>";

    fillListElement(detailsRequirementsEl, job.requirements);
    fillListElement(detailsResponsibilitiesEl, job.responsibilities);

    const saved = isJobSaved(job.id);
    detailsSaveBtn.textContent = saved ? "♥ Saved" : "♡ Save Job";
    detailsSaveBtn.classList.toggle("saved", saved);

    detailsSaveBtn.addEventListener("click", function () {
        const nowSaved = toggleSavedJob(job.id);
        detailsSaveBtn.textContent = nowSaved ? "♥ Saved" : "♡ Save Job";
        detailsSaveBtn.classList.toggle("saved", nowSaved);
    });

    // "Apply Now" here sends the user to the jobs page and asks it to open the apply modal for this specific job (via a URL parameter).
    detailsApplyBtn.addEventListener("click", function () {
        window.location.href = "jobs.html?openApply=" + job.id;
    });

    detailsContentEl.classList.remove("hidden");
}


//Section 9 Calling all the functions after the page has fully loaded
//1=>waits till all the content is loaded
document.addEventListener("DOMContentLoaded", function () {

    //each function only works when its elements are presenet i.e on the right page  
    renderFeaturedJobs();
    renderHomepageStats();
    setupHeroSearch();
    setupAutocomplete();



    // for Jobs listing page-only setup (Browse Jobs / Saved Jobs / Applied Jobs)
    if (isJobsListingPage()) {
        populateFilterDropdowns();
        applyFiltersFromURL();
        setupFilterEventListeners();
        updateJobsListing();
    }

    // Modal setup - must run BEFORE we try to open the modal below
    setupModalEventListeners();

    if (isJobsListingPage()) {
        // If we arrived here from job-details.html with ?openApply=ID, open that job's modal and jump straight to the apply form.
        const params = new URLSearchParams(window.location.search);
        const openApplyId = params.get("openApply");
        if (openApplyId) {
            openJobModal(Number(openApplyId));
            applyNowBtn.click();
        }
    }

    // job-details.html-only setup
    setupJobDetailsPage();
});
