$(document).ready(function() {

  // List of artifacts, that will show on screen after loading the page
  var artifacts = [{
      id: 'artifact1',
      title: 'Balance',
      year: '2016',
      author: 'Dénes Darab',
      image: './images/darabdenesbalance.jpg'
    },

    {
      id: 'artifact2',
      title: 'Just the tip',
      year: '2016',
      author: 'Dénes Darab',
      image: './images/darabdenesjustthetip.jpg'
    },

    {
      id: 'artifact3',
      title: 'Oscillation 002',
      year: '2017',
      author: 'Dorota Jedrusik',
      image: './images/dorotajedrusikoscillation002.jpg'
    },

    {
      id: 'artifact4',
      title: 'Zebra Heads',
      year: '1932-1942',
      author: 'Victor Vasarely',
      image: './images/victorvasarelyzebraheads.jpg'
    },

    {
      id: 'artifact5',
      title: 'Churchgate Station, Bombay',
      year: '1995',
      author: 'Sebastiao Salgado',
      image: './images/sebastiaosalgadochurchgatestation.png'
    },
  ];

  function displayArtifacts(artifacts) {
    // loop over artifacts that are passed into function
    for (let i = 0; i < artifacts.length; i++) {
      var $populatedTemplate = $(populateTemplate(artifacts[i]));
      $('#content-strip').append($populatedTemplate);
      $('#' + artifacts[i].id + '-star').click(function() {
        $('#' + artifacts[i].id + '-star').toggleClass('filled outline');
        $('#' + artifacts[i].id).find('.fadeable').toggleClass('faded');
        setTimeout(function() {
          if ($('#' + artifacts[i].id).find('.fadeable').hasClass('faded')) {
            $('#' + artifacts[i].id).remove();
          }
        }, 4000);
      });
    }
  }

  function populateTemplate(artifact) {
    // Using template literals, we can return a nicely populated template
    var template = `<div class="item" id="${artifact.id}">

        <div class="thumbnail fadeable">
          <img class="artifact" src="${artifact.image}" />
        </div>

        <div class="description">
          <p class="description-text fadeable">${artifact.title}, ${artifact.year}</p>
          <p class="description-text italic-text fadeable">${artifact.author}</p>
          <img class="star filled" id="${artifact.id}-star"/>
        </div>
      </div>`

    return template;
  }

  displayArtifacts(artifacts);
});
