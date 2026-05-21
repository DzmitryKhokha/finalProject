Feature: all tests related to patient module

Scenario: verify GET patients return data
Given doctor is logged in
When user hits GET "/api/patients"
Then verify status code is 200
