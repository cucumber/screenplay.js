Feature: Hear shout
  Scenario: Listener is within range
    Given Sean is located at (0, 0)
    And Lucy is located at (15, 0)
    When Sean shouts "free bagels at Sean's"
    Then Lucy hears Sean’s message

  Scenario: Listener is out of range
    Given Sean is located at (0, 0)
    And Lucy is located at (1500, 0)
    When Sean shouts "free bagels at Sean's"
    Then Lucy hears nothing
