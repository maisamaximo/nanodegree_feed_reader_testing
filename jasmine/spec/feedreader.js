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
    describe('RSS Feeds:', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

        /** Responsible ffor testing if allFeeds variable has been defined and is not
         *  empty.
        */
        it('Status: allFeeds are defined.', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Responsible for testing if each feed has a URL defined.
         */
         it('Status: URL is defined.', function(){
            for(var url_index in allFeeds){
                expect(allFeeds[url_index].url).toBeDefined();
                expect(allFeeds[url_index].url.lenght).not.toBe(0);
            }
         });

        /* Responsible for testing if each feed has a Name defined.
         */
         it('Status: Name is defined.', function(){
            for(var name_index in allFeeds){
                expect(allFeeds[name_index].name).toBeDefined();
                expect(allFeeds[name_index].name.lenght).not.toBe(0);
            }
         })
    }); 


    /* Creates new test suite named "The menu" */
    describe('The Menu:', function() {
        /* Responsible for testing if the menu is hidden by default.
         */
         it('Status: Menu is hidden by default.', function(){
            expect($('body').hasClass("menu-hidden")).toBe(true);
         })

         /* Responsible for testing if the menu is visible.
          */
          it('Status: Menu changes are visible when the menu icon is clicked.', function(){

            $(".menu-icon-link").click();

            if (($('body').hasClass("menu-hidden")) === false) {
                $(".menu-icon-link").click();
                expect($('body').hasClass("menu-hidden")).toBe(true);
            } else {
                expect($('body').hasClass("menu-hidden")).toBe(false);
            }
          });
      });

    /* Creates a new test suite named "Initial Entries" */
    describe('Initial Entries:', function() {
        /*  Responsible for testing if, after loadFeed function, loadFeed is at least a single .entry element within the .feed container.
         */
         beforeEach(function(done) {
            loadFeed(0, done)
        });

         it('Status: loadFeed is at least a single .entry element within the .feed container.', function() {
            expect($('.feed .entry').length).toBeGreaterThan(0);
         })
     });

    /* Creates a new test suite named "New Feed Selection" */
    describe('New Feed Selection:', function() {
        /* Responsible for testing if a new feed loaded by the loadFeed function is content changing.
         */
        beforeEach(function(done) {
            loadFeed(0,function() {
                previousFeed = $('.feed').html();
               
               loadFeed(1, function () {
                    done();
            });
        });
     });

        it('Status: new feed loaded by the loadFeed function is content changing.', function(done){
                var actualFeed = $('.feed').html();
                expect(actualFeed).not.toBe(previousFeed);

                done();
      });
    });
}());
