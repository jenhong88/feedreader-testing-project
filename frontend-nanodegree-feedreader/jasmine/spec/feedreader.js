/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('url included', function() {
          allFeeds.forEach(function (feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url).not.toEqual(null);
          })
        });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('name defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toEqual(null);
           })
         });
       });

       /* TODO: Write a new test suite named "The menu" */

           /* TODO: Write a test that ensures the menu element is
            * hidden by default. You'll have to analyze the HTML and
            * the CSS to determine how we're performing the
            * hiding/showing of the menu element.
            */

       describe('The menu', function() {
         /* calling on a fake successful initial loading of the page/server
         to test that the default setting is 'menu-hidden'
         */

          it('menu is hidden by default', function(done){
           spyOn($,"ajax").and.callFake(function(e) {
             e.success({});
           });

           expect($('body').attr('class')).toEqual('menu-hidden');
           done();
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */

          it('menu changes visibility when clicked', function(done) {
            /*
            creating a spy to listen to the menu click event,
            simulating the event two times to ensure that the visibility changes
            as it should per click
            */

            let menuIcon = document.querySelector('.menu-icon-link');
            let spy = jasmine.createSpy();
            menuIcon.addEventListener('click', spy);
            let event = new MouseEvent('click', {
              hideMenu: function() {
                  $('body').toggleClass('menu-hidden')}
                });
            menuIcon.dispatchEvent(event);
            expect(spy).toHaveBeenCalled();
              done();

              setTimeout(() => {
                  expect($('body').attr('class')).not.toEqual('menu-hidden');
                  done();
              },100)

              setTimeout(() => {
                menuIcon.dispatchEvent(event);
                  expect($('body').attr('class')).toEqual('menu-hidden');
                  done();
                  $('body').toggleClass('menu-hidden');
              },200)
            });
            });

    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {
      /* TODO: Write a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       * Remember, loadFeed() is asynchronous so this test will require
       * the use of Jasmine's beforeEach and asynchronous done() function.
       */
       beforeEach(function(done) {
         $('.feed').empty();
         loadFeed(0);
         done();
       });

       it('loadFeed includes entries', function(done) {
         expect($('.feed')).not.toBe('');
         done();
       });

     });
     /* TODO: Write a new test suite named "New Feed Selection" */

     describe('New Feed Selection', function() {

       /* TODO: Write a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        * Remember, loadFeed() is asynchronous.
        */
        beforeEach(function(done) {
          $('.feed').empty();
          loadFeed(0);
          loadFeed(1);
          done();
    });

    it('new feed worked and content is changed', function(done) {
      var firstEntry = allFeeds[0].url;
      var secondEntry = allFeeds[1].url;
      expect(firstEntry).not.toBe(secondEntry);
      done();
    });

  });

}())
