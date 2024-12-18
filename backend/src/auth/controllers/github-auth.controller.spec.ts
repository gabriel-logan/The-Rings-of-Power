import { ConfigModule } from "@nestjs/config";
import type { TestingModule } from "@nestjs/testing";
import { Test } from "@nestjs/testing";
import { type Response } from "express";
import envTest from "src/configs/env.test";
import type { GithubReqUser } from "src/global/types";

import { GithubAuthController } from "./github-auth.controller";
import { GithubAuthService } from "../providers/github-auth.service";

describe("GithubAuthController", () => {
  let controller: GithubAuthController;

  const mockAuthService = {
    signIn: jest.fn().mockResolvedValue({
      accessToken: "asdX0.hF60cVqQ2LSkEA1dkwXUZpPLasd6b5DnL1lw",
      userId: 1,
      username: "admin",
      email: null,
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forFeature(envTest)],
      controllers: [GithubAuthController],
      providers: [GithubAuthService],
    })
      .overrideProvider(GithubAuthService)
      .useValue(mockAuthService)
      .compile();

    controller = module.get<GithubAuthController>(GithubAuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("githubSignIn", () => {
    it("should return undefined", () => {
      expect(controller.githubSignIn()).toBeUndefined();
    });
  });

  describe("githubSignInCallback", () => {
    it("should return undefined", async () => {
      const req = {
        user: {
          username: "admin",
          email: null,
        },
      } as unknown as GithubReqUser;

      const res = {
        cookie: jest.fn(),
        redirect: jest.fn(),
      } as unknown as Response;

      expect(await controller.githubSignInCallback(req, res)).toBeUndefined();

      expect(res.redirect).toHaveBeenCalledWith(
        expect.stringContaining("/login"),
      );
    });
  });
});
