/**
 * Main application controller
 *
 * You can use this controller for your whole app if it is small
 * or you can have separate controllers for each logical section
 *
 */
;(function() {

  angular
    .module('complexTable')
    .controller('MainController', MainController);

  MainController.$inject = ['LocalStorage', 'QueryService'];


  function MainController(LocalStorage, QueryService, defaultColumns) {

    // 'controller as' syntax
    var vm = this;
    vm.defaultColumns = defaultColumns;

    ////////////  function definitions
    /**
     * Load some data
     * @return {Object} Returned object
     */
    vm.restuarant = [{
      name: 'Talula’s Table',
      type: 'American (New)',
      price: '$$$$',
      neighborhood: 'Kennett Square',
      address: '102 W State St, Kennett Square, PA 19348',
      phone: '(610) 444-8255',
      website: 'http://talulastable.com',
      byo: true
    },{
      name: 'Vetri',
      type: 'Italian',
      price: '$$$$',
      neighborhood: 'Midtown Village',
      address: '1312 Spruce St, Philadelphia, PA 19107',
      phone: '215-732-3478',
      website: 'http://vetriristorante.com/',
      byo: false
    },{
      name: 'Fiorino',
      type: 'Italian',
      price: '$$$$',
      neighborhood: 'East Falls',
      address: '3572 Indian Queen Ln, Philadelphia, PA 19129',
      phone: '(215) 843-1500',
      website: 'http://www.fiorino.us/',
      byo: true
    },{
      name: 'Bud & Marilyn\'s',
      type: 'American',
      price: '$$$',
      neighborhood: 'Midtown Village',
      address: '1234 Locust Street, Philadelphia, PA 19129',
      phone: '215-546-2220',
      website: 'http://budandmarilyns.com/',
      byo: false
    },{
      name: 'Birra',
      type: 'Pizza',
      price: '$$',
      neighborhood: 'South Philadelphia',
      address: '1700 E Passyunk Ave, Philadelphia, PA 19148',
      phone: '(267) 324-3127',
      website: 'http://birraphilly.com/',
      byo: false
    },{
      name: 'Tired Hands Brewing Company',
      type: 'Brewery',
      price: '$$',
      neighborhood: 'Ardmore',
      address: '16 Ardmore Ave, Ardmore, PA 19003',
      phone: '(610) 896-7621',
      website: 'http://www.tiredhands.com',
      byo: false
    }]
  }


})();
