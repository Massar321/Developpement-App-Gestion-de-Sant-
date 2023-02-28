
const pageSize = 20; // Number of patients to display per page
let pageNumber = 0; // Current page number

function addPatient() {
    const form = document.createElement('form');



    // create name fieldset
    const nameFieldset = document.createElement('fieldset');
    const nameLegend = document.createElement('legend');
    nameLegend.textContent = 'Name';
    const givenLabel = document.createElement('label');
    givenLabel.textContent = 'Given Name';
    const givenInput = document.createElement('input');
    givenInput.type = 'text';
    givenInput.name = 'givenName';
    const familyLabel = document.createElement('label');
    familyLabel.textContent = 'Family Name';
    const familyInput = document.createElement('input');
    familyInput.type = 'text';
    familyInput.name = 'familyName';
    nameFieldset.appendChild(nameLegend);
    nameFieldset.appendChild(givenLabel);
    nameFieldset.appendChild(givenInput);
    nameFieldset.appendChild(familyLabel);
    nameFieldset.appendChild(familyInput);

    // create gender fieldset
    const genderFieldset = document.createElement('fieldset');
    const genderLegend = document.createElement('legend');
    genderLegend.textContent = 'Gender';
    const maleLabel = document.createElement('label');
    maleLabel.textContent = 'Male';
    const maleInput = document.createElement('input');
    maleInput.type = 'radio';
    maleInput.name = 'gender';
    maleInput.value = 'male';
    maleLabel.appendChild(maleInput);
    const femaleLabel = document.createElement('label');
    femaleLabel.textContent = 'Female';
    const femaleInput = document.createElement('input');
    femaleInput.type = 'radio';
    femaleInput.name = 'gender';
    femaleInput.value = 'female';
    femaleLabel.appendChild(femaleInput);
    genderFieldset.appendChild(genderLegend);
    genderFieldset.appendChild(maleLabel);
    genderFieldset.appendChild(femaleLabel);

    // create birthday fieldset
    const birthdayFieldset = document.createElement('fieldset');
    const birthdayLegend = document.createElement('legend');
    birthdayLegend.textContent = 'Birthday';
    const birthdayInput = document.createElement('input');
    birthdayInput.type = 'date';
    birthdayInput.name = 'birthday';
    birthdayFieldset.appendChild(birthdayLegend);
    birthdayFieldset.appendChild(birthdayInput);

    // create address fieldset
    const addressFieldset = document.createElement('fieldset');
    const addressLegend = document.createElement('legend');
    addressLegend.textContent = 'Address';
    const streetLabel = document.createElement('label');
    streetLabel.textContent = 'Street';
    const streetInput = document.createElement('input');
    streetInput.type = 'text';
    streetInput.name = 'street';
    const cityLabel = document.createElement('label');
    cityLabel.textContent = 'City';
    const cityInput = document.createElement('input');
    cityInput.type = 'text';
    cityInput.name = 'city';
    addressFieldset.appendChild(addressLegend);
    addressFieldset.appendChild(streetLabel);
    addressFieldset.appendChild(streetInput);
    addressFieldset.appendChild(cityLabel);
    addressFieldset.appendChild(cityInput);



    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'buttona';
    submitButton.textContent = 'Add';
    // add fieldsets to form
    form.appendChild(nameFieldset);
    form.appendChild(genderFieldset);
    form.appendChild(birthdayFieldset);
    form.appendChild(addressFieldset);
    form.appendChild(submitButton);
    const patientList = document.getElementById('patient-list');
    patientList.insertAdjacentElement('beforebegin', form);
    let r = document.createElement("img");

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        // get the form data and create a JSON object
        const formData = new FormData(form);
        const data = {
            resourceType: 'Patient',
            // identifier: [{
            //   system: 'http://example.com/patient',
            //   value: `${formData.get('givenName')}_${formData.get('familyName')}`
            // }],
            active: true,
            name: [{
                given: [formData.get('givenName')],
                family: formData.get('familyName')
            }],
            // telecom: [{
            //   system: 'phone',
            //   value: formData.get('phone')
            // }],
            gender: formData.get('gender'),
            birthDate: formData.get('birthday'),
            address: [{
                use: 'home',
                line: [formData.get('street')],
                city: formData.get('city')
            }],
            // maritalStatus: {
            //   coding: [{
            //     system: 'http://hl7.org/fhir/v3/MaritalStatus',
            //     code: formData.get('maritalStatus')
            //   }]
        };
        // const data = {
        //     resourceType: "Patient",
        //     meta: { versionId: "1" },
        //     name: [{
        //         given: [givenName],
        //         family: [familyName]
        //     }],
        //     gender: gender
        // };
        console.log(JSON.stringify(data));
        const response = await fetch("http://hapi.fhir.org/baseDstu3/Patient/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result); // Log the response data (optional)
        form.remove();
        document.getElementById('patient-list').innerHTML = ''; // Clear existing list items
        r.id = 'wait';
        r.src = "load.jpg";
        document.getElementById('main').parentNode.appendChild(r);
        listPatients();
    });

};

