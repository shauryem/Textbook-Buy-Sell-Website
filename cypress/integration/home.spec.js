describe("Home Page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("has a nav bar", () => {
    cy.get("nav.navbar").should("exist");
  });

  it("has a home page brand button on nav bar", () => {
    cy.get("nav.navbar * a.navbar-brand").should("exist");
  });

  it("has a table of all posts", () => {
    cy.get("table");
  });

  it("shows me a search form", () => {
    cy.get("form");
  });

  it("shows me a submit button", () => {
    cy.get('button[name="search"]');
  });

  it("shows me a reset search button", () => {
    cy.get('button[name="reset_search"]');
  });

  it("allows me to search up by isbn", () => {
    cy.get("form");
    cy.get('input[name="isbn"]')
      .type("9788867156016")
      .should("have.value", "9788867156016");
    cy.get("form").submit();
  });

  it("allows me to search up by name", () => {
    cy.get("form");
    cy.get('input[name="name"]')
      .type("Head First Java, 2nd Edition")
      .should("have.value", "Head First Java, 2nd Edition");
    cy.get("form").submit();
  });

  it("allows me to search up by class", () => {
    cy.get("form");
    cy.get('input[name="class"]').type("CS48").should("have.value", "CS48");
    cy.get("form").submit();
  });

  it("allows me to search up by professor", () => {
    cy.get("form");
    cy.get('input[name="professor"]')
      .type("Bouwmeester")
      .should("have.value", "Bouwmeester");
    cy.get("form").submit();
  });
});
