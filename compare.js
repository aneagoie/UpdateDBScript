function onlyInExcel(secondBlock, firstBlock) {
  return secondBlock.filter(function(current){
    return firstBlock.filter(function(current_a){
        return current_a.organization_name === current.organization_name;
    }).length === 0;
  });
}
function onlyInDB(secondBlock, firstBlock) {
  return firstBlock.filter(function(current){
    return secondBlock.filter(function(current_a){
        return current_a.organization_name === current.organization_name;
    }).length === 0;
  });
}
function updatedInDB(secondBlock, firstBlock) {
  return firstBlock.filter(function(current){
    return secondBlock.filter(function(current_a){
        return current_a.organization_name === current.organization_name &&
                current_a.email === current.email &&
                current_a.label === current.label &&
                current_a.type === current.type &&
                current_a.address === current.address &&
                current_a.first_name === current.first_name &&
                current_a.last_name === current.last_name &&
                current_a.website === current.website &&
                current_a.city === current.city  &&
                current_a.state === current.state &&
                current_a.zip_code === current.zip_code &&
                current_a.phone_number === current.phone_number &&
                current_a.latitude === current.latitude &&
                current_a.longitude === current.longitude;
    }).length === 0;
  });
}



function updatedInExcel(secondBlock, firstBlock) {
  return secondBlock.filter(function(current){
    return firstBlock.filter(function(current_a){
        return current_a.organization_name === current.organization_name &&
                current_a.email === current.email &&
                current_a.label === current.label &&
                current_a.type === current.type &&
                current_a.address === current.address &&
                current_a.first_name === current.first_name &&
                current_a.last_name === current.last_name &&
                current_a.website === current.website &&
                current_a.city === current.city  &&
                current_a.state === current.state &&
                current_a.zip_code === current.zip_code &&
                current_a.phone_number === current.phone_number &&
                current_a.latitude === current.latitude &&
                current_a.longitude === current.longitude;
    }).length === 0;
  });
}

function makeNewPropertyTrue(onlyInExcel) {
 onlyInExcel.forEach(function (data) {
  data.newRow = true;
 });
}
function makeUpdatePropertyTrue(updatedInExcel) {
 updatedInExcel.forEach(function (data) {
  if (!data.newRow) {
    data.update = true;
  }
 });
}
function makeUpdatePropertyTrueDB(updatedInDB) {
 updatedInDB.forEach(function (data) {
  if (!data.noTouchy) {
    data.update = true;
  }
 });
}
function makeNoTouchyPropertyTrue(updatedInDB) {
 updatedInDB.forEach(function (data) {
  if (!data.update) {
    data.noTouchy = true;
  }
 });
}

function deleteDuplicates (totalBlock) {
  var temp=[];
  for(i=0;i<totalBlock.length;i++){
    if (i < totalBlock.length-1) {
      if(totalBlock[i].organization_name==totalBlock[i+1].organization_name) {continue;}
      temp[temp.length]=totalBlock[i];
    } else {
      temp[temp.length]=totalBlock[i];
    }
  }
  return temp;
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    };
}

module.exports = {
  onlyInExcel: onlyInExcel,
  onlyInDB: onlyInDB,
  updatedInExcel: updatedInExcel,
  updatedInDB: updatedInDB,
  makeNewPropertyTrue: makeNewPropertyTrue,
  makeUpdatePropertyTrue: makeUpdatePropertyTrue,
  makeUpdatePropertyTrueDB: makeUpdatePropertyTrueDB,
  makeNoTouchyPropertyTrue: makeNoTouchyPropertyTrue,
  deleteDuplicates: deleteDuplicates,
  dynamicSort: dynamicSort
};