function updatePatient(idd) {
    // Create a new URLSearchParams object and add the data to it
    let params = new URLSearchParams();
    params.append("data", idd);

    // Create a new URL with the search parameter
    let url = "update.html?" + params.toString();

    // Redirect the user to the new page
    window.location.href = url;

    return



    const patientList = document.getElementById('patient-list');
    const patientListItem = document.getElementById(idd);
    const patientName = patientListItem.querySelector('.patient-name');
    const givenName = patientName.textContent.split(" ")[0];
    const familyName = patientName.textContent.split(" ")[1];
    const form = document.createElement('form');
    const givenNameInput = document.createElement('input');
    givenNameInput.type = 'text';
    givenNameInput.value = givenName;
    const familyNameInput = document.createElement('input');
    familyNameInput.type = 'text';
    familyNameInput.value = familyName;
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'buttona';
    submitButton.textContent = 'Update';
    form.appendChild(givenNameInput);
    form.appendChild(familyNameInput);
    form.appendChild(submitButton);
    patientList.insertAdjacentElement('beforebegin', form);
    let rr = document.createElement("img");

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const updatedGivenName = givenNameInput.value;
        const updatedFamilyName = familyNameInput.value;
        const data = {
            resourceType: "Patient",
            id: idd,
            name: {
                given: [updatedGivenName],
                family: [updatedFamilyName]
            }
        };
        const response = await fetch(`http://hapi.fhir.org/baseDstu3/Patient/${idd}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const result = await response.json();
        console.log(result); // Log the response data (optional)
        form.remove();
        document.getElementById('patient-list').innerHTML = ''; // Clear existing list items
        rr.id = 'wait';
        rr.src = "load.jpg";
        document.getElementById('main').parentNode.appendChild(rr);
        listPatients();
    });

};

async function deletePatient(patientIndex) {
    //var patientIndex = prompt("Enter the ID of the patient you want to delete :");
    // var patientList = document.getElementById("patient-list");
    // var link=`http://hapi.fhir.org/baseR4/Patient/${patientIndex}`
    var link = `http://hapi.fhir.org/baseDstu3/Patient/${patientIndex}`
    console.log(link);
    const response = await fetch(link, {
        method: 'DELETE',
    });
    const data = await response.json();
    console.log(data); // Log the response data (optional)
    // var patientToBeDeleted = patientList.children[patientIndex];
    // //patientList.removeChild(patientToBeDeleted);

    // let rr1 = document.createElement("img");
    // document.getElementById('patient-list').innerHTML = ''; // Clear existing list items
    // rr1.id = 'wait';
    // rr1.src = "load.jpg";
    // document.getElementById('main').parentNode.appendChild(rr1);
    location.href = "index.html";
    // listPatients();
};

async function listPatients() {
    let rrr = document.getElementById('wait');
    if (rrr == null) {
        rrr = document.createElement("img");
        rrr.id = 'wait';
        rrr.src = "load.jpg";
        document.getElementById('main').parentNode.appendChild(rrr);
    }
    let offset = pageSize * pageNumber;
    console.log(`https://hapi.fhir.org/baseDstu3/Patient?_sort=-_lastUpdated&_count=${pageSize}&_offset=${offset}`);
    const response = await fetch(`https://hapi.fhir.org/baseDstu3/Patient?_sort=-_lastUpdated&_count=${pageSize}&_offset=${offset}`);
    const data = await response.json();

    const tbl = document.getElementById("rowexample");

    // Get the parent element
    const parentElement = tbl.parentElement;

    // Loop through the child nodes of the parent element
    for (let i = parentElement.childNodes.length - 1; i >= 0; i--) {
        const childNodet = parentElement.childNodes[i];

        // Remove all child nodes except the one used to access the parent element
        if (childNodet !== tbl) {
            parentElement.removeChild(childNodet);
        }
    }





    data.entry.forEach(patient => {
        if ( patient.resource.name == undefined || patient.resource.name == null ) {
            5+5;
        }else{
        console.log(patient.resource);
        // const copiedElement = tbl.cloneNode(true);
        const copiedElement = tbl.cloneNode(false);
        copiedElement.setAttribute("id", patient.resource.id);
        // const childNodes = copiedElement.childNodes;
        // console.log(childNodes);
        let e;

        e=document.createElement("td")
        e.textContent= patient.resource.id ?? "UNKNOWN"
        copiedElement.appendChild(e)
        e=document.createElement("td")
        e.textContent= patient.resource.name[0].family ?? "UNKNOWN"
        copiedElement.appendChild(e)
         e=document.createElement("td")
        e.textContent= patient.resource.name[0].given ? patient.resource.name[0].given[0] : "UNKNOWN"
        copiedElement.appendChild(e)
        
        // childNodes[0].textContent = patient.resource.id ?? "UNKNOWN"
        // childNodes[2].textContent = patient.resource.name[0].family ?? "UNKNOWN"
        // childNodes[1].textContent = patient.resource.name[0].given ? patient.resource.name[0].given[0] : "UNKNOWN"

        const updateButton = document.createElement('button');
        updateButton.classList.add('buttonu');
        updateButton.setAttribute('id', `update-button-${patient.resource.id}`);
        updateButton.setAttribute('data-id', patient.resource.id);
        updateButton.setAttribute('class', "bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full");
        updateButton.textContent = 'Update';

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('buttond');
        deleteButton.setAttribute('id', `delete-button-${patient.resource.id}`);
        deleteButton.setAttribute('data-id', patient.resource.id);
        deleteButton.setAttribute('class', "bg-red-500 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full");
        deleteButton.textContent = 'Delete';

        const detailsButton = document.createElement('button');
        detailsButton.classList.add('buttondd');
        detailsButton.setAttribute('id', `details-button-${patient.resource.id}`);
        detailsButton.setAttribute('data-id', patient.resource.id);
        detailsButton.setAttribute('class', "bg-green-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded-full");
        detailsButton.textContent = 'Details';

        updateButton.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            updatePatient(id);
        });

        deleteButton.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            deletePatient(id);
        });
        detailsButton.addEventListener('click', (event) => {
            const id = event.target.dataset.id;
            details(id);
        });

        const controls = document.createElement('div');
        controls.appendChild(updateButton);
        controls.appendChild(deleteButton);
        controls.appendChild(detailsButton);

        // childNodes[3].appendChild(controls);
        copiedElement.appendChild(controls)
        tbl.parentElement.append(copiedElement);
    }
    }
    );

    rrr.remove()
};

async function details(idd) {

    const response = await fetch(`http://hapi.fhir.org/baseDstu3/Patient/${idd}`, {
        method: 'GET'
    });
    const result = await response.json();
    // console.log(result); // Log the response data (optional)
    let t = result;
    console.log(t); // Log the response data (optional)
    console.log(t.id); // Log the response data (optional)
    console.log(t.name); // Log the response data (optional)
    alert(`
                ID : `+ t.id + `
                Given Name : `+ t.name[0].given + `
                Family Name : `+ t.name[0].family + `
                Gender :  `+ t.gender + `
                Birthdate :  `+ t.birthDate + `
                Adress : `+ t.address[0].state + ` `+t.address[0].city+`
        `);

};

function goback() {
    if (pageNumber > 0) {
        pageNumber--;
        listPatients();
    }
}
function gonext() {
    pageNumber++;
    listPatients();
}

listPatients();