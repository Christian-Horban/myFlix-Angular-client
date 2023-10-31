// Import necessary testing utilities and classes.
import { TestBed } from '@angular/core/testing';

// Import the service you want to test.
import { UserRegistrationService } from './fetch-api-data.service';

// Describe defines a test suite. The string is a name or title for this suite.
describe('FetchApiDataService', () => {
  // Declare a variable for the service, so it can be accessed by all tests in this suite.
  let service: UserRegistrationService;

  // Run this code before every test in the suite.
  beforeEach(() => {
    // TestBed is the main Angular testing utility. Here it's used to configure an Angular testing module.
    TestBed.configureTestingModule({});

    // Instantiate the service using the TestBed.
    service = TestBed.inject(UserRegistrationService);
  });

  // Define a single test. The string is a title for this test.
  it('should be created', () => {
    // Check if the service instance is truthy, which would mean it was created successfully.
    expect(service).toBeTruthy();
  });
});
