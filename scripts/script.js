$(document).ready(function() {

  // List of artifacts, that will show on screen after loading the page
  var artifacts = [{
      id: 'artifact1',
      title: 'Balance',
      year: '2016',
      author: 'Darab Dénes',
      image: './images/darabdenesbalance.jpg'
    },

    {
      id: 'artifact2',
      title: 'Just the tip',
      year: '2016',
      author: 'Darab Dénes',
      image: './images/darabdenesjustthetip.jpg'
    },

    {
      id: 'artifact3',
      title: 'Balance',
      year: '2016',
      author: 'Darab Dénes',
      image: './images/darabdenesbalancelandscape.jpg'
    },

    {
      id: 'artifact4',
      title: 'Balance',
      year: '2016',
      author: 'Darab Dénes',
      image: './images/darabdenesbalancelandscape.jpg'
    },

    {
      id: 'artifact5',
      title: 'Balance',
      year: '2016',
      author: 'Darab Dénes',
      image: './images/darabdenesbalancelandscape.jpg'
    },


  ];

  function displayArtifacts(artifacts) {
    // loop over artifacts that are passed into function
    for (var i = 0; i < artifacts.length; i++) {
      var $populatedTemplate = $(populateTemplate(artifacts[i]));
      $('#content-strip').append($populatedTemplate);
    }

    // fade in all items in a staggered appear animation
    //var $hiddenIngredients = $('#ingredients-wrapper').children();
    //console.log('hiddenIngredients: ', $hiddenIngredients)

    // jquerys .each method allows to use another way of looping over objects
    //$hiddenIngredients.each(function(index) {
      // this refers to each single item included in hiddenIngredients
    //  var $item = $(this);
    //  console.log('this: ', $(this));

      // JavaScript's native setTimeout function allows to execute a function with a given delay
      // by increasing the delay each time, we get a staggered class removal
    //  setTimeout(function() {
    //    $item.removeClass('is-hidden');
    //  }, index * 100);
    //});
  }


  function populateTemplate(artifact) {
    // Using template literals, we can return a nicely populated template
    var template = `<div class="item" id="${artifact.id}">

        <div class="thumbnail">
          <img class="artifact" src="${artifact.image}" />
        </div>

        <div class="description">
          <p class="description-text">${artifact.title}, ${artifact.year}</p>
          <p class="description-text italic-text">${artifact.author}</p>
          <img class="star" id="${artifact.title}" src="./images/starfilled.png" />
        </div>
      </div>`

    return template;
  }

  function calculateTotalPrice($ingredients) {
    var totalPrice = 0; // initally 0 CHF

    // jquerys $(selector).each is just like a javascript loop
    // looping over all ingredients
    $ingredients.each(function() {
      // this refers to each single item included in $ingredients
      console.log('this: ', this);
      // jquerys find() method allows to parse all children of a given jquery object
      // here we look for all nodes with the class ".js-ingredient-price" and take it's content
      // with jquerys .html() method
      var price = $(this).find('.js-ingredient-price').html();

      // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat
      var priceAsNumber = parseFloat(price, 10);
      // each time we add the price to the total price
      totalPrice = totalPrice + priceAsNumber;
    });

    return totalPrice;
  }

  function getSelectedIngredients() {
    // go through each of the ingredients and check if they are selected
    var $allIngredients = $('.js-ingredient');
    console.log('allIngredients: ', $allIngredients);

    // jquerys filter can reduce a collection depending on the return value of a function
    // We now check in this function if the checkbox of this element is selected
    // If it is not, we filter the ingredient out
    var $filteredIngredients = $allIngredients.filter(function(index) {
      console.log('index: ', index);

      var $checkbox = $(this).find('.js-checkbox');

      // reading the checkboxes state
      var checkboxState = $checkbox.is(':checked');
      console.log('checkboxState: ', checkboxState);

      // if we return true, the element is still in the original collection
      // if checkboxState is false the element is filtered out
      return checkboxState;
    });

    return $filteredIngredients;
  }

  function displayPriceOnScreen(price) {
    var formattedPrice = price.toFixed(2);
    $('#price-amount').html(`<strong>${formattedPrice} CHF</strong>`);
  }

  function displaySelectedIngredients($ingredients) {
    var container = $('.js-final-ingredients');

    // clearing list, to remove earlier added items
    container.html('');

    // add a list item for each selected ingredient
    $ingredients.each(function() {
      // retrieve the name of the item
      var ingredientName = $(this).find('.js-ingredient-name').html();
      console.log('ingredientName: ', ingredientName);
      // create list item HTML
      var listHTML = `<li class="chosen-ingredient">${ingredientName}</li>`;
      // and add it at the end of the ul
      container.append(listHTML);
    })
  }

  $('#calculate-price-button').click(function() {
    // prepending a variable name with a $-sign is good practice
    // to mark variables that contain jQuery objects.
    // https://stackoverflow.com/questions/205853/why-would-a-javascript-variable-start-with-a-dollar-sign
    var $selectedIngredients = getSelectedIngredients();
    var price = calculateTotalPrice($selectedIngredients);
    console.log('price: ', price);

    displayPriceOnScreen(price);
    displaySelectedIngredients($selectedIngredients);
  })

  displayArtifacts(artifacts);
});
