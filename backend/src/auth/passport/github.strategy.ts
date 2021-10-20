import { Strategy, VerifyCallback } from 'passport-github2';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy, 'github') {
  constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SECRET,
      redirectUri: `http://localhost:${process.env.PORT_FE}/auth/github`,
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { provider, id, photos } = profile;
    const user = {
      provider,
      subId: id,
      profileImageUrl: photos[0].value,
    };
    done(null, user);
  }
}
