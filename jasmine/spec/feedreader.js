/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

/* All of the tests are contained within the $() function,
 * since some of these tests may require DOM elements. Want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is the first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This test makes sure that the allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed in the allFeeds object and ensures it has a name 
         * and URL that are defined AND that the name and URL are not empty.
         */
        it('and names and URL exist and are defined', function() {

            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };

            for(var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
        });
    });

    // New test suite with tests related to the menu.*/
    describe('The menu', function() {

        // This test ensures the menu element is hidden by default (not showing).
        it('is hidden by default', function() {
            //$('body').hasClass('menu-hidden');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
        
        /* This test ensures the menu changes visibility when the menu icon 
         * is clicked. This test should has two expectations: does the menu display when
         * clicked, and does it hide when clicked again.
         */
        it('toggles between visible and hidden when menu icon is clicked', function() {
            
            var menuIcon = $('.menu-icon-link');

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(false);

            menuIcon.click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });    
    });

    // New test suite named "Initial Entries"
    describe('Initial Entries', function() {

        /* This test ensures when the loadFeed function is called and completes its work, 
         * there is at least a single .entry element within the .feed container.
         * loadFeed() is asynchronous so this test will requires the use of Jasmine's 
         * beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            // Loads the first index object in the array, and waits for that to be done.
            loadFeed(0, done);
        });
        
        // ...then the test is run.
        it('contains 1 or more .entry elements within the .feed container', function() {
            // At least the first entry in the array exists.
            expect($('.feed .entry')[0]).toBeDefined();
        });
    });

    /* New test suite named "New Feed Selection"*/
    describe('New Feed Selection', function() {

        /* This test ensures when a new feed is loaded by the loadFeed function, the content 
         * actually changes.  loadFeed() is asynchronous.
         */
        var feedBefore;

        beforeEach(function(done) {
            loadFeed(1, function() {
                // .html method returns the first .feed element only
                feedBefore = $('.feed').html();
                done();
            });
        });

        it('loads new and different content', function(done) {
            loadFeed(0, function() {
                expect($('.feed').html()).not.toEqual(feedBefore);
                done();
            });
        });
    });
});
