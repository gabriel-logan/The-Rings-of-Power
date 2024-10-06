"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponsePatternStructure = void 0;
exports.errorResponsePatternStructure = {
    status: undefined,
    description: "Internal Server Error",
    content: {
        "application/json": {
            examples: {
                example1: {
                    summary: "Single string message",
                    value: {
                        message: "Some error message",
                        error: "Some error",
                        statusCode: 500,
                    },
                },
                example2: {
                    summary: "Array of string messages",
                    value: {
                        message: ["Error message 1", "Error message 2"],
                        error: "Some error",
                        statusCode: 500,
                    },
                },
                example3: {
                    summary: "No message",
                    value: {
                        error: "Some error",
                        statusCode: 500,
                    },
                },
            },
        },
    },
};
//# sourceMappingURL=swagger.config.js.map