var excelCsv = [
  {
    organization_name:"4a55eff3",
    email:"Jamsheer",
    type: 'A',
    first_name: 'A',
    last_name: 'A',
    website: 'A',
    city: 'A',
    state: 'A',
    zip_code: 'A',
    phone_number: 'A',
    latitude: 'A',
    longitude: 'A',
    update: false,
    newRow: false,
    noTouchy: false
  },
  {
    organization_name:"b6ee537a",
    email:"RaviSoups",
    type: 'A',
    first_name: 'A',
    last_name: 'A',
    website: 'A',
    city: 'A',
    state: 'A',
    zip_code: 'A',
    phone_number: 'A',
    latitude: 'A',
    longitude: 'A',
    update: false,
    newRow: false,
    noTouchy: false
  },
  {
    organization_name:"e97339e1",
    email:"Ajmal",
    type: 'A',
    first_name: 'A',
    last_name: 'A',
    website: 'A',
    city: 'B',
    state: 'A',
    zip_code: 'A',
    phone_number: 'A',
    latitude: 'A',
    longitude: 'A',
    update: false,
    newRow: false,
    noTouchy: false
  },
  {
    organization_name:"a63a6f77",
    email:"Ryan",
    type: 'A',
    first_name: 'A',
    last_name: 'A',
    website: 'A',
    city: 'A',
    state: 'A',
    zip_code: 'A',
    phone_number: 'A',
    latitude: 'A',
    longitude: 'A',
    update: false,
    newRow: false,
    noTouchy: false
  }];

var dbCsv = [
  {
    organization_name:"4a55eff3",
    email:"Jamsheer",
    type: 'A',
    first_name: 'A',
    last_name: 'A',
    website: 'A',
    city: 'A',
    state: 'A',
    zip_code: 'A',
    phone_number: 'A',
    latitude: 'A',
    longitude: 'A',
    update: false,
    newRow: false,
    noTouchy: false
  },
  {
    organization_name:"644838b3",
    email:"Muhammed",
    type: 'A',
    first_name: 'A',
    last_name: 'A',
    website: 'A',
    city: 'A',
    state: 'A',
    zip_code: 'A',
    phone_number: 'A',
    latitude: 'A',
    longitude: 'A',
    update: false,
    newRow: false,
    noTouchy: false
  },
  {
    organization_name:"b6ee537a",
    email:"Ravi",
    type: 'A',
    first_name: 'A',
    last_name: 'A',
    website: 'A',
    city: 'A',
    state: 'A',
    zip_code: 'A',
    phone_number: 'A',
    latitude: 'A',
    longitude: 'A',
    update: false,
    newRow: false,
    noTouchy: false
  },
  {
    organization_name:"e97339e1",
    email:"Ajmal",
    type: 'A',
    first_name: 'A',
    last_name: 'A',
    website: 'A',
    city: 'A',
    state: 'A',
    zip_code: 'A',
    phone_number: 'A',
    latitude: 'A',
    longitude: 'A',
    update: false,
    newRow: false,
    noTouchy: false
  },
  {
    organization_name:"a3a6f77",
    email:"Andrei",
    type: 'A',
    first_name: 'A',
    last_name: 'A',
    website: 'A',
    city: 'A',
    state: 'A',
    zip_code: 'A',
    phone_number: 'A',
    latitude: 'A',
    longitude: 'A',
    update: false,
    newRow: false,
    noTouchy: false
  }];

var newOrganization = onlyInExcel(excelCsv, dbCsv);
var updatedAndNewOrganizations = updatedInExcel(excelCsv, dbCsv);
makeNewPropertyTrue(newOrganization);
makeUpdatePropertyTrue(updatedAndNewOrganizations);

var oldOrganizationDB = onlyInDB(excelCsv, dbCsv);
var updatedAndNewOrganizationsDB = updatedInDB(excelCsv, dbCsv);
makeNoTouchyPropertyTrue(oldOrganizationDB);
makeUpdatePropertyTrueDB(updatedAndNewOrganizationsDB);
var updatedOrganizationsFinal = updatedAndNewOrganizations.filter(function (data) {
  return data.newRow === false;
});
var updatedOrganizationsFinalDB = dbCsv.filter(function (data) {
  return data.update === true;
});
// console.log('Untouched', oldOrganizationDB);
// console.log('UpdatedDB', updatedOrganizationsFinalDB);
// console.log('New', newOrganization);
// console.log('Updated', updatedOrganizationsFinal);



