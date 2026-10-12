import assert from "power-assert";
import type { DateFnsDocs } from "@date-fns/docs";
import {
  filterDuplicateVersions,
  filterPreReleaseVersions,
  getLatestVersion,
  sortVersions,
} from ".";

function createVersion(
  version: string,
  createdAt: number,
  preRelease = false,
  submodules: DateFnsDocs.Submodule[] = []
): DateFnsDocs.VersionPreview {
  return {
    version,
    createdAt,
    preRelease,
    submodules,
  };
}

describe("versions utilities", () => {
  describe("filterDuplicateVersions", () => {
    it("removes duplicate version entries (such as duplicate v1.30.1)", () => {
      const versions: DateFnsDocs.VersionPreview[] = [
        createVersion("v2.0.0", 300),
        createVersion("v1.30.1", 200),
        createVersion("v1.30.1", 100),
        createVersion("v1.30.0", 50),
      ];

      const result = filterDuplicateVersions(versions);

      assert.deepEqual(
        result.map((v) => v.version),
        ["v2.0.0", "v1.30.1", "v1.30.0"]
      );
      assert.equal(result.length, 3);
      assert.equal(result[1].createdAt, 200);
    });

    it("preserves distinct legitimate versions", () => {
      const versions: DateFnsDocs.VersionPreview[] = [
        createVersion("v3.0.0", 400),
        createVersion("v2.0.0", 300),
        createVersion("v1.30.1", 200),
        createVersion("v1.30.0", 100),
      ];

      const result = filterDuplicateVersions(versions);

      assert.deepEqual(
        result.map((v) => v.version),
        ["v3.0.0", "v2.0.0", "v1.30.1", "v1.30.0"]
      );
    });

    it("returns an empty array when given an empty list", () => {
      const result = filterDuplicateVersions([]);
      assert.deepEqual(result, []);
    });
  });

  describe("sortVersions", () => {
    it("sorts versions by createdAt in descending order", () => {
      const versions: DateFnsDocs.VersionPreview[] = [
        createVersion("v1.0.0", 100),
        createVersion("v3.0.0", 300),
        createVersion("v2.0.0", 200),
      ];

      const sorted = sortVersions(versions);

      assert.deepEqual(
        sorted.map((v) => v.version),
        ["v3.0.0", "v2.0.0", "v1.0.0"]
      );
    });
  });

  describe("filterPreReleaseVersions", () => {
    it("filters out pre-release versions when no pre-release is selected", () => {
      const versions: DateFnsDocs.VersionPreview[] = [
        createVersion("v2.0.0", 300, false),
        createVersion("v3.0.0-alpha.1", 250, true),
        createVersion("v1.0.0", 100, false),
      ];

      const filtered = filterPreReleaseVersions(versions);

      assert.deepEqual(
        filtered.map((v) => v.version),
        ["v2.0.0", "v1.0.0"]
      );
    });

    it("includes a pre-release version if it matches selectedVersion", () => {
      const versions: DateFnsDocs.VersionPreview[] = [
        createVersion("v2.0.0", 300, false),
        createVersion("v3.0.0-alpha.1", 250, true),
        createVersion("v1.0.0", 100, false),
      ];

      const filtered = filterPreReleaseVersions(versions, "v3.0.0-alpha.1");

      assert.deepEqual(
        filtered.map((v) => v.version),
        ["v2.0.0", "v3.0.0-alpha.1", "v1.0.0"]
      );
    });
  });

  describe("getLatestVersion", () => {
    it("returns the latest non-prerelease version", () => {
      const versions: DateFnsDocs.VersionPreview[] = [
        createVersion("v3.0.0-alpha.1", 400, true),
        createVersion("v2.0.0", 300, false),
        createVersion("v1.0.0", 100, false),
      ];

      const latest = getLatestVersion(versions);
      assert.equal(latest.version, "v2.0.0");
    });
  });

  describe("combined data-processing pipeline", () => {
    it("deduplicates, filters, and preserves descending order with duplicate versions", () => {
      const versions: DateFnsDocs.VersionPreview[] = [
        createVersion("v1.30.1", 150, false),
        createVersion("v2.0.0", 300, false),
        createVersion("v3.0.0-beta.1", 400, true),
        createVersion("v1.30.1", 160, false),
        createVersion("v1.30.0", 100, false),
      ];

      const processed = filterDuplicateVersions(
        sortVersions(filterPreReleaseVersions(versions))
      );

      assert.deepEqual(
        processed.map((v) => v.version),
        ["v2.0.0", "v1.30.1", "v1.30.0"]
      );
      assert.equal(processed[1].createdAt, 160);
    });
  });
});
