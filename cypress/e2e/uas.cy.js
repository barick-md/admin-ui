describe("Dashboard (Overview) Page", () => {
  beforeEach(() => {
    // Login dulu sebelum akses dashboard
    cy.visit("http://localhost:5173/login");

    cy.get("input#email").type("hello@example.com");
    cy.get("input#password").type("123456");
    cy.get("button").contains("Login").click();

    // Tunggu redirect ke dashboard
    cy.url().should("eq", "http://localhost:5173/", { timeout: 10000 });
  });

  it("should display the sidebar navigation", () => {
    cy.get("aside").should("be.visible");
    cy.get("nav").should("be.visible");
    cy.get("nav a").should("have.length.greaterThan", 0);
  });

  it("should display the header with user name and date", () => {
    cy.get("header").should("be.visible");
    // Header menampilkan nama user
    cy.get("header").find("div.font-bold").should("be.visible");
  });

  it("should display Total Balance card", () => {
    cy.contains("Total Balance").should("be.visible");
    cy.contains("$25000").should("be.visible");
  });

  it("should display Goals card with loading then data", () => {
    cy.contains("Goals").should("be.visible");
    // Tunggu loader hilang
    cy.contains("Loading Data", { timeout: 10000 }).should("not.exist");
    cy.contains("Target Achieved").should("be.visible");
  });

  it("should display Upcoming Bill card", () => {
    cy.contains("Upcoming Bill").should("be.visible");
  });

  it("should display Recent Transaction card with filter tabs", () => {
    cy.contains("Recent Transaction").should("be.visible");
    cy.contains("All").should("be.visible");
    cy.contains("Revenue").should("be.visible");
    cy.contains("Expense").should("be.visible");
  });

  it("should display Statistics card", () => {
    cy.contains("Statistics").should("be.visible");
  });

  it("should display Expenses Breakdown card", () => {
    cy.contains("Expenses Breakdown").should("be.visible");
  });

  it("should navigate to Expenses page from sidebar", () => {
    cy.get("nav").contains("Expenses").click();
    cy.url().should("include", "/expense");
    cy.contains("Expenses Comparison").should("be.visible");
  });

  it("should navigate to Balance page from sidebar", () => {
    cy.get("nav").contains("Balances").click();
    cy.url().should("include", "/balance");
  });

  it("should logout with backdrop loading indicator", () => {
    cy.contains("Logout").click();
    // Backdrop muncul sebentar
    cy.url().should("include", "/login", { timeout: 10000 });
  });
});
