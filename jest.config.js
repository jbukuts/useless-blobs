
module.exports = {
    transform: {
        "^.+\\.(t|j)sx?$": "ts-jest"
    },
    testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    collectCoverageFrom: [
        "**/*.{ts,tsx}",
        "!**/node_modules/**",
        "!**/lib/**",
        "!**/demo/**"
    ],
    collectCoverage: true,
    coverageReporters: ["json", "html"],
    setupFilesAfterEnv: [
        "@testing-library/jest-dom/extend-expect"
    ],
}