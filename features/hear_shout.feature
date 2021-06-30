Feature: Hear shout
  Scenario: Listener is within range
    Given Sean is online
    And Lucy is online
    And Lucy is located 15m from Sean
    When Sean shouts "free bagels at Sean's"
    Then Lucy hears Sean’s message

  Scenario: Listener is out of range
    Given Sean is online
    And Lucy is online
    And Lucy is located 1500m from Sean
    When Sean shouts "free bagels at Sean's"
    Then Lucy hears nothing
