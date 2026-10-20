import { describe, expect, it } from "bun:test";
import { sortNewestFirst } from "../src/lib/portfolio-order";

describe("sortNewestFirst", () => {
  it("puts current-year portfolio projects before older projects", () => {
    const projects = [
      { title: "Older", period: "Feb 2025" },
      { title: "Current", period: "Mar 2026" },
    ];

    expect(sortNewestFirst(projects, 2026).map(({ title }) => title)).toEqual(["Current", "Older"]);
  });

  it("puts 2026 certifications before previous-year credentials", () => {
    const certifications = [
      { name: "2025 credential", year: "2025" },
      { name: "2026 credential", year: "2026" },
    ];

    expect(sortNewestFirst(certifications, 2026).map(({ name }) => name)).toEqual([
      "2026 credential",
      "2025 credential",
    ]);
  });
});