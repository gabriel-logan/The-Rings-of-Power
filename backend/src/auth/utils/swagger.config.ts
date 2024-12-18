import type { ApiResponseOptions } from "@nestjs/swagger";

const authResponse = {
  accessToken: "TOKEN_STRING",
  userId: 1,
  username: "admin",
  email: "admin@admin.com",
};

export const signInApiOkResponse: ApiResponseOptions = {
  example: authResponse,
};

export const getProfileApiOkResponse: ApiResponseOptions = {
  example: {
    sub: 1,
    username: "admin",
    email: "admin@admin.com",
  },
};
