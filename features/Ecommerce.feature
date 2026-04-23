Feature: Ecommerce website login, purchase of products and verifying the order history

    Scenario Outline: Scenario Outline name: Ecommerce login and view list of products
    Given the user launches the ecoomerce website
    When the valid user credentials "<username>" and "<password>" are entered
    Then ecommerce website should be launched
    And  website dashboard and list of products should be visible
    Examples:
      | username                | password        |
      | pranithi@gmail.com      | Pranithi@2023   |

    Scenario Outline: single product purchase and verifyting the Order history
    Given the user launches the ecoomerce website
    When the valid user credentials "<username>" and "<password>" are entered
    Then ecommerce website should be launched
    When the user selects single "<productcode>" and add clicks add to cart button
    Then user navigates to cart page
    When user places the order with "<username>" and navigates to order history page
    Then the order history should be visible with the product and order details

    Examples:
        | username           | password      | productcode |
        | pranithi@gmail.com | Pranithi@2023 | ZARA COAT 3 |
