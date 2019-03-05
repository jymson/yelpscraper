const osmosis = require('osmosis');
const fs = require('fs');
const path = require('path');
const os = require('os');

let stores = ['mcdonalds', 'in-n-out', ]

let store = 'McDonalds';
let city = 'Concord';
let state = 'CA';
let url = 'https://www.yelp.com/search?choq=1&find_desc='+ store + '&find_loc=' + city + '%2C%20' + state;
// output file in the same folder
const filename = path.join(__dirname, 'output.csv');


let pageLimit = 2;
let pageCounter = 0;
let counter = 0;

function createCSV(data) {
  const output = [];
  data.forEach((d) => {
    const row = []; // a new array for each row of data
    row.push(d.business_name);
    row.push(d.address);
    row.push(d.phone);

    output.push(row.join()); // by default, join() uses a ','
  });

  fs.writeFileSync(filename, output.join(os.EOL));
}

function crawlPage (data) {
  if (pageCounter < pageLimit) {
    counter += 30;
    pageCounter+=1;

    let newURL = url+'&start='+ counter;

    osmosis
    .get(newURL)
    .set([
      osmosis
      .find('.lemon--div__373c0__1mboc.mapColumnTransition__373c0__10KHB.arrange-unit__373c0__1piwO.arrange-unit-fill__373c0__17z0h.border-color--default__373c0__2oFDT .lemon--div__373c0__1mboc.searchResult__373c0__1yggB.border-color--default__373c0__2oFDT:gt(3)')
      .set({
        business_name: '.lemon--a__373c0__IEZFH.link__373c0__29943.link-color--blue-dark__373c0__1mhJo.link-size--inherit__373c0__2JXk5',
        address: '.domtags--address__373c0__cgebO',
        phone: '.lemon--div__373c0__1mboc.u-padding-t-half.u-padding-l2.border-color--default__373c0__2oFDT.text-align--right__373c0__3fmmn > .lemon--div__373c0__1mboc.display--inline-block__373c0__2de_K.border-color--default__373c0__2oFDT'
      })
      .find('.lemon--a__373c0__IEZFH.link__373c0__29943.next-link.navigation-button__373c0__1D3Ug.link-color--blue-dark__373c0__1mhJo.link-size--default__373c0__1skgq')
    ])
    .data((items)=>{
      let result = items.concat(data)
      dude(result)
    })
    .log(console.log)
    .error(console.log)
    .debug(console.log)
  } else {
    crawlPage(data);
  }
}

osmosis
.get(url)
.set([
  osmosis
  .find('.lemon--div__373c0__1mboc.mapColumnTransition__373c0__10KHB.arrange-unit__373c0__1piwO.arrange-unit-fill__373c0__17z0h.border-color--default__373c0__2oFDT .lemon--div__373c0__1mboc.searchResult__373c0__1yggB.border-color--default__373c0__2oFDT:gt(3)')
  .set({
    business_name: '.lemon--a__373c0__IEZFH.link__373c0__29943.link-color--blue-dark__373c0__1mhJo.link-size--inherit__373c0__2JXk5',
    address: '.domtags--address__373c0__cgebO',
    phone: '.lemon--div__373c0__1mboc.u-padding-t-half.u-padding-l2.border-color--default__373c0__2oFDT.text-align--right__373c0__3fmmn > .lemon--div__373c0__1mboc.display--inline-block__373c0__2de_K.border-color--default__373c0__2oFDT'
  })
  .find('.lemon--a__373c0__IEZFH.link__373c0__29943.next-link.navigation-button__373c0__1D3Ug.link-color--blue-dark__373c0__1mhJo.link-size--default__373c0__1skgq')
])
.data((items)=>{
  dude(items)
})
.log(console.log)
.error(console.log)
.debug(console.log)