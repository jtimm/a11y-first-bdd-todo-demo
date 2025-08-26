Feature: A11y‑first generic steps with suffix waits on a Todo app
  As a contributor
  I want readable, low‑boilerplate executable specs
  So that teams can get robust E2E coverage with accessible UI contracts

  Background:
    Given I open the app

  Scenario: Create a high-priority task
    When I type 'Buy milk' into the 'Task' textbox in the 'Create Task' 'region'
    And I select the 'High' option in the 'Priority' 'combobox' in the 'Create Task' 'region'
    And I click the 'Add Task' button in the 'Create Task' 'region' and wait for the spinner to disappear
    Then the 'Todos' 'region' contains the text 'Buy milk'

  Scenario: Complete a task with an explicit event wait
    Given the 'Remaining tasks count' 'status' contains the text '0'
    When I type 'Pay bills' into the 'Task' textbox in the 'Create Task' 'region'
    And I select the 'Medium' option in the 'Priority' 'combobox' in the 'Create Task' 'region'
    And I click the 'Add Task' button in the 'Create Task' 'region' and wait for the 'todo:created' event
    Then the 'Remaining tasks count' 'status' contains the text '1'
    When I check the 'Pay bills' checkbox in the 'Todos' 'region' and wait for the 'todo:completed' event
    Then the 'Remaining tasks count' 'status' contains the text '0'
    And I uncheck the 'Pay bills' checkbox in the 'Todos' 'region' and wait for the 'todo:reopened' event
    Then the 'Remaining tasks count' 'status' contains the text '1'

  Scenario: Edit a task via dialog, waiting for open/close
    When I type 'Walk dog' into the 'Task' textbox in the 'Create Task' 'region'
    And I click the 'Add Task' button in the 'Create Task' 'region' and wait for the spinner to disappear
    And I click the 'Edit Walk dog' button in the 'Todos' 'region' and wait for the 'Edit Task' dialog to appear
    And I type 'Walk the dog' into the 'Task' textbox in the 'Edit Task' 'dialog'
    And I select the 'Low' option in the 'Priority' 'combobox' in the 'Edit Task' 'dialog'
    And I click the 'Save' button in the 'Edit Task' 'dialog' and wait for the dialog to close
    Then the 'Todos' 'region' contains the text 'Walk the dog'

  Scenario: Delete a task using combined event/spinner waits
    When I type 'Old task' into the 'Task' textbox in the 'Create Task' 'region'
    And I click the 'Add Task' button in the 'Create Task' 'region' and wait for the 'todo:created' event and for the spinner to disappear
    And I click the 'Delete Old task' button in the 'Todos' 'region' and wait for the 'todo:deleted' event and for the spinner to disappear
    Then the 'Todos' 'region' contains the text 'No tasks yet.'
    And the full page should match the snapshot masking the 'timer' element
